'use client';

import { useState, useEffect } from 'react';
import { DollarSign, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import type { AuthSession, Invoice } from '@/lib/data/types';
import { getInvoicesForAccount } from '@/lib/data/mock';
import DashboardPanel from './DashboardPanel';

interface CustomerBillingViewProps {
  session: AuthSession;
}

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  paid: { color: 'text-green-400', bg: 'bg-green-500/10', dot: 'bg-green-500' },
  draft: { color: 'text-slate-400', bg: 'bg-slate-500/10', dot: 'bg-slate-500' },
  sent: { color: 'text-blue-400', bg: 'bg-blue-500/10', dot: 'bg-blue-500' },
  overdue: { color: 'text-red-400', bg: 'bg-red-500/10', dot: 'bg-red-500' },
  cancelled: { color: 'text-slate-500', bg: 'bg-slate-500/10', dot: 'bg-slate-500' },
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function CustomerBillingView({ session }: CustomerBillingViewProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    if (!session.accountId) return;
    const data = getInvoicesForAccount(session.accountId);
    // Sort by createdAt desc
    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setInvoices(data);
  }, [session.accountId]);

  const totalBilled = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const outstanding = invoices
    .filter((inv) => ['draft', 'sent', 'overdue'].includes(inv.status))
    .reduce((sum, inv) => sum + inv.amount, 0);

  const summaryCards = [
    {
      label: 'Total Billed',
      value: formatCurrency(totalBilled),
      icon: DollarSign,
      color: 'text-white',
      bg: 'bg-slate-500/10',
      border: 'border-slate-700',
    },
    {
      label: 'Paid',
      value: formatCurrency(totalPaid),
      icon: CheckCircle2,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    {
      label: 'Outstanding',
      value: formatCurrency(outstanding),
      icon: outstanding > 0 ? AlertTriangle : Clock,
      color: outstanding > 0 ? 'text-amber-400' : 'text-slate-400',
      bg: outstanding > 0 ? 'bg-amber-500/10' : 'bg-slate-500/10',
      border: outstanding > 0 ? 'border-amber-500/30' : 'border-slate-700',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing</h1>
        <p className="text-sm text-slate-400 mt-1">
          Invoice history for {session.accountName}
        </p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className={`bg-slate-800/80 border ${card.border} rounded-xl p-5 flex items-center gap-4`}
          >
            <div className={`${card.bg} p-3 rounded-lg`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div>
              <p className={`font-mono text-xl font-bold ${card.color}`}>{card.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Invoices Table */}
      <DashboardPanel title="Invoices" statusColor="green">
        {invoices.length === 0 ? (
          <p className="text-sm text-slate-500 py-4">No invoices found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left text-[10px] font-mono uppercase tracking-wider text-slate-500 py-2 px-3">
                    Invoice ID
                  </th>
                  <th className="text-left text-[10px] font-mono uppercase tracking-wider text-slate-500 py-2 px-3">
                    Mission
                  </th>
                  <th className="text-right text-[10px] font-mono uppercase tracking-wider text-slate-500 py-2 px-3">
                    Amount
                  </th>
                  <th className="text-left text-[10px] font-mono uppercase tracking-wider text-slate-500 py-2 px-3">
                    Status
                  </th>
                  <th className="text-left text-[10px] font-mono uppercase tracking-wider text-slate-500 py-2 px-3 hidden sm:table-cell">
                    Due Date
                  </th>
                  <th className="text-left text-[10px] font-mono uppercase tracking-wider text-slate-500 py-2 px-3 hidden md:table-cell">
                    Paid Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => {
                  const status = statusConfig[invoice.status] || statusConfig.draft;
                  return (
                    <tr
                      key={invoice.id}
                      className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-3 px-3 font-mono text-[11px] text-white font-medium">
                        {invoice.displayId}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-300">
                        {invoice.missionDisplayId || '—'}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-white text-right font-medium">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase ${status.bg} ${status.color}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-400 hidden sm:table-cell">
                        {formatDate(invoice.dueDate)}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-400 hidden md:table-cell">
                        {formatDate(invoice.paidDate)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </DashboardPanel>
    </div>
  );
}
