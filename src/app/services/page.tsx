import { Metadata } from 'next';
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
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Professional drone flight operations services including pilots, mission controllers, aircraft, mission planning, and emergency response capabilities.',
  alternates: {
    canonical: 'https://autonops.com/services',
  },
  openGraph: {
    title: 'Services | AutonOps',
    description: 'Complete drone operations capabilities for fire response, search & rescue, reconnaissance, and emergency missions.',
    images: [{ url: '/aircraft-fire.jpg', width: 1200, height: 630, alt: 'AutonOps Aircraft Fire Response' }],
  },
};

const services = [
  {
    id: 'flight-operations',
    icon: Plane,
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
    icon: Flame,
    title: 'Fire Response',
    description: 'Aerial assessment of active fires, hotspot identification, perimeter mapping, and real-time situational awareness for incident commanders.',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    icon: Search,
    title: 'Search & Rescue',
    description: 'Thermal imaging and visual search across difficult terrain, victim location, and coordination support for rescue operations.',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Shield,
    title: 'Law Enforcement',
    description: 'Tactical overwatch, suspect tracking, perimeter security, and scene documentation for law enforcement operations.',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Crosshair,
    title: 'Reconnaissance',
    description: 'Intelligence gathering, area surveillance, infrastructure inspection, and situational awareness for planning and operations.',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/aircraft-fire.jpg"
            alt="Aircraft performing fire suppression"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Our Services
            </h1>
            <p className="text-lg sm:text-xl text-slate-300">
              End-to-end drone operations capabilities. We provide the pilots, controllers,
              aircraft, and expertise—you focus on your mission objectives.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Categories */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Mission Categories
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Specialized capabilities for your operational requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionCategories.map((category) => (
              <div
                key={category.title}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-slate-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Full Service Capabilities
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Everything you need for successful drone operations.
            </p>
          </div>
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`bg-slate-100 rounded-lg aspect-video flex items-center justify-center ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <service.icon className="w-24 h-24 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Need a custom solution?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            We tailor our services to your specific mission requirements.
            Contact us to discuss your needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
          >
            Contact Us
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
