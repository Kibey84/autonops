'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  Plane, AlertTriangle, Wind, Thermometer, Cloud, Radio,
  Cpu, ChevronUp, Minimize2,
} from 'lucide-react';

const MissionControlMapClient = dynamic(
  () => import('./MissionControlMapClient'),
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

// ─── VIDEO FEEDS ────────────────────────────────────────────

function EOFeed() {
  return (
    <div className="h-full bg-slate-900 border border-slate-700/50 rounded-lg overflow-hidden flex flex-col">
      <div className="px-3 py-1.5 bg-slate-800 border-b border-slate-700/50 flex items-center justify-between">
        <span className="font-mono text-[9px] text-slate-400">EO FEED · 4K · NADIR</span>
        <span className="flex items-center gap-1 font-mono text-[9px] text-red-400">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />REC
        </span>
      </div>
      <div className="flex-1 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 40% 40%, #475569 0%, #1e293b 100%)' }}>
        {/* Terrain */}
        <div className="absolute bottom-[15%] left-0 right-0 h-4 bg-slate-700/50" />
        <div className="absolute bottom-[22%] left-0 right-0 h-3 bg-slate-700/35" />
        <div className="absolute bottom-[28%] left-[5%] right-[10%] h-2 bg-slate-700/25" />
        {/* Road */}
        <div className="absolute bottom-[18%] left-[3%] w-[50%] h-0.5 bg-slate-400/20 rotate-[-5deg]" />
        {/* Smoke */}
        <div className="absolute top-[10%] right-[15%] w-32 h-40 rotate-[-20deg] opacity-30"
          style={{ background: 'linear-gradient(135deg, transparent 25%, #94a3b8 50%, transparent 75%)' }} />
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)', backgroundSize: '100% 3px' }} />
        {/* HUD overlay */}
        <div className="absolute top-2 left-2 font-mono text-[7px] text-green-400/60 leading-tight">
          <div>AC: DEMO-1</div><div>EO/RGB · NADIR</div><div>39.9242°N 83.8088°W</div>
        </div>
        <div className="absolute top-2 right-2 font-mono text-[7px] text-green-400/60 text-right leading-tight">
          <div>ALT 1200 AGL</div><div>HDG 315° MAG</div><div>GS 68 KTS</div>
        </div>
        {/* Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-6 h-px bg-red-500/30" /><div className="h-6 w-px bg-red-500/30 absolute" />
        </div>
      </div>
    </div>
  );
}

function IRFeed() {
  return (
    <div className="h-full bg-slate-900 border border-slate-700/50 rounded-lg overflow-hidden flex flex-col">
      <div className="px-3 py-1.5 bg-slate-800 border-b border-slate-700/50 flex items-center justify-between">
        <span className="font-mono text-[9px] text-slate-400">IR FEED · FLIR · WHITE-HOT</span>
        <span className="flex items-center gap-1 font-mono text-[9px] text-red-400">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />REC
        </span>
      </div>
      <div className="flex-1 relative overflow-hidden bg-slate-950">
        {/* Thermal tint */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: 'linear-gradient(180deg, #064e3b 0%, transparent 100%)' }} />
        {/* Hotspots */}
        <div className="absolute top-[20%] left-[25%] w-20 h-20 rounded-full opacity-70"
          style={{ background: 'radial-gradient(circle, #ea580c 0%, #991b1b 40%, transparent 70%)' }} />
        <div className="absolute top-[40%] right-[20%] w-14 h-14 rounded-full opacity-55"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, #ea580c 40%, transparent 70%)' }} />
        <div className="absolute bottom-[25%] left-[45%] w-10 h-10 rounded-full opacity-45"
          style={{ background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 40%, transparent 70%)' }} />
        {/* Fire line */}
        <div className="absolute top-[35%] left-[15%] w-[45%] h-0.5 rotate-[-10deg] opacity-50"
          style={{ background: 'linear-gradient(90deg, #dc2626, #ea580c, #f59e0b, transparent)' }} />
        {/* Heat sig */}
        <div className="absolute bottom-[20%] left-[35%] bg-red-600/80 text-white text-[7px] font-mono px-1 py-0.5 rounded animate-pulse">
          ⚠ HEAT SIG
        </div>
        {/* Temp badges */}
        <div className="absolute top-[16%] left-[19%] text-[7px] font-mono text-orange-300/80">847°F</div>
        <div className="absolute top-[36%] right-[17%] text-[7px] font-mono text-amber-300/80">612°F</div>
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #22c55e 2px, #22c55e 3px)', backgroundSize: '100% 3px' }} />
        {/* HUD */}
        <div className="absolute top-2 left-2 font-mono text-[7px] text-cyan-400/60 leading-tight">
          <div>AC: DEMO-1</div><div>THERMAL/IR · FLIR</div><div>39.9242°N 83.8088°W</div>
        </div>
        <div className="absolute top-2 right-2 font-mono text-[7px] text-cyan-400/60 text-right leading-tight">
          <div>RANGE: 200–900°F</div><div>PALETTE: WHITE-HOT</div><div>3 HOTSPOTS</div>
        </div>
        {/* Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-6 h-px bg-cyan-400/30" /><div className="h-6 w-px bg-cyan-400/30 absolute" />
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

// ─── MAIN SCREEN ────────────────────────────────────────────

export default function MissionControlScreen({ pilotCallsign }: { pilotCallsign: string }) {
  const handleExit = useCallback(() => {
    document.exitFullscreen?.().catch(() => {});
    // Force reload to exit the mission view
    window.location.reload();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 text-slate-200 flex flex-col overflow-hidden">
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
          <WeatherPanel />
          <AIMissionPlan />
          <CommsLog />
        </div>
      </div>
    </div>
  );
}
