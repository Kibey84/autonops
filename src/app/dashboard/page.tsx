'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Radio,
  PlusCircle,
  Crosshair,
  FileText,
  Receipt,
  MessageSquare,
  LogOut,
} from 'lucide-react';
import { getSession, clearSession } from '@/lib/data/auth';
import type { AuthSession, Mission } from '@/lib/data/types';
import { getActiveMissionForAccount, deriveMissionRole, missions } from '@/lib/data/mock';
import LiveClock from '@/components/dashboard/LiveClock';
import CustomerOverview from '@/components/dashboard/CustomerOverview';
import LiveMissionTab from '@/components/dashboard/LiveMissionTab';
import RequestMissionForm from '@/components/dashboard/RequestMissionForm';
import CustomerMissionsView from '@/components/dashboard/CustomerMissionsView';
import CustomerDeliverablesView from '@/components/dashboard/CustomerDeliverablesView';
import CustomerBillingView from '@/components/dashboard/CustomerBillingView';
import CustomerMessagesView from '@/components/dashboard/CustomerMessagesView';

type View = 'overview' | 'live' | 'request' | 'missions' | 'deliverables' | 'billing' | 'messages';

const sidebarItems: { key: View; label: string; icon: typeof LayoutDashboard; accent?: boolean }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'live', label: 'Live Mission', icon: Radio, accent: true },
  { key: 'request', label: 'Request Mission', icon: PlusCircle },
  { key: 'missions', label: 'My Missions', icon: Crosshair },
  { key: 'deliverables', label: 'Deliverables', icon: FileText },
  { key: 'billing', label: 'Billing', icon: Receipt },
  { key: 'messages', label: 'Messages', icon: MessageSquare },
];

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [activeView, setActiveView] = useState<View>('overview');

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== 'customer') {
      router.push('/login');
      return;
    }
    setSession(s);
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  if (!session) {
    return (
      <div className="dark min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Resolve the active mission for the customer's account, then derive
  // the user's role within that mission. Falls back to the first mission
  // if no active one is found (for demo continuity).
  const activeMission: Mission | undefined =
    (session.accountId && getActiveMissionForAccount(session.accountId)) ||
    missions.find((m) => m.accountId === session.accountId) ||
    missions[0];

  const missionRole = activeMission
    ? deriveMissionRole(session.userId, activeMission)
    : 'observer';

  const views: Record<View, React.ReactNode> = {
    overview: <CustomerOverview session={session} onNavigate={(v) => setActiveView(v as View)} />,
    live: activeMission ? (
      <LiveMissionTab session={session} role={missionRole} mission={activeMission} />
    ) : (
      <div className="text-slate-500 font-mono text-sm p-8">No active mission found.</div>
    ),
    request: <RequestMissionForm session={session} />,
    missions: <CustomerMissionsView session={session} />,
    deliverables: <CustomerDeliverablesView session={session} />,
    billing: <CustomerBillingView session={session} />,
    messages: <CustomerMessagesView session={session} />,
  };

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-200">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="AutonOps" width={120} height={34} className="h-8 w-auto" />
        </div>
        <div className="hidden sm:block">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
            Client Portal
          </span>
        </div>
        <div className="flex items-center gap-4">
          <LiveClock />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white border border-slate-700 rounded hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar — Desktop */}
      <aside className="fixed top-14 left-0 bottom-0 w-[220px] bg-slate-900 border-r border-slate-800 py-4 hidden lg:flex flex-col">
        <div className="px-4 mb-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">Account</p>
          <p className="text-sm text-white font-medium truncate">{session.accountName}</p>
          <p className="text-xs text-slate-500 truncate">{session.userName}</p>
        </div>
        <div className="border-t border-slate-800 mx-3 mb-3" />
        <nav className="space-y-1 px-3 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveView(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeView === item.key
                  ? item.accent
                    ? 'bg-red-600/30 text-red-400 font-medium'
                    : 'bg-red-600/20 text-red-400 font-medium'
                  : item.accent
                    ? 'text-red-400/70 hover:bg-red-600/10 hover:text-red-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-4 h-4 ${item.accent && activeView !== item.key ? 'animate-pulse' : ''}`} />
              {item.label}
              {item.accent && activeView !== item.key && (
                <span className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-2 flex gap-2 overflow-x-auto">
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveView(item.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs whitespace-nowrap transition-colors ${
              activeView === item.key
                ? 'bg-red-600/20 text-red-400 font-medium'
                : item.accent
                  ? 'text-red-400/70 hover:bg-red-600/10'
                  : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="pt-14 lg:pl-[220px]">
        <div className="p-4 lg:p-6 mt-10 lg:mt-0">
          {views[activeView]}
        </div>
      </main>
    </div>
  );
}
