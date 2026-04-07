'use server';

import { createServerSupabaseClient } from '@/lib/supabase';

/**
 * Generate an After-Action Report for a completed mission.
 * Pulls chat log, evidence, and sortie/waypoint data, sends to Claude,
 * stores the returned markdown back into missions.aar_report.
 */
export async function generateAAR(missionId: string): Promise<{
  success: boolean;
  report?: string;
  error?: string;
}> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return { success: false, error: 'Claude API not configured' };
    }

    let mission: Record<string, unknown> | null = null;
    let chatRows: Record<string, unknown>[] = [];
    let evidenceRows: Record<string, unknown>[] = [];
    let sortieRows: Record<string, unknown>[] = [];

    // Try to pull from real DB if configured
    try {
      const supabase = createServerSupabaseClient();

      const { data: m } = await supabase
        .from('missions')
        .select('*')
        .eq('id', missionId)
        .single();
      mission = m;

      const { data: chat } = await supabase
        .from('mission_chat')
        .select('*')
        .eq('mission_id', missionId)
        .order('created_at', { ascending: true });
      chatRows = chat || [];

      const { data: evidence } = await supabase
        .from('mission_evidence')
        .select('*')
        .eq('mission_id', missionId)
        .order('captured_at', { ascending: true });
      evidenceRows = evidence || [];

      const { data: sorties } = await supabase
        .from('sorties')
        .select('*')
        .eq('mission_id', missionId)
        .order('sortie_number', { ascending: true });
      sortieRows = sorties || [];
    } catch (dbError) {
      // Supabase not configured — fall back to mock data
      const mock = await import('@/lib/data/mock');
      const m = mock.missions.find((x) => x.id === missionId || x.displayId === missionId);
      if (!m) return { success: false, error: 'Mission not found' };
      mission = m as unknown as Record<string, unknown>;
      chatRows = mock.getChatForMission(m.id) as unknown as Record<string, unknown>[];
      evidenceRows = mock.getEvidenceForMission(m.id) as unknown as Record<string, unknown>[];
    }

    if (!mission) {
      return { success: false, error: 'Mission not found' };
    }

    // Build the prompt context
    const chatLog = chatRows.length > 0
      ? chatRows.map((c) => {
          const ts = (c.created_at || c.createdAt) as string;
          const who = (c.user_name || c.userName || c.role) as string;
          const role = (c.role || 'system') as string;
          const msg = (c.message) as string;
          return `[${ts}] ${who} (${role}): ${msg}`;
        }).join('\n')
      : 'No chat log entries.';

    const evidenceLog = evidenceRows.length > 0
      ? evidenceRows.map((e) => {
          const ts = (e.captured_at || e.capturedAt) as string;
          const label = e.label as string;
          const notes = (e.notes || '') as string;
          const by = (e.created_by_name || e.createdByName || 'Unknown') as string;
          return `[${ts}] ${label} (${by}): ${notes}`;
        }).join('\n')
      : 'No evidence captured.';

    const sortieLog = sortieRows.length > 0
      ? sortieRows.map((s) => `Sortie ${s.sortie_number}: ${s.status}, ${s.flight_hours || 0} hours`).join('\n')
      : 'Sortie data not recorded.';

    const prompt = `You are generating an After-Action Report (AAR) for a completed AutonOps drone mission. Use the data below to produce a structured markdown report.

MISSION DATA:
- ID: ${mission.display_id || mission.displayId}
- Type: ${mission.type}
- Location: ${mission.location}
- Account: ${mission.account_name || mission.accountName || 'N/A'}
- Start: ${mission.start_time || mission.startTime}
- End: ${mission.end_time || mission.endTime}
- Status: ${mission.status}

SORTIES:
${sortieLog}

CHAT / COMMS LOG:
${chatLog}

EVIDENCE CAPTURES:
${evidenceLog}

INSTRUCTIONS:
Produce a markdown AAR with the following sections:
1. ## Mission Summary (2-3 sentences)
2. ## Timeline (key events from chat log, time-stamped)
3. ## Outcomes (what was accomplished, observations)
4. ## Evidence Highlights (significant captures)
5. ## Lessons Learned (constructive observations)
6. ## Recommendations (for future similar missions)

Tone: military-style, factual, concise. No filler. Incident command authority remains with the IC. Do not claim outcomes like "fire contained" — use "containment support" or "suppression support". Avoid em dashes.`;

    const Anthropic = (await import('@anthropic-ai/sdk')).default;
    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    });

    const block = response.content.find((b) => b.type === 'text');
    const report = block && block.type === 'text' ? block.text : null;

    if (!report) {
      return { success: false, error: 'Empty response from Claude' };
    }

    // Store back to DB if configured
    try {
      const supabase = createServerSupabaseClient();
      await supabase
        .from('missions')
        .update({ aar_report: report })
        .eq('id', missionId);
    } catch {
      // Silent fail if not configured — return the report anyway
    }

    return { success: true, report };
  } catch (error) {
    console.error('AAR generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
