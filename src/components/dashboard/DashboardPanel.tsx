'use client';

import { ReactNode } from 'react';

interface DashboardPanelProps {
  title: string;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
  statusColor?: 'green' | 'red' | 'amber' | 'cyan' | 'orange';
}

export default function DashboardPanel({
  title,
  children,
  className = '',
  headerRight,
  statusColor = 'green',
}: DashboardPanelProps) {
  const dotColors = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    cyan: 'bg-cyan-500',
    orange: 'bg-orange-500',
  };

  return (
    <div
      className={`bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden flex flex-col ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColors[statusColor]} animate-pulse`} />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            {title}
          </span>
        </div>
        {headerRight && <div>{headerRight}</div>}
      </div>
      <div className="flex-1 p-4 overflow-auto">{children}</div>
    </div>
  );
}
