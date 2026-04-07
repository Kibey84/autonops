'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import DashboardPanel from './DashboardPanel';
import type { MissionRole, ChatRole, MissionChatEntry, AuthSession } from '@/lib/data/types';
import { getChatForMission } from '@/lib/data/mock';
import { getBrowserSupabase } from '@/lib/supabase-browser';

interface CommsLogPanelProps {
  missionId: string;
  role: MissionRole;
  session: AuthSession;
}

const roleBadge = (role: ChatRole): { color: string; label: string } => {
  switch (role) {
    case 'commander': return { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'CMDR' };
    case 'operator': return { color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30', label: 'OP' };
    case 'observer': return { color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', label: 'OBS' };
    case 'system': return { color: 'bg-slate-500/20 text-slate-400 border-slate-500/30', label: 'SYS' };
  }
};

function mapRow(r: Record<string, unknown>): MissionChatEntry {
  return {
    id: r.id as string,
    missionId: r.mission_id as string,
    userId: (r.user_id as string | null) ?? null,
    userName: (r.user_name as string) || 'Unknown',
    role: r.role as ChatRole,
    message: r.message as string,
    createdAt: r.created_at as string,
  };
}

export default function CommsLogPanel({ missionId, role, session }: CommsLogPanelProps) {
  const [log, setLog] = useState<MissionChatEntry[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Observers can read but not post
  const canPost = role !== 'observer';

  // Load + subscribe
  useEffect(() => {
    // Seed from mock
    setLog(getChatForMission(missionId));

    const supabase = getBrowserSupabase();
    if (!supabase) return;

    // Pull from real DB
    supabase
      .from('mission_chat')
      .select('*')
      .eq('mission_id', missionId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setLog(data.map(mapRow));
        }
      });

    // Realtime subscription
    const channel = supabase
      .channel(`chat-${missionId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mission_chat', filter: `mission_id=eq.${missionId}` },
        (payload) => {
          const newRow = mapRow(payload.new as Record<string, unknown>);
          setLog((prev) => {
            // Dedupe: if optimistic insert already added this, skip
            if (prev.some((m) => m.id === newRow.id)) return prev;
            return [...prev, newRow];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [missionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [log]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || sending || !canPost) return;
    setSending(true);

    const text = input.trim();
    setInput('');

    const optimistic: MissionChatEntry = {
      id: 'local-' + Date.now(),
      missionId,
      userId: session.userId,
      userName: session.userName,
      role: role as ChatRole,
      message: text,
      createdAt: new Date().toISOString(),
    };

    setLog((prev) => [...prev, optimistic]);

    const supabase = getBrowserSupabase();
    if (supabase) {
      const { error } = await supabase.from('mission_chat').insert({
        mission_id: missionId,
        user_id: session.userId,
        user_name: session.userName,
        role,
        message: text,
      });
      if (error) console.error('Chat insert failed:', error);
    }

    setSending(false);
  }, [input, sending, canPost, missionId, session, role]);

  return (
    <DashboardPanel title="Communications Log" statusColor="green">
      <div className="flex flex-col h-full">
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1.5 mb-3 max-h-44 pr-1">
          {log.map((entry) => {
            const time = new Date(entry.createdAt).toLocaleTimeString('en-US', {
              hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
            });
            const badge = roleBadge(entry.role);
            return (
              <div key={entry.id} className="text-[10px] font-mono leading-snug">
                <span className="text-slate-500">{time}</span>
                <span className={`ml-1.5 px-1 py-0 rounded border text-[8px] font-bold ${badge.color}`}>
                  {badge.label}
                </span>
                <span className="text-slate-400 ml-1.5">{entry.userName}:</span>
                <span className={`ml-1 ${entry.role === 'system' ? 'text-slate-500 italic' : 'text-slate-300'}`}>
                  {entry.message}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={canPost ? 'Type message...' : 'Observer mode — read only'}
            disabled={!canPost || sending}
            className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={!canPost || sending || !input.trim()}
            className="px-3 py-1.5 bg-red-600 text-white text-xs font-mono rounded hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </DashboardPanel>
  );
}
