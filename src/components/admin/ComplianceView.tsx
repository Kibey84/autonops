'use client';

import { pilots, aircraft, auditLogs } from '@/lib/data/mock';

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.floor((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function certExpiryClass(dateStr: string | undefined): string {
  if (!dateStr) return '';
  const days = getDaysUntil(dateStr);
  if (days < 0) return 'bg-red-500/10 border-l-2 border-l-red-500';
  if (days <= 90) return 'bg-amber-500/10 border-l-2 border-l-amber-500';
  return '';
}

function maintenanceDueClass(dateStr: string): string {
  const days = getDaysUntil(dateStr);
  if (days < 0) return 'bg-red-500/10 border-l-2 border-l-red-500';
  if (days <= 30) return 'bg-amber-500/10 border-l-2 border-l-amber-500';
  return '';
}

function insuranceExpiryClass(dateStr: string | undefined): string {
  if (!dateStr) return '';
  const days = getDaysUntil(dateStr);
  if (days < 0) return 'text-red-400';
  if (days <= 90) return 'text-amber-400';
  return 'text-slate-400';
}

const statusBadge = (status: string) => {
  const base = 'text-[10px] font-mono px-2 py-0.5 rounded border';
  switch (status) {
    case 'available':
      return `${base} bg-green-500/20 text-green-400 border-green-500/30`;
    case 'on_mission':
      return `${base} bg-blue-500/20 text-blue-400 border-blue-500/30`;
    case 'offline':
      return `${base} bg-red-500/20 text-red-400 border-red-500/30`;
    default:
      return `${base} bg-slate-500/20 text-slate-400 border-slate-500/30`;
  }
};

export default function ComplianceView() {
  const sortedLogs = [...auditLogs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Compliance</h1>

      {/* Pilot Certifications */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            Pilot Certifications
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Certifications</th>
                <th className="text-left py-3 px-4">Cert Expiry</th>
                <th className="text-right py-3 px-4">Flight Hours</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {pilots.map((p) => {
                const rowClass = certExpiryClass(p.certExpiry);
                const daysLeft = p.certExpiry ? getDaysUntil(p.certExpiry) : null;
                return (
                  <tr
                    key={p.id}
                    className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${rowClass}`}
                  >
                    <td className="py-3 px-4 text-slate-200">{p.name}</td>
                    <td className="py-3 px-4 text-slate-300 capitalize">{p.type}</td>
                    <td className="py-3 px-4 text-slate-400">
                      <div className="flex flex-wrap gap-1">
                        {p.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 border border-slate-600"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={
                          daysLeft !== null && daysLeft < 0
                            ? 'text-red-400 font-bold'
                            : daysLeft !== null && daysLeft <= 90
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }
                      >
                        {p.certExpiry ?? '—'}
                        {daysLeft !== null && daysLeft < 0 && (
                          <span className="ml-1 text-[9px]">(EXPIRED)</span>
                        )}
                        {daysLeft !== null && daysLeft >= 0 && daysLeft <= 90 && (
                          <span className="ml-1 text-[9px]">({daysLeft}d)</span>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-300">{p.totalFlightHours}</td>
                    <td className="py-3 px-4">
                      <span className={statusBadge(p.status)}>
                        {p.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aircraft Maintenance */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            Aircraft Maintenance &amp; Insurance
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Last Maintenance</th>
                <th className="text-left py-3 px-4">Next Maintenance</th>
                <th className="text-left py-3 px-4">Insurance Expiry</th>
                <th className="text-right py-3 px-4">Flight Hours</th>
              </tr>
            </thead>
            <tbody>
              {aircraft.map((ac) => {
                const rowClass = maintenanceDueClass(ac.nextMaintenance);
                const maintDays = getDaysUntil(ac.nextMaintenance);
                return (
                  <tr
                    key={ac.id}
                    className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${rowClass}`}
                  >
                    <td className="py-3 px-4 text-slate-200">{ac.name}</td>
                    <td className="py-3 px-4 text-slate-400">{ac.lastMaintenance}</td>
                    <td className="py-3 px-4">
                      <span
                        className={
                          maintDays < 0
                            ? 'text-red-400 font-bold'
                            : maintDays <= 30
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }
                      >
                        {ac.nextMaintenance}
                        {maintDays < 0 && (
                          <span className="ml-1 text-[9px]">(OVERDUE)</span>
                        )}
                        {maintDays >= 0 && maintDays <= 30 && (
                          <span className="ml-1 text-[9px]">({maintDays}d)</span>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={insuranceExpiryClass(ac.insuranceExpiry)}>
                        {ac.insuranceExpiry ?? '—'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-300">{ac.totalFlightHours}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Audit Log */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            Audit Log
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4">Timestamp</th>
                <th className="text-left py-3 px-4">User</th>
                <th className="text-left py-3 px-4">Action</th>
                <th className="text-left py-3 px-4">Entity</th>
                <th className="text-left py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody>
              {sortedLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-400">
                    {new Date(log.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>
                  <td className="py-3 px-4 text-slate-200">{log.userName}</td>
                  <td className="py-3 px-4 text-slate-300">{log.action.replace(/_/g, ' ')}</td>
                  <td className="py-3 px-4 text-slate-400">
                    {log.entityType} / {log.entityId}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {log.metadata ? JSON.stringify(log.metadata) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
