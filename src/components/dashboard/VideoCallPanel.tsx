'use client';

import { useState } from 'react';
import { Video, ChevronDown, ChevronUp, PhoneOff } from 'lucide-react';
import type { MissionRole } from '@/lib/data/types';

interface VideoCallPanelProps {
  dailyRoomUrl: string | null | undefined;
  role: MissionRole;
  missionDisplayId: string;
}

export default function VideoCallPanel({
  dailyRoomUrl,
  role,
  missionDisplayId,
}: VideoCallPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const [joined, setJoined] = useState(false);

  const canJoin = role !== 'observer' || !!dailyRoomUrl;

  if (!dailyRoomUrl) {
    return (
      <div className="bg-slate-800/80 border border-slate-700 rounded-xl">
        <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
              Mission Call
            </span>
          </div>
          <span className="font-mono text-[9px] text-slate-500">CALL NOT STARTED</span>
        </div>
        <div className="p-6 text-center">
          <Video className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-[11px] text-slate-500 font-mono">
            Mission call has not been initiated by the commander.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-2.5 flex items-center justify-between border-b border-slate-700 hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${joined ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300">
            Mission Call
          </span>
          {joined && (
            <span className="font-mono text-[9px] text-green-400 ml-2">CONNECTED</span>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {expanded && (
        <div className="p-3">
          {!joined ? (
            <button
              onClick={() => setJoined(true)}
              disabled={!canJoin}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-mono font-bold rounded-lg transition-colors"
            >
              <Video className="w-4 h-4" />
              JOIN MISSION CALL
            </button>
          ) : (
            <div className="space-y-2">
              <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-lg overflow-hidden border border-slate-700">
                <iframe
                  src={`${dailyRoomUrl}?userName=${encodeURIComponent(role)}-${missionDisplayId}`}
                  allow="camera; microphone; fullscreen; speaker; display-capture; autoplay"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <button
                onClick={() => setJoined(false)}
                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-[10px] font-mono rounded transition-colors"
              >
                <PhoneOff className="w-3 h-3" />
                LEAVE CALL
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
