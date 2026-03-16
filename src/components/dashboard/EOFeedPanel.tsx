'use client';

import { useState } from 'react';
import DashboardPanel from './DashboardPanel';

export default function EOFeedPanel() {
  const [angle, setAngle] = useState('nadir');

  const angleLabels: Record<string, string> = {
    nadir: 'NADIR (DOWN)',
    forward: 'FORWARD',
    rear: 'REAR',
  };

  return (
    <DashboardPanel
      title="CAM-1 · EO/RGB"
      statusColor="red"
      headerRight={
        <span className="flex items-center gap-1.5 font-mono text-xs text-red-400">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          LIVE
        </span>
      }
    >
      <div className="space-y-3">
        {/* Camera angle selector */}
        <select
          value={angle}
          onChange={(e) => setAngle(e.target.value)}
          className="bg-slate-700 border border-slate-600 text-slate-300 text-xs font-mono rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"
        >
          <option value="nadir">Nadir (Down)</option>
          <option value="forward">Forward</option>
          <option value="rear">Rear</option>
        </select>

        {/* Simulated feed */}
        <div className="relative rounded-lg overflow-hidden border border-slate-600">
          <div className="bg-slate-700 px-3 py-1 flex items-center gap-2 font-mono text-[10px] text-slate-400">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            <span>REC</span>
            <span>|</span>
            <span>EO/RGB</span>
            <span>|</span>
            <span>4K</span>
          </div>
          <div
            className="relative h-44"
            style={{
              background: 'radial-gradient(ellipse at center, #475569 0%, #1e293b 100%)',
            }}
          >
            {/* Tree lines */}
            <div className="absolute bottom-8 left-0 right-0 h-3 bg-slate-700/60" />
            <div className="absolute bottom-14 left-0 right-0 h-2 bg-slate-700/40" />
            {/* Smoke */}
            <div
              className="absolute top-4 right-[15%] w-24 h-32 rotate-[-25deg] opacity-30"
              style={{
                background: 'linear-gradient(135deg, transparent 30%, #e2e8f0 50%, transparent 70%)',
              }}
            />
            {/* Angle label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] text-slate-500 tracking-widest">
                {angleLabels[angle]}
              </span>
            </div>
          </div>
          <div className="bg-slate-700 px-3 py-1 font-mono text-[10px] text-slate-400 flex justify-between">
            <span>ALT: 1,200ft</span>
            <span>68kts</span>
            <span>220°</span>
          </div>
        </div>

        <button className="w-full text-center text-xs font-mono text-slate-400 hover:text-white border border-slate-600 rounded px-3 py-1.5 hover:bg-slate-700 transition-colors">
          FULL SCREEN
        </button>
      </div>
    </DashboardPanel>
  );
}
