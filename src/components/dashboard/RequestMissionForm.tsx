'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import type { AuthSession } from '@/lib/data/types';
import DashboardPanel from './DashboardPanel';

interface RequestMissionFormProps {
  session: AuthSession;
}

export default function RequestMissionForm({ session }: RequestMissionFormProps) {
  const [incidentType, setIncidentType] = useState<string>('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState<string>('');
  const [description, setDescription] = useState('');
  const [requestedTiming, setRequestedTiming] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [displayId, setDisplayId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentType || !location || !urgency || !description) return;

    const id = `REQ-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 9000) + 1000
    )}`;
    setDisplayId(id);
    setSubmitted(true);
  };

  const handleReset = () => {
    setIncidentType('');
    setLocation('');
    setUrgency('');
    setDescription('');
    setRequestedTiming('');
    setSubmitted(false);
    setDisplayId('');
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <DashboardPanel title="Request Submitted" statusColor="green">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Mission Request Submitted</h2>
            <p className="font-mono text-sm text-green-400 mb-1">{displayId}</p>
            <p className="text-sm text-slate-400 mb-6">
              Your request has been received and will be reviewed by the operations team.
              You will receive updates in the Messages tab.
            </p>
            <div className="bg-slate-900/50 rounded-lg border border-slate-700/50 p-4 text-left max-w-sm mx-auto mb-6">
              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Type</span>
                  <span className="text-slate-300 uppercase">{incidentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location</span>
                  <span className="text-slate-300">{location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Urgency</span>
                  <span className="text-slate-300 uppercase">{urgency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Account</span>
                  <span className="text-slate-300">{session.accountName}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-600 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </DashboardPanel>
      </div>
    );
  }

  const inputClasses =
    'w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-colors font-mono text-[11px]';
  const labelClasses = 'block text-sm font-medium text-slate-300 mb-1.5';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Request a Mission</h1>
        <p className="text-sm text-slate-400 mt-1">
          Submit a new mission request for aerial support
        </p>
      </div>

      <DashboardPanel title="Mission Request Form" statusColor="red">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Incident Type */}
          <div>
            <label htmlFor="incidentType" className={labelClasses}>
              Incident Type <span className="text-red-400">*</span>
            </label>
            <select
              id="incidentType"
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className={inputClasses}
              required
            >
              <option value="" disabled>
                Select incident type...
              </option>
              <option value="fire">Fire</option>
              <option value="sar">Search &amp; Rescue</option>
              <option value="law">Law Enforcement</option>
              <option value="recon">Reconnaissance</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className={labelClasses}>
              Location <span className="text-red-400">*</span>
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClasses}
              placeholder="e.g., Rio Verde, AZ — East of E Rio Verde Dr"
              required
            />
          </div>

          {/* Urgency */}
          <div>
            <label htmlFor="urgency" className={labelClasses}>
              Urgency <span className="text-red-400">*</span>
            </label>
            <select
              id="urgency"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className={inputClasses}
              required
            >
              <option value="" disabled>
                Select urgency level...
              </option>
              <option value="immediate">Immediate — Deploy ASAP</option>
              <option value="scheduled">Scheduled — Within 48 hours</option>
              <option value="routine">Routine — Flexible timing</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelClasses}>
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClasses} min-h-[120px] resize-y`}
              placeholder="Describe the situation and what aerial support is needed..."
              required
            />
          </div>

          {/* Requested Timing */}
          <div>
            <label htmlFor="timing" className={labelClasses}>
              Requested Timing
            </label>
            <input
              id="timing"
              type="text"
              value={requestedTiming}
              onChange={(e) => setRequestedTiming(e.target.value)}
              className={inputClasses}
              placeholder="e.g., Immediate, Tomorrow 0600, Within 48 hours"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              Submit Mission Request
            </button>
          </div>
        </form>
      </DashboardPanel>
    </div>
  );
}
