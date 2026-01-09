import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ClipboardList,
  Truck,
  Radio,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Wifi,
  MapPin,
  Users,
  Clock,
  Target,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How We Operate',
  description:
    'Our structured approach to drone flight operations: mission planning, deployment, execution, and debriefing with emphasis on safety and coordination.',
  alternates: {
    canonical: 'https://autonops.com/operations',
  },
  openGraph: {
    title: 'How We Operate | AutonOps',
    description: 'Structured approach to drone operations: mission planning, deployment, execution, and debriefing with emphasis on safety.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AutonOps Operations' }],
  },
};

const phases = [
  {
    number: '01',
    title: 'Mission Brief',
    icon: ClipboardList,
    description:
      'Every operation begins with thorough planning and coordination.',
    details: [
      'Define mission objectives and success criteria',
      'Conduct site assessment and airspace analysis',
      'Identify risks and develop mitigation strategies',
      'Coordinate with stakeholders and authorities',
      'Establish communication protocols',
      'Brief all team members on roles and procedures',
    ],
  },
  {
    number: '02',
    title: 'Deploy',
    icon: Truck,
    description:
      'Mobilize personnel and equipment to the operational area.',
    details: [
      'Dispatch operators and support personnel',
      'Transport aircraft and ground equipment',
      'Establish ground control station',
      'Verify communications and data links',
      'Conduct pre-flight checks and system tests',
      'Confirm go/no-go criteria',
    ],
  },
  {
    number: '03',
    title: 'Execute',
    icon: Radio,
    description:
      'Conduct flight operations with continuous monitoring and communication.',
    details: [
      'Launch and manage flight operations',
      'Maintain real-time telemetry monitoring',
      'Coordinate with ground teams and command',
      'Capture required data and imagery',
      'Adapt to changing conditions as needed',
      'Maintain safety protocols throughout',
    ],
  },
  {
    number: '04',
    title: 'Debrief',
    icon: FileText,
    description:
      'Document outcomes and deliver results to stakeholders.',
    details: [
      'Recover and secure all equipment',
      'Process and organize captured data',
      'Prepare mission reports and deliverables',
      'Conduct after-action review',
      'Document lessons learned',
      'Archive data per retention requirements',
    ],
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

export default function OperationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-20 sm:py-28 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/how-we-operate.png"
            alt="AutonOps Operations"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[500px] h-[500px] bg-red-500/20 top-[-150px] right-[-100px]" />
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-500/20 bottom-[-100px] left-[-50px]" style={{ animationDelay: '5s' }} />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-[15%] float-slow hidden lg:block">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-red-400" />
              <span className="text-sm text-slate-300">Mission Ready</span>
            </div>
          </div>
          <div className="absolute bottom-24 right-[25%] float-medium hidden lg:block" style={{ animationDelay: '2s' }}>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300">Safety First</span>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Structured Process
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              How We <span className="text-shimmer">Operate</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300">
              A structured, disciplined approach to every mission. From initial planning
              through final delivery, we follow proven processes that prioritize safety,
              coordination, and mission success.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Journey Map */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Mission Journey
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Follow the path from mission request to successful delivery.
            </p>
          </div>

          {/* Journey Map - Desktop */}
          <div className="hidden lg:block relative">
            {/* Main connecting line */}
            <div className="absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-red-300 via-red-500 to-red-600 dark:from-red-400 dark:via-red-500 dark:to-red-600 rounded-full" />

            {/* Animated pulse on line */}
            <div className="absolute top-32 left-0 right-0 h-1 overflow-hidden rounded-full">
              <div className="h-full w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse opacity-60"
                   style={{ animation: 'shimmer 3s linear infinite' }} />
            </div>

            <div className="grid grid-cols-4 gap-8 relative">
              {phases.map((phase, index) => (
                <div key={phase.number} className="relative group">
                  {/* Connector node */}
                  <div className="absolute top-[7.5rem] left-1/2 -translate-x-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-4 border-red-500 group-hover:scale-125 transition-transform duration-300 shadow-lg" />
                    <div className="absolute inset-0 w-8 h-8 rounded-full bg-red-500 animate-ping opacity-20" />
                  </div>

                  {/* Phase number floating above */}
                  <div className="text-center mb-6">
                    <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-full shadow-lg group-hover:bg-red-700 transition-colors">
                      PHASE {phase.number}
                    </span>
                  </div>

                  {/* Icon and title */}
                  <div className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 mb-4 group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300">
                      <phase.icon className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{phase.title}</h3>
                  </div>

                  {/* Content card below the line */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-red-200 dark:hover:border-red-500/50 transition-all duration-300 group-hover:-translate-y-1">
                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{phase.description}</p>
                    <ul className="space-y-2">
                      {phase.details.slice(0, 3).map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    {phase.details.length > 3 && (
                      <p className="text-xs text-slate-400 mt-3">+{phase.details.length - 3} more steps</p>
                    )}
                  </div>

                  {/* Arrow to next phase */}
                  {index < phases.length - 1 && (
                    <div className="absolute top-[7.5rem] -right-4 z-20 text-red-400">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Journey Map - Mobile/Tablet */}
          <div className="lg:hidden relative">
            {/* Vertical connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-300 via-red-500 to-red-600 rounded-full" />

            <div className="space-y-8">
              {phases.map((phase, index) => (
                <div key={phase.number} className="relative flex gap-6">
                  {/* Node on the line */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                      <phase.icon className="w-7 h-7 text-red-600" />
                    </div>
                    {/* Phase number badge */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      {phase.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{phase.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">{phase.description}</p>
                    <ul className="space-y-2">
                      {phase.details.slice(0, 3).map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow down to next */}
                  {index < phases.length - 1 && (
                    <div className="absolute left-[1.4rem] bottom-[-1rem] text-red-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Remote Operations Model */}
      <section className="py-16 sm:py-20 bg-slate-100 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Remote Operations Model
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Nationwide coverage from our Ohio operations center.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Our unique operational model positions aircraft at client locations while
                pilots operate remotely from our Ohio headquarters. This enables rapid
                response without requiring on-site personnel.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Pre-Positioned Aircraft</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Aircraft stationed at client fire stations and facilities for immediate deployment when incidents occur.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wifi className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Satellite-Linked Control</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Starlink connectivity enables reliable remote piloting from Ohio to aircraft anywhere in the country.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">24/7 Availability</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Centralized operations enable round-the-clock mission capability without staffing multiple locations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Scalable Coverage</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      One pilot can support multiple regions, scaling efficiently as client base grows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 mb-2">OH</div>
                  <p className="text-slate-400">Operations Center</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300">Remote Pilot Station</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300">Mission Control</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Online</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300">Starlink Uplink</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Connected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Safety & Standards</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Safety is not negotiable. Our operational culture is built on discipline,
              accountability, and continuous improvement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safetyPrinciples.map((principle) => (
              <div
                key={principle.title}
                className="bg-slate-800 rounded-lg p-6"
              >
                <principle.icon className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                <p className="text-slate-400">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Section */}
      <section id="planning" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Mission Planning Excellence
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Thorough planning is the foundation of successful operations. We invest
                significant effort in pre-mission preparation to ensure smooth execution.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-900">Airspace Analysis</span>
                    <p className="text-slate-600 text-sm">
                      Verify airspace class, NOTAMs, TFRs, and any special requirements.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-900">Site Assessment</span>
                    <p className="text-slate-600 text-sm">
                      Evaluate terrain, obstacles, and environmental factors.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-900">Stakeholder Coordination</span>
                    <p className="text-slate-600 text-sm">
                      Align with all parties on objectives, timing, and communication.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-900">Contingency Planning</span>
                    <p className="text-slate-600 text-sm">
                      Develop procedures for equipment failure, weather, and emergencies.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square">
              <Image
                src="/how-we-operate.png"
                alt="How We Operate - Mission Control"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Want to learn more about our approach?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Contact us to discuss how our operational methodology can support your mission.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
          >
            Talk to Operations
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
