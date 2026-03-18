'use client';

import { useState, useEffect } from 'react';
import {
  ChevronDown, ChevronRight, Eye, MapPin, User, Radio, Plane, Clock,
  Star,
} from 'lucide-react';
import type { AuthSession, Mission } from '@/lib/data/types';
import { getMissionsForAccount } from '@/lib/data/mock';
import DashboardPanel from './DashboardPanel';

interface CustomerMissionsViewProps {
  session: AuthSession;
}

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: 'bg-amber-500/10', text: 'text-amber-400', dot: 'bg-amber-500' },
  completed: { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-500' },
  planning: { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-500' },
  briefed: { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-500' },
  debriefing: { bg: 'bg-orange-500/10', text: 'text-orange-400', dot: 'bg-orange-500' },
  closed: { bg: 'bg-slate-500/10', text: 'text-slate-400', dot: 'bg-slate-500' },
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function CustomerMissionsView({ session }: CustomerMissionsViewProps) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!session.accountId) return;
    const data = getMissionsForAccount(session.accountId);
    // Sort: active first, then by createdAt desc
    data.sort((a, b) => {
      if (a.status === 'active' && b.status !== 'active') return -1;
      if (b.status === 'active' && a.status !== 'active') return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setMissions(data);
  }, [session.accountId]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">My Missions</h1>
        <p className="text-sm text-slate-400 mt-1">
          {missions.length} mission{missions.length !== 1 ? 's' : ''} on record
        </p>
      </div>

      <DashboardPanel title="Mission History" statusColor="green">
        {missions.length === 0 ? (
          <p className="text-sm text-slate-500 py-4">No missions found.</p>
        ) : (
          <div className="space-y-2">
            {/* Header row */}
            <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-500">
              <div className="col-span-1" />
              <div className="col-span-2">Mission ID</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Location</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1 text-right">Score</div>
            </div>

            {missions.map((mission) => {
              const isExpanded = expandedId === mission.id;
              const status = statusColors[mission.status] || statusColors.closed;

              return (
                <div key={mission.id}>
                  {/* Row */}
                  <button
                    onClick={() => toggleExpand(mission.id)}
                    className={`w-full grid grid-cols-12 gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isExpanded
                        ? 'bg-slate-700/50 border border-slate-600'
                        : 'bg-slate-900/30 border border-slate-700/50 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="col-span-1 flex items-center">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                    <div className="col-span-11 md:col-span-2 font-mono text-[11px] text-white font-medium">
                      {mission.displayId}
                    </div>
                    <div className="hidden md:block col-span-2 font-mono text-[11px] text-slate-300">
                      {mission.type}
                    </div>
                    <div className="hidden md:flex col-span-2 items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      <span className={`font-mono text-[11px] capitalize ${status.text}`}>
                        {mission.status}
                      </span>
                    </div>
                    <div className="hidden md:block col-span-2 font-mono text-[11px] text-slate-400">
                      {mission.location}
                    </div>
                    <div className="hidden md:block col-span-2 font-mono text-[11px] text-slate-400">
                      {formatDate(mission.startTime || mission.createdAt)}
                    </div>
                    <div className="hidden md:block col-span-1 text-right">
                      {mission.score !== null ? (
                        <span className="font-mono text-[11px] text-white font-medium">
                          {mission.score}
                        </span>
                      ) : (
                        <span className="font-mono text-[11px] text-slate-500">—</span>
                      )}
                    </div>
                  </button>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <div className="mt-1 ml-4 mr-2 p-4 bg-slate-900/50 border border-slate-700/50 rounded-lg space-y-4">
                      {/* Mission Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-start gap-2">
                          <User className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] font-mono uppercase text-slate-500">
                              Commander
                            </p>
                            <p className="font-mono text-[11px] text-slate-200">
                              {mission.commanderName || '—'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Radio className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] font-mono uppercase text-slate-500">
                              Controller
                            </p>
                            <p className="font-mono text-[11px] text-slate-200">
                              {mission.controllerName || '—'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Plane className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] font-mono uppercase text-slate-500">
                              Aircraft
                            </p>
                            <p className="font-mono text-[11px] text-slate-200">
                              {mission.aircraftName || '—'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] font-mono uppercase text-slate-500">
                              Location
                            </p>
                            <p className="font-mono text-[11px] text-slate-200">
                              {mission.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] font-mono uppercase text-slate-500">
                              Start Time
                            </p>
                            <p className="font-mono text-[11px] text-slate-200">
                              {mission.startTime
                                ? `${formatDate(mission.startTime)} ${formatTime(mission.startTime)}`
                                : '—'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] font-mono uppercase text-slate-500">
                              End Time
                            </p>
                            <p className="font-mono text-[11px] text-slate-200">
                              {mission.endTime
                                ? `${formatDate(mission.endTime)} ${formatTime(mission.endTime)}`
                                : 'In Progress'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Score */}
                      {mission.score !== null && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/30 inline-flex">
                          <Star className="w-4 h-4 text-amber-400" />
                          <span className="font-mono text-[11px] text-slate-300">
                            Mission Score:
                          </span>
                          <span className="font-mono text-sm text-white font-bold">
                            {mission.score}/100
                          </span>
                        </div>
                      )}

                      {/* AAR Summary */}
                      {mission.aarSummary && (
                        <div>
                          <p className="text-[10px] font-mono uppercase text-slate-500 mb-1.5">
                            After-Action Report Summary
                          </p>
                          <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 rounded-lg border border-slate-700/30 p-3">
                            {mission.aarSummary}
                          </p>
                        </div>
                      )}

                      {/* Active mission live button */}
                      {mission.status === 'active' && (
                        <div className="pt-2">
                          <button className="flex items-center gap-2 px-4 py-2.5 bg-amber-600/20 border border-amber-500/40 rounded-lg text-amber-400 text-sm font-medium hover:bg-amber-600/30 transition-colors">
                            <Eye className="w-4 h-4" />
                            View Live Dashboard
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </DashboardPanel>
    </div>
  );
}
