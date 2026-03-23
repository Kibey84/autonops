'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  DollarSign,
  Crosshair,
  Users,
  ShieldCheck,
  BarChart3,
  Joystick,
  LogOut,
} from 'lucide-react';
import { getSession, clearSession, isAdmin } from '@/lib/data/auth';
import type { AuthSession } from '@/lib/data/types';
import LiveClock from '@/components/dashboard/LiveClock';
import AdminOverview from '@/components/admin/AdminOverview';
import FinanceView from '@/components/admin/FinanceView';
import OperationsView from '@/components/admin/OperationsView';
import CRMView from '@/components/admin/CRMView';
import ComplianceView from '@/components/admin/ComplianceView';
import AnalyticsView from '@/components/admin/AnalyticsView';
import LiveMissionView from '@/components/admin/LiveMissionView';

type AdminView = 'overview' | 'live' | 'finance' | 'operations' | 'crm' | 'compliance' | 'analytics';

const sidebarItems: { key: AdminView; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'live', label: 'Live Mission', icon: Joystick },
  { key: 'finance', label: 'Finance', icon: DollarSign },
  { key: 'operations', label: 'Operations', icon: Crosshair },
  { key: 'crm', label: 'CRM', icon: Users },
  { key: 'compliance', label: 'Compliance', icon: ShieldCheck },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function AdminPage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [activeView, setActiveView] = useState<AdminView>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push('/login');
      return;
    }
    if (!isAdmin(s.role)) {
      router.push('/dashboard');
      return;
    }
    setSession(s);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  if (loading || !session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const views: Record<AdminView, React.ReactNode> = {
    overview: <AdminOverview onNavigate={(v) => setActiveView(v as AdminView)} />,
    live: <LiveMissionView />,
    finance: <FinanceView />,
    operations: <OperationsView />,
    crm: <CRMView />,
    compliance: <ComplianceView />,
    analytics: <AnalyticsView />,
  };

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-200">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="AutonOps" width={120} height={34} className="h-8 w-auto" />
        </div>
        <div className="hidden sm:block">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-400">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <LiveClock />
          <span className="hidden md:inline font-mono text-xs text-slate-400">
            {session.userName}
          </span>
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
      <aside className="fixed top-14 left-0 bottom-0 w-[240px] bg-slate-900 border-r border-slate-800 py-4 hidden lg:block">
        <nav className="space-y-1 px-3">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveView(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeView === item.key
                  ? 'bg-red-600/20 text-red-400 font-medium'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
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
                : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="pt-14 lg:pl-[240px]">
        <div className="p-4 lg:p-6 mt-10 lg:mt-0">
          {views[activeView]}
        </div>
      </main>
    </div>
  );
}
