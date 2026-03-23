'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  Plane, AlertTriangle, Wind, Thermometer, Cloud, Radio,
  Cpu, ChevronUp, Minimize2, ShieldAlert, X, CheckCircle2,
} from 'lucide-react';

const MissionControlMapClient = dynamic(
  () => import('./MissionControlMapClient'),
  { ssr: false, loading: () => <div className="h-full w-full bg-slate-800 animate-pulse rounded-lg" /> }
);

const WeatherMapClient = dynamic(
  () => import('./WeatherMapClient'),
  { ssr: false, loading: () => <div className="h-full w-full bg-slate-800 animate-pulse rounded-lg" /> }
);

// ─── HELPERS ────────────────────────────────────────────────

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  useEffect(() => { savedCallback.current = callback; }, [callback]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

function fmtTime(seconds: number): string {
  const m = Math.floor(Math.abs(seconds) / 60);
  const s = Math.abs(seconds) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ─── TOP BAR ────────────────────────────────────────────────

function TopBar({ onExit }: { onExit: () => void }) {
  const [utc, setUtc] = useState('');
  const [elapsed, setElapsed] = useState(0);

  useInterval(() => {
    const now = new Date();
    setUtc(now.toISOString().slice(11, 19) + ' UTC');
    setElapsed((p) => p + 1);
  }, 1000);

  const fmtElapsed = `T+${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;

  return (
    <div className="flex items-center justify-between px-4 h-full">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="AutonOps" width={100} height={28} className="h-6 w-auto" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-400 font-bold">Mission Control</span>
      </div>
      <div className="font-mono text-[11px] text-slate-400 hidden md:block">
        OHIO DEMO — Springfield, OH
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[11px] text-slate-300 tabular-nums">{utc}</span>
        <span className="font-mono text-[11px] text-amber-400 tabular-nums">{fmtElapsed}</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono text-[10px] text-green-400 font-bold">LIVE</span>
        </span>
        <button
          onClick={onExit}
          className="flex items-center gap-1 px-2 py-1 text-[9px] font-mono text-slate-500 hover:text-white border border-slate-700 rounded hover:bg-slate-800 transition-colors"
        >
          <Minimize2 className="w-3 h-3" /> Exit
        </button>
      </div>
    </div>
  );
}

// ─── AIRCRAFT STATUS ────────────────────────────────────────

function AircraftStatus() {
  const [alt, setAlt] = useState(1200);
  const [speed, setSpeed] = useState(68);
  const [heading, setHeading] = useState(315);

  useInterval(() => {
    setAlt((p) => p + Math.round((Math.random() - 0.48) * 8));
    setSpeed((p) => Math.max(45, Math.min(82, p + Math.round((Math.random() - 0.5) * 3))));
    setHeading((p) => (p + (Math.random() - 0.5) * 2 + 360) % 360);
  }, 1000);

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-green-400" />
          <span className="font-mono text-xs text-white font-bold">Demo-1</span>
        </div>
        <span className="font-mono text-[9px] px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded">IN FLIGHT</span>
      </div>
      <div className="space-y-1 text-[10px] font-mono">
        <div className="flex justify-between"><span className="text-slate-500">PIC</span><span className="text-slate-200">Capt. J. Kibe</span></div>
        <div className="flex justify-between"><span className="text-slate-500">CTRL</span><span className="text-slate-200">M. Sunday</span></div>
        <div className="h-px bg-slate-700/50 my-1.5" />
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-800 rounded p-1.5">
            <div className="text-[8px] text-slate-500">ALT</div>
            <div className="text-sm text-green-400 font-bold tabular-nums">{alt.toLocaleString()}</div>
            <div className="text-[7px] text-slate-600">ft AGL</div>
          </div>
          <div className="bg-slate-800 rounded p-1.5">
            <div className="text-[8px] text-slate-500">SPD</div>
            <div className="text-sm text-slate-200 font-bold tabular-nums">{speed}</div>
            <div className="text-[7px] text-slate-600">kts</div>
          </div>
          <div className="bg-slate-800 rounded p-1.5">
            <div className="text-[8px] text-slate-500">HDG</div>
            <div className="text-sm text-slate-200 font-bold tabular-nums">{Math.round(heading)}°</div>
            <div className="text-[7px] text-slate-600">mag</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COUNTDOWN TIMERS ───────────────────────────────────────

function CountdownTimers() {
  const [ttt, setTtt] = useState(167); // 2:47
  const [sot, setSot] = useState(1110); // 18:30

  useInterval(() => {
    setTtt((p) => p - 1);
    setSot((p) => Math.max(0, p - 1));
  }, 1000);

  const tttColor = ttt <= 0 ? 'text-red-500' : ttt <= 30 ? 'text-amber-400' : 'text-green-400';
  const sotColor = sot <= 120 ? 'text-red-500' : sot <= 300 ? 'text-amber-400' : 'text-slate-200';

  return (
    <div className="space-y-2">
      <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3 text-center">
        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1">Time to Target</div>
        <div className={`font-mono text-3xl font-bold tabular-nums ${tttColor}`}>
          {ttt <= 0 ? 'ON TARGET' : fmtTime(ttt)}
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3 text-center">
        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1">Safe Operating Time</div>
        <div className={`font-mono text-3xl font-bold tabular-nums ${sotColor}`}>
          {fmtTime(sot)}
        </div>
        {sot <= 300 && sot > 0 && (
          <div className="text-[9px] font-mono text-amber-400 mt-1 animate-pulse">LOW FUEL WARNING</div>
        )}
      </div>
    </div>
  );
}

// ─── ASSET QUEUE ────────────────────────────────────────────

function AssetQueue() {
  const assets = [
    { id: 'Demo-1', status: 'ON MISSION', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { id: 'Demo-2', status: 'READY / STANDBY', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { id: 'Demo-3', status: 'PRE-FLIGHT', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3">
      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-2">Asset Queue</div>
      <div className="space-y-2">
        {assets.map((a) => (
          <div key={a.id} className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-300">{a.id}</span>
            <span className={`font-mono text-[8px] px-1.5 py-0.5 rounded border ${a.color}`}>{a.status}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 pt-2 border-t border-slate-700/50">
        <span className="font-mono text-[9px] text-amber-400/70">Demo-2 launches at T-5min</span>
      </div>
    </div>
  );
}

// ─── EO FEED WITH FULL HUD ──────────────────────────────────

function EOFeed() {
  const [alt, setAlt] = useState(1200);
  const [spd, setSpd] = useState(68);
  const [hdg, setHdg] = useState(315);
  const [vsi, setVsi] = useState(0);
  const [gLoad, setGLoad] = useState(1.0);
  const [frame, setFrame] = useState(0);

  useInterval(() => {
    setAlt((p) => p + Math.round((Math.random() - 0.48) * 6));
    setSpd((p) => Math.max(48, Math.min(78, p + Math.round((Math.random() - 0.5) * 2))));
    setHdg((p) => (p + (Math.random() - 0.5) * 1.5 + 360) % 360);
    setVsi(Math.round((Math.random() - 0.5) * 200));
    setGLoad(+(1.0 + (Math.random() - 0.5) * 0.15).toFixed(2));
    setFrame((p) => p + 1);
  }, 200);

  const pitchLines = [-10, -5, 0, 5, 10];

  return (
    <div className="h-full bg-black border border-slate-700/50 rounded-lg overflow-hidden flex flex-col">
      <div className="px-3 py-1 bg-slate-900/90 border-b border-slate-700/50 flex items-center justify-between">
        <span className="font-mono text-[8px] text-slate-500">CAM-1 · EO/RGB · 4K · NADIR</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[8px] text-slate-600 tabular-nums">F{String(frame).padStart(6, '0')}</span>
          <span className="flex items-center gap-1 font-mono text-[8px] text-red-500">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />REC
          </span>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 35% 35%, #4a5568 0%, #1a202c 70%, #0d1117 100%)' }}>
        {/* ── ANIMATED TERRAIN (panning to simulate flight) ── */}
        <div className="absolute inset-0" style={{ animation: 'panTerrain 25s linear infinite' }}>
          {/* Ground layers */}
          <div className="absolute bottom-[8%] left-[-20%] right-[-20%] h-6" style={{ background: 'linear-gradient(180deg, transparent, #2d3748 40%, #1a202c)' }} />
          <div className="absolute bottom-[14%] left-[-20%] right-[-20%] h-5" style={{ background: 'linear-gradient(180deg, transparent, #2d3748 50%, transparent)' }} />
          <div className="absolute bottom-[20%] left-[-15%] right-[-15%] h-4" style={{ background: 'linear-gradient(180deg, transparent, #374151 40%, transparent)' }} />
          {/* Tree lines */}
          <div className="absolute bottom-[25%] left-[-10%] right-[-5%] h-3" style={{ background: 'linear-gradient(180deg, transparent, #1e3a2f 60%, transparent)' }} />
          <div className="absolute bottom-[30%] left-[5%] right-[-10%] h-2" style={{ background: 'linear-gradient(180deg, transparent, #1e3a2f 50%, transparent)' }} />
          {/* Fields */}
          <div className="absolute bottom-[12%] left-[25%] w-[20%] h-[5%] bg-slate-600/12 rounded-sm" />
          <div className="absolute bottom-[18%] left-[60%] w-[12%] h-[4%] bg-slate-600/08 rounded-sm" />
          <div className="absolute bottom-[22%] left-[10%] w-[8%] h-[3%] bg-slate-700/10 rounded-sm" />
          {/* Roads */}
          <div className="absolute bottom-[15%] left-[-5%] w-[70%] h-px bg-slate-400/12 rotate-[-3deg]" />
          <div className="absolute bottom-[19%] left-[35%] w-[40%] h-px bg-slate-400/08 rotate-[12deg]" />
          {/* Structures passing underneath */}
          <div className="absolute bottom-[21%] left-[38%] w-2.5 h-2 bg-slate-500/18 shadow-sm shadow-black/20" />
          <div className="absolute bottom-[20%] left-[40%] w-2 h-1.5 bg-slate-500/14" />
          <div className="absolute bottom-[24%] left-[58%] w-3 h-2 bg-slate-500/18" />
          <div className="absolute bottom-[16%] left-[72%] w-2 h-1.5 bg-slate-500/12" />
        </div>
        {/* Smoke plume (drifts separately) */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none" style={{ animation: 'driftSmoke 18s ease-in-out infinite' }}>
          <div className="absolute top-[3%] right-[8%] w-40 h-52 rotate-[-15deg] opacity-22"
            style={{ background: 'radial-gradient(ellipse at 50% 80%, #94a3b8 0%, transparent 60%)' }} />
          <div className="absolute top-[12%] right-[15%] w-24 h-32 rotate-[-22deg] opacity-14"
            style={{ background: 'radial-gradient(ellipse at 50% 70%, #cbd5e1 0%, transparent 55%)' }} />
          <div className="absolute top-[8%] right-[5%] w-16 h-20 rotate-[-10deg] opacity-10"
            style={{ background: 'radial-gradient(ellipse at 50% 60%, #e2e8f0 0%, transparent 60%)' }} />
        </div>
        {/* Ember glow (pulses) */}
        <div className="absolute bottom-[26%] right-[20%] w-10 h-8 rounded-full"
          style={{ background: 'radial-gradient(circle, #dc2626 0%, #991b1b 30%, transparent 65%)', animation: 'pulseEmber 3s ease-in-out infinite' }} />

        {/* === HUD OVERLAY === */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Scanlines */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #22c55e 1px, #22c55e 2px)', backgroundSize: '100% 2px' }} />

          {/* ── Compass ribbon (top center) ── */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[50%]">
            <div className="relative h-4 bg-black/30 border border-green-500/20 rounded overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[9px] text-green-400 font-bold tabular-nums">{Math.round(hdg)}°</span>
              </div>
              {/* Tick marks */}
              <div className="absolute top-0 left-[20%] w-px h-1.5 bg-green-500/30" />
              <div className="absolute top-0 left-[40%] w-px h-1.5 bg-green-500/30" />
              <div className="absolute top-0 left-[60%] w-px h-1.5 bg-green-500/30" />
              <div className="absolute top-0 left-[80%] w-px h-1.5 bg-green-500/30" />
              {/* Center caret */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-green-400" />
            </div>
          </div>

          {/* ── Speed tape (left) ── */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <div className="w-10 bg-black/30 border border-green-500/20 rounded py-1 text-center">
              <div className="text-[7px] text-green-500/50 font-mono">{spd + 10}</div>
              <div className="text-[7px] text-green-500/50 font-mono">{spd + 5}</div>
              <div className="h-px bg-green-500/30 my-0.5" />
              <div className="text-[10px] text-green-400 font-mono font-bold tabular-nums">{spd}</div>
              <div className="h-px bg-green-500/30 my-0.5" />
              <div className="text-[7px] text-green-500/50 font-mono">{spd - 5}</div>
              <div className="text-[7px] text-green-500/50 font-mono">{spd - 10}</div>
            </div>
            <div className="text-[6px] text-green-500/40 font-mono text-center mt-0.5">KTS</div>
          </div>

          {/* ── Altitude tape (right) ── */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-12 bg-black/30 border border-green-500/20 rounded py-1 text-center">
              <div className="text-[7px] text-green-500/50 font-mono">{alt + 100}</div>
              <div className="text-[7px] text-green-500/50 font-mono">{alt + 50}</div>
              <div className="h-px bg-green-500/30 my-0.5" />
              <div className="text-[10px] text-green-400 font-mono font-bold tabular-nums">{alt}</div>
              <div className="h-px bg-green-500/30 my-0.5" />
              <div className="text-[7px] text-green-500/50 font-mono">{alt - 50}</div>
              <div className="text-[7px] text-green-500/50 font-mono">{alt - 100}</div>
            </div>
            <div className="text-[6px] text-green-500/40 font-mono text-center mt-0.5">FT AGL</div>
          </div>

          {/* ── Pitch ladder (center) ── */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[30%]">
              {pitchLines.map((deg) => (
                <div key={deg} className="flex items-center justify-center mb-2.5" style={{ opacity: deg === 0 ? 0.5 : 0.25 }}>
                  <div className={`h-px ${deg === 0 ? 'w-full bg-green-500' : 'w-[60%] bg-green-500'}`} style={{ borderTop: deg !== 0 ? '1px dashed rgba(34,197,94,0.4)' : undefined }} />
                  {deg !== 0 && <span className="absolute right-0 text-[6px] font-mono text-green-500/40">{deg}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* ── Flight path vector (center cross) ── */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border border-green-400/50 rounded-full" />
            <div className="absolute top-1/2 -left-3 w-3 h-px bg-green-400/50" />
            <div className="absolute top-1/2 -right-3 w-3 h-px bg-green-400/50" />
            <div className="absolute -top-3 left-1/2 w-px h-3 bg-green-400/50 -translate-x-1/2" />
          </div>

          {/* ── VSI indicator (right of alt tape) ── */}
          <div className="absolute right-[18px] top-1/2 translate-y-4">
            <div className="text-[6px] font-mono text-green-500/50">VS {vsi > 0 ? '+' : ''}{vsi}</div>
          </div>

          {/* ── Bottom HUD data ── */}
          <div className="absolute bottom-2 left-3 font-mono text-[7px] text-green-400/60 leading-tight">
            <div>39.9340°N 83.8230°W</div>
            <div>WP3 TRANSIT · 1.2nm to WP4</div>
            <div>G: {gLoad.toFixed(1)} · BAT: 74%</div>
          </div>
          <div className="absolute bottom-2 right-3 font-mono text-[7px] text-green-400/60 text-right leading-tight">
            <div>TGT BRG: 315° · 2.1nm</div>
            <div>WIND: 270/12G18</div>
            <div>STARLINK: 34ms</div>
          </div>

          {/* ── Top corners ── */}
          <div className="absolute top-9 left-3 font-mono text-[7px] text-green-400/50">
            DEMO-1 · EO/RGB
          </div>
          <div className="absolute top-9 right-3 font-mono text-[7px] text-green-400/50 text-right">
            NADIR · 4K
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── IR FEED WITH REALISTIC THERMAL ─────────────────────────

function IRFeed() {
  const [frame, setFrame] = useState(0);

  useInterval(() => {
    setFrame((p) => p + 1);
  }, 200);

  // Slight hotspot shimmer
  const shimmer1 = 0.65 + Math.sin(frame * 0.15) * 0.08;
  const shimmer2 = 0.55 + Math.sin(frame * 0.12 + 1) * 0.06;
  const shimmer3 = 0.42 + Math.sin(frame * 0.18 + 2) * 0.05;

  return (
    <div className="h-full bg-black border border-slate-700/50 rounded-lg overflow-hidden flex flex-col">
      <div className="px-3 py-1 bg-slate-900/90 border-b border-slate-700/50 flex items-center justify-between">
        <span className="font-mono text-[8px] text-slate-500">CAM-2 · THERMAL/IR · FLIR · WHITE-HOT</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[8px] text-slate-600 tabular-nums">F{String(frame).padStart(6, '0')}</span>
          <span className="flex items-center gap-1 font-mono text-[8px] text-red-500">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />REC
          </span>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 50%, #141414 100%)' }}>
        {/* ── ANIMATED THERMAL TERRAIN (slow drift) ── */}
        <div className="absolute inset-0" style={{ animation: 'panThermal 30s linear infinite' }}>
          {/* Ambient thermal noise pattern */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ background: 'radial-gradient(ellipse at 30% 60%, #1a1a1a, transparent 50%), radial-gradient(ellipse at 70% 30%, #1a1a1a, transparent 40%)' }} />
          {/* Cool terrain base */}
          <div className="absolute bottom-[8%] left-[-10%] right-[-10%] h-[22%] opacity-[0.07]"
            style={{ background: 'linear-gradient(180deg, transparent, #4a2810)' }} />
          {/* Roads (warm from sun absorption) */}
          <div className="absolute bottom-[15%] left-[-5%] w-[65%] h-0.5 bg-amber-900/08 rotate-[-3deg]" />
          <div className="absolute bottom-[19%] left-[30%] w-[35%] h-0.5 bg-amber-900/06 rotate-[10deg]" />
          {/* Warm structures */}
          <div className="absolute bottom-[21%] left-[38%] w-3 h-2 rounded-sm opacity-20"
            style={{ background: 'radial-gradient(ellipse, #92400e, transparent)' }} />
          <div className="absolute bottom-[17%] left-[65%] w-2.5 h-1.5 rounded-sm opacity-15"
            style={{ background: 'radial-gradient(ellipse, #78350f, transparent)' }} />
        </div>

        {/* === FIRE / HOTSPOT RENDERING === */}
        {/* Primary fire — large irregular hotspot */}
        <div className="absolute top-[16%] left-[18%] w-28 h-24 rounded-[40%] rotate-[-15deg]" style={{ opacity: shimmer1, background: 'radial-gradient(ellipse at 45% 55%, #fff 0%, #fbbf24 15%, #ea580c 35%, #991b1b 55%, #3b0a0a 75%, transparent 90%)' }} />
        {/* Secondary hotspot */}
        <div className="absolute top-[35%] right-[15%] w-18 h-16 rounded-[45%] rotate-[10deg]" style={{ opacity: shimmer2, background: 'radial-gradient(ellipse at 50% 50%, #fef3c7 0%, #f59e0b 20%, #dc2626 45%, #7f1d1d 65%, transparent 85%)' }} />
        {/* Smoldering area */}
        <div className="absolute bottom-[22%] left-[40%] w-14 h-12 rounded-[50%]" style={{ opacity: shimmer3, background: 'radial-gradient(ellipse, #fbbf24 0%, #b45309 30%, #451a03 55%, transparent 80%)' }} />

        {/* Fire line (connected thermal signature) */}
        <div className="absolute top-[30%] left-[14%] w-[50%] h-1 rotate-[-8deg]"
          style={{ background: 'linear-gradient(90deg, #fbbf24 0%, #ea580c 20%, #dc2626 40%, #b91c1c 60%, #7f1d1d 80%, transparent 100%)', filter: 'blur(1px)' }} />

        {/* Heat signature — person/animal */}
        <div className="absolute bottom-[30%] left-[62%] w-2 h-3 rounded-full"
          style={{ background: 'radial-gradient(circle, #fff 0%, #fbbf24 40%, transparent 80%)', opacity: 0.7 }} />

        {/* === TRACKING BOXES === */}
        {/* Fire A tracking box */}
        <div className="absolute top-[12%] left-[14%] w-36 h-30 border border-red-500/50 rounded-sm">
          <div className="absolute -top-3.5 left-0 font-mono text-[7px] text-red-400 bg-black/60 px-1 rounded">
            TRK-01 · FIRE-A · 847°F
          </div>
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500/70" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500/70" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500/70" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500/70" />
        </div>
        {/* Fire B tracking box */}
        <div className="absolute top-[31%] right-[11%] w-24 h-22 border border-amber-500/50 rounded-sm">
          <div className="absolute -top-3.5 left-0 font-mono text-[7px] text-amber-400 bg-black/60 px-1 rounded">
            TRK-02 · FIRE-B · 612°F
          </div>
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-500/70" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-500/70" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-500/70" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-500/70" />
        </div>
        {/* Heat sig tracking box */}
        <div className="absolute bottom-[26%] left-[59%] w-10 h-10 border border-red-400/60 rounded-sm animate-pulse">
          <div className="absolute -top-3.5 left-0 font-mono text-[6px] text-red-400 bg-black/60 px-1 rounded whitespace-nowrap">
            ⚠ HEAT-SIG · 98.6°F
          </div>
        </div>

        {/* === ISOTHERM LINE === */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M15,38 Q25,28 35,32 Q45,36 55,30 Q60,28 65,35" fill="none" stroke="#dc2626" strokeWidth="0.3" strokeDasharray="2,2" opacity="0.4" />
          <text x="67" y="34" fill="#dc2626" fontSize="2.5" fontFamily="monospace" opacity="0.5">500°F</text>
        </svg>

        {/* === TEMP COLOR BAR (right edge) === */}
        <div className="absolute right-1.5 top-[10%] bottom-[10%] w-2.5 rounded-full overflow-hidden border border-slate-700/30">
          <div className="h-full w-full" style={{ background: 'linear-gradient(to bottom, #fff 0%, #fbbf24 20%, #ea580c 40%, #dc2626 55%, #7f1d1d 70%, #1a1a1a 100%)' }} />
        </div>
        <div className="absolute right-5 top-[9%] font-mono text-[6px] text-slate-500">900°F</div>
        <div className="absolute right-5 top-[30%] font-mono text-[6px] text-slate-600">600°F</div>
        <div className="absolute right-5 top-[55%] font-mono text-[6px] text-slate-600">300°F</div>
        <div className="absolute right-5 bottom-[9%] font-mono text-[6px] text-slate-500">AMB</div>

        {/* === SCANLINES === */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #22c55e 1px, #22c55e 2px)', backgroundSize: '100% 2px' }} />

        {/* === HUD TEXT === */}
        <div className="absolute top-2 left-2 font-mono text-[7px] text-cyan-400/50 leading-tight">
          <div>DEMO-1 · THERMAL/IR</div>
          <div>FLIR · WHITE-HOT</div>
          <div>39.9340°N 83.8230°W</div>
        </div>
        <div className="absolute bottom-2 left-2 font-mono text-[7px] text-cyan-400/50 leading-tight">
          <div>HOTSPOTS: 3 tracked</div>
          <div>HEAT SIGS: 1 unresolved</div>
          <div>MAX: 847°F · AVG: 340°F</div>
        </div>
        <div className="absolute bottom-2 right-8 font-mono text-[7px] text-cyan-400/50 text-right leading-tight">
          <div>ISOTHERM: 500°F</div>
          <div>SENS: 0.05°C NETD</div>
          <div>RANGE: AMB–900°F</div>
        </div>

        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-5 h-5 border border-cyan-400/30 rounded-full" />
          <div className="absolute top-1/2 -left-2 w-2 h-px bg-cyan-400/30" />
          <div className="absolute top-1/2 -right-2 w-2 h-px bg-cyan-400/30" />
          <div className="absolute -top-2 left-1/2 w-px h-2 bg-cyan-400/30 -translate-x-1/2" />
        </div>
      </div>
    </div>
  );
}

// ─── PILOT ALERTS ───────────────────────────────────────────

function PilotAlerts() {
  const [alerts, setAlerts] = useState([
    { id: 1, time: 'T+00:12', text: 'Wind shear advisory — 15kt gust at 800ft AGL', level: 'warn' as const },
    { id: 2, time: 'T+00:34', text: 'Airspace buffer: 0.8nm to Class D boundary', level: 'caution' as const },
    { id: 3, time: 'T+00:51', text: 'FAA automated clearance approved — NOTAM clear', level: 'info' as const },
    { id: 4, time: 'T+01:18', text: 'Obstacle detected — cell tower 0.3nm NE, 450ft AGL', level: 'warn' as const },
    { id: 5, time: 'T+01:42', text: 'Weather update: visibility dropping to 4SM (smoke)', level: 'caution' as const },
  ]);
  const [counter, setCounter] = useState(6);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pool = [
    'Thermal anomaly detected — possible secondary ignition point',
    'Battery cell temp elevated — monitoring C3 at 42°C',
    'Wind shift: now 290° at 14kts — recalculating spread model',
    'Structure identified 0.4nm SW of fire front — single family',
    'AI recommends altitude increase to 1400ft for wider survey',
    'Smoke density increasing — EO visibility degraded to 40%',
    'NOTAM update: TFR extension through 2100Z',
    'GPS lock: 18 satellites — position accuracy 0.8m',
    'Comms relay stable — Starlink latency 28ms',
  ];

  useInterval(() => {
    const text = pool[Math.floor(Math.random() * pool.length)];
    const elapsed = 102 + counter * 30;
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    const time = `T+${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    const level = Math.random() > 0.6 ? 'warn' as const : Math.random() > 0.4 ? 'caution' as const : 'info' as const;
    setAlerts((p) => [...p, { id: counter, time, text, level }]);
    setCounter((p) => p + 1);
  }, 30000);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [alerts]);

  const colors = { warn: 'text-red-400', caution: 'text-amber-400', info: 'text-slate-300' };
  const icons = { warn: '⚠', caution: '△', info: '●' };

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3 flex flex-col" style={{ maxHeight: '220px' }}>
      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <AlertTriangle className="w-3 h-3 text-amber-400" /> Pilot Alerts
        <span className="ml-auto text-amber-400">{alerts.length}</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 pr-1">
        {alerts.map((a) => (
          <div key={a.id} className="text-[9px] font-mono flex gap-1.5">
            <span className="text-slate-600 whitespace-nowrap">{a.time}</span>
            <span className={colors[a.level]}>{icons[a.level]} {a.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── WEATHER PANEL (Open-Meteo API) ────────────────────────

function WeatherPanel() {
  const [weather, setWeather] = useState<{
    temp: number; wind: number; windDir: number; condition: string;
  } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=39.9242&longitude=-83.8088&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=knots'
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        const c = data.current;
        const codes: Record<number, string> = {
          0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
          45: 'Fog', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Drizzle',
          55: 'Heavy drizzle', 61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
          71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 80: 'Rain showers',
          95: 'Thunderstorm', 96: 'Thunderstorm w/ hail',
        };
        setWeather({
          temp: Math.round(c.temperature_2m),
          wind: Math.round(c.wind_speed_10m),
          windDir: Math.round(c.wind_direction_10m),
          condition: codes[c.weather_code] || 'Unknown',
        });
      } catch {
        setError(true);
      }
    }
    fetchWeather();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3">
      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Cloud className="w-3 h-3" /> Weather — Springfield, OH
      </div>
      {error ? (
        <div className="text-[10px] text-slate-500 font-mono">Weather data unavailable</div>
      ) : weather ? (
        <div className="space-y-1.5 text-[10px] font-mono">
          <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-1"><Thermometer className="w-3 h-3" />Temp</span><span className="text-slate-200">{weather.temp}°F</span></div>
          <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-1"><Wind className="w-3 h-3" />Wind</span><span className="text-slate-200">{weather.windDir}° at {weather.wind} kts</span></div>
          <div className="flex justify-between"><span className="text-slate-500 flex items-center gap-1"><Cloud className="w-3 h-3" />Cond</span><span className="text-slate-200">{weather.condition}</span></div>
        </div>
      ) : (
        <div className="text-[10px] text-slate-500 font-mono animate-pulse">Loading...</div>
      )}
    </div>
  );
}

// ─── AI MISSION PLAN ────────────────────────────────────────

function AIMissionPlan() {
  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Cpu className="w-3 h-3 text-cyan-400" /> AI Mission Plan
        </div>
        <span className="font-mono text-[8px] px-1.5 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded">AI GENERATED</span>
      </div>
      <div className="space-y-2 text-[9px] font-mono">
        <div>
          <div className="text-slate-500 mb-0.5">INCIDENT</div>
          <div className="text-slate-300">Structure fire reported at 1247 Oak Ridge Rd, Springfield OH. Smoke visible from multiple stations. Winds NW at 12kts.</div>
        </div>
        <div>
          <div className="text-slate-500 mb-0.5">PHASES</div>
          <div className="text-slate-300">1. Launch from staging → 2. Transit NW 2.8nm → 3. Perimeter survey (dual feed) → 4. Hotspot mapping → 5. Loiter for IC directives → 6. RTB</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div><span className="text-slate-500">Civilians</span><span className="text-amber-400 ml-1">3 structures in path</span></div>
          <div><span className="text-slate-500">Crew staging</span><span className="text-slate-300 ml-1">Station 4, N side</span></div>
        </div>
      </div>
    </div>
  );
}

// ─── COMMS LOG ──────────────────────────────────────────────

function CommsLog() {
  const [entries, setEntries] = useState([
    { time: '14:31:00', from: 'CTRL', text: 'Demo-1, clear for departure. Winds 270 at 12.' },
    { time: '14:31:22', from: 'PLT', text: 'Demo-1 rolling, departure runway 24.' },
    { time: '14:31:45', from: 'SYS', text: 'FAA automated clearance confirmed. Flight plan active.' },
    { time: '14:32:10', from: 'IC', text: 'Control, Springfield IC. Smoke intensifying NW. Need eyes ASAP.' },
    { time: '14:32:13', from: 'CTRL', text: 'Copy IC. ETE 3 minutes. Dual feed coming up.' },
    { time: '14:33:00', from: 'AI', text: 'Fire spread model initialized. NW at 8mph. 3 structures flagged.' },
    { time: '14:33:47', from: 'PLT', text: 'Demo-1 on station. Survey altitude 1200. Feeds active.' },
  ]);
  const [counter, setCounter] = useState(8);
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatterPool = [
    { from: 'PLT', text: 'Demo-1, slight turbulence at 1200. Manageable.' },
    { from: 'CTRL', text: 'Copy. Maintain altitude. IC wants another pass on the west flank.' },
    { from: 'AI', text: 'Hotspot A expanding. Recommend IC be advised.' },
    { from: 'IC', text: 'Control, can you pan the IR camera 30 degrees west?' },
    { from: 'CTRL', text: 'Adjusting. Stand by for updated feed.' },
    { from: 'PLT', text: 'Demo-1, battery at 68%. Estimated 35 minutes remaining.' },
    { from: 'SYS', text: 'Waypoint 4 reached. Beginning survey pass 2.' },
    { from: 'AI', text: 'Heat signature resolved: vehicle exhaust, not person. Downgrading.' },
    { from: 'IC', text: 'Good copy on the heat sig. Ground crew confirms no civilians in sector.' },
    { from: 'CTRL', text: 'Demo-2 preflight complete. Ready for launch on your call.' },
  ];

  useInterval(() => {
    const item = chatterPool[counter % chatterPool.length];
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    setEntries((p) => [...p, { time, ...item }]);
    setCounter((p) => p + 1);
  }, 20000);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [entries]);

  const fromColors: Record<string, string> = {
    PLT: 'text-green-400', CTRL: 'text-cyan-400', SYS: 'text-slate-500',
    IC: 'text-amber-400', AI: 'text-purple-400',
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-3 flex flex-col" style={{ maxHeight: '180px' }}>
      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Radio className="w-3 h-3" /> Comms Log
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-0.5 pr-1">
        {entries.map((e, i) => (
          <div key={i} className="text-[8px] font-mono leading-relaxed">
            <span className="text-slate-600">{e.time}</span>
            <span className="text-slate-700"> | </span>
            <span className={fromColors[e.from] || 'text-slate-400'}>{e.from}</span>
            <span className="text-slate-700"> | </span>
            <span className="text-slate-400">{e.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EMERGENCY CHECKLIST ────────────────────────────────────

function EmergencyChecklist({ onClose }: { onClose: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  const checklists = [
    {
      title: 'RETURN TO BASE (RTB)',
      color: 'text-blue-400 border-blue-500/30',
      items: [
        'Notify IC: "Demo-1 RTB initiated"',
        'Set waypoint: DIRECT TO staging',
        'Climb to transit altitude (1500ft)',
        'Verify Starlink link stable',
        'Monitor battery — confirm sufficient for RTB',
        'Cancel remaining survey waypoints',
        'Notify CTRL on approach',
        'Execute landing checklist',
      ],
    },
    {
      title: 'EMERGENCY LANDING',
      color: 'text-red-400 border-red-500/30',
      items: [
        'DECLARE EMERGENCY on guard 121.500',
        'Notify IC: "Demo-1 emergency landing"',
        'Identify nearest safe landing zone',
        'Reduce airspeed to Vmin (35kts)',
        'Begin controlled descent — 500ft/min max',
        'Activate emergency beacon',
        'If uncontrollable: initiate ballistic parachute',
        'Mark GPS coordinates of landing site',
        'Notify ground crew for recovery',
      ],
    },
    {
      title: 'LOST LINK PROCEDURE',
      color: 'text-amber-400 border-amber-500/30',
      items: [
        'Aircraft auto-enters HOLD at current position',
        'Verify Starlink antenna orientation',
        'Attempt reconnect on backup frequency',
        'If no link in 60s: aircraft auto-RTB',
        'If no link in 5min: aircraft auto-lands at nearest safe zone',
        'Notify IC: "Demo-1 lost link — auto-RTB in progress"',
        'Monitor guard frequency for aircraft beacon',
      ],
    },
  ];

  let itemIndex = 0;

  return (
    <div className="fixed inset-0 z-[200] flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/60" onClick={onClose} />
      {/* Panel */}
      <div className="w-[380px] bg-slate-900 border-l border-slate-700 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <span className="font-mono text-sm text-white font-bold uppercase">Emergency Procedures</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-4">
          {checklists.map((list) => (
            <div key={list.title} className={`border rounded-lg p-3 ${list.color}`}>
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider mb-2">{list.title}</h4>
              <div className="space-y-1.5">
                {list.items.map((item) => {
                  const idx = itemIndex++;
                  return (
                    <button
                      key={idx}
                      onClick={() => toggle(idx)}
                      className="w-full flex items-start gap-2 text-left group"
                    >
                      <div className={`w-4 h-4 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center ${
                        checked.has(idx) ? 'bg-green-600 border-green-500' : 'border-slate-600 group-hover:border-slate-400'
                      }`}>
                        {checked.has(idx) && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`font-mono text-[10px] ${
                        checked.has(idx) ? 'text-slate-500 line-through' : 'text-slate-300'
                      }`}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SCREEN ────────────────────────────────────────────

export default function MissionControlScreen({ pilotCallsign }: { pilotCallsign: string }) {
  const [showChecklist, setShowChecklist] = useState(false);

  const handleExit = useCallback(() => {
    document.exitFullscreen?.().catch(() => {});
    window.location.reload();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 text-slate-200 flex flex-col overflow-hidden">
      {/* CSS animations for video feeds */}
      <style>{`
        @keyframes panTerrain {
          0% { transform: translateX(0); }
          100% { transform: translateX(-15%); }
        }
        @keyframes driftSmoke {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-8px, 3px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes pulseEmber {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
        @keyframes panThermal {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-5%) translateY(-2%); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes thermalFlicker {
          0%, 100% { filter: brightness(1); }
          25% { filter: brightness(1.02); }
          50% { filter: brightness(0.98); }
          75% { filter: brightness(1.01); }
        }
      `}</style>

      {/* Emergency Checklist */}
      {showChecklist && <EmergencyChecklist onClose={() => setShowChecklist(false)} />}

      {/* Top Bar */}
      <div className="h-10 bg-slate-900 border-b border-slate-700/50 flex-shrink-0">
        <TopBar onExit={handleExit} />
      </div>

      {/* Main Grid: 3 columns */}
      <div className="flex-1 grid grid-cols-[25%_50%_25%] gap-2 p-2 overflow-hidden">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-2 overflow-y-auto pr-1">
          <AircraftStatus />
          <CountdownTimers />
          <AssetQueue />
          {/* Emergency checklist button */}
          <button
            onClick={() => setShowChecklist(true)}
            className="bg-red-900/30 border border-red-500/40 rounded-lg p-2.5 flex items-center gap-2 hover:bg-red-900/50 transition-colors group"
          >
            <ShieldAlert className="w-4 h-4 text-red-500 group-hover:animate-pulse" />
            <span className="font-mono text-[10px] text-red-400 font-bold uppercase">Emergency Procedures</span>
          </button>
        </div>

        {/* CENTER COLUMN */}
        <div className="flex flex-col gap-2 overflow-hidden">
          {/* Map: top 55% */}
          <div className="flex-[55] min-h-0 rounded-lg overflow-hidden border border-slate-700/50">
            <MissionControlMapClient />
          </div>
          {/* Dual feeds: bottom 45% */}
          <div className="flex-[45] min-h-0 grid grid-cols-2 gap-2">
            <EOFeed />
            <IRFeed />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-2 overflow-y-auto pl-1">
          <PilotAlerts />
          {/* Live weather radar map */}
          <div className="bg-slate-900 border border-slate-700/50 rounded-lg overflow-hidden" style={{ height: '180px' }}>
            <WeatherMapClient />
          </div>
          <WeatherPanel />
          <AIMissionPlan />
          <CommsLog />
        </div>
      </div>
    </div>
  );
}
