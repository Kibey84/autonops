'use client';

import { useState } from 'react';
import {
  Building2,
  UserCircle,
  Target,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
} from 'lucide-react';
import {
  accounts,
  contacts,
  missions,
  invoices,
} from '@/lib/data/mock';

const accountStatusBadge = (status: string) => {
  const base = 'text-[10px] font-mono px-2 py-0.5 rounded border';
  switch (status) {
    case 'active':
      return `${base} bg-green-500/20 text-green-400 border-green-500/30`;
    case 'prospect':
      return `${base} bg-amber-500/20 text-amber-400 border-amber-500/30`;
    case 'inactive':
      return `${base} bg-slate-500/20 text-slate-400 border-slate-500/30`;
    default:
      return `${base} bg-slate-500/20 text-slate-400 border-slate-500/30`;
  }
};

export default function CRMView() {
  const [expandedAccount, setExpandedAccount] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const activeAccounts = accounts.filter((a) => a.status === 'active').length;
  const prospects = accounts.filter((a) => a.status === 'prospect').length;
  const totalContacts = contacts.length;

  // Lead source breakdown
  const leadSources: Record<string, number> = {};
  accounts.forEach((a) => {
    const src = a.leadSource ?? 'Unknown';
    leadSources[src] = (leadSources[src] || 0) + 1;
  });

  const pipelineCards = [
    {
      label: 'Active Accounts',
      value: String(activeAccounts),
      icon: Building2,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    {
      label: 'Prospects',
      value: String(prospects),
      icon: Target,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
    },
    {
      label: 'Total Contacts',
      value: String(totalContacts),
      icon: UserCircle,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">CRM</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Account
        </button>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {pipelineCards.map((card) => (
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

      {/* Accounts Table */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            All Accounts
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4 w-8"></th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">City / State</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Contract Start</th>
                <th className="text-right py-3 px-4">Price/Sortie</th>
                <th className="text-right py-3 px-4">Active Orders</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acct) => {
                const acctMissions = missions.filter((m) => m.accountId === acct.id);
                const acctActiveMissions = acctMissions.filter((m) => m.status === 'active').length;
                const acctContacts = contacts.filter((c) => c.accountId === acct.id);
                const acctInvoices = invoices.filter((i) => i.accountId === acct.id);
                const acctRevenue = acctInvoices.reduce((s, i) => s + i.amount, 0);

                return (
                  <>
                    <tr
                      key={acct.id}
                      onClick={() =>
                        setExpandedAccount(expandedAccount === acct.id ? null : acct.id)
                      }
                      className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4 text-slate-500">
                        {expandedAccount === acct.id ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-200">{acct.name}</td>
                      <td className="py-3 px-4 text-slate-400">
                        {acct.city}, {acct.state}
                      </td>
                      <td className="py-3 px-4 text-slate-300 capitalize">{acct.type}</td>
                      <td className="py-3 px-4">
                        <span className={accountStatusBadge(acct.status)}>{acct.status}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">{acct.contractStart || '—'}</td>
                      <td className="py-3 px-4 text-right text-slate-300">
                        ${acct.pricePerSortie.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-300">{acctActiveMissions}</td>
                    </tr>
                    {expandedAccount === acct.id && (
                      <tr key={`${acct.id}-details`}>
                        <td colSpan={8} className="bg-slate-900/60 px-8 py-4">
                          <div className="space-y-4">
                            {/* Contacts */}
                            <div>
                              <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-2">
                                Contacts
                              </h4>
                              {acctContacts.length === 0 ? (
                                <p className="text-[11px] text-slate-500">No contacts on file.</p>
                              ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                  {acctContacts.map((c) => (
                                    <div
                                      key={c.id}
                                      className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3"
                                    >
                                      <p className="text-[11px] text-slate-200 font-medium">
                                        {c.name}
                                        {c.isPrimary && (
                                          <span className="ml-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                            PRIMARY
                                          </span>
                                        )}
                                      </p>
                                      <p className="text-[10px] text-slate-400 mt-0.5">{c.title}</p>
                                      <p className="text-[10px] text-slate-500 mt-0.5">
                                        {c.email} &middot; {c.phone}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Recent Missions */}
                            <div>
                              <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-2">
                                Recent Missions ({acctMissions.length})
                              </h4>
                              {acctMissions.length === 0 ? (
                                <p className="text-[11px] text-slate-500">No missions yet.</p>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {acctMissions.slice(0, 5).map((m) => (
                                    <div
                                      key={m.id}
                                      className="bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2"
                                    >
                                      <span className="text-[11px] text-slate-200">
                                        {m.displayId}
                                      </span>
                                      <span className="text-[10px] text-slate-500 ml-2">
                                        {m.type} &middot; {m.status}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Revenue from this account */}
                            <div>
                              <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                                Total Revenue from Account
                              </h4>
                              <p className="font-mono text-lg text-green-400 font-bold">
                                ${acctRevenue.toLocaleString()}
                              </p>
                            </div>

                            {/* Notes */}
                            {acct.notes && (
                              <div>
                                <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                                  Notes
                                </h4>
                                <p className="text-[11px] text-slate-400">{acct.notes}</p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Source Breakdown */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            Lead Source Breakdown
          </span>
        </div>
        <div className="p-4 space-y-3">
          {Object.entries(leadSources).map(([source, count]) => (
            <div key={source} className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-slate-400 w-24">{source}</span>
              <div className="flex-1 h-5 bg-slate-700/50 rounded overflow-hidden">
                <div
                  className="h-full bg-blue-500/50 rounded flex items-center pl-2"
                  style={{ width: `${(count / accounts.length) * 100}%` }}
                >
                  <span className="font-mono text-[9px] text-blue-200">{count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <span className="font-mono text-sm uppercase tracking-wider text-slate-200">
                Add Account
              </span>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mesa Fire Dept"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500/50"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">State</label>
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">Type</label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-red-500/50">
                    <option value="fire">Fire</option>
                    <option value="law">Law Enforcement</option>
                    <option value="sar">Search &amp; Rescue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Lead Source
                  </label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-red-500/50">
                    <option value="Referral">Referral</option>
                    <option value="Website">Website</option>
                    <option value="Conference">Conference</option>
                    <option value="Cold Outreach">Cold Outreach</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">Phone</label>
                <input
                  type="text"
                  placeholder="(555) 555-0100"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500/50"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-mono text-slate-400 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-mono bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Save Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
