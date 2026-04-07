'use client';

import { useState } from 'react';
import { FileText, Loader2, Sparkles } from 'lucide-react';
import { generateAAR } from '@/app/actions/missions';

interface Mission {
  id: string;
  date: string;
  type: string;
  account: string;
  location: string;
  status: string;
  score: string;
  aar: string;
  sortieEfficiency: number;
  aiAccuracy: number;
  responseTime: number;
  cost: string;
  price: string;
  profit: string;
  aarReport?: string | null;
}

const missions: Mission[] = [
  {
    id: 'MSN-2025-0001',
    date: 'Mar 16, 2025',
    type: 'Fire',
    account: 'Rio Verde FD',
    location: 'Rio Verde, AZ',
    status: 'In Progress',
    score: '—',
    aar: 'Mission currently in progress. Active fire response near Rio Verde, AZ. UAV deployed from Rio Verde staging area. Dual camera feeds active. AI analysis running.',
    sortieEfficiency: 0,
    aiAccuracy: 0,
    responseTime: 0,
    cost: '—',
    price: '—',
    profit: '—',
  },
  {
    id: 'MSN-2024-0002',
    date: 'Dec 03, 2024',
    type: 'SAR',
    account: 'Rio Verde FD',
    location: 'Rio Verde, AZ',
    status: 'Closed',
    score: '91/100',
    aar: 'Search and rescue operation in rural Maricopa County, coordinated with Rio Verde FD. Thermal imaging located missing individual within 22 minutes of aircraft deployment. Coordinates relayed to ground teams who completed extraction. Mission scored highly for response time and AI accuracy.',
    sortieEfficiency: 90,
    aiAccuracy: 93,
    responseTime: 91,
    cost: '$680',
    price: '$1,000',
    profit: '$320',
  },
  {
    id: 'MSN-2024-0001',
    date: 'Nov 14, 2024',
    type: 'Fire',
    account: 'Rio Verde FD',
    location: 'Rio Verde, AZ',
    status: 'Closed',
    score: '87/100',
    aar: 'Fire response mission supporting Rio Verde FD near rural Maricopa County. Aircraft deployed within 6 minutes of dispatch. Thermal imaging identified active fire line and 3 hotspots. One heat signature flagged — determined to be livestock. After-action report delivered same day.',
    sortieEfficiency: 88,
    aiAccuracy: 85,
    responseTime: 89,
    cost: '$710',
    price: '$1,000',
    profit: '$290',
  },
];

const statusBadge = (status: string) => {
  const base = 'text-[10px] font-mono px-2 py-0.5 rounded border';
  if (status === 'In Progress')
    return `${base} bg-amber-500/20 text-amber-400 border-amber-500/30`;
  return `${base} bg-green-500/20 text-green-400 border-green-500/30`;
};

export default function MissionHistoryView() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [aarReports, setAarReports] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState<string | null>(null);
  const [aarError, setAarError] = useState<string | null>(null);

  const handleGenerateAAR = async (missionId: string) => {
    setGenerating(missionId);
    setAarError(null);
    try {
      const result = await generateAAR(missionId);
      if (result.success && result.report) {
        setAarReports((prev) => ({ ...prev, [missionId]: result.report! }));
      } else {
        setAarError(result.error || 'Generation failed');
      }
    } catch (err) {
      setAarError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">Mission History — Rio Verde Fire Dept</h2>
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4">Mission ID</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Account</th>
                <th className="text-left py-3 px-4">Location</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((m) => (
                <>
                  <tr
                    key={m.id}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer transition-colors"
                    onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                  >
                    <td className="py-3 px-4 text-slate-200">{m.id}</td>
                    <td className="py-3 px-4 text-slate-400">{m.date}</td>
                    <td className="py-3 px-4 text-slate-300">{m.type}</td>
                    <td className="py-3 px-4 text-slate-300">{m.account}</td>
                    <td className="py-3 px-4 text-slate-400">{m.location}</td>
                    <td className="py-3 px-4">
                      <span className={statusBadge(m.status)}>{m.status}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-200">{m.score}</td>
                  </tr>
                  {expanded === m.id && (
                    <tr key={`${m.id}-detail`} className="bg-slate-800/50">
                      <td colSpan={7} className="px-6 py-5">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                              AI After-Action Report
                            </h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                              {m.aar}
                            </p>
                          </div>
                          {m.status === 'Closed' && (
                            <>
                              <div>
                                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                  Mission Score Breakdown
                                </h4>
                                <div className="grid grid-cols-3 gap-4">
                                  {[
                                    { label: 'Sortie Efficiency', val: m.sortieEfficiency },
                                    { label: 'AI Accuracy', val: m.aiAccuracy },
                                    { label: 'Response Time', val: m.responseTime },
                                  ].map((s) => (
                                    <div key={s.label}>
                                      <div className="text-[10px] text-slate-500 mb-1">
                                        {s.label}
                                      </div>
                                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-green-500 rounded-full"
                                          style={{ width: `${s.val}%` }}
                                        />
                                      </div>
                                      <div className="text-[10px] text-slate-400 mt-0.5">
                                        {s.val}/100
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex gap-6 text-[11px]">
                                <span className="text-slate-500">
                                  Total Cost: <span className="text-slate-300">{m.cost}</span>
                                </span>
                                <span className="text-slate-500">
                                  Price: <span className="text-slate-300">{m.price}</span>
                                </span>
                                <span className="text-slate-500">
                                  Profit: <span className="text-green-400">{m.profit}</span>
                                </span>
                              </div>
                            </>
                          )}
                          {/* ── AFTER ACTION REPORT ── */}
                          {(m.status === 'Closed' || m.status === 'Complete') && (
                            <div className="mt-4 pt-4 border-t border-slate-700">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                                  After Action Report
                                </h4>
                                {!aarReports[m.id] && !m.aarReport && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleGenerateAAR(m.id); }}
                                    disabled={generating === m.id}
                                    className="flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-500 text-white text-[10px] font-mono font-bold rounded transition-colors"
                                  >
                                    {generating === m.id ? (
                                      <>
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        GENERATING...
                                      </>
                                    ) : (
                                      <>
                                        <Sparkles className="w-3 h-3" />
                                        GENERATE REPORT
                                      </>
                                    )}
                                  </button>
                                )}
                              </div>
                              {aarError && generating === null && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded px-3 py-2 text-[10px] text-red-400 font-mono mb-2">
                                  {aarError}
                                </div>
                              )}
                              {(aarReports[m.id] || m.aarReport) && (
                                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 max-h-96 overflow-y-auto">
                                  <pre className="font-mono text-[10px] text-slate-300 whitespace-pre-wrap leading-relaxed">
                                    {aarReports[m.id] || m.aarReport}
                                  </pre>
                                </div>
                              )}
                            </div>
                          )}
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
    </div>
  );
}
