'use client';

import { useState, useEffect } from 'react';

interface Order {
  id: string;
  account: string;
  requestor: string;
  type: string;
  date: string;
  location: string;
  status: string;
  price: string;
}

const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    account: 'Rio Verde FD',
    requestor: 'Capt. Harris',
    type: 'Fire',
    date: 'Mar 16',
    location: 'Rio Verde',
    status: 'In Progress',
    price: '$1,000',
  },
  {
    id: 'ORD-002',
    account: 'Rio Verde FD',
    requestor: 'Lt. Rodriguez',
    type: 'SAR',
    date: 'Dec 03',
    location: 'Rio Verde',
    status: 'Closed',
    price: '$1,000',
  },
  {
    id: 'ORD-003',
    account: 'Rio Verde FD',
    requestor: 'Capt. Harris',
    type: 'Fire',
    date: 'Nov 14',
    location: 'Rio Verde',
    status: 'Closed',
    price: '$1,000',
  },
];

const requestors = ['Capt. Harris', 'Lt. Rodriguez'];
const commanders = ['CTR-001 · Jared K.', 'CTR-002 · Jaderic D.', 'CTR-003 · Matt S.'];
const types = ['Fire', 'Rescue', 'Law', 'Recon'];

const statusBadge = (status: string) => {
  const base = 'text-[10px] font-mono px-2 py-0.5 rounded border';
  if (status === 'In Progress')
    return `${base} bg-amber-500/20 text-amber-400 border-amber-500/30`;
  return `${base} bg-green-500/20 text-green-400 border-green-500/30`;
};

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({
    requestor: requestors[0],
    commander: commanders[0],
    date: '',
    type: types[0],
    location: '',
    notes: '',
  });

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  const handleSave = () => {
    const newId = `ORD-${String(orders.length + 1).padStart(3, '0')}`;
    const msnId = `MSN-2025-${String(orders.length + 1).padStart(4, '0')}`;
    setOrders((prev) => [
      ...prev,
      {
        id: newId,
        account: 'Rio Verde FD',
        requestor: form.requestor,
        type: form.type,
        date: form.date || 'Mar 16',
        location: form.location || 'Rio Verde',
        status: 'In Progress',
        price: '$1,000',
      },
    ]);
    setToast(`Mission ${msnId} auto-generated.`);
    setShowModal(false);
    setForm({
      requestor: requestors[0],
      commander: commanders[0],
      date: '',
      type: types[0],
      location: '',
      notes: '',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Orders — Rio Verde Fire Dept</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1.5 bg-red-600 text-white text-xs font-mono rounded hover:bg-red-700 transition-colors"
        >
          + New Order
        </button>
      </div>

      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Account</th>
                <th className="text-left py-3 px-4">Requestor</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Location</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-200">{o.id}</td>
                  <td className="py-3 px-4 text-slate-300">{o.account}</td>
                  <td className="py-3 px-4 text-slate-400">{o.requestor}</td>
                  <td className="py-3 px-4 text-slate-300">{o.type}</td>
                  <td className="py-3 px-4 text-slate-400">{o.date}</td>
                  <td className="py-3 px-4 text-slate-400">{o.location}</td>
                  <td className="py-3 px-4">
                    <span className={statusBadge(o.status)}>{o.status}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-200">{o.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600/90 text-white text-sm font-mono px-4 py-3 rounded-lg shadow-lg">
          ✅ {toast}
        </div>
      )}

      {/* New Order Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-white font-semibold mb-1">New Order</h3>
            <p className="text-xs text-slate-500 mb-4 font-mono">Rio Verde Fire Dept · $1,000/sortie</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Requestor</label>
                <select
                  value={form.requestor}
                  onChange={(e) => setForm({ ...form, requestor: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  {requestors.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Commander</label>
                <select
                  value={form.commander}
                  onChange={(e) => setForm({ ...form, commander: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  {commanders.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    {types.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Date</label>
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="Mar 16"
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500 resize-none"
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
