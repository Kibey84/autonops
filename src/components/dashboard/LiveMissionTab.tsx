'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Camera, Flame, Eye, AlertTriangle, Target } from 'lucide-react';
import type { AuthSession } from '@/lib/data/types';

const LiveMapEmbed = dynamic(() => import('@/components/LiveMapEmbed'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-900 animate-pulse rounded-lg" />,
});

// ─── COUNTDOWN TIMER ────────────────────────────────────────

function CountdownTimer() {
  const [seconds, setSeconds] = useState(6320); // 1:45:20

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const display = `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const isLow = seconds < 600;

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3 text-center">
      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1">Time on Station</div>
      <div className={`font-mono text-2xl font-bold tabular-nums ${isLow ? 'text-red-500 animate-pulse' : 'text-red-600'}`}>
        {display}
      </div>
    </div>
  );
}

// ─── CAMERA FEED ────────────────────────────────────────────

type FeedMode = 'eo' | 'ir' | 'rg';

function CameraFeed() {
  const [mode, setMode] = useState<FeedMode>('eo');

  const modes: { key: FeedMode; label: string }[] = [
    { key: 'eo', label: 'EO' },
    { key: 'ir', label: 'IR' },
    { key: 'rg', label: 'RG' },
  ];

  const feedContent: Record<FeedMode, { icon: typeof Camera; label: string; color: string }> = {
    eo: { icon: Camera, label: 'Electro-Optical Feed', color: 'text-slate-400' },
    ir: { icon: Flame, label: 'Thermal IR Feed', color: 'text-orange-400' },
    rg: { icon: Eye, label: 'Range Feed', color: 'text-blue-400' },
  };

  const current = feedContent[mode];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Camera Feed</span>
        <div className="flex gap-1">
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold transition-colors ${
                mode === m.key ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative w-full h-0 pb-[56.25%] bg-slate-900 rounded-lg overflow-hidden border border-slate-700/50">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <current.icon className={`w-10 h-10 ${current.color}`} />
          <span className={`font-mono text-sm ${current.color}`}>{current.label}</span>
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)', backgroundSize: '100% 3px' }} />
      </div>
    </div>
  );
}

// ─── TIME TO TARGET ─────────────────────────────────────────

function TimeToTarget() {
  const [seconds, setSeconds] = useState(167); // 2:47

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const display = seconds <= 0 ? 'ON TARGET' : `${m}:${String(s).padStart(2, '0')}`;
  const color = seconds <= 0 ? 'text-red-500 animate-pulse' : seconds <= 30 ? 'text-amber-400' : 'text-green-400';

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3 text-center">
      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
        <Target className="w-3 h-3" /> Time to Target
      </div>
      <div className={`font-mono text-2xl font-bold tabular-nums ${color}`}>
        {display}
      </div>
    </div>
  );
}

// ─── WAYPOINT TRACKER ───────────────────────────────────────

function WaypointTracker() {
  const waypoints = [
    { wp: 1, name: 'Launch', alt: '0ft', status: 'complete' as const },
    { wp: 2, name: 'Climb', alt: '800ft', status: 'complete' as const },
    { wp: 3, name: 'Transit', alt: '1,200ft', status: 'active' as const },
    { wp: 4, name: 'Survey-N', alt: '1,000ft', status: 'planned' as const },
    { wp: 5, name: 'Survey-E', alt: '1,000ft', status: 'planned' as const },
    { wp: 6, name: 'Survey-S', alt: '800ft', status: 'planned' as const },
    { wp: 7, name: 'Loiter', alt: '1,000ft', status: 'planned' as const },
    { wp: 8, name: 'RTB', alt: '1,200ft', status: 'planned' as const },
    { wp: 9, name: 'Land', alt: '0ft', status: 'planned' as const },
  ];

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3">
      <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2">Waypoints</div>
      <div className="space-y-1">
        {waypoints.map((wp) => (
          <div
            key={wp.wp}
            className={`flex items-center gap-2 px-2 py-1 rounded text-[10px] font-mono ${
              wp.status === 'active'
                ? 'bg-red-500/10 border-l-2 border-l-red-500'
                : wp.status === 'complete'
                  ? 'opacity-50'
                  : ''
            }`}
          >
            <span className="w-4 text-center">
              {wp.status === 'complete' && <span className="text-green-400">✓</span>}
              {wp.status === 'active' && <span className="text-red-400 animate-pulse">●</span>}
              {wp.status === 'planned' && <span className="text-slate-600">○</span>}
            </span>
            <span className={`flex-1 ${wp.status === 'active' ? 'text-white' : 'text-slate-400'}`}>
              {wp.name}
            </span>
            <span className="text-slate-500">{wp.alt}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[9px] font-mono">
        <span className="text-slate-500">WP 3 of 9</span>
        <span className="text-amber-400">Next: Survey-N · 1.2nm</span>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────

export default function LiveMissionTab({ session }: { session: AuthSession }) {
  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Left panel */}
      <div className="w-[300px] flex-shrink-0 flex flex-col gap-3">
        {/* Mission Info */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-[10px] text-red-600 uppercase tracking-[0.2em] font-bold">Active Mission</span>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Aircraft', value: 'Blackfly' },
              { label: 'Pilot', value: 'Jaderic D.' },
              { label: 'Mission ID', value: 'MSN 2025-001' },
              { label: 'Location', value: 'Rio Verde, AZ' },
              { label: 'FAA Control', value: 'TBD' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400">{row.label}</span>
                <span className="font-mono text-[11px] text-white">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timers */}
        <div className="grid grid-cols-2 gap-2">
          <CountdownTimer />
          <TimeToTarget />
        </div>

        {/* Waypoints */}
        <WaypointTracker />

        {/* Camera Feed */}
        <CameraFeed />

        {/* Alerts */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
          <div className="font-mono text-[10px] text-red-600 uppercase tracking-[0.2em] font-bold mb-2">Alerts</div>
          <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
            <div className="flex items-start gap-2 px-3 py-2.5 border-l-2 border-l-red-500">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-slate-500">14:32:07</span>
                <span className="font-mono text-[10px] text-slate-300 ml-2">
                  Aircraft entering restricted airspace buffer zone
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 rounded-xl overflow-hidden border border-slate-700">
        <LiveMapEmbed />
      </div>
    </div>
  );
}
