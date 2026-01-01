import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Shield, Users, Zap, ArrowRight, Linkedin, Cpu, Radio, Sparkles, Building, FileCheck, GraduationCap, Wrench, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'AutonOps LLP is an Ohio-based professional drone flight operations company. We provide pilots, mission controllers, aircraft, and complete mission execution.',
  alternates: {
    canonical: 'https://autonops.com/about',
  },
  openGraph: {
    title: 'About | AutonOps',
    description: 'Ohio-based professional drone flight operations company providing pilots, mission controllers, aircraft, and complete mission execution.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AutonOps - Professional Drone Flight Operations' }],
  },
};

const values = [
  {
    icon: Shield,
    title: 'Safety',
    description:
      'Safety is foundational to everything we do. We maintain rigorous protocols and never compromise on operational safety.',
  },
  {
    icon: Target,
    title: 'Mission Focus',
    description:
      'Your objectives drive our operations. We exist to support your mission success, not to showcase technology.',
  },
  {
    icon: Users,
    title: 'Professionalism',
    description:
      'Trained operators, clear communication, and disciplined execution. We represent you in the field.',
  },
  {
    icon: Zap,
    title: 'Reliability',
    description:
      'When you need us, we deliver. Consistent performance and dependable execution are non-negotiable.',
  },
];

const leadership = [
  {
    name: 'Robert Lee',
    role: 'Chief Executive Officer',
    title: 'CEO',
    bio: '',
    image: null,
  },
  {
    name: 'Joshua Kibe, PMP',
    role: 'Chief Financial Officer',
    title: 'CFO',
    bio: 'U.S. Air Force Veteran with 20+ years leading mission-critical operations. FAA Part 107 Pilot. Project Management Professional (PMP), Lean Six Sigma Green Belt, Active Secret Clearance.',
    image: '/joshua-kibe.jpg',
    credentials: ['PMP', 'Lean Six Sigma Green Belt', 'USAF Veteran', 'Secret Clearance'],
  },
  {
    name: 'Jaderic Dawson',
    role: 'Chief Technology Officer',
    title: 'CTO',
    bio: '',
    image: null,
  },
  {
    name: 'Matthew Sunday',
    role: 'Chief Operating Officer',
    title: 'COO',
    bio: '',
    image: null,
  },
];

export default function AboutPage() {
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
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              About AutonOps
            </h1>
            <p className="text-lg sm:text-xl text-slate-300">
              We are a professional drone flight operations company based in Ohio.
              We provide the people, equipment, and expertise to execute drone missions
              for organizations that need reliable aerial capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  AutonOps LLP is a professional drone flight operations company. We
                  provide complete drone mission execution: pilots, mission controllers,
                  aircraft, logistics, and operational support.
                </p>
                <p>
                  Our focus is on mission-critical applications where reliability and
                  professionalism matter. We serve emergency response agencies, government
                  organizations, and enterprises that need aerial capabilities without
                  building their own drone programs.
                </p>
                <p>
                  We operate with discipline and structure. Every mission follows proven
                  processes, from initial planning through final delivery. Our team
                  understands that when you engage us, your reputation is on the line
                  alongside ours.
                </p>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="AutonOps"
                    width={200}
                    height={60}
                    className="opacity-50"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/60 text-sm">Mission-Ready Operations</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-500/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership with Aeryl */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Strategic Partnership
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Powered by Aeryl AI
              </h2>
              <div className="space-y-4 text-slate-300">
                <p>
                  AutonOps operates in strategic partnership with <strong className="text-white">Aeryl AI LLC</strong>,
                  a leader in autonomous aviation technology. This partnership combines Aeryl&apos;s cutting-edge
                  M2 Multi-Mission Platform with our operational expertise to deliver unmatched drone services.
                </p>
                <p>
                  Through this collaboration, we leverage AI-powered mission planning, real-time sensor
                  analysis, and automated coordination systems that set a new standard for drone operations
                  in emergency response and critical missions.
                </p>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
                <h3 className="text-xl font-semibold mb-6 text-center">M2 Platform Capabilities</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-xl">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">AI-Generated Mission Planning</h4>
                      <p className="text-sm text-slate-400">Automated flight plans, waypoint optimization, and real-time adjustments</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Radio className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Live Sensor & Video Feeds</h4>
                      <p className="text-sm text-slate-400">Real-time streaming to incident commanders with AI-enhanced analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-xl">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Cpu className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Intelligent Coordination</h4>
                      <p className="text-sm text-slate-400">Automated FAA integration, mission scoring, and after-action reports</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to operational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((person, index) => (
              <div
                key={person.role}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Photo or placeholder */}
                <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-slate-400/50 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white/80">{person.title}</span>
                      </div>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href="#" className="inline-flex items-center text-white text-sm hover:text-red-400 transition-colors">
                      <Linkedin className="w-4 h-4 mr-1" />
                      Connect
                    </a>
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-sm text-red-600 font-medium mb-2">{person.role}</p>
                  {person.bio && (
                    <p className="text-sm text-slate-600">{person.bio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              What We Do
            </h2>
            <p className="text-slate-600">
              We handle the entire drone operation so you can focus on your core mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Provide Operators
              </h3>
              <p className="text-slate-600">
                Professional pilots and mission controllers trained for demanding
                operational environments. Remote PIC, visual observers, and support
                personnel as your mission requires.
              </p>
            </div>
            <div className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Supply Equipment
              </h3>
              <p className="text-slate-600">
                We bring the aircraft, sensors, ground control stations, and support
                equipment. You don&apos;t need to build or maintain a fleet—we handle it.
              </p>
            </div>
            <div className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                <Target className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Execute Missions
              </h3>
              <p className="text-slate-600">
                From planning through delivery, we manage the entire operation.
                You define objectives, we execute and deliver results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that guide how we operate and serve our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-red-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 group-hover:scale-110 transition-all duration-300">
                  <value.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government & Enterprise Ready */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm mb-6">
                <Building className="w-4 h-4" />
                Enterprise Ready
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Government & Enterprise Qualified
              </h2>
              <p className="text-slate-600 mb-8">
                AutonOps is structured to work with government agencies and enterprise
                organizations that require formal contracting relationships and compliance verification.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-900">SAM.gov Registration</span>
                    <p className="text-sm text-slate-600">Registered for federal contracting opportunities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-900">UEI Number</span>
                    <p className="text-sm text-slate-600">Unique Entity Identifier for government procurement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-900">Ohio LLP</span>
                    <p className="text-sm text-slate-600">Formally registered limited liability partnership</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-900">Grant Eligible</span>
                    <p className="text-sm text-slate-600">Positioned for federal grants and programs like Tradewinds</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <FileCheck className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Compliance Ready</h3>
                  <p className="text-slate-600 text-sm">
                    Structured for government procurement, grants, and enterprise contracts
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 text-center border border-slate-200">
                    <p className="text-xs text-slate-500">Entity Type</p>
                    <p className="font-medium text-slate-900">LLP</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border border-slate-200">
                    <p className="text-xs text-slate-500">State</p>
                    <p className="font-medium text-slate-900">Ohio</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border border-slate-200">
                    <p className="text-xs text-slate-500">Established</p>
                    <p className="font-medium text-slate-900">2025</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center border border-slate-200">
                    <p className="text-xs text-slate-500">Status</p>
                    <p className="font-medium text-green-600">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Pipeline */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm mb-6">
                <GraduationCap className="w-4 h-4" />
                Workforce Development
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Training & Talent Pipeline
              </h2>
              <p className="text-slate-600 mb-8">
                We&apos;re building a sustainable workforce through partnerships with
                educational institutions that specialize in aviation and UAV technology.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Sinclair Community College Partnership</h3>
                    <p className="text-slate-600 text-sm">
                      Access to certified UAV pilot programs and trained graduates ready for commercial operations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Pilot Certification Pipeline</h3>
                    <p className="text-slate-600 text-sm">
                      Continuous supply of FAA Part 107 certified pilots with professional training.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">UAV Mechanics Training</h3>
                    <p className="text-slate-600 text-sm">
                      Trained technicians for aircraft maintenance, repair, and field support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:order-1 relative">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">Workforce Growth</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="font-medium text-slate-900">Remote Pilots</span>
                    </div>
                    <span className="text-sm text-slate-500">Scaling</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Radio className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-slate-900">Mission Controllers</span>
                    </div>
                    <span className="text-sm text-slate-500">Scaling</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium text-slate-900">UAV Technicians</span>
                    </div>
                    <span className="text-sm text-slate-500">Scaling</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Based in Ohio</h2>
              <p className="text-slate-300 mb-6">
                AutonOps LLP is headquartered in Ohio. Our central location allows
                us to deploy teams efficiently across the region and beyond.
              </p>
              <p className="text-slate-300">
                We work with organizations nationwide, providing professional drone
                operations wherever the mission takes us.
              </p>
            </div>
            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 text-center border border-slate-700">
                <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 mb-4">OH</div>
                <p className="text-slate-400">Ohio, United States</p>
                <div className="mt-6 flex justify-center gap-2">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-400">Central Time</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-400">Nationwide Service</span>
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
            Want to work with us?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            We&apos;re always interested in discussing how we can support your mission.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
          >
            Contact Us
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
