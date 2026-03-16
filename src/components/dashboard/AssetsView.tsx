'use client';

const assets = [
  { id: 'AC-001', type: 'Aircraft', name: 'Blackfly-01', status: 'Active', location: 'Springfield ANGB' },
  { id: 'AC-002', type: 'Aircraft', name: 'Blackfly-02', status: 'Standby', location: 'Sinclair CC' },
  { id: 'PLT-001', type: 'Pilot', name: 'Jared K.', status: 'On Mission', location: 'In Flight' },
  { id: 'PLT-002', type: 'Pilot', name: 'Josh T.', status: 'Available', location: 'Springboro, OH' },
  { id: 'CTR-001', type: 'Controller', name: 'Jaderic D.', status: 'On Mission', location: 'Remote' },
  { id: 'CTR-002', type: 'Controller', name: 'Matt S.', status: 'Available', location: 'Remote' },
];

const statusBadge = (status: string) => {
  const base = 'text-[10px] font-mono px-2 py-0.5 rounded border';
  if (status === 'Active' || status === 'On Mission')
    return `${base} bg-green-500/20 text-green-400 border-green-500/30`;
  if (status === 'Standby' || status === 'Available')
    return `${base} bg-slate-500/20 text-slate-400 border-slate-500/30`;
  return `${base} bg-red-500/20 text-red-400 border-red-500/30`;
};

export default function AssetsView() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">Assets</h2>
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4">Asset ID</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Location</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-200">{a.id}</td>
                  <td className="py-3 px-4 text-slate-300">{a.type}</td>
                  <td className="py-3 px-4 text-slate-200">{a.name}</td>
                  <td className="py-3 px-4">
                    <span className={statusBadge(a.status)}>{a.status}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{a.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
