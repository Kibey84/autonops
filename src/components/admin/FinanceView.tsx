'use client';

import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import {
  getFinancialSummary,
  invoices,
  expenses,
  missions,
} from '@/lib/data/mock';

const statusBadge = (status: string) => {
  const base = 'text-[10px] font-mono px-2 py-0.5 rounded border';
  switch (status) {
    case 'paid':
      return `${base} bg-green-500/20 text-green-400 border-green-500/30`;
    case 'draft':
      return `${base} bg-slate-500/20 text-slate-400 border-slate-500/30`;
    case 'sent':
      return `${base} bg-blue-500/20 text-blue-400 border-blue-500/30`;
    case 'overdue':
      return `${base} bg-red-500/20 text-red-400 border-red-500/30`;
    case 'cancelled':
      return `${base} bg-slate-600/20 text-slate-500 border-slate-600/30`;
    default:
      return `${base} bg-slate-500/20 text-slate-400 border-slate-500/30`;
  }
};

export default function FinanceView() {
  const fin = getFinancialSummary();

  const cards = [
    {
      label: 'Total Revenue',
      value: `$${fin.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    {
      label: 'Total Expenses',
      value: `$${fin.totalExpenses.toLocaleString()}`,
      icon: TrendingDown,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
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
      label: 'Pilot Payouts',
      value: `$${fin.pilotPayouts.toLocaleString()}`,
      icon: Wallet,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
    },
  ];

  const maxRevenue = Math.max(...fin.revenueByMonth.map((m) => Math.max(m.revenue, m.expenses)));

  // Profitability per mission: match invoices and expenses by missionId
  const missionProfitability = missions.map((m) => {
    const missionInvoices = invoices.filter((i) => i.missionId === m.id);
    const missionExpenses = expenses.filter((e) => e.missionId === m.id);
    const revenue = missionInvoices.reduce((s, i) => s + i.amount, 0);
    const cost = missionExpenses.reduce((s, e) => s + e.amount, 0);
    const profit = revenue - cost;
    const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;
    return {
      id: m.displayId,
      accountName: m.accountName,
      revenue,
      expenses: cost,
      profit,
      margin,
    };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Finance</h1>

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

      {/* Revenue by Month */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            Revenue by Month
          </span>
        </div>
        <div className="p-4 space-y-3">
          {fin.revenueByMonth.map((m) => (
            <div key={m.month} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400 w-20">{m.month}</span>
                <span className="font-mono text-[10px] text-slate-500">
                  ${m.revenue.toLocaleString()}
                </span>
              </div>
              <div className="h-5 bg-slate-700/50 rounded overflow-hidden">
                <div
                  className="h-full bg-green-500/60 rounded flex items-center justify-end pr-2"
                  style={{ width: `${maxRevenue > 0 ? (m.revenue / maxRevenue) * 100 : 0}%` }}
                >
                  {m.revenue > 0 && (
                    <span className="font-mono text-[9px] text-green-200">${m.revenue}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            All Invoices
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4">Invoice ID</th>
                <th className="text-left py-3 px-4">Account</th>
                <th className="text-left py-3 px-4">Mission</th>
                <th className="text-right py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-200">{inv.displayId}</td>
                  <td className="py-3 px-4 text-slate-300">{inv.accountName}</td>
                  <td className="py-3 px-4 text-slate-400">{inv.missionDisplayId ?? '—'}</td>
                  <td className="py-3 px-4 text-right text-slate-200">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={statusBadge(inv.status)}>{inv.status}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{inv.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            All Expenses
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-left py-3 px-4">Mission</th>
                <th className="text-right py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-300 capitalize">
                    {exp.category.replace(/_/g, ' ')}
                  </td>
                  <td className="py-3 px-4 text-slate-200">{exp.description}</td>
                  <td className="py-3 px-4 text-slate-400">{exp.missionDisplayId ?? '—'}</td>
                  <td className="py-3 px-4 text-right text-slate-200">
                    ${exp.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{exp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profitability per Mission */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            Profitability per Mission
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4">Mission ID</th>
                <th className="text-left py-3 px-4">Account</th>
                <th className="text-right py-3 px-4">Revenue</th>
                <th className="text-right py-3 px-4">Expenses</th>
                <th className="text-right py-3 px-4">Profit</th>
                <th className="text-right py-3 px-4">Margin %</th>
              </tr>
            </thead>
            <tbody>
              {missionProfitability.map((mp) => (
                <tr
                  key={mp.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-200">{mp.id}</td>
                  <td className="py-3 px-4 text-slate-300">{mp.accountName}</td>
                  <td className="py-3 px-4 text-right text-green-400">
                    ${mp.revenue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-red-400">
                    ${mp.expenses.toLocaleString()}
                  </td>
                  <td
                    className={`py-3 px-4 text-right ${
                      mp.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    ${mp.profit.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-300">{mp.margin}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
