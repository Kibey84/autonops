import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Flame,
  Search,
  Eye,
  AlertTriangle,
  Building2,
  Shield,
  Landmark,
  Factory,
  ArrowRight,
  Zap,
  TreePine,
  HardHat,
  Waves,
  Mountain,
  Car,
  CheckCircle,
  Target,
  Radio,
} from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import { RadarPulse } from '@/components/AnimatedDrone';

export const metadata: Metadata = {
  title: 'Industries & Use Cases',
  description:
    'Professional drone operations for emergency response, government, municipal, and enterprise applications. Fire response, search and rescue, reconnaissance, and disaster assessment.',
  alternates: {
    canonical: 'https://autonops.com/industries',
  },
  openGraph: {
    title: 'Industries & Use Cases | AutonOps',
    description: 'Drone operations for emergency services, government, defense, utilities, and enterprise organizations.',
    images: [{ url: '/aircraft-fire.jpg', width: 1200, height: 630, alt: 'AutonOps Fire Response Operations' }],
  },
};

const primaryUseCases = [
  {
    icon: Flame,
    title: 'Fire Response',
    description:
      'Support wildfire and structural fire operations with aerial intelligence.',
    applications: [
      'Active fire perimeter mapping',
      'Hotspot identification with thermal imaging',
      'Structure assessment before entry',
      'Resource deployment guidance',
      'Post-fire damage documentation',
    ],
    color: 'orange',
  },
  {
    icon: Search,
    title: 'Search and Rescue',
    description:
      'Cover more ground faster with aerial search capabilities.',
    applications: [
      'Wide-area visual search',
      'Thermal detection of persons',
      'Difficult terrain coverage',
      'Night search operations',
      'Coordination with ground teams',
    ],
    color: 'blue',
  },
  {
    icon: Eye,
    title: 'Reconnaissance',
    description:
      'Gain situational awareness for tactical and strategic decisions.',
    applications: [
      'Area surveillance and monitoring',
      'Pre-operation intelligence',
      'Route reconnaissance',
      'Critical infrastructure observation',
      'Crowd and event monitoring',
    ],
    color: 'purple',
  },
  {
    icon: AlertTriangle,
    title: 'Disaster Assessment',
    description:
      'Rapidly evaluate damage and support recovery operations.',
    applications: [
      'Post-storm damage surveys',
      'Flood extent mapping',
      'Infrastructure inspection',
      'Access route identification',
      'Insurance and recovery documentation',
    ],
    color: 'amber',
  },
];

const industries = [
  {
    icon: Shield,
    title: 'Emergency Services',
    description:
      'Fire departments, EMS, and emergency management agencies rely on aerial support for incident response and situational awareness.',
    useCases: ['Wildfire monitoring', 'Structural fire assessment', 'Mass casualty incidents', 'Hazmat response'],
  },
  {
    icon: Landmark,
    title: 'Government & Municipal',
    description:
      'Federal, state, and local agencies benefit from drone operations for public safety, infrastructure, and environmental monitoring.',
    useCases: ['Public safety operations', 'Infrastructure inspection', 'Event security', 'Environmental surveys'],
  },
  {
    icon: Building2,
    title: 'Defense & Security',
    description:
      'Defense contractors and security organizations leverage aerial reconnaissance and surveillance capabilities.',
    useCases: ['Perimeter security', 'Tactical reconnaissance', 'Force protection', 'Training exercises'],
  },
  {
    icon: Factory,
    title: 'Enterprise',
    description:
      'Large organizations require drone operations for facility security, asset monitoring, and incident response support.',
    useCases: ['Campus security', 'Asset inspection', 'Emergency response', 'Executive protection'],
  },
  {
    icon: Zap,
    title: 'Utilities & Energy',
    description:
      'Power companies and energy infrastructure operators need aerial inspection for vast networks of assets.',
    useCases: ['Power line inspection', 'Pipeline monitoring', 'Substation surveys', 'Storm damage assessment'],
  },
  {
    icon: TreePine,
    title: 'Forestry & Conservation',
    description:
      'Land management agencies and conservation groups benefit from large-area monitoring capabilities.',
    useCases: ['Forest health surveys', 'Wildlife monitoring', 'Illegal activity detection', 'Controlled burn support'],
  },
  {
    icon: HardHat,
    title: 'Construction & Mining',
    description:
      'Large-scale operations require regular aerial surveys for progress tracking and site safety.',
    useCases: ['Site surveys', 'Progress documentation', 'Safety monitoring', 'Volumetric analysis'],
  },
  {
    icon: Waves,
    title: 'Coastal & Maritime',
    description:
      'Port authorities and coastal agencies need aerial support for maritime operations and coastal monitoring.',
    useCases: ['Port security', 'Coastal erosion monitoring', 'Search and rescue', 'Environmental response'],
  },
];

const scenarios = [
  {
    title: 'Wildfire Initial Attack',
    industry: 'Fire Response',
    icon: Flame,
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-500',
    description: 'When a wildfire is reported, every minute counts. Our aircraft can be airborne within minutes, providing incident commanders with real-time thermal imagery to identify the fire\'s exact location, direction of spread, and intensity.',
    benefits: ['Immediate situational awareness', 'Thermal hotspot identification', 'Real-time video to command post', 'Resource deployment guidance'],
  },
  {
    title: 'Missing Person Search',
    industry: 'Search & Rescue',
    icon: Search,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-500',
    description: 'Time-critical searches in difficult terrain benefit from aerial thermal imaging. Our aircraft can cover vast areas quickly, detecting heat signatures that ground teams would miss, especially in dense vegetation or at night.',
    benefits: ['Cover 10x more area than ground teams', 'Thermal detection day or night', 'Coordinate ground team positioning', 'Document search patterns'],
  },
  {
    title: 'Critical Infrastructure Protection',
    industry: 'Security',
    icon: Eye,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-500',
    description: 'Protecting large facilities, pipelines, or border areas requires persistent surveillance. Our remote operations model enables continuous monitoring without the cost of on-site personnel at every location.',
    benefits: ['24/7 surveillance capability', 'Rapid response to alerts', 'Wide area coverage', 'Integration with security systems'],
  },
  {
    title: 'Post-Storm Damage Assessment',
    industry: 'Disaster Response',
    icon: AlertTriangle,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500',
    description: 'After severe weather, communities need rapid damage assessment to prioritize response and recovery. Aerial surveys can cover entire regions in hours, documenting damage for emergency management and insurance purposes.',
    benefits: ['Rapid county-wide assessment', 'Detailed damage documentation', 'Access route identification', 'Recovery prioritization'],
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-20 sm:py-28 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animated-gradient opacity-30" />

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/aircraft-fire.jpg"
            alt="Aircraft performing fire response"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />
        </div>

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[500px] h-[500px] bg-orange-500/20 top-[-150px] right-[-100px]" />
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
              <Radio className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300">24/7 Support</span>
            </div>
          </div>
          <div className="absolute top-1/2 right-[8%] hidden xl:block float-fast">
            <RadarPulse size={70} color="#f97316" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Multi-Industry Expertise
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Industries & <span className="text-shimmer">Use Cases</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300">
              We support organizations that need reliable, professional drone operations
              for critical applications. From emergency response to enterprise security,
              our capabilities adapt to your mission.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Use Cases */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-30">
          <div className="gradient-orb w-[400px] h-[400px] bg-red-200 dark:bg-red-900 top-[-100px] right-[-100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-600 dark:text-red-400 text-sm mb-4">
              <Flame className="w-4 h-4" />
              Core Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Primary Use Cases
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our core operational focus areas where drone operations make the greatest impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {primaryUseCases.map((useCase) => {
              const colorClasses: Record<string, { bg: string; bgDark: string; icon: string; glow: string; bullet: string }> = {
                orange: { bg: 'bg-orange-50', bgDark: 'dark:bg-orange-900/30', icon: 'text-orange-600', glow: 'bg-orange-500', bullet: 'bg-orange-600' },
                blue: { bg: 'bg-blue-50', bgDark: 'dark:bg-blue-900/30', icon: 'text-blue-600', glow: 'bg-blue-500', bullet: 'bg-blue-600' },
                purple: { bg: 'bg-purple-50', bgDark: 'dark:bg-purple-900/30', icon: 'text-purple-600', glow: 'bg-purple-500', bullet: 'bg-purple-600' },
                amber: { bg: 'bg-amber-50', bgDark: 'dark:bg-amber-900/30', icon: 'text-amber-600', glow: 'bg-amber-500', bullet: 'bg-amber-600' },
              };
              const colors = colorClasses[useCase.color];

              return (
                <TiltCard
                  key={useCase.title}
                  className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300"
                  tiltAmount={6}
                >
                  <div className="relative">
                    {/* Glow effect on hover */}
                    <div className={`absolute -inset-2 ${colors.glow} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />

                    <div className="flex items-center gap-4 mb-4 relative">
                      <div className={`w-12 h-12 ${colors.bg} ${colors.bgDark} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <useCase.icon className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{useCase.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">{useCase.description}</p>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">
                    Applications
                  </h4>
                  <ul className="space-y-2">
                    {useCase.applications.map((app) => (
                      <li key={app} className="flex items-start gap-3 group/item">
                        <div className={`w-1.5 h-1.5 ${colors.bullet} rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform`} />
                        <span className="text-slate-700 dark:text-slate-300">{app}</span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real-World Scenarios */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient opacity-20" />

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[500px] h-[500px] bg-red-500/20 top-[-100px] left-[20%]" />
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-500/20 bottom-[-100px] right-[10%]" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-4">
              <Zap className="w-4 h-4" />
              Operational Examples
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Real-World <span className="text-shimmer">Scenarios</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              How our capabilities apply to actual operational situations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {scenarios.map((scenario) => (
              <TiltCard
                key={scenario.title}
                className="group bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 hover:border-slate-500 transition-all duration-300"
                tiltAmount={6}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`relative w-12 h-12 bg-gradient-to-br ${scenario.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <scenario.icon className="w-6 h-6 text-white" />
                    {/* Pulse effect */}
                    <div className={`absolute inset-0 ${scenario.bgColor} rounded-xl opacity-0 group-hover:opacity-30 animate-ping`} style={{ animationDuration: '2s' }} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{scenario.industry}</p>
                    <h3 className="text-xl font-semibold text-white">{scenario.title}</h3>
                  </div>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">{scenario.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {scenario.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 group/benefit">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 group-hover/benefit:scale-110 transition-transform" />
                      <span className="text-sm text-slate-400">{benefit}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-purple-200 dark:bg-purple-900 bottom-[-100px] left-[-100px]" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-sm mb-4">
              <Building2 className="w-4 h-4" />
              Sectors We Support
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Organizations that require professional, mission-focused drone operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <TiltCard
                key={industry.title}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-red-200 dark:hover:border-red-500/50 hover:shadow-lg transition-all duration-300"
                tiltAmount={8}
              >
                <div className="relative">
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-2 bg-red-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />

                  <div className="relative w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <industry.icon className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {industry.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{industry.description}</p>
                <div className="flex flex-wrap gap-1">
                  {industry.useCases.map((useCase) => (
                    <span key={useCase} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                      {useCase}
                    </span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[300px] h-[300px] bg-green-200 dark:bg-green-900 top-0 right-0" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Why Organizations Choose AutonOps
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Operational Maturity</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      We operate with discipline and structure. Our processes are
                      designed for consistency and reliability, not improvisation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Mission Focus</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      We understand that your mission is what matters. Our role is to
                      provide the aerial capability you need, when you need it.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Professional Team</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Trained operators who understand both the technical and operational
                      aspects of drone flight in demanding environments.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Reliable Execution</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      When you engage AutonOps, you get a partner committed to
                      successful mission outcomes, not excuses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <TiltCard className="relative rounded-2xl overflow-hidden" tiltAmount={5}>
              <Image
                src="/aircraft-fire.jpg"
                alt="Aircraft performing fire response"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to discuss your needs?</h3>
                <p className="text-slate-300 mb-6 text-sm">
                  Every organization has unique requirements. Let&apos;s talk about how
                  our capabilities can support your operations.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 btn-glow"
                >
                  Contact Us
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              {/* Floating badge */}
              <div className="absolute top-4 right-4 bg-green-600 text-white rounded-lg px-3 py-1.5 flex items-center gap-2 float-slow">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-medium">Active</span>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>
    </>
  );
}
