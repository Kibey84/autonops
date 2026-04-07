'use client';

import { useState, useEffect, useCallback } from 'react';
import { Camera, Plus, X } from 'lucide-react';
import type { MissionRole, MissionEvidence, AuthSession } from '@/lib/data/types';
import { getEvidenceForMission } from '@/lib/data/mock';
import { getBrowserSupabase } from '@/lib/supabase-browser';

interface EvidencePanelProps {
  missionId: string;
  role: MissionRole;
  session: AuthSession;
}

export default function EvidencePanel({ missionId, role, session }: EvidencePanelProps) {
  const [items, setItems] = useState<MissionEvidence[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const canCapture = role === 'commander' || role === 'operator';

  // Load initial data + subscribe to realtime
  useEffect(() => {
    // Seed from mock data
    setItems(getEvidenceForMission(missionId));

    const supabase = getBrowserSupabase();
    if (!supabase) return;

    // Pull from real DB if configured
    supabase
      .from('mission_evidence')
      .select('*')
      .eq('mission_id', missionId)
      .order('captured_at', { ascending: true })
      .then(({ data }) => {
        if (!data) return;
        const mapped: MissionEvidence[] = data.map((r: Record<string, unknown>) => ({
          id: r.id as string,
          missionId: r.mission_id as string,
          createdBy: r.created_by as string | null,
          createdByName: (r.created_by_name as string) || 'Unknown',
          label: r.label as string,
          notes: (r.notes as string) || '',
          capturedAt: r.captured_at as string,
        }));
        if (mapped.length > 0) setItems(mapped);
      });

    // Realtime subscription
    const channel = supabase
      .channel(`evidence-${missionId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mission_evidence', filter: `mission_id=eq.${missionId}` },
        (payload) => {
          const r = payload.new as Record<string, unknown>;
          const newItem: MissionEvidence = {
            id: r.id as string,
            missionId: r.mission_id as string,
            createdBy: r.created_by as string | null,
            createdByName: (r.created_by_name as string) || 'Unknown',
            label: r.label as string,
            notes: (r.notes as string) || '',
            capturedAt: r.captured_at as string,
          };
          setItems((prev) => [...prev, newItem]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [missionId]);

  const handleCapture = useCallback(async () => {
    if (!label.trim()) return;
    setSaving(true);

    const newEvidence: MissionEvidence = {
      id: 'ev-local-' + Date.now(),
      missionId,
      createdBy: session.userId,
      createdByName: session.userName,
      label: label.trim(),
      notes: notes.trim(),
      capturedAt: new Date().toISOString(),
    };

    const supabase = getBrowserSupabase();
    if (supabase) {
      const { error } = await supabase.from('mission_evidence').insert({
        mission_id: missionId,
        created_by: session.userId,
        created_by_name: session.userName,
        label: newEvidence.label,
        notes: newEvidence.notes,
      });
      if (error) console.error('Evidence insert failed:', error);
    } else {
      // Optimistic add for demo
      setItems((prev) => [...prev, newEvidence]);
    }

    setLabel('');
    setNotes('');
    setShowForm(false);
    setSaving(false);
  }, [label, notes, missionId, session]);

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-xl">
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Camera className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            Evidence
          </span>
          <span className="font-mono text-[9px] text-slate-500">{items.length} captures</span>
        </div>
        {canCapture && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1 px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[9px] font-mono font-bold rounded transition-colors"
          >
            <Plus className="w-3 h-3" />
            CAPTURE
          </button>
        )}
      </div>

      <div className="p-3 space-y-2">
        {/* Capture form */}
        {showForm && canCapture && (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider">New Capture</span>
              <button onClick={() => setShowForm(false)}>
                <X className="w-3.5 h-3.5 text-slate-500 hover:text-white" />
              </button>
            </div>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Label (e.g. 'Hotspot A confirmed')"
              className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes (optional)"
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 resize-none"
            />
            <button
              onClick={handleCapture}
              disabled={saving || !label.trim()}
              className="w-full px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-500 text-white text-[10px] font-mono font-bold rounded transition-colors"
            >
              {saving ? 'SAVING...' : 'SAVE EVIDENCE'}
            </button>
          </div>
        )}

        {/* Evidence list */}
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {items.length === 0 ? (
            <p className="text-[10px] text-slate-500 font-mono text-center py-4">
              No evidence captured yet
            </p>
          ) : (
            items.map((item) => {
              const time = new Date(item.capturedAt).toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
              });
              return (
                <div
                  key={item.id}
                  className="bg-slate-900 border-l-2 border-l-cyan-500 rounded px-2.5 py-1.5"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-mono text-[10px] text-white font-bold">{item.label}</span>
                    <span className="font-mono text-[9px] text-slate-500">{time}</span>
                  </div>
                  {item.notes && (
                    <p className="text-[9px] text-slate-400 leading-snug">{item.notes}</p>
                  )}
                  <div className="font-mono text-[8px] text-slate-600 mt-0.5">by {item.createdByName}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
