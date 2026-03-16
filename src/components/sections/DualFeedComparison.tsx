'use client';

import ScrollAnimation from '@/components/ScrollAnimation';

export default function DualFeedComparison() {
  return (
    <div className="py-16">
      <ScrollAnimation animation="fade-in">
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Dual Camera Feeds
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Two simultaneous perspectives streaming in real time to Mission Control and firefighters in the field.
          </p>
        </div>
      </ScrollAnimation>

      <ScrollAnimation animation="fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* EO / RGB Feed */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="bg-slate-200 dark:bg-slate-700 px-4 py-2 flex items-center gap-3 font-mono text-xs text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>REC</span>
              <span className="text-slate-400 dark:text-slate-500">|</span>
              <span>CAM-1</span>
              <span className="text-slate-400 dark:text-slate-500">|</span>
              <span>EO/RGB</span>
              <span className="text-slate-400 dark:text-slate-500">|</span>
              <span>4K</span>
            </div>
            <div className="relative h-64 sm:h-72 overflow-hidden" style={{
              background: 'radial-gradient(ellipse at center, #475569 0%, #1e293b 100%)'
            }}>
              {/* Simulated tree lines */}
              <div className="absolute bottom-12 left-0 right-0 h-4 bg-slate-700/60" />
              <div className="absolute bottom-20 left-0 right-0 h-3 bg-slate-700/40" />
              <div className="absolute bottom-28 left-[10%] right-[20%] h-2 bg-slate-700/30" />
              {/* Smoke plume */}
              <div className="absolute top-8 right-[20%] w-32 h-40 rotate-[-25deg] opacity-40"
                style={{ background: 'linear-gradient(135deg, transparent 30%, #e2e8f0 50%, transparent 70%)' }} />
              {/* Road */}
              <div className="absolute bottom-16 left-[5%] w-[60%] h-0.5 bg-slate-400/30 rotate-[-8deg]" />
              {/* Center label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xs text-slate-400/60 tracking-widest">EO/RGB FEED</span>
              </div>
            </div>
            <div className="bg-slate-200 dark:bg-slate-700 px-4 py-2 font-mono text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
              <span>ALT: 1,200ft</span>
              <span>SPEED: 68kts</span>
              <span>BEARING: 220°</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">Standard RGB camera.</span>{' '}
                Shows terrain, smoke plumes, tree lines, roads, and obstacles. Essential for navigating to the fire and understanding the physical environment.
              </p>
            </div>
          </div>

          {/* Thermal / IR Feed */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-3 font-mono text-xs text-slate-300">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>REC</span>
              <span className="text-slate-500">|</span>
              <span>CAM-2</span>
              <span className="text-slate-500">|</span>
              <span>THERMAL/IR</span>
              <span className="text-slate-500">|</span>
              <span>FLIR</span>
            </div>
            <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
              {/* Thermal hotspots */}
              <div className="absolute top-[20%] left-[25%] w-28 h-28 rounded-full opacity-70"
                style={{ background: 'radial-gradient(circle, #ea580c 0%, #dc2626 40%, transparent 70%)' }} />
              <div className="absolute top-[40%] right-[20%] w-20 h-20 rounded-full opacity-60"
                style={{ background: 'radial-gradient(circle, #f59e0b 0%, #ea580c 40%, transparent 70%)' }} />
              <div className="absolute bottom-[25%] left-[45%] w-16 h-16 rounded-full opacity-50"
                style={{ background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 40%, transparent 70%)' }} />
              {/* Fire line */}
              <div className="absolute top-[35%] left-[15%] w-[55%] h-1 rotate-[-15deg] opacity-60"
                style={{ background: 'linear-gradient(90deg, #dc2626, #ea580c, #f59e0b, transparent)' }} />

              {/* Hotspot badges */}
              <div className="absolute top-[15%] left-[18%] bg-orange-500/90 text-white text-xs font-mono px-2 py-1 rounded">
                Hotspot A — 847°F
              </div>
              <div className="absolute top-[35%] right-[15%] bg-amber-500/90 text-white text-xs font-mono px-2 py-1 rounded">
                Hotspot B — 612°F
              </div>
              <div className="absolute bottom-[20%] left-[40%] bg-red-600/90 text-white text-xs font-mono px-2 py-1 rounded animate-pulse">
                ⚠ Heat Sig — Person?
              </div>
            </div>
            <div className="bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300 flex items-center justify-between">
              <span>TEMP RANGE: 200°F–900°F</span>
              <span>SENSITIVITY: 0.05°C</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-white">Infrared thermal camera.</span>{' '}
                Penetrates smoke to reveal exact fire line locations and hotspots. Also detects heat signatures from people and animals invisible to standard cameras.
              </p>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation animation="fade-in">
        <p className="text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
          Autonops UAVs transmit both feeds simultaneously to Mission Control and directly to firefighters&apos; devices in the field.
        </p>
      </ScrollAnimation>
    </div>
  );
}
