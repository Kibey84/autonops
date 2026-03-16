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
}

interface Account {
  name: string;
  address: string;
  phone: string;
  type: string;
  activeOrders: number;
  contacts: Contact[];
  activities: Activity[];
  orders: Order[];
}

const initialAccounts: Account[] = [
  {
    name: 'Springfield Fire Dept',
    address: 'Springfield, OH',
    phone: '(937) 555-0101',
    type: 'Fire',
    activeOrders: 1,
    contacts: [
      { name: 'Capt. Harris', title: 'Station Captain', phone: '(937) 555-0102', email: 'harris@springfieldfd.gov' },
      { name: 'Lt. Rodriguez', title: 'Operations Officer', phone: '(937) 555-0103', email: 'rodriguez@springfieldfd.gov' },
    ],
    activities: [
      { date: 'Mar 16, 2025', type: 'Mission', subject: 'Active fire response', notes: 'MSN-2025-0001 dispatched' },
      { date: 'Mar 10, 2025', type: 'Call', subject: 'Pre-deployment check', notes: 'Confirmed staging at Station 4' },
    ],
    orders: [
      { orderId: 'ORD-001', type: 'Fire', date: 'Mar 16', status: 'In Progress' },
    ],
  },
  {
    name: 'Rio Verde Fire Dept',
    address: 'Rio Verde, AZ',
    phone: '(480) 555-0198',
    type: 'Fire',
    activeOrders: 0,
    contacts: [
      { name: 'Chief Malone', title: 'Fire Chief', phone: '(480) 555-0199', email: 'malone@rioverdefd.gov' },
    ],
    activities: [
      { date: 'Feb 12, 2025', type: 'Mission', subject: 'Recon mission completed', notes: 'MSN-2024-0004 closed — score 94/100' },
    ],
    orders: [
      { orderId: 'ORD-002', type: 'Recon', date: 'Feb 12', status: 'Closed' },
    ],
  },
  {
    name: 'Clark Co. Sheriff',
    address: 'Springfield, OH',
    phone: '(937) 555-0142',
    type: 'Law',
    activeOrders: 0,
    contacts: [
      { name: 'Sgt. Williams', title: 'Tactical Lead', phone: '(937) 555-0143', email: 'williams@clarkcountyso.gov' },
    ],
    activities: [
      { date: 'Dec 03, 2024', type: 'Mission', subject: 'SAR operation', notes: 'MSN-2024-0002 — person located' },
    ],
    orders: [],
  },
];

export default function AccountsView() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newAccount, setNewAccount] = useState({ name: '', address: '', phone: '' });

  const handleSave = () => {
    if (!newAccount.name.trim()) return;
    setAccounts((prev) => [
      ...prev,
      {
        ...newAccount,
        type: 'New',
        activeOrders: 0,
        contacts: [],
        activities: [],
        orders: [],
      },
    ]);
    setNewAccount({ name: '', address: '', phone: '' });
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Accounts</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1.5 bg-red-600 text-white text-xs font-mono rounded hover:bg-red-700 transition-colors"
        >
          + New Account
        </button>
      </div>

      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4">Account Name</th>
                <th className="text-left py-3 px-4">Address</th>
                <th className="text-left py-3 px-4">Phone</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Active Orders</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acct) => (
                <>
                  <tr
                    key={acct.name}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer transition-colors"
                    onClick={() => setExpanded(expanded === acct.name ? null : acct.name)}
                  >
                    <td className="py-3 px-4 text-slate-200">{acct.name}</td>
                    <td className="py-3 px-4 text-slate-400">{acct.address}</td>
                    <td className="py-3 px-4 text-slate-400">{acct.phone}</td>
                    <td className="py-3 px-4 text-slate-300">{acct.type}</td>
                    <td className="py-3 px-4 text-slate-300">{acct.activeOrders}</td>
                  </tr>
                  {expanded === acct.name && (
                    <tr key={`${acct.name}-detail`} className="bg-slate-800/50">
                      <td colSpan={5} className="px-6 py-5">
                        <div className="space-y-5">
                          {/* Contacts */}
                          <div>
                            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                              Contacts
                            </h4>
                            {acct.contacts.length > 0 ? (
                              <table className="w-full text-[10px]">
                                <thead>
                                  <tr className="text-slate-500">
                                    <th className="text-left py-1 pr-4">Name</th>
                                    <th className="text-left py-1 pr-4">Title</th>
                                    <th className="text-left py-1 pr-4">Phone</th>
                                    <th className="text-left py-1">Email</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {acct.contacts.map((c) => (
                                    <tr key={c.name} className="text-slate-400">
                                      <td className="py-1 pr-4">{c.name}</td>
                                      <td className="py-1 pr-4">{c.title}</td>
                                      <td className="py-1 pr-4">{c.phone}</td>
                                      <td className="py-1">{c.email}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p className="text-[10px] text-slate-500">No contacts yet.</p>
                            )}
                          </div>
                          {/* Activities */}
                          <div>
                            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                              Activities
                            </h4>
                            {acct.activities.length > 0 ? (
                              <table className="w-full text-[10px]">
                                <thead>
                                  <tr className="text-slate-500">
                                    <th className="text-left py-1 pr-4">Date</th>
                                    <th className="text-left py-1 pr-4">Type</th>
                                    <th className="text-left py-1 pr-4">Subject</th>
                                    <th className="text-left py-1">Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {acct.activities.map((a, i) => (
                                    <tr key={i} className="text-slate-400">
                                      <td className="py-1 pr-4">{a.date}</td>
                                      <td className="py-1 pr-4">{a.type}</td>
                                      <td className="py-1 pr-4">{a.subject}</td>
                                      <td className="py-1">{a.notes}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p className="text-[10px] text-slate-500">No activities yet.</p>
                            )}
                          </div>
                          {/* Orders */}
                          <div>
                            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                              Orders
                            </h4>
                            {acct.orders.length > 0 ? (
                              <table className="w-full text-[10px]">
                                <thead>
                                  <tr className="text-slate-500">
                                    <th className="text-left py-1 pr-4">Order ID</th>
                                    <th className="text-left py-1 pr-4">Type</th>
                                    <th className="text-left py-1 pr-4">Date</th>
                                    <th className="text-left py-1">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {acct.orders.map((o) => (
                                    <tr key={o.orderId} className="text-slate-400">
                                      <td className="py-1 pr-4">{o.orderId}</td>
                                      <td className="py-1 pr-4">{o.type}</td>
                                      <td className="py-1 pr-4">{o.date}</td>
                                      <td className="py-1">{o.status}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p className="text-[10px] text-slate-500">No orders yet.</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Account Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-white font-semibold mb-4">New Account</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Account Name</label>
                <input
                  type="text"
                  value={newAccount.name}
                  onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Address</label>
                <input
                  type="text"
                  value={newAccount.address}
                  onChange={(e) => setNewAccount({ ...newAccount, address: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Phone</label>
                <input
                  type="text"
                  value={newAccount.phone}
                  onChange={(e) => setNewAccount({ ...newAccount, phone: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 text-sm rounded hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
