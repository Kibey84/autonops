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
  Shield,
  Wifi,
  MapPin,
  Clock,
  Users,
  Phone,
  Server,
  ArrowDown,
  Radio,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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

const safetyPrinciples = [
  {
    icon: Shield,
    title: 'Safety First',
    description:
      'No mission is worth compromising safety. We maintain strict protocols and never pressure operators to fly in unsafe conditions.',
  },
  {
    icon: AlertTriangle,
    title: 'Risk Management',
    description:
      'Every mission includes formal risk assessment. We identify hazards early and develop specific mitigation strategies.',
  },
  {
    icon: CheckCircle,
    title: 'Continuous Improvement',
    description:
      'We learn from every operation. After-action reviews and lessons learned feed back into our procedures.',
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
            From a 911 call to the final after-action report — every step is automated,
            tracked, and delivered in real time. No manual dispatching. No waiting.
          </p>
        </div>
      </section>

      {/* 911 API Integration */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-200 dark:bg-blue-900 top-[-100px] left-[-100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 dark:text-green-400 text-sm mb-6">
                <Server className="w-4 h-4" />
                Seamless Integration
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                911 Dispatch <span className="text-shimmer-slow">to Airborne</span> — Zero Manual Steps
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
                Autonops connects directly to county and municipal 911 CAD systems via API. The moment a fire
                incident is dispatched, our system already knows about it.
              </p>
            </div>
          </ScrollAnimation>

          {/* API Flow Diagram */}
          <ScrollAnimation animation="fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Step 1: 911 Call */}
                <TiltCard
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-center"
                  tiltAmount={5}
                >
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">911 Call</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Caller reports fire</p>
                </TiltCard>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-slate-400" />
                </div>
                <div className="flex md:hidden items-center justify-center py-1">
                  <ArrowDown className="w-5 h-5 text-slate-400" />
                </div>

                {/* Step 2: CAD System */}
                <TiltCard
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-center"
                  tiltAmount={5}
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Radio className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">CAD Dispatch</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">County 911 system logs incident</p>
                </TiltCard>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-slate-400" />
                </div>
                <div className="flex md:hidden items-center justify-center py-1">
                  <ArrowDown className="w-5 h-5 text-slate-400" />
                </div>

                {/* Step 3: Autonops API */}
                <TiltCard
                  className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-500/30 rounded-xl p-5 text-center"
                  tiltAmount={5}
                >
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-red-700 dark:text-red-400 text-sm mb-1">Autonops API</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Mission auto-generated</p>
                </TiltCard>
              </div>

              {/* API Detail Box */}
              <div className="mt-8 bg-slate-800 dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Server className="w-4 h-4 text-green-400" />
                      What the API Receives
                    </h4>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300 space-y-1">
                      <div><span className="text-green-400">incident_id:</span> &quot;INC-2025-03847&quot;</div>
                      <div><span className="text-green-400">type:</span> &quot;STRUCTURE_FIRE&quot;</div>
                      <div><span className="text-green-400">priority:</span> &quot;HIGH&quot;</div>
                      <div><span className="text-green-400">lat:</span> 39.8850</div>
                      <div><span className="text-green-400">lng:</span> -83.7650</div>
                      <div><span className="text-green-400">address:</span> &quot;1247 Oak Ridge Rd&quot;</div>
                      <div><span className="text-green-400">units_dispatched:</span> [&quot;E4&quot;, &quot;L2&quot;]</div>
                      <div><span className="text-green-400">timestamp:</span> &quot;2025-03-16T14:28:31Z&quot;</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      What Autonops Does Instantly
                    </h4>
                    <ul className="space-y-2.5">
                      {[
                        'Creates mission record with GPS coords',
                        'Identifies nearest staged aircraft (Blackfly-01)',
                        'Calculates optimal flight path around obstacles',
                        'Auto-assigns available Controller + Commander',
                        'Runs FAA clearance checklist in parallel',
                        'Sends alert to firefighters\u2019 devices',
                        'Opens live dashboard for Incident Command',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-700 text-center">
                  <p className="text-slate-400 text-sm">
                    <span className="text-white font-semibold">Total time from 911 dispatch to aircraft launch command:</span>{' '}
                    under 90 seconds.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
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
                <span className="text-shimmer-slow">Full Response Flow</span>
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

      {/* Remote Operations Model */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Remote Operations Model
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Nationwide coverage from our Ohio operations center.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="fade-in">
              <div>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                  Our unique operational model positions aircraft at client locations while
                  pilots operate remotely from our Ohio headquarters. This enables rapid
                  response without requiring on-site personnel.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, color: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600', title: 'Pre-Positioned Aircraft', desc: 'Aircraft stationed at client fire stations and facilities for immediate deployment when incidents occur.' },
                    { icon: Wifi, color: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600', title: 'Satellite-Linked Control', desc: 'Starlink connectivity enables reliable remote piloting from Ohio to aircraft anywhere in the country.' },
                    { icon: Clock, color: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-600', title: '24/7 Availability', desc: 'Centralized operations enable round-the-clock mission capability without staffing multiple locations.' },
                    { icon: Users, color: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600', title: 'Scalable Coverage', desc: 'One pilot can support multiple regions, scaling efficiently as client base grows.' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 mb-2">OH</div>
                  <p className="text-slate-400">Operations Center</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Remote Pilot Station', status: 'Active' },
                    { label: 'Mission Control', status: 'Online' },
                    { label: 'Starlink Uplink', status: 'Connected' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Commander-Directed Response */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-red-200 dark:bg-red-900 top-[-100px] right-[-100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in">
            <div className="bg-slate-800 dark:bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-full" />
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm mb-6">
                    <Shield className="w-4 h-4" />
                    Command Authority
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Commander-Directed Response
                  </h2>
                  <p className="text-slate-300 text-lg mb-6">
                    Every AutonOps mission operates under the direction of the Incident Commander. We provide aerial intelligence and situational awareness — the IC makes all tactical decisions.
                  </p>
                  <ul className="space-y-4">
                    {[
                      'All flight adjustments requested through IC',
                      'Real-time video and sensor feeds to command post',
                      'No autonomous tactical action without IC approval',
                      'Integrates with existing incident command structure',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <Image
                    src="/iPhoneiPadWildland-2.webp"
                    alt="Incident Command receiving live drone feeds"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Live to IC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Safety & Standards */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Safety &amp; Standards</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Safety is not negotiable. Our operational culture is built on discipline,
                accountability, and continuous improvement.
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animation="stagger">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {safetyPrinciples.map((principle) => (
                <div key={principle.title} className="bg-slate-800 rounded-lg p-6">
                  <principle.icon className="w-8 h-8 text-red-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                  <p className="text-slate-400">{principle.description}</p>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
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
