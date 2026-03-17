'use client';

import { useState, useRef, useEffect } from 'react';
import DashboardPanel from './DashboardPanel';

interface CommsEntry {
  time: string;
  from: string;
  to?: string;
  message: string;
}

const initialLog: CommsEntry[] = [
  {
    time: '14:31:00',
    from: 'CTRL',
    to: 'PILOT',
    message: 'Blackfly-01, clear for departure. Winds 270 at 12.',
  },
  {
    time: '14:31:45',
    from: 'SYSTEM',
    message: 'FAA automated clearance confirmed. Flight plan filed.',
  },
  {
    time: '14:32:10',
    from: 'RIO VERDE FD',
    message: 'Control, we have eyes on smoke from Station 1. ETE?',
  },
  {
    time: '14:32:13',
    from: 'CTRL',
    to: 'RVFD',
    message: 'ETE 4 minutes. Dual feed live on your app shortly.',
  },
  {
    time: '14:33:00',
    from: 'SYSTEM',
    message: 'Waypoint 3 reached. Beginning transit to survey zone.',
  },
  {
    time: '14:33:47',
    from: 'PILOT',
    to: 'CTRL',
    message: 'Blackfly-01, approaching survey altitude. Ready.',
  },
];

export default function CommsLogPanel() {
  const [log, setLog] = useState<CommsEntry[]>(initialLog);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [log]);

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    setLog((prev) => [...prev, { time, from: 'CTRL', to: 'ALL', message: input.trim() }]);
    setInput('');
  };

  return (
    <DashboardPanel title="Communications Log" statusColor="green">
      <div className="flex flex-col h-full">
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1.5 mb-3 max-h-36 pr-1">
          {log.map((entry, i) => (
            <div key={i} className="text-[10px] font-mono">
              <span className="text-slate-500">{entry.time}</span>
              <span className="text-slate-500"> | </span>
              <span className="text-cyan-400">
                {entry.from}
                {entry.to && ` → ${entry.to}`}
              </span>
              <span className="text-slate-500"> | </span>
              <span className="text-slate-300">&ldquo;{entry.message}&rdquo;</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type message..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
          <button
            onClick={handleSend}
            className="px-3 py-1.5 bg-red-600 text-white text-xs font-mono rounded hover:bg-red-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </DashboardPanel>
  );
}
