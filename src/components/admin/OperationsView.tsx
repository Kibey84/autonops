'use client';

import { useState } from 'react';
import {
  Crosshair,
  CheckCircle2,
  Clock,
  Timer,
  PlaneTakeoff,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  getOperationsSummary,
  missions,
  aircraft,
  pilots,
} from '@/lib/data/mock';

const missionStatusBadge = (status: string) => {
  const base = 'text-[10px] font-mono px-2 py-0.5 rounded border';
  switch (status) {
    case 'active':
      return `${base} bg-green-500/20 text-green-400 border-green-500/30`;
    case 'completed':
      return `${base} bg-blue-500/20 text-blue-400 border-blue-500/30`;
    case 'planning':
    case 'briefed':
      return `${base} bg-amber-500/20 text-amber-400 border-amber-500/30`;
    case 'debriefing':
      return `${base} bg-violet-500/20 text-violet-400 border-violet-500/30`;
    case 'closed':
      return `${base} bg-slate-500/20 text-slate-400 border-slate-500/30`;
    default:
      return `${base} bg-slate-500/20 text-slate-400 border-slate-500/30`;
  }
};

const assetStatusBadge = (status: string) => {
  const base = 'text-[10px] font-mono px-2 py-0.5 rounded border';
  switch (status) {
    case 'active':
    case 'on_mission':
      return `${base} bg-green-500/20 text-green-400 border-green-500/30`;
    case 'available':
    case 'standby':
      return `${base} bg-slate-500/20 text-slate-400 border-slate-500/30`;
    case 'maintenance':
      return `${base} bg-amber-500/20 text-amber-400 border-amber-500/30`;
    case 'offline':
      return `${base} bg-red-500/20 text-red-400 border-red-500/30`;
    default:
      return `${base} bg-slate-500/20 text-slate-400 border-slate-500/30`;
  }
};

export default function OperationsView() {
  const ops = getOperationsSummary();
  const [expandedMission, setExpandedMission] = useState<string | null>(null);

  const cards = [
    {
      label: 'Total Missions',
      value: String(ops.totalMissions),
      icon: Crosshair,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
    },
    {
      label: 'Active',
      value: String(ops.activeMissions),
      icon: Clock,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    {
      label: 'Completed',
      value: String(ops.completedMissions),
      icon: CheckCircle2,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
    },
    {
      label: 'Avg Response Time',
      value: ops.avgResponseTime,
      icon: Timer,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
    },
    {
      label: 'Total Flight Hours',
      value: String(ops.totalFlightHours),
      icon: PlaneTakeoff,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
    },
  ];

  // Resource assignment: which pilots are on which missions
  const activeAssignments = missions
    .filter((m) => m.status === 'active')
    .map((m) => ({
      missionId: m.displayId,
      commander: m.commanderName ?? '—',
      controller: m.controllerName ?? '—',
      aircraft: m.aircraftName ?? '—',
      location: m.location,
    }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Operations</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
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

      {/* All Missions Table */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            All Missions
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4 w-8"></th>
                <th className="text-left py-3 px-4">Mission ID</th>
                <th className="text-left py-3 px-4">Account</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Location</th>
                <th className="text-left py-3 px-4">Commander</th>
                <th className="text-left py-3 px-4">Aircraft</th>
                <th className="text-right py-3 px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((m) => (
                <>
                  <tr
                    key={m.id}
                    onClick={() =>
                      setExpandedMission(expandedMission === m.id ? null : m.id)
                    }
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4 text-slate-500">
                      {expandedMission === m.id ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-200">{m.displayId}</td>
                    <td className="py-3 px-4 text-slate-300">{m.accountName}</td>
                    <td className="py-3 px-4 text-slate-300">{m.type}</td>
                    <td className="py-3 px-4">
                      <span className={missionStatusBadge(m.status)}>{m.status}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{m.location}</td>
                    <td className="py-3 px-4 text-slate-300">{m.commanderName ?? '—'}</td>
                    <td className="py-3 px-4 text-slate-300">{m.aircraftName ?? '—'}</td>
                    <td className="py-3 px-4 text-right text-slate-200">
                      {m.score !== null ? m.score : '—'}
                    </td>
                  </tr>
                  {expandedMission === m.id && (
                    <tr key={`${m.id}-details`}>
                      <td colSpan={9} className="bg-slate-900/60 px-8 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-[11px]">
                          <div>
                            <span className="text-slate-500">Controller:</span>{' '}
                            <span className="text-slate-300">{m.controllerName ?? '—'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Start:</span>{' '}
                            <span className="text-slate-300">
                              {m.startTime
                                ? new Date(m.startTime).toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : '—'}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">End:</span>{' '}
                            <span className="text-slate-300">
                              {m.endTime
                                ? new Date(m.endTime).toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : 'In Progress'}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Coordinates:</span>{' '}
                            <span className="text-slate-300">
                              {m.lat.toFixed(4)}, {m.lng.toFixed(4)}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Request ID:</span>{' '}
                            <span className="text-slate-300">{m.requestId ?? '—'}</span>
                          </div>
                          {m.aarSummary && (
                            <div className="md:col-span-2 lg:col-span-3">
                              <span className="text-slate-500">AAR Summary:</span>{' '}
                              <span className="text-slate-400">{m.aarSummary}</span>
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

      {/* Aircraft Status */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            Aircraft Status
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Location</th>
                <th className="text-right py-3 px-4">Flight Hours</th>
                <th className="text-left py-3 px-4">Next Maintenance</th>
              </tr>
            </thead>
            <tbody>
              {aircraft.map((ac) => (
                <tr
                  key={ac.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-200">{ac.displayId}</td>
                  <td className="py-3 px-4 text-slate-200">{ac.name}</td>
                  <td className="py-3 px-4 text-slate-300 uppercase">{ac.type}</td>
                  <td className="py-3 px-4">
                    <span className={assetStatusBadge(ac.status)}>{ac.status}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{ac.location}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{ac.totalFlightHours}</td>
                  <td className="py-3 px-4 text-slate-400">{ac.nextMaintenance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pilot / Controller Roster */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            Pilot / Controller Roster
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Location</th>
                <th className="text-right py-3 px-4">Flight Hours</th>
                <th className="text-left py-3 px-4">Certifications</th>
              </tr>
            </thead>
            <tbody>
              {pilots.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-3 px-4 text-slate-200">{p.displayId}</td>
                  <td className="py-3 px-4 text-slate-200">{p.name}</td>
                  <td className="py-3 px-4 text-slate-300 capitalize">{p.type}</td>
                  <td className="py-3 px-4">
                    <span className={assetStatusBadge(p.status)}>
                      {p.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{p.location}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{p.totalFlightHours}</td>
                  <td className="py-3 px-4 text-slate-400">{p.certifications.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resource Assignment */}
      {activeAssignments.length > 0 && (
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
              Active Resource Assignment
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] font-mono">
              <thead>
                <tr className="text-slate-500 border-b border-slate-700 bg-slate-800">
                  <th className="text-left py-3 px-4">Mission</th>
                  <th className="text-left py-3 px-4">Commander</th>
                  <th className="text-left py-3 px-4">Controller</th>
                  <th className="text-left py-3 px-4">Aircraft</th>
                  <th className="text-left py-3 px-4">Location</th>
                </tr>
              </thead>
              <tbody>
                {activeAssignments.map((a) => (
                  <tr
                    key={a.missionId}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-slate-200">{a.missionId}</td>
                    <td className="py-3 px-4 text-slate-300">{a.commander}</td>
                    <td className="py-3 px-4 text-slate-300">{a.controller}</td>
                    <td className="py-3 px-4 text-slate-300">{a.aircraft}</td>
                    <td className="py-3 px-4 text-slate-400">{a.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
