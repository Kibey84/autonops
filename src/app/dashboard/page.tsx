'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Map, ClipboardList, Building2, Package, PlaneTakeoff, LogOut } from 'lucide-react';
import LiveClock from '@/components/dashboard/LiveClock';
import ActiveMissionView from '@/components/dashboard/ActiveMissionView';
import MissionHistoryView from '@/components/dashboard/MissionHistoryView';
import AccountsView from '@/components/dashboard/AccountsView';
import OrdersView from '@/components/dashboard/OrdersView';
import AssetsView from '@/components/dashboard/AssetsView';

type View = 'mission' | 'history' | 'accounts' | 'orders' | 'assets';

const sidebarItems: { key: View; label: string; icon: typeof Map }[] = [
  { key: 'mission', label: 'Active Mission', icon: Map },
  { key: 'history', label: 'Mission History', icon: ClipboardList },
  { key: 'accounts', label: 'Accounts', icon: Building2 },
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'assets', label: 'Assets', icon: PlaneTakeoff },
];

export default function DashboardPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<View>('mission');

  useEffect(() => {
    if (sessionStorage.getItem('autonops_auth') !== 'true') {
      router.push('/login');
      return;
    }
    setAuthenticated(true);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('autonops_auth');
    router.push('/login');
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const views: Record<View, React.ReactNode> = {
    mission: <ActiveMissionView />,
    history: <MissionHistoryView />,
    accounts: <AccountsView />,
    orders: <OrdersView />,
    assets: <AssetsView />,
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
            Mission Control
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

      {/* Sidebar */}
      <aside className="fixed top-14 left-0 bottom-0 w-[220px] bg-slate-900 border-r border-slate-800 py-4 hidden lg:block">
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

      {/* Mobile sidebar */}
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
      <main className="pt-14 lg:pl-[220px]">
        <div className="p-4 lg:p-6 mt-10 lg:mt-0">
          {views[activeView]}
        </div>
      </main>
    </div>
  );
}
