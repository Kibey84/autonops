'use client';

import dynamic from 'next/dynamic';
import ScrollAnimation from '@/components/ScrollAnimation';

const MissionMapClient = dynamic(
  () => import('@/components/sections/MissionMapClient'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />
    ),
  }
);

export default function MissionMap() {
  return (
    <div className="py-16">
      <ScrollAnimation animation="fade-in">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Mission Operations Map
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real-time tracking of all assets from dispatch to delivery.
          </p>
        </div>
      </ScrollAnimation>

      <ScrollAnimation animation="fade-in">
        <MissionMapClient />
      </ScrollAnimation>

      <ScrollAnimation animation="fade-in">
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="font-semibold text-slate-900 dark:text-white mb-2">
            This is what the Mission Controller sees the moment an incident is reported.
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            Aircraft position, fire location, flight path, and all assets are tracked in real time.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Simulation integration with Sinclair Community College&apos;s flight simulator — coming soon.
          </p>
        </div>
      </ScrollAnimation>
    </div>
  );
}
