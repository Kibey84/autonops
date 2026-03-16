'use client';

import {
  AlertTriangle,
  Zap,
  CheckCircle,
  Navigation,
  Camera,
  Cpu,
  Headphones,
  UserCheck,
  ClipboardCheck,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import ScrollAnimation from '@/components/ScrollAnimation';
import TiltCard from '@/components/TiltCard';
import DualFeedComparison from '@/components/sections/DualFeedComparison';
import MissionMap from '@/components/sections/MissionMap';

const responseSteps = [
  {
    step: '01',
    title: 'Incident Detection',
    icon: AlertTriangle,
    description:
      'A 911 call or fire report is received and the Autonops system automatically ingests the incident location from the dispatch feed. GPS coordinates and fire classification are captured instantly, triggering the response chain with no manual input required.',
  },
  {
    step: '02',
    title: 'Mission Auto-Generated',
    icon: Zap,
    description:
      'The system creates a mission record, plots the fire location on the operations map, identifies the nearest staged aircraft, and calculates an optimal flight path in seconds. A Mission Commander and Controller are auto-assigned based on real-time availability.',
  },
  {
    step: '03',
    title: 'FAA Clearance — Automated',
    icon: CheckCircle,
    description:
      'An automated FAA approval checklist — developed in partnership with the FAA — confirms airspace, weather, and aircraft conditions in real time. When conditions are met, clearance is confirmed without manual filing, reducing approval time from 20+ minutes to seconds.',
  },
  {
    step: '04',
    title: 'Aircraft Dispatched',
    icon: Navigation,
    description:
      'The UAV lifts off from its staging location at the local fire station. The Mission Controller monitors liftoff via live telemetry over Starlink from any location in Ohio. Mission status updates automatically to In Progress.',
  },
  {
    step: '05',
    title: 'Dual Aerial Feeds Go Live',
    icon: Camera,
    description:
      'Two simultaneous feeds stream to the Mission Control dashboard and directly to firefighters\u2019 mobile devices: an electro-optical (RGB) feed showing terrain and obstacles, and a thermal imaging feed revealing hotspots and fire lines invisible to standard cameras.',
  },
  {
    step: '06',
    title: 'AI Situational Awareness',
    icon: Cpu,
    description:
      'Onboard and cloud AI analyzes both feeds in real time, identifying the active fire line, predicted spread direction based on wind and terrain data, structures in the fire path, and heat signatures from people and animals — generating priority overlays for firefighters.',
  },
  {
    step: '07',
    title: 'Mission Controller Commands',
    icon: Headphones,
    description:
      'The remote controller adjusts waypoints, redirects the aircraft, and coordinates with ground crews via live video embedded in the dashboard. All voice communications and decisions are logged automatically for the after-action record.',
  },
  {
    step: '08',
    title: 'Firefighter Insertion (Phase 3)',
    icon: UserCheck,
    description:
      'For supported missions, a Joby air taxi stages at the fire station. A firefighter boards and is transported directly behind the fire line — arriving faster than any ground vehicle, with full situational awareness already streaming from the UAV overhead.',
  },
  {
    step: '09',
    title: 'After-Action Report',
    icon: ClipboardCheck,
    description:
      'The system auto-generates an AI after-action report, mission score, sortie summaries, cost breakdown, and full communications log — stored to the client account record and available immediately.',
  },
];

export default function HowItWorks() {
  return (
    <>
      {/* Hero */}
      <section
        id="how-it-works"
        className="relative bg-slate-900 text-white py-20 sm:py-28 overflow-hidden"
      >
        <div className="absolute inset-0 animated-gradient opacity-30" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[500px] h-[500px] bg-red-500/20 top-[-150px] left-[-100px]" />
          <div
            className="gradient-orb w-[400px] h-[400px] bg-blue-500/15 bottom-[-100px] right-[-100px]"
            style={{ animationDelay: '5s' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Autonomous Fire Response
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            How It <span className="text-shimmer">Works</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            From the moment a fire is reported to the final after-action report — every step is
            automated, tracked, and delivered in real time.
          </p>
        </div>
      </section>

      {/* Response Flow Steps */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-red-200 dark:bg-red-900 top-[-100px] right-[-100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                <span className="text-shimmer-slow">Response Flow</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Nine steps from incident to after-action — most happen automatically.
              </p>
            </div>
          </ScrollAnimation>

          <div className="space-y-6">
            {responseSteps.map((step, index) => (
              <ScrollAnimation key={step.step} animation="fade-in" delay={index * 60}>
                <TiltCard
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  tiltAmount={3}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-6 p-6 sm:p-8">
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-3xl font-bold text-shimmer font-mono">
                        {step.step}
                      </div>
                      <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-slate-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Camera Feed Comparison */}
      <section className="py-8 sm:py-12 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="gradient-orb w-[400px] h-[400px] bg-orange-200 dark:bg-orange-900 bottom-0 left-1/4"
            style={{ animationDelay: '3s' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DualFeedComparison />
        </div>
      </section>

      {/* Mission Map */}
      <section className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MissionMap />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-40" />
        <div className="absolute inset-0">
          <div className="gradient-orb w-[600px] h-[600px] bg-red-500/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to see Autonops <span className="text-shimmer">in action</span>?
          </h2>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">
            View the live mission dashboard or request a capability demonstration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard"
              className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 btn-glow"
            >
              View Mission Dashboard
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-slate-500 text-white font-medium rounded-lg hover:bg-white/5 hover:border-slate-400 transition-all duration-300"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
