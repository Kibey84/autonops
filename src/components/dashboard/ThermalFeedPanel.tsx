'use client';

import DashboardPanel from './DashboardPanel';

export default function ThermalFeedPanel() {
  return (
    <DashboardPanel
      title="CAM-2 · THERMAL/IR"
      statusColor="red"
      headerRight={
        <span className="flex items-center gap-1.5 font-mono text-xs text-red-400">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          LIVE
        </span>
      }
    >
      <div className="space-y-3">
        {/* Simulated thermal feed */}
        <div className="relative rounded-lg overflow-hidden border border-slate-600">
          <div className="bg-slate-800 px-3 py-1 flex items-center gap-2 font-mono text-[10px] text-slate-400">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            <span>REC</span>
            <span>|</span>
            <span>THERMAL/IR</span>
            <span>|</span>
            <span>FLIR</span>
          </div>
          <div className="relative h-44 bg-slate-950">
            {/* Thermal hotspots */}
            <div
              className="absolute top-[18%] left-[20%] w-20 h-20 rounded-full opacity-70"
              style={{
                background: 'radial-gradient(circle, #ea580c 0%, #dc2626 40%, transparent 70%)',
              }}
            />
            <div
              className="absolute top-[35%] right-[15%] w-14 h-14 rounded-full opacity-60"
              style={{
                background: 'radial-gradient(circle, #f59e0b 0%, #ea580c 40%, transparent 70%)',
              }}
            />
            <div
              className="absolute bottom-[25%] left-[40%] w-10 h-10 rounded-full opacity-50"
              style={{
                background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 40%, transparent 70%)',
              }}
            />
            {/* Fire line */}
            <div
              className="absolute top-[32%] left-[10%] w-[50%] h-0.5 rotate-[-12deg] opacity-60"
              style={{
                background: 'linear-gradient(90deg, #dc2626, #ea580c, #f59e0b, transparent)',
              }}
            />

            {/* Badges */}
            <div className="absolute top-[12%] left-[14%] bg-orange-500/90 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
              Hotspot A — 847°F
            </div>
            <div className="absolute top-[30%] right-[10%] bg-amber-500/90 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
              Hotspot B — 612°F
            </div>
            <div className="absolute bottom-[16%] left-[35%] bg-red-600/90 text-white text-[9px] font-mono px-1.5 py-0.5 rounded animate-pulse">
              ⚠ Heat Sig?
            </div>
          </div>
          <div className="bg-slate-800 px-3 py-1 font-mono text-[10px] text-slate-400 flex justify-between">
            <span>TEMP: 200°F–900°F</span>
            <span>0.05°C</span>
          </div>
        </div>

        <button className="w-full text-center text-xs font-mono text-slate-400 hover:text-white border border-slate-600 rounded px-3 py-1.5 hover:bg-slate-700 transition-colors">
          FULL SCREEN
        </button>
      </div>
    </DashboardPanel>
  );
}
