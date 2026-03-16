'use client';

import DashboardPanel from './DashboardPanel';

const waypoints = [
  {
    wp: 1,
    stage: 'PreFlight',
    geo: '39.9242,-83.8088',
    alt: '0 ft',
    objective: 'System check & FAA clearance',
    status: 'complete',
    statusLabel: '✅ Complete',
  },
  {
    wp: 2,
    stage: 'Launch',
    geo: '39.9242,-83.8088',
    alt: '500 ft',
    objective: 'Liftoff and initial climb',
    status: 'complete',
    statusLabel: '✅ Complete',
  },
  {
    wp: 3,
    stage: 'Transit',
    geo: '39.9100,-83.7900',
    alt: '1200 ft',
    objective: 'Route to fire zone',
    status: 'active',
    statusLabel: '🔵 Active',
  },
  {
    wp: 4,
    stage: 'Survey',
    geo: '39.9001,-83.7700',
    alt: '800 ft',
    objective: 'Dual-feed survey pass',
    status: 'planned',
    statusLabel: '⏳ Planned',
  },
  {
    wp: 5,
    stage: 'Perform',
    geo: '39.8950,-83.7650',
    alt: '600 ft',
    objective: 'AI scan + ground coordination',
    status: 'planned',
    statusLabel: '⏳ Planned',
  },
];

export default function WaypointTable() {
  return (
    <DashboardPanel title="Sortie 1 — Flight Plan" statusColor="green">
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] font-mono">
          <thead>
            <tr className="text-slate-500 border-b border-slate-700">
              <th className="text-left py-2 px-2">WP</th>
              <th className="text-left py-2 px-2">Stage</th>
              <th className="text-left py-2 px-2">GeoLoc</th>
              <th className="text-left py-2 px-2">Alt</th>
              <th className="text-left py-2 px-2">Objective</th>
              <th className="text-left py-2 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {waypoints.map((wp) => (
              <tr
                key={wp.wp}
                className={`border-b border-slate-700/50 ${
                  wp.status === 'active'
                    ? 'bg-red-500/5 border-l-2 border-l-red-500'
                    : ''
                }`}
              >
                <td className="py-2 px-2 text-slate-300">{wp.wp}</td>
                <td className="py-2 px-2 text-slate-300">{wp.stage}</td>
                <td className="py-2 px-2 text-slate-400">{wp.geo}</td>
                <td className="py-2 px-2 text-slate-300">{wp.alt}</td>
                <td className="py-2 px-2 text-slate-300">{wp.objective}</td>
                <td className="py-2 px-2 whitespace-nowrap">{wp.statusLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardPanel>
  );
}
