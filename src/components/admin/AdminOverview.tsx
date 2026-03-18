'use client';

import {
  DollarSign,
  TrendingUp,
  Crosshair,
  Star,
  PlaneTakeoff,
  ArrowRight,
} from 'lucide-react';
import {
  getFinancialSummary,
  getOperationsSummary,
  auditLogs,
} from '@/lib/data/mock';

interface AdminOverviewProps {
  onNavigate: (view: string) => void;
}

export default function AdminOverview({ onNavigate }: AdminOverviewProps) {
  const fin = getFinancialSummary();
  const ops = getOperationsSummary();

  const kpis = [
    {
      label: 'Total Revenue',
      value: `$${fin.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    {
      label: 'Net Profit',
      value: `$${fin.netProfit.toLocaleString()}`,
      icon: TrendingUp,
      color: fin.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400',
      bg: fin.netProfit >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10',
      border: fin.netProfit >= 0 ? 'border-emerald-500/30' : 'border-red-500/30',
    },
    {
      label: 'Active Missions',
      value: String(fin.activeMissions),
      icon: Crosshair,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
    },
    {
      label: 'Avg Mission Score',
      value: String(fin.avgMissionScore),
      icon: Star,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
    },
    {
      label: 'Aircraft Utilization',
      value: `${ops.aircraftUtilization}%`,
      icon: PlaneTakeoff,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
    },
  ];

  const maxRevenue = Math.max(...fin.revenueByMonth.map((m) => Math.max(m.revenue, m.expenses)));

  const recentLogs = [...auditLogs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const quickLinks: { label: string; view: string; color: string; border: string }[] = [
    { label: 'Finance', view: 'finance', color: 'text-green-400', border: 'border-green-500/30' },
    { label: 'Operations', view: 'operations', color: 'text-amber-400', border: 'border-amber-500/30' },
    { label: 'CRM', view: 'crm', color: 'text-blue-400', border: 'border-blue-500/30' },
    { label: 'Compliance', view: 'compliance', color: 'text-red-400', border: 'border-red-500/30' },
    { label: 'Analytics', view: 'analytics', color: 'text-cyan-400', border: 'border-cyan-500/30' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Admin Overview</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className={`bg-slate-800/80 border ${kpi.border} rounded-xl p-5 flex items-center gap-4`}
          >
            <div className={`${kpi.bg} p-3 rounded-lg`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-white">{kpi.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue vs Expenses Chart */}
        <div className="lg:col-span-2 bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
              Revenue vs Expenses
            </span>
          </div>
          <div className="p-4 space-y-3">
            {fin.revenueByMonth.map((m) => (
              <div key={m.month} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-400 w-20">{m.month}</span>
                  <span className="font-mono text-[10px] text-slate-500">
                    R: ${m.revenue.toLocaleString()} / E: ${m.expenses.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 h-4 bg-slate-700/50 rounded overflow-hidden">
                    <div
                      className="h-full bg-green-500/60 rounded"
                      style={{ width: `${maxRevenue > 0 ? (m.revenue / maxRevenue) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="flex-1 h-4 bg-slate-700/50 rounded overflow-hidden">
                    <div
                      className="h-full bg-red-500/60 rounded"
                      style={{ width: `${maxRevenue > 0 ? (m.expenses / maxRevenue) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-4 mt-2 pt-2 border-t border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500/60" />
                <span className="font-mono text-[10px] text-slate-400">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-500/60" />
                <span className="font-mono text-[10px] text-slate-400">Expenses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
              Quick Links
            </span>
          </div>
          <div className="p-4 space-y-2">
            {quickLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => onNavigate(link.view)}
                className={`w-full flex items-center justify-between p-3 bg-slate-900/50 border ${link.border} rounded-lg text-left hover:bg-slate-700/30 transition-colors group`}
              >
                <span className={`text-sm font-medium ${link.color}`}>{link.label}</span>
                <ArrowRight className={`w-4 h-4 ${link.color} group-hover:translate-x-1 transition-transform`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Audit Log */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            Recent Audit Log
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
              </tr>
            </thead>
            <tbody>
              {recentLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-400">
                    {new Date(log.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3 px-4 text-slate-200">{log.userName}</td>
                  <td className="py-3 px-4 text-slate-300">{log.action.replace(/_/g, ' ')}</td>
                  <td className="py-3 px-4 text-slate-400">
                    {log.entityType} / {log.entityId}
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
