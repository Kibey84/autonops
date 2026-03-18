'use client';

import { useState, useEffect } from 'react';
import { Download, FileText, Image as ImageIcon, Thermometer, Video, Database } from 'lucide-react';
import type { AuthSession, Report } from '@/lib/data/types';
import { getReportsForAccount } from '@/lib/data/mock';
import DashboardPanel from './DashboardPanel';

interface CustomerDeliverablesViewProps {
  session: AuthSession;
}

const typeConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: typeof FileText }
> = {
  aar: { label: 'AAR', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: FileText },
  imagery: { label: 'Imagery', color: 'text-green-400', bg: 'bg-green-500/10', icon: ImageIcon },
  thermal: { label: 'Thermal', color: 'text-orange-400', bg: 'bg-orange-500/10', icon: Thermometer },
  video: { label: 'Video', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: Video },
  data_package: { label: 'Data Package', color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: Database },
  analysis: { label: 'Analysis', color: 'text-slate-400', bg: 'bg-slate-500/10', icon: FileText },
};

function formatFileSize(bytes?: number): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(1)} MB`;
  return `${(bytes / 1073741824).toFixed(1)} GB`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function CustomerDeliverablesView({ session }: CustomerDeliverablesViewProps) {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    if (!session.accountId) return;
    setReports(getReportsForAccount(session.accountId));
  }, [session.accountId]);

  // Group by mission
  const grouped = reports.reduce<Record<string, Report[]>>((acc, report) => {
    const key = report.missionDisplayId || report.missionId;
    if (!acc[key]) acc[key] = [];
    acc[key].push(report);
    return acc;
  }, {});

  const missionKeys = Object.keys(grouped);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Deliverables</h1>
        <p className="text-sm text-slate-400 mt-1">
          {reports.length} deliverable{reports.length !== 1 ? 's' : ''} across{' '}
          {missionKeys.length} mission{missionKeys.length !== 1 ? 's' : ''}
        </p>
      </div>

      {missionKeys.length === 0 ? (
        <DashboardPanel title="No Deliverables" statusColor="cyan">
          <p className="text-sm text-slate-500 py-4">
            No deliverables available yet. Reports and data packages will appear here after
            mission completion.
          </p>
        </DashboardPanel>
      ) : (
        <div className="space-y-4">
          {missionKeys.map((missionKey) => {
            const missionReports = grouped[missionKey];
            return (
              <DashboardPanel
                key={missionKey}
                title={`Mission ${missionKey}`}
                statusColor="cyan"
                headerRight={
                  <span className="font-mono text-[10px] text-slate-500">
                    {missionReports.length} file{missionReports.length !== 1 ? 's' : ''}
                  </span>
                }
              >
                <div className="space-y-2">
                  {missionReports.map((report) => {
                    const config = typeConfig[report.type] || typeConfig.analysis;
                    const Icon = config.icon;

                    return (
                      <div
                        key={report.id}
                        className="flex items-center gap-4 p-3 bg-slate-900/30 border border-slate-700/50 rounded-lg hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Type Icon */}
                        <div className={`${config.bg} p-2.5 rounded-lg shrink-0`}>
                          <Icon className={`w-4 h-4 ${config.color}`} />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm text-white font-medium truncate">
                              {report.title}
                            </p>
                            <span
                              className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-mono uppercase ${config.bg} ${config.color}`}
                            >
                              {config.label}
                            </span>
                          </div>
                          {report.description && (
                            <p className="text-xs text-slate-400 truncate">
                              {report.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-1">
                            {report.fileSize && (
                              <span className="font-mono text-[10px] text-slate-500">
                                {formatFileSize(report.fileSize)}
                              </span>
                            )}
                            <span className="font-mono text-[10px] text-slate-500">
                              {formatDate(report.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Download Button */}
                        <button className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-xs font-mono text-slate-300 hover:bg-slate-600/50 hover:text-white transition-colors">
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </button>
                      </div>
                    );
                  })}
                </div>
              </DashboardPanel>
            );
          })}
        </div>
      )}
    </div>
  );
}
