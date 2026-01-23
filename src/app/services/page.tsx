'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Plane,
  ClipboardCheck,
  Zap,
  Eye,
  Wrench,
  Database,
  ArrowRight,
  Flame,
  Search,
  Shield,
  Crosshair,
  Wifi,
  Clock,
  CheckCircle,
  Radio,
} from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import { RadarPulse } from '@/components/AnimatedDrone';

const services = [
  {
    id: 'flight-operations',
    icon: Plane,
    image: '/flight-operations.png',
    title: 'Flight Operations',
    description:
      'Complete drone flight operations with professional pilots and mission controllers.',
    details: [
      'FAA-compliant flight operations',
      'Experienced remote pilots and visual observers',
      'Mission controllers for coordination and oversight',
      'Multi-aircraft operations when required',
      'Real-time telemetry and monitoring',
    ],
  },
  {
    id: 'mission-planning',
    icon: ClipboardCheck,
    image: '/mission-planning.png',
    title: 'Mission Planning',
    description:
      'Comprehensive pre-mission planning and risk assessment for successful outcomes.',
    details: [
      'Site assessment and airspace analysis',
      'Risk identification and mitigation planning',
      'Stakeholder coordination and communication',
      'Contingency and emergency procedures',
      'Regulatory compliance verification',
    ],
  },
  {
    id: 'emergency-response',
    icon: Zap,
    image: '/emergency-response.png',
    title: 'Emergency Response',
    description:
      'Rapid deployment capabilities for time-critical emergency situations.',
    details: [
      'Quick-response team mobilization',
      'Integration with incident command systems',
      'Real-time situational awareness support',
      'Thermal and visual imaging capabilities',
      'Coordination with first responders',
    ],
  },
  {
    id: 'reconnaissance',
    icon: Eye,
    image: '/reconnaissance.png',
    title: 'Reconnaissance',
    description:
      'Aerial surveillance and intelligence gathering for tactical decision-making.',
    details: [
      'Wide-area surveillance coverage',
      'High-resolution imagery capture',
      'Live video streaming to command',
      'Pattern of life observation',
      'Infrastructure and asset monitoring',
    ],
  },
  {
    id: 'equipment',
    icon: Wrench,
    image: '/equipment-logistics.png',
    title: 'Equipment & Logistics',
    description:
      'We bring the aircraft, sensors, and support equipment your mission requires.',
    details: [
      'Mission-appropriate aircraft selection',
      'Thermal and multispectral sensors',
      'Ground control stations',
      'Communications equipment',
      'Power and field support gear',
    ],
  },
  {
    id: 'data-handling',
    icon: Database,
    image: '/data-handling.png',
    title: 'Data Handling',
    description:
      'Secure capture, transmission, and delivery of mission data.',
    details: [
      'Encrypted data transmission',
      'Secure storage protocols',
      'Chain of custody documentation',
      'Multiple delivery format options',
      'Retention and destruction policies',
    ],
  },
];

const missionCategories = [
  {
    title: 'Fire Response',
    icon: Flame,
    description: 'Hotspot identification, perimeter mapping, damage assessment, and real-time fire monitoring.',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-500',
  },
  {
    title: 'Search & Rescue',
    icon: Search,
    description: 'Thermal imaging, victim location, terrain mapping, and coordination with ground teams.',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-500',
  },
  {
    title: 'Law Enforcement',
    icon: Shield,
    description: 'Tactical overwatch, scene documentation, suspect tracking, and evidence gathering.',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-500',
  },
  {
    title: 'Reconnaissance',
    icon: Crosshair,
    description: 'Surveillance, infrastructure inspection, threat detection, and situational awareness.',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-500',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hoverjet-dropping.png"
            alt="Aircraft performing fire suppression"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/70" />
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[400px] h-[400px] bg-red-500/20 top-[-100px] right-[-100px]" />
          <div className="gradient-orb w-[300px] h-[300px] bg-orange-500/20 bottom-[-100px] left-[10%]" style={{ animationDelay: '5s' }} />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-[10%] float-slow hidden lg:block">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300">Live Telemetry</span>
            </div>
          </div>
          <div className="absolute bottom-20 right-[20%] float-medium hidden lg:block" style={{ animationDelay: '2s' }}>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Rapid Response</span>
            </div>
          </div>
          <div className="absolute top-1/2 right-[5%] hidden xl:block float-fast">
            <RadarPulse size={60} color="#dc2626" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Full-Service Operations
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Our <span className="text-shimmer">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300">
              End-to-end drone operations capabilities. We provide the pilots, controllers,
              aircraft, and expertise—you focus on your mission objectives.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Categories */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="gradient-orb w-[300px] h-[300px] bg-orange-200 dark:bg-orange-900 top-[-50px] left-[-50px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Mission Categories
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Specialized capabilities for your operational requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionCategories.map((category, index) => (
              <TiltCard
                key={category.title}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                tiltAmount={8}
              >
                <div className="relative">
                  {/* Pulsing background effect */}
                  <div className={`absolute -inset-2 ${category.bgColor} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />

                  <div className={`relative w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-7 h-7 text-white" />
                    {/* Radar rings on hover */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className={`absolute inset-0 ${category.bgColor} opacity-0 group-hover:opacity-30 rounded-xl animate-ping`} style={{ animationDuration: '2s' }} />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{category.description}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-200 dark:bg-blue-900 bottom-0 right-0" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Full Service Capabilities
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Everything you need for successful drone operations.
            </p>
          </div>
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <service.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.details.map((detail, i) => (
                      <li key={detail} className="flex items-start gap-3 group/item">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                        <span className="text-slate-700 dark:text-slate-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <TiltCard
                  className={`rounded-2xl aspect-video relative overflow-hidden shadow-lg ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                  tiltAmount={5}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  </div>

                  {/* Service icon badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-lg p-2">
                    <service.icon className="w-6 h-6 text-red-600" />
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
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
            Need a <span className="text-shimmer">custom solution</span>?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            We tailor our services to your specific mission requirements.
            Contact us to discuss your needs.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 btn-glow"
          >
            Contact Us
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
