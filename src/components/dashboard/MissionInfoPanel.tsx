'use client';

import { useState, useEffect } from 'react';
import DashboardPanel from './DashboardPanel';

const waypointStages = [
  { name: 'PreFlight', done: true },
  { name: 'Launch', done: true },
  { name: 'Transit', done: false, active: true },
  { name: 'Survey', done: false },
  { name: 'Perform', done: false },
  { name: 'Return', done: false },
  { name: 'Land', done: false },
];

export default function MissionInfoPanel() {
  const [startTime, setStartTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setStartTime(
      now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }) + ' EDT'
    );
  }, []);

  const infoRows = [
    { label: 'Mission ID', value: 'MSN-2025-0001' },
    {
      label: 'Status',
      value: 'IN PROGRESS',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    },
    { label: 'Type', value: 'Fire' },
    { label: 'Location', value: 'Springfield, OH · Grid 4412N' },
    { label: 'Requestor', value: 'Springfield Fire Department' },
    { label: 'Commander', value: 'CTR-001 · Jared K.' },
    { label: 'Mission Start', value: startTime },
    { label: 'Current Sortie', value: '1 of 1' },
    { label: 'WP Completed', value: '2 of 5' },
  ];

  return (
    <DashboardPanel title="Mission Info" statusColor="amber">
      <div className="space-y-2.5 mb-5">
        {infoRows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">{row.label}</span>
            {row.badgeColor ? (
              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded border ${row.badgeColor}`}
              >
                {row.value}
              </span>
            ) : (
              <span className="font-mono text-[11px] text-slate-200">{row.value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Waypoint progress stepper */}
      <div className="border-t border-slate-700 pt-4">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 block">
          Waypoint Progress
        </span>
        <div className="flex items-center gap-1 overflow-x-auto">
          {waypointStages.map((wp, i) => (
            <div key={wp.name} className="flex items-center">
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded text-[9px] font-mono whitespace-nowrap ${
                  wp.done
                    ? 'bg-green-500/20 text-green-400'
                    : wp.active
                      ? 'bg-red-500/20 text-red-400 animate-pulse'
                      : 'bg-slate-700 text-slate-500'
                }`}
              >
                {wp.done ? '✓' : wp.active ? '●' : '○'} {wp.name}
              </div>
              {i < waypointStages.length - 1 && (
                <span className="text-slate-600 mx-0.5 text-[10px]">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardPanel>
  );
}
