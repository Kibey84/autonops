'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import DashboardPanel from '@/components/dashboard/DashboardPanel';
import {
  Plane, RotateCcw, Pause, Play, ChevronUp, ChevronDown,
  Maximize2, Minimize2, AlertTriangle, Radio, Wifi, Battery,
  Navigation, Target, Wind, Thermometer, Eye, Send,
  ArrowUpCircle, ArrowDownCircle, Home, OctagonX, Crosshair,
  LocateFixed, Gauge, Clock, Satellite, Volume2,
} from 'lucide-react';

const FlightMapClient = dynamic(() => import('./FlightMapClient'), {
  ssr: false,
  loading: () => <div className="h-full bg-slate-700 animate-pulse rounded-lg" />,
});

// ─── AIRCRAFT COMMAND BUTTONS ───────────────────────────────

function AircraftCommands() {
  const [confirming, setConfirming] = useState<string | null>(null);

  const commands = [
    { id: 'hold', label: 'HOLD POS', icon: Pause, color: 'bg-amber-600 hover:bg-amber-700', desc: 'Hold current position' },
    { id: 'resume', label: 'RESUME', icon: Play, color: 'bg-green-600 hover:bg-green-700', desc: 'Resume flight plan' },
    { id: 'rtb', label: 'RTB', icon: Home, color: 'bg-blue-600 hover:bg-blue-700', desc: 'Return to base' },
    { id: 'orbit', label: 'ORBIT', icon: RotateCcw, color: 'bg-cyan-600 hover:bg-cyan-700', desc: 'Orbit current position' },
    { id: 'alt_up', label: 'ALT +100', icon: ArrowUpCircle, color: 'bg-slate-600 hover:bg-slate-500', desc: 'Increase altitude 100ft' },
    { id: 'alt_down', label: 'ALT -100', icon: ArrowDownCircle, color: 'bg-slate-600 hover:bg-slate-500', desc: 'Decrease altitude 100ft' },
    { id: 'emergency', label: 'EMER LAND', icon: OctagonX, color: 'bg-red-700 hover:bg-red-800', desc: 'Emergency landing' },
  ];

  const handleCommand = (id: string) => {
    if (id === 'emergency' || id === 'rtb') {
      if (confirming === id) {
        setConfirming(null);
        // Command would execute here
      } else {
        setConfirming(id);
        setTimeout(() => setConfirming(null), 3000);
      }
    }
    // Other commands execute immediately
  };

  return (
    <DashboardPanel title="Aircraft Commands" statusColor="amber">
      <div className="grid grid-cols-2 gap-2">
        {commands.map((cmd) => (
          <button
            key={cmd.id}
            onClick={() => handleCommand(cmd.id)}
            title={cmd.desc}
            className={`flex items-center justify-center gap-1.5 px-2 py-2.5 rounded-lg text-white text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${cmd.color} ${
              confirming === cmd.id ? 'ring-2 ring-white animate-pulse' : ''
            } ${cmd.id === 'emergency' ? 'col-span-2' : ''}`}
          >
            <cmd.icon className="w-3.5 h-3.5" />
            {confirming === cmd.id ? 'CONFIRM?' : cmd.label}
          </button>
        ))}
      </div>
    </DashboardPanel>
  );
}

// ─── ENHANCED TELEMETRY ─────────────────────────────────────

function PilotTelemetry() {
  const [ete, setEte] = useState(262);
  const [alt, setAlt] = useState(1200);
  const [speed, setSpeed] = useState(68);
  const [battery, setBattery] = useState(74);
  const [heading, setHeading] = useState(220);

  useEffect(() => {
    const interval = setInterval(() => {
      setEte((p) => Math.max(0, p - 1));
      // Simulate slight variations
      setAlt((p) => p + Math.round((Math.random() - 0.5) * 10));
      setSpeed((p) => Math.max(40, Math.min(85, p + Math.round((Math.random() - 0.5) * 3))));
      setBattery((p) => Math.max(0, p - 0.02));
      setHeading((p) => ((p + (Math.random() - 0.5) * 2 + 360) % 360));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fmtEte = `${Math.floor(ete / 60)}:${String(ete % 60).padStart(2, '0')}`;
  const batteryColor = battery > 30 ? 'bg-green-500' : battery > 15 ? 'bg-amber-500' : 'bg-red-500';
  const batteryText = battery > 30 ? 'text-green-400' : battery > 15 ? 'text-amber-400' : 'text-red-400';

  return (
    <DashboardPanel title="Flight Telemetry" statusColor="green">
      <div className="space-y-3">
        {/* Primary Flight Display - big numbers */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-900 rounded-lg p-2 text-center">
            <div className="text-[9px] text-slate-500 uppercase">ALT AGL</div>
            <div className="text-lg font-mono font-bold text-green-400 tabular-nums">{alt.toLocaleString()}</div>
            <div className="text-[9px] text-slate-500">ft</div>
          </div>
          <div className="bg-slate-900 rounded-lg p-2 text-center">
            <div className="text-[9px] text-slate-500 uppercase">GND SPD</div>
            <div className="text-lg font-mono font-bold text-slate-200 tabular-nums">{speed}</div>
            <div className="text-[9px] text-slate-500">kts</div>
          </div>
          <div className="bg-slate-900 rounded-lg p-2 text-center">
            <div className="text-[9px] text-slate-500 uppercase">HDG</div>
            <div className="text-lg font-mono font-bold text-slate-200 tabular-nums">{Math.round(heading)}°</div>
            <div className="text-[9px] text-slate-500">mag</div>
          </div>
        </div>

        {/* Battery */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-400 flex items-center gap-1"><Battery className="w-3 h-3" /> Battery</span>
            <span className={`font-mono text-[11px] font-bold ${batteryText} tabular-nums`}>{Math.round(battery)}%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full ${batteryColor} rounded-full transition-all duration-1000`} style={{ width: `${battery}%` }} />
          </div>
          <div className="flex justify-between mt-0.5">
            <span className="text-[9px] text-slate-500">Range: 12.4 nm</span>
            <span className="text-[9px] text-slate-500">EST: 42 min</span>
          </div>
        </div>

        {/* Info rows */}
        <div className="space-y-1.5 text-[11px]">
          {[
            { icon: Clock, label: 'ETE to Target', value: fmtEte, highlight: true },
            { icon: Navigation, label: 'Track', value: `${Math.round(heading)}° / ${speed} kts` },
            { icon: Satellite, label: 'Starlink', value: 'CONNECTED', green: true },
            { icon: Wifi, label: 'Signal', value: '-62 dBm (Strong)', green: true },
            { icon: Gauge, label: 'Latency', value: '34ms' },
            { icon: Radio, label: 'Voice', value: '123.450 MHz' },
            { icon: Volume2, label: 'Guard', value: '121.500 MHz' },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <row.icon className="w-3 h-3" />{row.label}
              </span>
              <span className={`font-mono ${row.highlight ? 'text-amber-400 font-bold' : row.green ? 'text-green-400' : 'text-slate-200'} tabular-nums`}>
                {row.value}
                {row.green && <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block ml-1.5 animate-pulse" />}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardPanel>
  );
}

// ─── CAMERA FEED (switchable EO/Thermal) ────────────────────

function CameraFeedPanel() {
  const [mode, setMode] = useState<'eo' | 'thermal'>('eo');
  const [angle, setAngle] = useState('nadir');
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <DashboardPanel
      title={mode === 'eo' ? 'CAM-1 · EO/RGB' : 'CAM-2 · THERMAL/IR'}
      statusColor="red"
      headerRight={
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-700 rounded overflow-hidden">
            <button
              onClick={() => setMode('eo')}
              className={`px-2 py-0.5 text-[9px] font-mono ${mode === 'eo' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >EO</button>
            <button
              onClick={() => setMode('thermal')}
              className={`px-2 py-0.5 text-[9px] font-mono ${mode === 'thermal' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >IR</button>
          </div>
          <span className="flex items-center gap-1 font-mono text-[9px] text-red-400">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />LIVE
          </span>
        </div>
      }
    >
      <div className="space-y-2">
        {/* Camera angle */}
        <div className="flex items-center gap-2">
          <select
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-slate-300 text-[10px] font-mono rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            <option value="nadir">Nadir (Down)</option>
            <option value="forward">Forward 30°</option>
            <option value="forward60">Forward 60°</option>
            <option value="rear">Rear</option>
            <option value="left">Left 45°</option>
            <option value="right">Right 45°</option>
          </select>
          <span className="text-[9px] text-slate-500 font-mono">ZOOM: 1.0x</span>
        </div>

        {/* Feed */}
        <div className={`relative rounded-lg overflow-hidden border border-slate-600 ${fullscreen ? 'fixed inset-4 z-50' : ''}`}>
          {mode === 'eo' ? (
            <>
              <div className="bg-slate-700/50 px-3 py-1 flex items-center justify-between font-mono text-[9px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <span>REC</span><span>|</span><span>EO/RGB</span><span>|</span><span>4K</span>
                </div>
                <span>{angle.toUpperCase()}</span>
              </div>
              <div className="relative h-52" style={{ background: 'radial-gradient(ellipse at center, #475569 0%, #1e293b 100%)' }}>
                <div className="absolute bottom-10 left-0 right-0 h-3 bg-slate-700/60" />
                <div className="absolute bottom-16 left-0 right-0 h-2.5 bg-slate-700/40" />
                <div className="absolute bottom-22 left-[8%] right-[15%] h-2 bg-slate-700/30" />
                <div className="absolute top-6 right-[18%] w-28 h-36 rotate-[-25deg] opacity-35" style={{ background: 'linear-gradient(135deg, transparent 30%, #e2e8f0 50%, transparent 70%)' }} />
                <div className="absolute bottom-14 left-[5%] w-[55%] h-0.5 bg-slate-400/25 rotate-[-6deg]" />
                {/* Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Crosshair className="w-8 h-8 text-red-500/40" />
                </div>
                {/* Overlay info */}
                <div className="absolute top-2 left-2 font-mono text-[8px] text-green-400/70 space-y-0.5">
                  <div>AC-001 BLACKFLY-01</div>
                  <div>EO/RGB · {angle.toUpperCase()}</div>
                </div>
                <div className="absolute top-2 right-2 font-mono text-[8px] text-green-400/70 text-right space-y-0.5">
                  <div>33.5128°N 111.8287°W</div>
                  <div>ALT 1200ft · HDG 220°</div>
                </div>
              </div>
              <div className="bg-slate-700/50 px-3 py-1 font-mono text-[9px] text-slate-400 flex justify-between">
                <span>ALT: 1,200ft</span><span>SPD: 68kts</span><span>BRG: 220°</span>
              </div>
            </>
          ) : (
            <>
              <div className="bg-slate-800/80 px-3 py-1 flex items-center justify-between font-mono text-[9px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <span>REC</span><span>|</span><span>THERMAL/IR</span><span>|</span><span>FLIR</span>
                </div>
                <span>{angle.toUpperCase()}</span>
              </div>
              <div className="relative h-52 bg-slate-950">
                <div className="absolute top-[18%] left-[22%] w-24 h-24 rounded-full opacity-70" style={{ background: 'radial-gradient(circle, #ea580c 0%, #dc2626 40%, transparent 70%)' }} />
                <div className="absolute top-[38%] right-[18%] w-16 h-16 rounded-full opacity-60" style={{ background: 'radial-gradient(circle, #f59e0b 0%, #ea580c 40%, transparent 70%)' }} />
                <div className="absolute bottom-[22%] left-[42%] w-12 h-12 rounded-full opacity-50" style={{ background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 40%, transparent 70%)' }} />
                <div className="absolute top-[33%] left-[12%] w-[50%] h-0.5 rotate-[-12deg] opacity-60" style={{ background: 'linear-gradient(90deg, #dc2626, #ea580c, #f59e0b, transparent)' }} />
                <div className="absolute top-[14%] left-[16%] bg-orange-500/90 text-white text-[8px] font-mono px-1.5 py-0.5 rounded">847°F</div>
                <div className="absolute top-[33%] right-[14%] bg-amber-500/90 text-white text-[8px] font-mono px-1.5 py-0.5 rounded">612°F</div>
                <div className="absolute bottom-[18%] left-[38%] bg-red-600/90 text-white text-[8px] font-mono px-1.5 py-0.5 rounded animate-pulse">⚠ HEAT SIG</div>
                {/* Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Crosshair className="w-8 h-8 text-cyan-400/40" />
                </div>
                <div className="absolute top-2 left-2 font-mono text-[8px] text-cyan-400/70 space-y-0.5">
                  <div>AC-001 BLACKFLY-01</div>
                  <div>THERMAL/IR · FLIR</div>
                </div>
              </div>
              <div className="bg-slate-800/80 px-3 py-1 font-mono text-[9px] text-slate-400 flex justify-between">
                <span>TEMP: 200°F–900°F</span><span>SENS: 0.05°C</span><span>PALETTE: WHITE-HOT</span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => setFullscreen(!fullscreen)}
          className="w-full text-center text-[10px] font-mono text-slate-400 hover:text-white border border-slate-600 rounded px-2 py-1 hover:bg-slate-700 transition-colors flex items-center justify-center gap-1"
        >
          {fullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          {fullscreen ? 'EXIT FULL SCREEN' : 'FULL SCREEN'}
        </button>
      </div>
    </DashboardPanel>
  );
}

// ─── WEATHER / CONDITIONS ───────────────────────────────────

function WeatherPanel() {
  return (
    <DashboardPanel title="Weather & Conditions" statusColor="green">
      <div className="space-y-2 text-[11px]">
        <div className="bg-slate-900 rounded-lg p-3 space-y-2">
          {[
            { icon: Wind, label: 'Wind', value: '270° at 12 kts, gusts 18' },
            { icon: Thermometer, label: 'Temp', value: '84°F / 29°C' },
            { icon: Eye, label: 'Visibility', value: '6 SM (smoke haze)' },
            { icon: Target, label: 'Ceiling', value: 'CLR' },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <row.icon className="w-3 h-3" />{row.label}
              </span>
              <span className="font-mono text-slate-200">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2">
          <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono font-bold mb-1">
            <AlertTriangle className="w-3 h-3" /> WIND ADVISORY
          </div>
          <p className="text-[10px] text-amber-300/80">
            Gusts to 18 kts. Monitor aircraft stability during survey passes. Consider altitude adjustment if turbulence increases.
          </p>
        </div>
        <div className="text-[9px] text-slate-500 font-mono">
          METAR: KSGH 161453Z 27012G18KT 6SM HZ CLR 29/18 A3001
        </div>
      </div>
    </DashboardPanel>
  );
}

// ─── WAYPOINT MANAGER ───────────────────────────────────────

function WaypointManager() {
  const [waypoints, setWaypoints] = useState([
    { wp: 1, name: 'PreFlight', lat: 33.535, lng: -111.855, alt: 0, status: 'complete' as const },
    { wp: 2, name: 'Launch', lat: 33.535, lng: -111.855, alt: 500, status: 'complete' as const },
    { wp: 3, name: 'Transit', lat: 33.520, lng: -111.835, alt: 1200, status: 'active' as const },
    { wp: 4, name: 'Survey', lat: 33.510, lng: -111.820, alt: 800, status: 'planned' as const },
    { wp: 5, name: 'Perform', lat: 33.500, lng: -111.810, alt: 600, status: 'planned' as const },
    { wp: 6, name: 'Return', lat: 33.520, lng: -111.835, alt: 1000, status: 'planned' as const },
    { wp: 7, name: 'Land', lat: 33.535, lng: -111.855, alt: 0, status: 'planned' as const },
  ]);

  const skipTo = (wpNum: number) => {
    setWaypoints((prev) =>
      prev.map((wp) => ({
        ...wp,
        status:
          wp.wp < wpNum ? 'complete' as const :
          wp.wp === wpNum ? 'active' as const :
          'planned' as const,
      }))
    );
  };

  return (
    <DashboardPanel title="Flight Plan / Waypoints" statusColor="green">
      <div className="space-y-2">
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700">
                <th className="text-left py-1.5 px-1">WP</th>
                <th className="text-left py-1.5 px-1">Name</th>
                <th className="text-left py-1.5 px-1">Alt</th>
                <th className="text-left py-1.5 px-1">Status</th>
                <th className="text-left py-1.5 px-1"></th>
              </tr>
            </thead>
            <tbody>
              {waypoints.map((wp) => (
                <tr
                  key={wp.wp}
                  className={`border-b border-slate-700/50 ${
                    wp.status === 'active' ? 'bg-red-500/10 border-l-2 border-l-red-500' : ''
                  }`}
                >
                  <td className="py-1.5 px-1 text-slate-400">{wp.wp}</td>
                  <td className="py-1.5 px-1 text-slate-200">{wp.name}</td>
                  <td className="py-1.5 px-1 text-slate-300">{wp.alt}ft</td>
                  <td className="py-1.5 px-1">
                    {wp.status === 'complete' && <span className="text-green-400">✓</span>}
                    {wp.status === 'active' && <span className="text-red-400 animate-pulse">●</span>}
                    {wp.status === 'planned' && <span className="text-slate-500">○</span>}
                  </td>
                  <td className="py-1.5 px-1">
                    {wp.status === 'planned' && (
                      <button
                        onClick={() => skipTo(wp.wp)}
                        className="text-[8px] text-cyan-400 hover:text-cyan-300"
                      >
                        SKIP→
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 text-[9px] font-mono text-slate-400 hover:text-white border border-slate-600 rounded px-2 py-1.5 hover:bg-slate-700 transition-colors flex items-center justify-center gap-1">
            <LocateFixed className="w-3 h-3" /> ADD WP
          </button>
          <button className="flex-1 text-[9px] font-mono text-slate-400 hover:text-white border border-slate-600 rounded px-2 py-1.5 hover:bg-slate-700 transition-colors flex items-center justify-center gap-1">
            <Navigation className="w-3 h-3" /> DIRECT TO
          </button>
        </div>
      </div>
    </DashboardPanel>
  );
}

// ─── AI FEED (compact for pilot) ────────────────────────────

function PilotAIFeed() {
  const [entries, setEntries] = useState([
    { time: 'T+01:02', text: 'Fire line detected — bearing 220°, spreading NE ~8 mph', priority: 'high' as const },
    { time: 'T+01:15', text: 'Structure detected — 3 residential properties within 0.8 mi', priority: 'high' as const },
    { time: 'T+01:29', text: 'Heat signature — possible person/large animal at Grid 3332N', priority: 'critical' as const },
    { time: 'T+01:45', text: 'Wind shift detected — updating fire spread model', priority: 'medium' as const },
    { time: 'T+02:02', text: 'Revised spread: NNE at ~11 mph — fire line expanding', priority: 'high' as const },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [entries]);

  const priorityColors = {
    critical: 'text-red-400',
    high: 'text-amber-400',
    medium: 'text-slate-300',
  };

  return (
    <DashboardPanel title="AI Alerts" statusColor="cyan" headerRight={
      <span className="text-[9px] font-mono text-cyan-400">{entries.length} alerts</span>
    }>
      <div ref={scrollRef} className="h-full max-h-40 overflow-y-auto space-y-1.5 pr-1">
        {entries.map((e, i) => (
          <div key={i} className="flex gap-1.5 text-[10px]">
            <span className="font-mono text-cyan-500 whitespace-nowrap flex-shrink-0">[{e.time}]</span>
            <span className={priorityColors[e.priority]}>{e.text}</span>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}

// ─── COMMS (compact for pilot) ──────────────────────────────

function PilotComms() {
  const [log, setLog] = useState([
    { time: '14:31:00', from: 'CTRL', msg: 'Blackfly-01, clear for departure. Winds 270 at 12.' },
    { time: '14:31:45', from: 'SYS', msg: 'FAA clearance confirmed. Flight plan filed.' },
    { time: '14:32:10', from: 'RVFD', msg: 'Control, eyes on smoke from Station 1. ETE?' },
    { time: '14:32:13', from: 'CTRL', msg: 'ETE 4 minutes. Dual feed live shortly.' },
    { time: '14:33:47', from: 'PLT', msg: 'Approaching survey altitude. Ready.' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [log]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    setLog((p) => [...p, { time, from: 'PLT', msg: input.trim() }]);
    setInput('');
  };

  const fromColors: Record<string, string> = {
    PLT: 'text-green-400', CTRL: 'text-cyan-400', SYS: 'text-slate-500', RVFD: 'text-amber-400',
  };

  return (
    <DashboardPanel title="Comms" statusColor="green">
      <div className="flex flex-col h-full">
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 mb-2 max-h-32 pr-1">
          {log.map((e, i) => (
            <div key={i} className="text-[9px] font-mono">
              <span className="text-slate-500">{e.time}</span>
              <span className="text-slate-600"> | </span>
              <span className={fromColors[e.from] || 'text-slate-400'}>{e.from}</span>
              <span className="text-slate-600"> | </span>
              <span className="text-slate-300">{e.msg}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Transmit..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-[10px] text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
          <button onClick={send} className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </DashboardPanel>
  );
}

// ─── MISSION STATUS BAR ─────────────────────────────────────

function MissionStatusBar() {
  const [elapsed, setElapsed] = useState(195); // 3:15

  useEffect(() => {
    const interval = setInterval(() => setElapsed((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const fmtElapsed = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-4 text-[10px] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-400 font-bold">MSN-2025-0001 · ACTIVE</span>
        </div>
        <span className="text-slate-500">|</span>
        <span className="text-slate-400">Blackfly-01</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-400">PIC: Jared K.</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-400">CTRL: Jaderic D.</span>
      </div>
      <div className="flex items-center gap-4 text-[10px] font-mono">
        <span className="text-slate-400">Rio Verde, AZ</span>
        <span className="text-slate-500">|</span>
        <span className="text-amber-400 tabular-nums">T+ {fmtElapsed}</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-400">WP 3/7</span>
      </div>
    </div>
  );
}

// ─── MAIN FLIGHT CONTROL VIEW ───────────────────────────────

export default function FlightControlView() {
  return (
    <div className="space-y-3">
      {/* Mission status bar */}
      <MissionStatusBar />

      {/* Row 1: Map (large) + Camera Feed */}
      <div className="grid grid-cols-12 gap-3" style={{ minHeight: '380px' }}>
        <div className="col-span-12 lg:col-span-7">
          <DashboardPanel
            title="Mission Map"
            statusColor="green"
            headerRight={<span className="font-mono text-[9px] text-orange-400 animate-pulse">SIMULATION MODE</span>}
          >
            <div className="h-[340px]">
              <FlightMapClient />
            </div>
          </DashboardPanel>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <CameraFeedPanel />
        </div>
      </div>

      {/* Row 2: Telemetry + Commands + Weather */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <PilotTelemetry />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <div className="space-y-3">
            <AircraftCommands />
            <WeatherPanel />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <WaypointManager />
        </div>
      </div>

      {/* Row 3: AI Alerts + Comms */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-5">
          <PilotAIFeed />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <PilotComms />
        </div>
      </div>
    </div>
  );
}
