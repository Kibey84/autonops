import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Cpu,
  Radio,
  Sparkles,
  Eye,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Layers,
  Database,
  Video,
  FileText,
  Target,
  Navigation,
  Plane,
  Gauge,
  Clock,
  Wifi,
  Camera,
  Battery,
  Activity,
  Satellite,
  Phone,
  ClipboardList,
  BarChart3,
} from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import { RadarPulse } from '@/components/AnimatedDrone';

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'AutonOps leverages the Aeryl M2 Multi-Mission Platform for AI-powered drone operations, real-time sensor analysis, and intelligent mission coordination.',
  alternates: {
    canonical: 'https://autonops.com/technology',
  },
  openGraph: {
    title: 'Technology | AutonOps',
    description: 'AI-powered M2 platform for drone operations with real-time sensor feeds, mission planning, and intelligent coordination.',
    images: [{ url: '/m2-dashboard.jpg', width: 1200, height: 630, alt: 'M2 Platform Dashboard' }],
  },
};

const platformFeatures = [
  {
    icon: Sparkles,
    title: 'AI-Generated Mission Planning',
    description:
      'Missions are automatically generated when orders are received. AI optimizes flight plans, waypoints, and sortie assignments for maximum efficiency.',
    color: 'red',
  },
  {
    icon: Video,
    title: 'Live Sensor & Video Feeds',
    description:
      'Real-time streaming of camera feeds directly to incident commanders. Multiple sensor inputs processed simultaneously for comprehensive situational awareness.',
    color: 'blue',
  },
  {
    icon: Eye,
    title: 'AI-Enhanced Analysis',
    description:
      'Onboard and cloud-based AI analyzes sensor data in real-time, identifying hotspots, tracking targets, and highlighting areas of interest automatically.',
    color: 'purple',
  },
  {
    icon: Navigation,
    title: 'Waypoint Navigation',
    description:
      'Precise GPS-guided flight paths with automatic waypoint sequencing. Pilots can adjust routes in real-time while maintaining operational safety.',
    color: 'green',
  },
  {
    icon: Radio,
    title: 'Multi-Channel Communications',
    description:
      'Redundant communication links via satellite (Starlink) and cellular networks ensure uninterrupted command and control even in remote locations.',
    color: 'amber',
  },
  {
    icon: FileText,
    title: 'Automated Reporting',
    description:
      'AI-generated after-action reports, mission scoring, and sortie summaries delivered automatically upon mission completion.',
    color: 'cyan',
  },
];

const missionWorkflow = [
  {
    step: '01',
    title: 'Emergency Call Received',
    description: '911 or dispatch initiates the incident response',
    icon: Phone,
  },
  {
    step: '02',
    title: 'Request Routed to AutonOps',
    description: 'Aerial support request forwarded to our operations center',
    icon: Radio,
  },
  {
    step: '03',
    title: 'Mission Planning Initiated',
    description: 'Flight routes and sensor configurations prepared by AI',
    icon: ClipboardList,
  },
  {
    step: '04',
    title: 'Aircraft Launched',
    description: 'Deployment from designated staging area',
    icon: Plane,
  },
  {
    step: '05',
    title: 'Live Feed to Command',
    description: 'Video and sensor data delivered to Incident Command',
    icon: Video,
  },
  {
    step: '06',
    title: 'AI-Assisted Analysis',
    description: 'Hotspots, drift zones, and targets of interest highlighted',
    icon: Cpu,
  },
  {
    step: '07',
    title: 'Commander Directs Operations',
    description: 'Incident Commander requests adjustments or additional data',
    icon: Target,
  },
  {
    step: '08',
    title: 'After-Action Report',
    description: 'Mission concludes with AAR delivered to stakeholders',
    icon: BarChart3,
  },
];

const integrationCapabilities = [
  'CRM for client and contact management',
  'Order management with automatic mission generation',
  'Multi-sortie mission planning',
  'Real-time status tracking across all operations',
  'Live video conferencing with incident commanders',
  'Integrated chat and communication logs',
  'Sensor data recording and playback',
  'Mission scoring and performance analytics',
];

export default function TechnologyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-20 sm:py-28 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animated-gradient opacity-30" />

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[500px] h-[500px] bg-red-500/20 top-[-150px] right-[-100px]" />
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-500/20 bottom-[-100px] left-[-50px]" style={{ animationDelay: '5s' }} />
          <div className="gradient-orb w-[300px] h-[300px] bg-purple-500/15 top-[50%] right-[30%]" style={{ animationDelay: '3s' }} />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-[15%] float-slow hidden lg:block">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300">AI Processing</span>
            </div>
          </div>
          <div className="absolute bottom-24 right-[25%] float-medium hidden lg:block" style={{ animationDelay: '2s' }}>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <Satellite className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Satellite Link</span>
            </div>
          </div>
          <div className="absolute top-1/2 right-[8%] hidden xl:block float-fast">
            <RadarPulse size={70} color="#ef4444" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <Cpu className="w-4 h-4" />
              Aeryl M2 Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Technology That Powers
              <span className="block text-shimmer">Mission Success</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300">
              AutonOps operates on the Aeryl M2 Multi-Mission Platform—an AI-powered
              command and control system designed for complex drone operations in
              emergency response and critical mission environments.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-30">
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-200 dark:bg-blue-900 top-[-100px] right-[-100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              M2 Platform Capabilities
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              A comprehensive mission management system built for operational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => {
              const colorClasses: Record<string, { bg: string; bgDark: string; icon: string; glow: string }> = {
                red: { bg: 'bg-red-50', bgDark: 'dark:bg-red-900/30', icon: 'text-red-600', glow: 'bg-red-500' },
                blue: { bg: 'bg-blue-50', bgDark: 'dark:bg-blue-900/30', icon: 'text-blue-600', glow: 'bg-blue-500' },
                purple: { bg: 'bg-purple-50', bgDark: 'dark:bg-purple-900/30', icon: 'text-purple-600', glow: 'bg-purple-500' },
                green: { bg: 'bg-green-50', bgDark: 'dark:bg-green-900/30', icon: 'text-green-600', glow: 'bg-green-500' },
                amber: { bg: 'bg-amber-50', bgDark: 'dark:bg-amber-900/30', icon: 'text-amber-600', glow: 'bg-amber-500' },
                cyan: { bg: 'bg-cyan-50', bgDark: 'dark:bg-cyan-900/30', icon: 'text-cyan-600', glow: 'bg-cyan-500' },
              };
              const colors = colorClasses[feature.color];

              return (
                <TiltCard
                  key={feature.title}
                  className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-red-200 dark:hover:border-red-500/50 hover:shadow-xl transition-all duration-300"
                  tiltAmount={8}
                >
                  <div className="relative">
                    {/* Glow effect on hover */}
                    <div className={`absolute -inset-2 ${colors.glow} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />

                    <div className={`relative w-12 h-12 ${colors.bg} ${colors.bgDark} rounded-lg flex items-center justify-center mb-4 transition-all group-hover:scale-110`}>
                      <feature.icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Workflow */}
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
              Streamlined Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Automated Mission <span className="text-shimmer">Workflow</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              From incident detection to final report—streamlined by AI.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {missionWorkflow.map((item, index) => (
              <div key={item.step} className="relative group">
                {/* Connector line */}
                {index < missionWorkflow.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-red-500/50 to-transparent z-0" />
                )}
                <TiltCard
                  className="relative bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700 hover:border-red-500/50 transition-all duration-300 z-10"
                  tiltAmount={8}
                >
                  <div className="text-2xl font-bold text-red-500 mb-2">{item.step}</div>
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-xs">{item.description}</p>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Command Authority and Safety */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-amber-200 dark:bg-amber-900 top-[-100px] left-[-100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800 dark:bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-full" />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Command Authority and Safety
                </h2>
                <p className="text-slate-300 text-lg mb-4">
                  AutonOps provides situational awareness and aerial intelligence. All tactical decisions remain with the Incident Commander. Our operators follow IC directives and never take autonomous action that affects ground operations.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Human-supervised operations</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>IC retains full authority</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>No autonomous tactical action</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Partner: Aeryl AI */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-200 dark:bg-blue-900 bottom-0 right-1/4" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm mb-6">
                <Cpu className="w-4 h-4" />
                Technology Partnership
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Technology Partner: <span className="text-shimmer-slow">Aeryl AI</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                AutonOps partners with Aeryl AI, a leader in edge-computing solutions for real-time wildfire detection. Aeryl's AI-powered sensors enable onboard analysis of thermal imagery, surface temps, and smoke drift, delivering actionable intelligence in seconds rather than minutes.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Together, we bridge the gap between cutting-edge detection technology and mission-grade flight operations.
              </p>
              <a
                href="https://aeryl.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Learn about Aeryl AI
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <TiltCard
              className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700"
              tiltAmount={5}
            >
              <Image
                src="/figure_1_infrared-camera.jpg"
                alt="Aeryl AI infrared thermal imaging"
                width={600}
                height={400}
                className="object-cover w-full"
              />
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Integration Capabilities */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[300px] h-[300px] bg-green-200 dark:bg-green-900 bottom-0 left-0" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Integrated Operations Management
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                The M2 platform provides end-to-end visibility and control across all
                aspects of drone operations. From client relationship management to
                real-time mission execution, every component works together seamlessly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {integrationCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-2 group">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            <TiltCard className="relative" tiltAmount={5}>
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
                <Image
                  src="/m2-dashboard.jpg"
                  alt="M2 Platform Dashboard - Live fire tracking and mission management"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Live Dashboard</span>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -left-4 bg-red-600 text-white rounded-xl px-3 py-2 shadow-lg float-slow">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">AI-Powered</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Aircraft Fleet */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-purple-200 dark:bg-purple-900 top-[-100px] right-[-100px]" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-sm mb-4">
              <Plane className="w-4 h-4" />
              Mission Hardware
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Aircraft Platform
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Purpose-built aircraft for mission-critical operations.
            </p>
          </div>

          <TiltCard
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg"
            tiltAmount={3}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Aircraft Visual */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center min-h-[300px]">
                <Image
                  src="/hoverjet.png"
                  alt="AutonOps VTOL Aircraft"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">VTOL Aircraft</h3>
                  <p className="text-slate-300">Primary Mission Platform</p>
                </div>
                {/* Status indicator */}
                <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-slate-300">Ready</span>
                </div>
              </div>

              {/* Aircraft Specs */}
              <div className="p-8 lg:p-12">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Capabilities</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3 group">
                    <div className="w-10 h-10 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Extended Flight Time</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Long-duration missions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Wifi className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Starlink Connected</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Remote operation capable</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Multi-Sensor Payload</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Thermal & visual cameras</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Gauge className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">GPS Waypoint Nav</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Precision flight paths</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-medium text-slate-900 dark:text-white mb-3">Deployment Model</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Aircraft are pre-positioned at client fire stations for rapid response.
                    Remote pilots operate from Ohio HQ via satellite link, enabling 24/7
                    mission capability without on-site personnel.
                  </p>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient opacity-30" />
        <div className="absolute inset-0">
          <div className="gradient-orb w-[500px] h-[500px] bg-red-500/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            See the technology <span className="text-shimmer">in action</span>
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Schedule a demonstration to see how the M2 platform can support your operations.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 btn-glow"
          >
            Request a Demo
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
