'use client';

import { useState, useEffect } from 'react';
import DashboardPanel from './DashboardPanel';

export default function TelemetryPanel() {
  const [eteSeconds, setEteSeconds] = useState(262); // 4:22

  useEffect(() => {
    const interval = setInterval(() => {
      setEteSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatETE = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const rows = [
    { label: 'Aircraft', value: 'Blackfly-01' },
    {
      label: 'Status',
      value: 'IN TRANSIT',
      badge: <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block ml-2" />,
    },
    {
      label: 'Altitude AGL',
      value: '1,200 ft',
      bar: { percent: 80, color: 'bg-green-500' },
    },
    { label: 'Airspeed', value: '68 kts' },
    {
      label: 'Battery',
      value: '74%',
      bar: { percent: 74, color: 'bg-green-500' },
    },
    { label: 'Range Remain', value: '12.4 nm' },
    { label: 'ETE to Fire', value: formatETE(eteSeconds), highlight: true },
    { label: 'Voice Freq', value: '123.450 MHz' },
    { label: 'Trans Freq', value: '122.800 MHz' },
    {
      label: 'Starlink',
      value: 'CONNECTED',
      badge: <span className="w-2 h-2 bg-green-500 rounded-full inline-block ml-2" />,
    },
  ];

  return (
    <DashboardPanel title="Aircraft Telemetry" statusColor="green">
      <div className="space-y-2.5">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{row.label}</span>
              <span
                className={`font-mono text-[11px] ${
                  row.highlight ? 'text-amber-400 tabular-nums' : 'text-slate-200'
                }`}
              >
                {row.value}
                {row.badge}
              </span>
            </div>
            {row.bar && (
              <div className="mt-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${row.bar.color} rounded-full transition-all duration-500`}
                  style={{ width: `${row.bar.percent}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}
