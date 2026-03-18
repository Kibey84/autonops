'use client';

import {
  Eye,
  UserPlus,
  Crosshair,
  Percent,
} from 'lucide-react';

// Simulated analytics data
const siteVisits = 1247;
const dashboardSignups = 3;
const missionRequests = 4;
const conversionRate = ((missionRequests / siteVisits) * 100).toFixed(2);

const ctaClicks = [
  { label: 'Request Mission', clicks: 45, color: 'bg-red-500/60' },
  { label: 'Request Demo', clicks: 32, color: 'bg-amber-500/60' },
  { label: 'Dashboard', clicks: 28, color: 'bg-blue-500/60' },
  { label: 'Contact', clicks: 19, color: 'bg-cyan-500/60' },
];

const maxClicks = Math.max(...ctaClicks.map((c) => c.clicks));

const monthlyTrend = [
  { month: 'Jan 2025', visits: 320, clicks: 38, signups: 1 },
  { month: 'Feb 2025', visits: 415, clicks: 42, signups: 1 },
  { month: 'Mar 2025', visits: 512, clicks: 44, signups: 1 },
];

const maxVisits = Math.max(...monthlyTrend.map((m) => m.visits));

// Funnel data
const funnelSteps = [
  { label: 'Site Visits', value: 1247, pct: 100 },
  { label: 'CTA Clicks', value: 124, pct: 9.94 },
  { label: 'Signups', value: 3, pct: 0.24 },
  { label: 'Mission Requests', value: 4, pct: 0.32 },
];

export default function AnalyticsView() {
  const cards = [
    {
      label: 'Site Visits',
      value: siteVisits.toLocaleString(),
      icon: Eye,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
    },
    {
      label: 'Dashboard Signups',
      value: String(dashboardSignups),
      icon: UserPlus,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    {
      label: 'Mission Requests',
      value: String(missionRequests),
      icon: Crosshair,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
    },
    {
      label: 'Conversion Rate',
      value: `${conversionRate}%`,
      icon: Percent,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Simulated site analytics &amp; conversion data</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`bg-slate-800/80 border ${card.border} rounded-xl p-5 flex items-center gap-4`}
          >
            <div className={`${card.bg} p-3 rounded-lg`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CTA Click Breakdown */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
              CTA Click Breakdown
            </span>
          </div>
          <div className="p-4 space-y-3">
            {ctaClicks.map((cta) => (
              <div key={cta.label} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-400">{cta.label}</span>
                  <span className="font-mono text-[11px] text-slate-300">{cta.clicks}</span>
                </div>
                <div className="h-5 bg-slate-700/50 rounded overflow-hidden">
                  <div
                    className={`h-full ${cta.color} rounded`}
                    style={{ width: `${(cta.clicks / maxClicks) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
              Monthly Trend (Last 3 Months)
            </span>
          </div>
          <div className="p-4 space-y-4">
            {monthlyTrend.map((m) => (
              <div key={m.month} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-400">{m.month}</span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {m.visits} visits &middot; {m.clicks} clicks &middot; {m.signups} signup
                  </span>
                </div>
                <div className="h-6 bg-slate-700/50 rounded overflow-hidden relative">
                  <div
                    className="h-full bg-blue-500/50 rounded"
                    style={{ width: `${(m.visits / maxVisits) * 100}%` }}
                  />
                  <div
                    className="absolute top-0 left-0 h-full bg-amber-500/70 rounded"
                    style={{ width: `${(m.clicks / maxVisits) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-4 pt-2 border-t border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500/50" />
                <span className="font-mono text-[10px] text-slate-400">Visits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-500/70" />
                <span className="font-mono text-[10px] text-slate-400">CTA Clicks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            Conversion Funnel
          </span>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center space-y-2">
            {funnelSteps.map((step, idx) => {
              // Width decreases for each step to create funnel shape
              const widthPct = 100 - idx * 20;
              const colors = [
                'bg-blue-500/30 border-blue-500/40',
                'bg-amber-500/30 border-amber-500/40',
                'bg-green-500/30 border-green-500/40',
                'bg-red-500/30 border-red-500/40',
              ];
              const textColors = [
                'text-blue-400',
                'text-amber-400',
                'text-green-400',
                'text-red-400',
              ];
              return (
                <div key={step.label} className="w-full flex flex-col items-center">
                  <div
                    className={`${colors[idx]} border rounded-lg py-4 px-6 flex items-center justify-between transition-all`}
                    style={{ width: `${widthPct}%` }}
                  >
                    <div>
                      <span className={`font-mono text-sm font-bold ${textColors[idx]}`}>
                        {step.value.toLocaleString()}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400 ml-3">
                        {step.label}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500">{step.pct}%</span>
                  </div>
                  {idx < funnelSteps.length - 1 && (
                    <div className="w-0.5 h-4 bg-slate-700" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
