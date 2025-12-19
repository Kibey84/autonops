import Link from 'next/link';
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
} from 'lucide-react';

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
  },
  {
    title: 'Mission Planning',
    description:
      'Comprehensive pre-mission planning, risk assessment, and stakeholder coordination.',
    href: '/services#mission-planning',
  },
  {
    title: 'Emergency Response',
    description:
      'Rapid deployment capabilities for fire, rescue, and disaster response scenarios.',
    href: '/services#emergency-response',
  },
  {
    title: 'Reconnaissance',
    description:
      'Aerial surveillance and situational awareness for tactical decision-making.',
    href: '/services#reconnaissance',
  },
];

const operationSteps = [
  {
    step: '01',
    title: 'Mission Brief',
    description: 'Define objectives, assess risks, coordinate with stakeholders.',
  },
  {
    step: '02',
    title: 'Deploy',
    description: 'Mobilize operators, aircraft, and support equipment to location.',
  },
  {
    step: '03',
    title: 'Execute',
    description: 'Conduct flight operations with real-time monitoring and communication.',
  },
  {
    step: '04',
    title: 'Debrief',
    description: 'Deliver data, report findings, document lessons learned.',
  },
];

const useCases = [
  {
    icon: Flame,
    title: 'Fire Response',
    description: 'Aerial assessment of active fires, hotspot identification, and perimeter mapping.',
  },
  {
    icon: Search,
    title: 'Search and Rescue',
    description: 'Thermal imaging and visual search across difficult terrain.',
  },
  {
    icon: Eye,
    title: 'Reconnaissance',
    description: 'Situational awareness and tactical intelligence gathering.',
  },
  {
    icon: AlertTriangle,
    title: 'Disaster Assessment',
    description: 'Rapid damage evaluation and infrastructure inspection post-event.',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Professional Drone
              <span className="block text-red-500">Flight Operations</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl">
              We provide pilots, mission controllers, aircraft, and complete mission execution
              for emergency response, reconnaissance, and mission-critical applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
              >
                Contact Operations
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-500 text-white font-medium rounded hover:bg-slate-800 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Proof Points */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Operational Excellence
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Built on discipline, training, and proven processes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {proofPoints.map((point) => (
              <div
                key={point.title}
                className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <point.icon className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{point.title}</h3>
                <p className="text-sm text-slate-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Our Services</h2>
              <p className="text-slate-600">
                Complete drone operations capabilities for your mission requirements.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors"
            >
              View all services
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group p-6 bg-white border border-slate-200 rounded-lg hover:border-red-200 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How We Operate */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">How We Operate</h2>
              <p className="text-slate-400">
                A structured approach to every mission.
              </p>
            </div>
            <Link
              href="/operations"
              className="inline-flex items-center text-red-400 font-medium hover:text-red-300 transition-colors"
            >
              Learn more
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {operationSteps.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-5xl font-bold text-slate-700 mb-4">{step.step}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Use Cases</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Supporting critical operations across emergency services and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="p-6 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
              >
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                  <useCase.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-slate-600">{useCase.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/industries"
              className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors"
            >
              View all industries and use cases
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Ready to discuss your mission requirements?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Request a capability brief or connect directly with our operations team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
            >
              Request a Capability Brief
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded hover:bg-slate-100 transition-colors"
            >
              Talk to Operations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
