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
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-red-500 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-red-600 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
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
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Flight Operations</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-xl">
                We provide pilots, mission controllers, aircraft, and complete mission execution
                for emergency response, reconnaissance, and mission-critical applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
                >
                  Contact Operations
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-4 border border-slate-500 text-white font-medium rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                  View Services
                </Link>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block animate-slide-in-right">
              <div className="relative aspect-square">
                {/* Drone illustration placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 animate-float">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl rotate-12 shadow-2xl" />
                    <div className="absolute inset-4 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl -rotate-6 flex items-center justify-center">
                      <Image
                        src="/logo.png"
                        alt="AutonOps"
                        width={120}
                        height={40}
                        className="opacity-60"
                      />
                    </div>
                  </div>
                </div>
                {/* Orbiting elements */}
                <div className="absolute top-10 right-10 w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center backdrop-blur animate-float" style={{ animationDelay: '0.5s' }}>
                  <Plane className="w-8 h-8 text-red-400" />
                </div>
                <div className="absolute bottom-20 left-10 w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur animate-float" style={{ animationDelay: '1s' }}>
                  <Radio className="w-6 h-6 text-blue-400" />
                </div>
                <div className="absolute top-1/2 right-0 w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center backdrop-blur animate-float" style={{ animationDelay: '1.5s' }}>
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Proof Points */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Operational Excellence
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Built on discipline, training, and proven processes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {proofPoints.map((point, index) => (
              <div
                key={point.title}
                className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 group-hover:scale-110 transition-all duration-300">
                  <point.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{point.title}</h3>
                <p className="text-sm text-slate-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-16 sm:py-24">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative p-8 bg-white border border-slate-200 rounded-2xl hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How We Operate */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">How We Operate</h2>
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
                <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                      {step.step}
                    </div>
                    <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-red-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Use Cases</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Supporting critical operations across emergency services and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={useCase.title}
                className="group relative p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${useCase.color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`} />
                <div className={`w-14 h-14 bg-gradient-to-br ${useCase.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <useCase.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">{useCase.title}</h3>
                <p className="text-sm text-slate-600">{useCase.description}</p>
              </div>
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
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500 rounded-full blur-[200px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to discuss your mission requirements?
          </h2>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto text-lg">
            Request a capability brief or connect directly with our operations team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
            >
              Request a Capability Brief
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-slate-500 text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
            >
              Talk to Operations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
