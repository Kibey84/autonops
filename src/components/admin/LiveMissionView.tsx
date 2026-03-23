'use client';

import { useState, useCallback } from 'react';
import { Shield, Lock } from 'lucide-react';
import MissionControlScreen from './MissionControlScreen';

const PILOT_PINS: Record<string, string> = {
  'KIBE': '1234',
  'SUNDAY': '1234',
  'DAWSON': '1234',
  'DEMO': '0000',
};

export default function LiveMissionView() {
  const [verified, setVerified] = useState(false);
  const [callsign, setCallsign] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleVerify = useCallback(() => {
    setError('');
    const match = PILOT_PINS[callsign.toUpperCase()];
    if (match && match === pin) {
      setVerified(true);
      // Request fullscreen
      try {
        document.documentElement.requestFullscreen?.();
      } catch {
        // Fullscreen may be blocked by browser
      }
    } else {
      setError('Invalid callsign or PIN. Contact operations.');
    }
  }, [callsign, pin]);

  if (verified) {
    return <MissionControlScreen pilotCallsign={callsign.toUpperCase()} />;
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-sm">
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Pilot Verification</h2>
            <p className="text-sm text-slate-400 mt-1">Authorized flight crew only</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-mono uppercase tracking-wider">Callsign</label>
              <input
                type="text"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                placeholder="e.g. KIBE"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono uppercase placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-mono uppercase tracking-wider">PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                placeholder="4-digit PIN"
                maxLength={4}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono tracking-[0.5em] text-center placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 text-xs text-red-400 font-mono">
                {error}
              </div>
            )}

            <button
              onClick={handleVerify}
              className="w-full px-4 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              VERIFY & ENTER MISSION CONTROL
            </button>
          </div>

          <p className="text-center text-[10px] text-slate-600 mt-4 font-mono">
            Demo: callsign DEMO / PIN 0000
          </p>
        </div>
      </div>
    </div>
  );
}
