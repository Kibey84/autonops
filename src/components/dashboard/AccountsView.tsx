'use client';

import { useState } from 'react';

interface Contact {
  name: string;
  title: string;
  phone: string;
  email: string;
}

interface Activity {
  date: string;
  type: string;
  subject: string;
  notes: string;
}

interface Order {
  orderId: string;
  type: string;
  date: string;
  status: string;
  price: string;
}

const accountInfo = {
  name: 'Rio Verde Fire Department',
  address: '18402 E Rio Verde Dr, Rio Verde, AZ 85263',
  phone: '(480) 555-0198',
  type: 'Fire',
  status: 'Active',
  contractStart: 'Oct 1, 2024',
  pricePerSortie: '$1,000',
};

const contacts: Contact[] = [
  { name: 'Capt. Harris', title: 'Station Captain', phone: '(480) 555-0192', email: 'harris@rioverdefd.gov' },
  { name: 'Lt. Rodriguez', title: 'Operations Officer', phone: '(480) 555-0193', email: 'rodriguez@rioverdefd.gov' },
  { name: 'FF. Davis', title: 'Drone Liaison', phone: '(480) 555-0194', email: 'davis@rioverdefd.gov' },
];

const activities: Activity[] = [
  { date: 'Mar 16, 2025', type: 'Mission', subject: 'Active fire response dispatched', notes: 'MSN-2025-0001 — in progress' },
  { date: 'Mar 10, 2025', type: 'Call', subject: 'Pre-deployment coordination', notes: 'Confirmed staging at Station 1, Starlink tested' },
  { date: 'Dec 03, 2024', type: 'Mission', subject: 'SAR operation completed', notes: 'MSN-2024-0002 — person located, score 91/100' },
  { date: 'Nov 14, 2024', type: 'Mission', subject: 'Fire response completed', notes: 'MSN-2024-0001 — score 87/100' },
  { date: 'Oct 01, 2024', type: 'Contract', subject: 'Service agreement signed', notes: 'Fire + SAR coverage, $1,000/sortie' },
];

const orders: Order[] = [
  { orderId: 'ORD-001', type: 'Fire', date: 'Mar 16, 2025', status: 'In Progress', price: '$1,000' },
  { orderId: 'ORD-002', type: 'SAR', date: 'Dec 03, 2024', status: 'Closed', price: '$1,000' },
  { orderId: 'ORD-003', type: 'Fire', date: 'Nov 14, 2024', status: 'Closed', price: '$1,000' },
];

const statusBadge = (status: string) => {
  const base = 'text-[10px] font-mono px-2 py-0.5 rounded border';
  if (status === 'In Progress')
    return `${base} bg-amber-500/20 text-amber-400 border-amber-500/30`;
  if (status === 'Active')
    return `${base} bg-green-500/20 text-green-400 border-green-500/30`;
  return `${base} bg-slate-500/20 text-slate-400 border-slate-500/30`;
};

export default function AccountsView() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'activity' | 'orders'>('contacts');

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">Your Account</h2>

      {/* Account Info Card */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{accountInfo.name}</h3>
            <p className="text-sm text-slate-400">{accountInfo.address}</p>
            <p className="text-sm text-slate-400">{accountInfo.phone}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <span className={statusBadge(accountInfo.status)}>{accountInfo.status}</span>
            <div className="text-[11px] text-slate-500 font-mono">
              Since {accountInfo.contractStart}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700">
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Service Type</div>
            <div className="text-sm text-slate-200 font-mono">{accountInfo.type}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Price per Sortie</div>
            <div className="text-sm text-slate-200 font-mono">{accountInfo.pricePerSortie}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Total Missions</div>
            <div className="text-sm text-slate-200 font-mono">3</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-slate-700 pb-px">
        {(['contacts', 'activity', 'orders'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors rounded-t ${
              activeTab === tab
                ? 'bg-slate-800 text-white border-b-2 border-red-500'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        {activeTab === 'contacts' && (
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] font-mono">
              <thead>
                <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Phone</th>
                  <th className="text-left py-3 px-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.name} className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-200">{c.name}</td>
                    <td className="py-3 px-4 text-slate-400">{c.title}</td>
                    <td className="py-3 px-4 text-slate-400">{c.phone}</td>
                    <td className="py-3 px-4 text-slate-400">{c.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] font-mono">
              <thead>
                <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Subject</th>
                  <th className="text-left py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a, i) => (
                  <tr key={i} className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{a.date}</td>
                    <td className="py-3 px-4 text-slate-300">{a.type}</td>
                    <td className="py-3 px-4 text-slate-200">{a.subject}</td>
                    <td className="py-3 px-4 text-slate-400">{a.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] font-mono">
              <thead>
                <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                  <th className="text-left py-3 px-4">Order ID</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.orderId} className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-200">{o.orderId}</td>
                    <td className="py-3 px-4 text-slate-300">{o.type}</td>
                    <td className="py-3 px-4 text-slate-400">{o.date}</td>
                    <td className="py-3 px-4">
                      <span className={statusBadge(o.status)}>{o.status}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-200">{o.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
