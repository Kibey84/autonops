'use client';

import dynamic from 'next/dynamic';
import DashboardPanel from './DashboardPanel';

const MapContent = dynamic(() => import('./MissionMapPanelClient'), {
  ssr: false,
  loading: () => (
    <div className="h-[320px] bg-slate-700 animate-pulse rounded-lg" />
  ),
});

export default function MissionMapPanel() {
  return (
    <DashboardPanel
      title="Mission Map"
      statusColor="green"
      headerRight={
        <span className="font-mono text-xs text-orange-400 animate-pulse">
          SIMULATION MODE
        </span>
      }
    >
      <MapContent />
    </DashboardPanel>
  );
}
