'use client';

import { useState, useEffect } from 'react';
import {
  Flame, Clock, CheckCircle2, FileText, ArrowRight, MessageSquare,
} from 'lucide-react';
import type { AuthSession, Mission, MissionRequest, Report, Message } from '@/lib/data/types';
import {
  getMissionsForAccount,
  getRequestsForAccount,
  getReportsForAccount,
  getMessagesForAccount,
} from '@/lib/data/mock';
import DashboardPanel from './DashboardPanel';

interface CustomerOverviewProps {
  session: AuthSession;
  onNavigate: (view: string) => void;
}

export default function CustomerOverview({ session, onNavigate }: CustomerOverviewProps) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [requests, setRequests] = useState<MissionRequest[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!session.accountId) return;
    setMissions(getMissionsForAccount(session.accountId));
    setRequests(getRequestsForAccount(session.accountId));
    setReports(getReportsForAccount(session.accountId));
    setMessages(getMessagesForAccount(session.accountId, false));
  }, [session.accountId]);

  const activeMissions = missions.filter((m) => m.status === 'active').length;
  const pendingRequests = requests.filter((r) =>
    ['submitted', 'under_review'].includes(r.status)
  ).length;
  const totalMissions = missions.length;
  const deliverables = reports.length;
  const recentMessages = messages.slice(-5).reverse();

  const cards = [
    {
      label: 'Active Missions',
      value: activeMissions,
      icon: Flame,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
    },
    {
      label: 'Pending Requests',
      value: pendingRequests,
      icon: Clock,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
    },
    {
      label: 'Total Missions',
      value: totalMissions,
      icon: CheckCircle2,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    {
      label: 'Deliverables Available',
      value: deliverables,
      icon: FileText,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {session.userName}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {session.accountName} &mdash; Client Portal Overview
        </p>
      </div>

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
              <p className="font-mono text-2xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <DashboardPanel title="Recent Activity" statusColor="cyan">
            {recentMessages.length === 0 ? (
              <p className="text-sm text-slate-500">No recent activity.</p>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-slate-300 font-medium">
                          {msg.userName}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          {new Date(msg.createdAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 truncate">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </DashboardPanel>
        </div>

        {/* Quick Actions */}
        <div>
          <DashboardPanel title="Quick Actions" statusColor="green">
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('request')}
                className="w-full flex items-center justify-between p-4 bg-red-600/10 border border-red-500/30 rounded-lg text-left hover:bg-red-600/20 transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-red-400">Request New Mission</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Submit a new mission request
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
              </button>

              {activeMissions > 0 && (
                <button
                  onClick={() => onNavigate('missions')}
                  className="w-full flex items-center justify-between p-4 bg-amber-600/10 border border-amber-500/30 rounded-lg text-left hover:bg-amber-600/20 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-amber-400">View Active Mission</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Monitor live mission status
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              <button
                onClick={() => onNavigate('deliverables')}
                className="w-full flex items-center justify-between p-4 bg-cyan-600/10 border border-cyan-500/30 rounded-lg text-left hover:bg-cyan-600/20 transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-cyan-400">View Deliverables</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Reports, imagery, and data packages
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </DashboardPanel>
        </div>
      </div>
    </div>
  );
}
