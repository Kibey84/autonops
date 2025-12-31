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
    description: 'Mission-ready teams that mobilize quickly when time is critical.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Rigorous protocols and trained operators for every mission.',
  },
  {
    icon: Target,
    title: 'Mission Planning',
    description: 'Detailed pre-mission analysis and coordination with stakeholders.',
  },
  {
    icon: Users,
    title: 'Trained Operators',
    description: 'Professional pilots and mission controllers with operational experience.',
  },
  {
    icon: Lock,
    title: 'Secure Data Handling',
    description: 'Protected data transmission and storage for sensitive operations.',
  },
];

const services = [
  {
    title: 'Flight Operations',
    description:
      'End-to-end drone flight operations including pilots, mission controllers, and aircraft.',
    href: '/services#flight-operations',
    icon: Plane,
  },
  {
    title: 'Mission Planning',
    description:
      'Comprehensive pre-mission planning, risk assessment, and stakeholder coordination.',
    href: '/services#mission-planning',
    icon: Target,
  },
  {
    title: 'Emergency Response',
    description:
      'Rapid deployment capabilities for fire, rescue, and disaster response scenarios.',
    href: '/services#emergency-response',
    icon: AlertTriangle,
  },
  {
    title: 'Reconnaissance',
    description:
      'Aerial surveillance and situational awareness for tactical decision-making.',
    href: '/services#reconnaissance',
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
    title: 'Fire Response',
    description: 'Aerial assessment of active fires, hotspot identification, and perimeter mapping.',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: Search,
    title: 'Search and Rescue',
    description: 'Thermal imaging and visual search across difficult terrain.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Eye,
    title: 'Reconnaissance',
    description: 'Situational awareness and tactical intelligence gathering.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: AlertTriangle,
    title: 'Disaster Assessment',
    description: 'Rapid damage evaluation and infrastructure inspection post-event.',
    color: 'from-amber-500 to-orange-600',
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
              <span className="text-sm text-slate-300">Starlink Connected</span>
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
                Mission-Ready Operations
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Professional Drone
                <span className="block text-shimmer">
                  <Typewriter
                    words={['Flight Operations', 'Emergency Response', 'Reconnaissance', 'Mission Support']}
                    typingSpeed={80}
                    deletingSpeed={40}
                    delayBetweenWords={3000}
                  />
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-xl">
                We provide pilots, mission controllers, aircraft, and complete mission execution
                for emergency response, reconnaissance, and mission-critical applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 btn-glow"
                >
                  Contact Operations
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-4 border border-slate-500 text-white font-medium rounded-lg hover:bg-white/5 hover:border-slate-400 transition-all duration-300"
                >
                  View Services
                </Link>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block animate-slide-in-right">
              <TiltCard className="relative" tiltAmount={8}>
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                  <Image
                    src="/aircraft.jpg"
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
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Proof Points */}
      <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="gradient-orb w-[400px] h-[400px] bg-red-200 top-[-100px] right-[-100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              <span className="text-shimmer-slow">Operational Excellence</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Built on discipline, training, and proven processes.
            </p>
          </div>
          <ScrollAnimation animation="stagger">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {proofPoints.map((point, index) => (
                <TiltCard
                  key={point.title}
                  className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-red-200 hover:shadow-xl transition-all duration-300"
                  tiltAmount={6}
                  glareEnabled={true}
                >
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 group-hover:scale-110 transition-all duration-300">
                    <point.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{point.title}</h3>
                  <p className="text-sm text-slate-600">{point.description}</p>
                </TiltCard>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-16 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Our Services</h2>
              <p className="text-slate-600 text-lg">
                Complete drone operations capabilities for your mission requirements.
              </p>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors"
            >
              View all services
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
                    className="relative p-8 bg-white border border-slate-200 rounded-2xl hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
                    tiltAmount={5}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                        <service.icon className="w-6 h-6 text-red-600" />
                      </div>
                      <h3 className="font-semibold text-xl text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600">{service.description}</p>
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
                A structured approach to every mission.
              </p>
            </div>
            <Link
              href="/operations"
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

      {/* Use Cases */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[300px] h-[300px] bg-orange-300 top-0 left-0" />
          <div className="gradient-orb w-[300px] h-[300px] bg-blue-300 bottom-0 right-0" style={{ animationDelay: '5s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Use Cases</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Supporting critical operations across emergency services and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <TiltCard
                key={useCase.title}
                className="group relative p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden"
                tiltAmount={10}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${useCase.color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`} />
                <div className={`w-14 h-14 bg-gradient-to-br ${useCase.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <useCase.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-slate-600">{useCase.description}</p>
              </TiltCard>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/industries"
              className="group inline-flex items-center px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
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
            Ready to discuss your <span className="text-shimmer">mission requirements</span>?
          </h2>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">
            Request a capability brief or connect directly with our operations team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 btn-glow"
            >
              Request a Capability Brief
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-slate-500 text-white font-medium rounded-lg hover:bg-white/5 hover:border-slate-400 transition-all duration-300"
            >
              Talk to Operations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
