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
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'AutonOps leverages the Aeryl M2 Multi-Mission Platform for AI-powered drone operations, real-time sensor analysis, and intelligent mission coordination.',
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
    title: 'Order Received',
    description: 'Client request triggers automatic mission generation in M2 system',
    icon: Database,
  },
  {
    step: '02',
    title: 'AI Planning',
    description: 'System generates optimized flight plan with waypoints and sortie assignments',
    icon: Sparkles,
  },
  {
    step: '03',
    title: 'Pilot Notification',
    description: 'Available pilots receive mission alert and accept assignment via mobile app',
    icon: Radio,
  },
  {
    step: '04',
    title: 'Pre-Flight',
    description: 'Automated FAA flight plan filing and airspace clearance coordination',
    icon: Shield,
  },
  {
    step: '05',
    title: 'Mission Execution',
    description: 'Live feeds stream to commander while pilot navigates waypoints',
    icon: Target,
  },
  {
    step: '06',
    title: 'Report Delivery',
    description: 'AI generates after-action report with mission score and findings',
    icon: FileText,
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
      <section className="relative bg-slate-900 text-white py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm mb-6">
              <Cpu className="w-4 h-4" />
              Aeryl M2 Platform
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Technology That Powers
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Mission Success</span>
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
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              M2 Platform Capabilities
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              A comprehensive mission management system built for operational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => {
              const colorClasses: Record<string, { bg: string; icon: string }> = {
                red: { bg: 'bg-red-50 group-hover:bg-red-100', icon: 'text-red-600' },
                blue: { bg: 'bg-blue-50 group-hover:bg-blue-100', icon: 'text-blue-600' },
                purple: { bg: 'bg-purple-50 group-hover:bg-purple-100', icon: 'text-purple-600' },
                green: { bg: 'bg-green-50 group-hover:bg-green-100', icon: 'text-green-600' },
                amber: { bg: 'bg-amber-50 group-hover:bg-amber-100', icon: 'text-amber-600' },
                cyan: { bg: 'bg-cyan-50 group-hover:bg-cyan-100', icon: 'text-cyan-600' },
              };
              const colors = colorClasses[feature.color];

              return (
                <div
                  key={feature.title}
                  className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-red-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-4 transition-colors`}>
                    <feature.icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Workflow */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Automated Mission Workflow
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              From incident detection to final report—streamlined by AI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionWorkflow.map((item, index) => (
              <div
                key={item.step}
                className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700 hover:border-red-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                    {item.step}
                  </div>
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Capabilities */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Integrated Operations Management
              </h2>
              <p className="text-slate-600 mb-8">
                The M2 platform provides end-to-end visibility and control across all
                aspects of drone operations. From client relationship management to
                real-time mission execution, every component works together seamlessly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {integrationCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <Image
                  src="/m2-dashboard.jpg"
                  alt="M2 Platform Dashboard - Live fire tracking and mission management"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-slate-700">Live Dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aircraft Fleet */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Aircraft Platform
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Purpose-built aircraft for mission-critical operations.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Aircraft Visual */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center min-h-[300px]">
                <Image
                  src="/aircraft.jpg"
                  alt="AutonOps VTOL Aircraft"
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">VTOL Aircraft</h3>
                  <p className="text-slate-300">Primary Mission Platform</p>
                </div>
              </div>

              {/* Aircraft Specs */}
              <div className="p-8 lg:p-12">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Capabilities</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Extended Flight Time</p>
                      <p className="text-sm text-slate-500">Long-duration missions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wifi className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Starlink Connected</p>
                      <p className="text-sm text-slate-500">Remote operation capable</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Camera className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Multi-Sensor Payload</p>
                      <p className="text-sm text-slate-500">Thermal & visual cameras</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Gauge className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">GPS Waypoint Nav</p>
                      <p className="text-sm text-slate-500">Precision flight paths</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-medium text-slate-900 mb-3">Deployment Model</h4>
                  <p className="text-sm text-slate-600">
                    Aircraft are pre-positioned at client fire stations for rapid response.
                    Remote pilots operate from Ohio HQ via satellite link, enabling 24/7
                    mission capability without on-site personnel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            See the technology in action
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Schedule a demonstration to see how the M2 platform can support your operations.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
          >
            Request a Demo
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
