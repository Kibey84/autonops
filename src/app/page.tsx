'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  Clock,
  Users,
  Target,
  Lock,
  Flame,
  Search,
  Eye,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Plane,
  Radio,
  MapPin,
  Wifi,
  Zap,
  Phone,
  FileText,
  Video,
  ClipboardList,
  CheckCircle,
  Cpu,
  PlayCircle,
  BarChart3,
} from 'lucide-react';
import ScrollAnimation from '@/components/ScrollAnimation';
import MouseGlow from '@/components/MouseGlow';
import Typewriter from '@/components/Typewriter';
import TiltCard from '@/components/TiltCard';
import AnimatedDrone, { RadarPulse } from '@/components/AnimatedDrone';

const proofPoints = [
  {
    icon: Clock,
    title: 'Rapid Deployment',
    description: 'Mission-ready crews that mobilize for Aeryl missions when time is critical.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Rigorous protocols and trained operators on every Aeryl deployment.',
  },
  {
    icon: Target,
    title: 'Mission Execution',
    description: 'We handle the flight plan, the aircraft, and the crew so Aeryl AI can focus on intelligence.',
  },
  {
    icon: Users,
    title: 'Certified Pilots',
    description: 'FAA Part 107 certified pilots and mission controllers embedded in Aeryl operations.',
  },
  {
    icon: Lock,
    title: 'Secure Operations',
    description: 'Protected data handling and field operations supported by Starlink connectivity.',
  },
];

const services = [
  {
    title: 'Flight Operations',
    description:
      'We fly the missions. Aircraft, pilots, and controllers deployed for every Aeryl operation.',
    href: '/how-it-works',
    icon: Plane,
  },
  {
    title: 'Mission Execution',
    description:
      'Pre-mission planning, risk assessment, and on-site coordination. Aeryl AI handles intelligence, we handle the field.',
    href: '/how-it-works',
    icon: Target,
  },
  {
    title: 'Emergency Deployment',
    description:
      'Rapid crew mobilization for Aeryl-coordinated fire, rescue, and disaster response missions.',
    href: '/how-it-works',
    icon: AlertTriangle,
  },
  {
    title: 'Aerial Reconnaissance',
    description:
      'Sensor operations and situational awareness flights feeding Aeryl AI\'s analysis platform.',
    href: '/how-it-works',
    icon: Eye,
  },
];

const operationSteps = [
  {
    step: '01',
    title: 'Mission Brief',
    description: 'Define objectives, assess risks, coordinate with stakeholders.',
    icon: Target,
  },
  {
    step: '02',
    title: 'Deploy',
    description: 'Mobilize operators, aircraft, and support equipment to location.',
    icon: MapPin,
  },
  {
    step: '03',
    title: 'Execute',
    description: 'Conduct flight operations with real-time monitoring and communication.',
    icon: Radio,
  },
  {
    step: '04',
    title: 'Debrief',
    description: 'Deliver data, report findings, document lessons learned.',
    icon: Shield,
  },
];

const useCases = [
  {
    icon: Flame,
    title: 'Wildfire Operations',
    description: 'We fly the fire missions. Aeryl AI identifies hotspots and fire lines from our feeds.',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: Search,
    title: 'Search & Rescue Flights',
    description: 'Thermal and visual search sorties executed by AutonOps pilots for Aeryl-coordinated SAR.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Eye,
    title: 'Reconnaissance Sorties',
    description: 'Sensor flights feeding Aeryl AI\'s situational awareness and intelligence platform.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: AlertTriangle,
    title: 'Disaster Response',
    description: 'Rapid aerial deployment for Aeryl-coordinated damage assessment and infrastructure review.',
    color: 'from-amber-500 to-orange-600',
  },
];

const missionFlowSteps = [
  {
    step: '01',
    title: 'Emergency Call Received',
    description: '911 or dispatch initiates the incident response.',
    icon: Phone,
  },
  {
    step: '02',
    title: 'Aeryl AI Activates AutonOps',
    description: 'Aeryl routes the aerial support request to our flight operations team.',
    icon: Radio,
  },
  {
    step: '03',
    title: 'Mission Planning Initiated',
    description: 'Flight routes and sensor configurations prepared.',
    icon: ClipboardList,
  },
  {
    step: '04',
    title: 'Aircraft Launched',
    description: 'Deployment from designated staging area.',
    icon: Plane,
  },
  {
    step: '05',
    title: 'Live Feed to Command',
    description: 'Video and sensor data delivered to Incident Command.',
    icon: Video,
  },
  {
    step: '06',
    title: 'AI-Assisted Analysis',
    description: 'Hotspots, drift zones, and targets of interest highlighted.',
    icon: Cpu,
  },
  {
    step: '07',
    title: 'Commander Directs Operations',
    description: 'Incident Commander requests adjustments or additional data.',
    icon: Target,
  },
  {
    step: '08',
    title: 'After-Action Report',
    description: 'Mission concludes with AAR delivered to stakeholders.',
    icon: BarChart3,
  },
];

export default function Home() {
  return (
    <>
      {/* Mouse glow effect */}
      <MouseGlow />

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animated-gradient opacity-50" />

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[600px] h-[600px] bg-red-500/30 top-[-200px] left-[-100px]" />
          <div className="gradient-orb w-[500px] h-[500px] bg-blue-500/20 bottom-[-150px] right-[-100px]" style={{ animationDelay: '5s' }} />
          <div className="gradient-orb w-[300px] h-[300px] bg-red-600/25 top-1/3 right-1/4" style={{ animationDelay: '10s' }} />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating badges */}
          <div className="absolute top-32 right-[15%] float-slow" style={{ animationDelay: '0s' }}>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300">Starlink Field Ops</span>
            </div>
          </div>
          <div className="absolute bottom-40 left-[10%] float-medium hidden lg:block" style={{ animationDelay: '2s' }}>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">24/7 Operations</span>
            </div>
          </div>
          <div className="absolute top-1/2 right-[8%] float-fast hidden xl:block" style={{ animationDelay: '1s' }}>
            <RadarPulse size={60} color="#dc2626" />
          </div>

          {/* Animated drone */}
          <div className="absolute bottom-1/4 right-[5%] hidden xl:block opacity-40">
            <AnimatedDrone size={80} />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Aeryl AI Flight Operations
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Powering Aeryl&apos;s
                <span className="block text-shimmer">
                  <Typewriter
                    words={['Rapid Response', 'Emergency Missions', 'Aerial Intelligence', 'Field Operations']}
                    typingSpeed={80}
                    deletingSpeed={40}
                    delayBetweenWords={3000}
                  />
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-xl">
                AutonOps puts aircraft, pilots, and mission controllers in the field
                for Aeryl AI&apos;s emergency response platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/login"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 btn-glow"
                >
                  View Platform
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center px-8 py-4 border border-slate-500 text-white font-medium rounded-lg hover:bg-white/5 hover:border-slate-400 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block animate-slide-in-right">
              <TiltCard className="relative" tiltAmount={8}>
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                  <Image
                    src="/hoverjet.png"
                    alt="AutonOps VTOL Aircraft"
                    width={600}
                    height={400}
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl border border-slate-200 float-fast">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Plane className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Aircraft Status</p>
                      <p className="font-semibold text-slate-900">Mission Ready</p>
                    </div>
                  </div>
                </div>
                {/* Top right badge */}
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                  LIVE
                </div>
              </TiltCard>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent" />
      </section>

      {/* Proof Points */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="gradient-orb w-[400px] h-[400px] bg-red-200 dark:bg-red-900 top-[-100px] right-[-100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              <span className="text-shimmer-slow">Flight Operations Excellence</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              The operational backbone behind Aeryl AI&apos;s emergency response platform.
            </p>
          </div>
          <ScrollAnimation animation="stagger">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {proofPoints.map((point, index) => (
                <TiltCard
                  key={point.title}
                  className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-500/50 hover:shadow-xl transition-all duration-300"
                  tiltAmount={6}
                  glareEnabled={true}
                >
                  <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 dark:group-hover:bg-red-900/50 group-hover:scale-110 transition-all duration-300">
                    <point.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{point.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{point.description}</p>
                </TiltCard>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-16 sm:py-24 relative bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">What We Bring to Aeryl Missions</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                We fly the missions. Aeryl AI coordinates them.
              </p>
            </div>
            <Link
              href="/how-it-works"
              className="group inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors"
            >
              Learn more
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <ScrollAnimation animation="fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group"
                >
                  <TiltCard
                    className="relative p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-red-200 dark:hover:border-red-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
                    tiltAmount={5}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-50 dark:from-red-900/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-colors">
                        <service.icon className="w-6 h-6 text-red-600" />
                      </div>
                      <h3 className="font-semibold text-xl text-slate-900 dark:text-white mb-3 group-hover:text-red-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">{service.description}</p>
                      <div className="mt-4 inline-flex items-center text-red-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* How We Operate */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient opacity-30" />
        <div className="absolute inset-0">
          <div className="gradient-orb w-[500px] h-[500px] bg-red-500/20 top-0 left-1/4" />
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-500/20 bottom-0 right-1/4" style={{ animationDelay: '8s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                <span className="text-shimmer-white">How We Operate</span>
              </h2>
              <p className="text-slate-400 text-lg">
                How AutonOps executes Aeryl AI missions in the field.
              </p>
            </div>
            <Link
              href="/how-it-works"
              className="group inline-flex items-center text-red-400 font-medium hover:text-red-300 transition-colors"
            >
              Learn more
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {operationSteps.map((step, index) => (
              <div key={step.step} className="relative group">
                {/* Connector line */}
                {index < operationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-slate-700 to-transparent" />
                )}
                <TiltCard
                  className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700 hover:border-red-500/50 transition-all duration-300"
                  tiltAmount={8}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl font-bold text-shimmer">
                      {step.step}
                    </div>
                    <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-red-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From 911 Call to After Action Report */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-orange-300 dark:bg-orange-900 top-[-100px] left-[-100px]" />
          <div className="gradient-orb w-[300px] h-[300px] bg-red-300 dark:bg-red-900 bottom-[-50px] right-[-50px]" style={{ animationDelay: '5s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              From <span className="text-shimmer-slow">911 Call</span> to After Action Report
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
              Aeryl AI coordinates the response. AutonOps flies the mission. From dispatch to debrief.
            </p>
          </div>

          {/* 8-Step Timeline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
            {missionFlowSteps.map((step, index) => (
              <div key={step.step} className="relative group">
                {/* Connector line */}
                {index < missionFlowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-red-300 dark:from-red-700 to-transparent z-0" />
                )}
                <TiltCard
                  className="relative bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-500/50 hover:shadow-lg transition-all duration-300 z-10"
                  tiltAmount={8}
                >
                  <div className="text-2xl font-bold text-red-600 mb-2">{step.step}</div>
                  <div className="w-10 h-10 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <step.icon className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{step.description}</p>
                </TiltCard>
              </div>
            ))}
          </div>

          {/* Callout Box */}
          <div className="bg-slate-800 dark:bg-slate-800 rounded-2xl p-8 border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-full" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Incident Command Always Retains Control</h3>
                <p className="text-slate-300">
                  AutonOps provides the aircraft and crew. Aeryl AI provides the intelligence. All tactical decisions remain with the Incident Commander. Our operators follow IC directives and never take autonomous action that affects ground operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Partner: Aeryl AI */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-200 dark:bg-blue-900 bottom-0 left-1/4" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm mb-6">
                <Cpu className="w-4 h-4" />
                Flight Operations Partner
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                The Ops Team Behind <span className="text-shimmer-slow">Aeryl AI</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                AutonOps is the flight operations arm of Aeryl AI. While Aeryl builds the AI-powered detection and analysis platform, AutonOps puts the aircraft, pilots, and mission controllers in the field to execute every mission.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Aeryl provides the intelligence. AutonOps provides the operations. Together, one integrated response platform.
              </p>
              <a
                href="https://aeryl.base44.app/"
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

      {/* Use Cases */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[300px] h-[300px] bg-orange-300 dark:bg-orange-900 top-0 left-0" />
          <div className="gradient-orb w-[300px] h-[300px] bg-blue-300 dark:bg-blue-900 bottom-0 right-0" style={{ animationDelay: '5s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">Mission Types We Fly</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Operational capabilities AutonOps brings to every Aeryl deployment.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <TiltCard
                key={useCase.title}
                className="group relative p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden"
                tiltAmount={10}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${useCase.color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`} />
                <div className={`w-14 h-14 bg-gradient-to-br ${useCase.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <useCase.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{useCase.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{useCase.description}</p>
              </TiltCard>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/industries"
              className="group inline-flex items-center px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              View all industries and use cases
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient opacity-40" />
        <div className="absolute inset-0">
          <div className="gradient-orb w-[600px] h-[600px] bg-red-500/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See the <span className="text-shimmer">platform in action</span>
          </h2>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">
            Explore the Aeryl + AutonOps mission control platform or connect with our operations team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/login"
              className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 btn-glow"
            >
              View Platform
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-slate-500 text-white font-medium rounded-lg hover:bg-white/5 hover:border-slate-400 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
