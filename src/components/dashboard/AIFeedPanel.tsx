'use client';

import { useState, useEffect, useRef } from 'react';
import DashboardPanel from './DashboardPanel';

const initialEntries = [
  { time: 'T+00:01', text: 'Fire line detected — bearing 220°, spreading NE ~8 mph' },
  { time: 'T+00:14', text: 'Terrain analysis complete — heavy tree cover, 2 ridgelines' },
  { time: 'T+00:29', text: 'Structure detected — 3 residential properties within 0.8 mi' },
  { time: 'T+00:45', text: 'Heat signature — possible person/large animal at Grid 3332N ⚠' },
  { time: 'T+01:02', text: 'Wind shift detected — updating fire spread model...' },
  { time: 'T+01:15', text: 'Revised spread: NNE at ~11 mph — fire line expanding' },
];

const rotatingEntries = [
  'Smoke density increasing — EO visibility reduced to ~40%',
  'Recommended new waypoint uploaded — awaiting controller confirmation',
  'Animal heat cluster detected — Grid 3333N (3 signatures)',
  'Structure risk elevated — 1 property now within 0.3 mi of fire front',
  'Wind stabilizing — spread rate may be decreasing',
  'Thermal anomaly resolved — likely vehicle exhaust, not person',
  'Fire line containment gap detected on western flank',
  'Updated thermal overlay generated — pushing to field devices',
  'Secondary fire front detected 0.4 mi east of primary',
  'EO camera auto-adjusting for smoke compensation',
];

export default function AIFeedPanel() {
  const [entries, setEntries] = useState(initialEntries);
  const [paused, setPaused] = useState(false);
  const [rotateIndex, setRotateIndex] = useState(0);
  const [elapsed, setElapsed] = useState(75); // start at T+01:15
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;

    const delay = 18000 + Math.random() * 7000; // 18-25 seconds
    const timeout = setTimeout(() => {
      const newElapsed = elapsed + Math.floor(12 + Math.random() * 20);
      const minutes = Math.floor(newElapsed / 60);
      const secs = String(newElapsed % 60).padStart(2, '0');
      const timeStr = `T+${String(minutes).padStart(2, '0')}:${secs}`;

      setEntries((prev) => [
        ...prev,
        { time: timeStr, text: rotatingEntries[rotateIndex % rotatingEntries.length] },
      ]);
      setRotateIndex((prev) => prev + 1);
      setElapsed(newElapsed);
    }, delay);

    return () => clearTimeout(timeout);
  }, [entries, paused, rotateIndex, elapsed]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <DashboardPanel
      title="AI Analysis · Live"
      statusColor="cyan"
      headerRight={
        <button
          onClick={() => setPaused(!paused)}
          className="font-mono text-[10px] text-slate-400 hover:text-white border border-slate-600 rounded px-2 py-0.5 transition-colors"
        >
          {paused ? 'Resume' : 'Pause'} Feed
        </button>
      }
    >
      <div ref={scrollRef} className="h-full max-h-48 overflow-y-auto space-y-2 pr-1">
        {entries.map((entry, i) => (
          <div key={i} className="flex gap-2 text-[11px]">
            <span className="font-mono text-cyan-400 whitespace-nowrap flex-shrink-0">
              [{entry.time}]
            </span>
            <span
              className={`text-slate-300 ${
                entry.text.includes('⚠') ? 'text-amber-400' : ''
              }`}
            >
              {entry.text}
            </span>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}
