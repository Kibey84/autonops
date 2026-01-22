import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Shield, Users, Zap, ArrowRight, Linkedin, Cpu, Radio, Sparkles, Building, FileCheck, GraduationCap, Wrench, CheckCircle, Award, MapPin } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import { RadarPulse } from '@/components/AnimatedDrone';

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
    color: 'red',
  },
  {
    icon: Target,
    title: 'Mission Focus',
    description:
      'Your objectives drive our operations. We exist to support your mission success, not to showcase technology.',
    color: 'blue',
  },
  {
    icon: Users,
    title: 'Professionalism',
    description:
      'Trained operators, clear communication, and disciplined execution. We represent you in the field.',
    color: 'purple',
  },
  {
    icon: Zap,
    title: 'Reliability',
    description:
      'When you need us, we deliver. Consistent performance and dependable execution are non-negotiable.',
    color: 'green',
  },
];

const leadership = [
  {
    name: 'Bob Lee',
    role: 'Chief Executive Officer',
    title: 'CEO',
    bio: 'Experienced operational leader with a background in aviation operations, program leadership, and technology-driven mission execution.',
    image: '/bob-lee.jpg',
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
    name: 'Jaderic Dawson, M.S.',
    role: 'Chief Technology Officer',
    title: 'CTO',
    bio: 'AI architect and mechanical engineer with 10+ years deploying AI in mission-critical environments. FAA Part 107 Pilot. M.S. Mechanical Engineering, Cornell AI/ML.',
    image: '/jaderic-dawson.jpg',
  },
  {
    name: 'Matthew B. Sunday',
    role: 'Chief Operating Officer',
    title: 'COO',
    bio: 'USMC Sergeant (Ret.), Fire Captain (Ret.) with 30+ years in military, emergency response, and engineering leadership.',
    image: '/matt-sunday.png',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-20 sm:py-28 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animated-gradient opacity-30" />

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[500px] h-[500px] bg-red-500/20 top-[-150px] left-[-100px]" />
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-500/20 bottom-[-100px] right-[-50px]" style={{ animationDelay: '5s' }} />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-[15%] float-slow hidden lg:block">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">FAA Certified</span>
            </div>
          </div>
          <div className="absolute bottom-24 right-[25%] float-medium hidden lg:block" style={{ animationDelay: '2s' }}>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-400" />
              <span className="text-sm text-slate-300">Ohio Based</span>
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
              Professional Operations
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              About <span className="text-shimmer">AutonOps</span>
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
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-200 dark:bg-blue-900 top-[-100px] right-[-100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400">
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
            <TiltCard className="relative" tiltAmount={5}>
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
              {/* Floating badge */}
              <div className="absolute -top-4 -left-4 bg-red-600 text-white rounded-xl px-3 py-2 shadow-lg float-slow">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Trusted</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Partnership with Aeryl */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient opacity-20" />

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[500px] h-[500px] bg-red-500/20 top-[-100px] left-[20%]" />
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-500/20 bottom-[-100px] right-[10%]" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Strategic Partnership
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Powered by <span className="text-shimmer">Aeryl AI</span>
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
            <TiltCard
              className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700"
              tiltAmount={6}
            >
              <h3 className="text-xl font-semibold mb-6 text-center">M2 Platform Capabilities</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-xl group hover:bg-slate-700/50 transition-colors">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">AI-Generated Mission Planning</h4>
                    <p className="text-sm text-slate-400">Automated flight plans, waypoint optimization, and real-time adjustments</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-xl group hover:bg-slate-700/50 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Radio className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Live Sensor & Video Feeds</h4>
                    <p className="text-sm text-slate-400">Real-time streaming to incident commanders with AI-enhanced analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-xl group hover:bg-slate-700/50 transition-colors">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Cpu className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Intelligent Coordination</h4>
                    <p className="text-sm text-slate-400">Automated FAA integration, mission scoring, and after-action reports</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-purple-200 dark:bg-purple-900 bottom-[-100px] left-[-100px]" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-sm mb-4">
              <Users className="w-4 h-4" />
              Our Team
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Leadership Team
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Experienced professionals dedicated to operational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((person, index) => (
              <TiltCard
                key={person.role}
                className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
                tiltAmount={8}
              >
                {/* Photo or placeholder */}
                <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 relative overflow-hidden">
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-slate-400/50 dark:bg-slate-600/50 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
                    {person.name}
                  </h3>
                  <p className="text-sm text-red-600 font-medium mb-2">{person.role}</p>
                  {person.bio && (
                    <p className="text-sm text-slate-600 dark:text-slate-400">{person.bio}</p>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Team Member - Bob Lee */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[500px] h-[500px] bg-amber-200 dark:bg-amber-900 top-[-100px] left-[20%]" />
          <div className="gradient-orb w-[400px] h-[400px] bg-red-200 dark:bg-red-900 bottom-[-100px] right-[10%]" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Photo */}
            <div className="lg:col-span-1">
              <TiltCard className="relative" tiltAmount={5}>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
                  <Image
                    src="/bob-lee.jpg"
                    alt="Bob Lee - Chief Executive Officer"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Credentials badge */}
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-xl border border-slate-200 dark:border-slate-700 float-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Role</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">CEO</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
              {/* Credential tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-sm rounded-full border border-amber-200 dark:border-amber-800">Aviation Ops</span>
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-sm rounded-full border border-red-200 dark:border-red-800">Program Leadership</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm rounded-full border border-blue-200 dark:border-blue-800">Tech Execution</span>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-600 dark:text-amber-400 text-sm mb-4">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                Featured Team Member
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bob Lee</h2>
              <p className="text-amber-600 dark:text-amber-400 font-medium mb-6">Co-Founder | Chief Executive Officer</p>

              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Bob Lee is an experienced operational leader with a background spanning <strong className="text-slate-900 dark:text-white">aviation operations, program leadership, and technology-driven mission execution</strong>. He has led teams across complex, high-accountability environments where safety, precision, and execution speed are critical. His career includes managing multidisciplinary teams, overseeing operational readiness, and guiding organizations through growth, transition, and change.
                </p>
                <p>
                  Bob brings deep experience in <strong className="text-slate-900 dark:text-white">coordinating people, platforms, and processes</strong> to deliver outcomes under real-world constraints. He has a strong track record of turning emerging technologies into operationally viable capabilities, with a focus on reliability, risk management, and continuous improvement. His leadership style emphasizes clarity of roles, disciplined execution, and building systems that scale.
                </p>
                <p>
                  As Chief Executive Officer of AutonOps, Bob is responsible for <strong className="text-slate-900 dark:text-white">overall operational direction, governance, and mission alignment</strong>. He ensures flight operations, mission control, and logistics are structured to support rapid response aerial services while maintaining compliance, safety, and performance standards. Bob works closely with partners and stakeholders to ensure AutonOps delivers dependable capability where time, access, and situational awareness matter most.
                </p>
                <p>
                  Bob is driven by the challenge of <strong className="text-slate-900 dark:text-white">bridging innovation and operations</strong>, ensuring advanced aerial and AI-enabled systems deliver real impact in emergency response and high-consequence scenarios.
                </p>
              </div>

              {/* Key highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">CEO</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Leadership</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">Aviation</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Operations</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">Tech</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Execution</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">Scale</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Team Member - Joshua Kibe */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient opacity-20" />

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[500px] h-[500px] bg-red-500/20 top-[-100px] right-[20%]" />
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-500/20 bottom-[-100px] left-[10%]" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Photo */}
            <div className="lg:col-span-1">
              <TiltCard className="relative" tiltAmount={5}>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                  <Image
                    src="/joshua-kibe.jpg"
                    alt="Joshua Kibe, PMP - Chief Financial Officer"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Credentials badges */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-xl float-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Clearance</p>
                      <p className="text-sm font-semibold text-slate-900">Secret</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
              {/* Credential tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                <span className="px-3 py-1 bg-red-500/20 text-red-300 text-sm rounded-full border border-red-500/30">PMP</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">USAF Veteran</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full border border-green-500/30">Lean Six Sigma</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">FAA Part 107</span>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm mb-4">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Featured Team Member
              </div>
              <h2 className="text-3xl font-bold mb-2">Joshua Kibe, PMP</h2>
              <p className="text-red-400 font-medium mb-6">Co-Founder | Chief Financial Officer | Pilot</p>

              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Joshua Kibe is a Project Management Professional and retired U.S. Air Force veteran with more than 20 years of experience leading mission-critical operations, aircraft support, and complex programs in high-risk, time-sensitive environments. At AutonOps, he serves as Chief Financial Officer and one of the company&apos;s first operational pilots, bringing a rare blend of hands-on mission execution and disciplined financial governance.
                </p>
                <p>
                  During his Air Force career, Josh progressed from tactical aircraft maintenance into senior operational and program leadership roles, supporting global missions and modernization efforts across the <strong className="text-white">F-15, F-16, F-22, F-35, and A-10 platforms</strong>. He oversaw worldwide operations and more than <strong className="text-white">$600M in contract portfolios</strong>, ensuring safety, readiness, and reliability under demanding operational conditions.
                </p>
                <p>
                  Following his military service, Josh led multiple defense innovation initiatives at <strong className="text-white">Wright Brothers Institute</strong> in partnership with the Air Force Research Laboratory (AFRL), including the Bomber Supply Chain Initiative and the F-35 Manpower Model. His work focused on translating advanced technology, data analytics, and AI-enabled tools into deployable capabilities that improved operational readiness, cost efficiency, and decision-making.
                </p>
                <p>
                  At AutonOps, Josh is directly involved in flight operations, mission planning, and pilot execution, while also overseeing financial strategy, budgeting, compliance, and risk management. His dual role ensures that AutonOps scales responsibly without compromising safety, operational readiness, or mission effectiveness.
                </p>
              </div>

              {/* Key highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-700">
                <div className="text-center group">
                  <p className="text-2xl font-bold text-shimmer">20+</p>
                  <p className="text-sm text-slate-400">Years Experience</p>
                </div>
                <div className="text-center group">
                  <p className="text-2xl font-bold text-shimmer">$600M+</p>
                  <p className="text-sm text-slate-400">Portfolio Managed</p>
                </div>
                <div className="text-center group">
                  <p className="text-2xl font-bold text-shimmer">5</p>
                  <p className="text-sm text-slate-400">Aircraft Platforms</p>
                </div>
                <div className="text-center group">
                  <p className="text-2xl font-bold text-shimmer">AFRL</p>
                  <p className="text-sm text-slate-400">Partner Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Team Member - Jaderic Dawson */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 opacity-30">
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-300 dark:bg-blue-900 top-[-100px] left-[20%]" />
          <div className="gradient-orb w-[300px] h-[300px] bg-purple-300 dark:bg-purple-900 bottom-[-100px] right-[20%]" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Bio - on left for variety */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm mb-4">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Featured Team Member
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Jaderic Dawson, M.S.</h2>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-6">Co-Founder | Chief Technology Officer | Pilot</p>

              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Jaderic Dawson is a mechanical engineer, AI architect, and FAA Part 107–certified remote pilot with more than a decade of experience designing and deploying advanced artificial intelligence systems in operational, mission-critical environments. At AutonOps, he serves as Chief Technology Officer and one of the company&apos;s original operational pilots, bridging autonomous systems, real-world flight operations, and decision-support technology.
                </p>
                <p>
                  As the founder of <strong className="text-slate-900 dark:text-white">KnowlEdge2 AI</strong>, Jaderic has led efforts to operationalize knowledge through AI, transforming complex and unstructured data into decision-ready intelligence. His work focuses on <strong className="text-slate-900 dark:text-white">GraphRAG architectures, multi-agent orchestration, and explainable AI</strong>, ensuring AI systems remain transparent, trustworthy, and effective when supporting time-sensitive operations.
                </p>
                <p>
                  Previously, Jaderic served as the <strong className="text-slate-900 dark:text-white">Digital Transformation Lead at AFLCMC</strong>, where he guided enterprise AI adoption strategies and partnered with senior leadership under the Department of the Air Force Chief Data and Artificial Intelligence Officer (CDAO) initiative. Earlier in his career, he supported advanced research at the <strong className="text-slate-900 dark:text-white">Air Force Research Laboratory (AFRL)</strong>, managing automation, controls, and infrastructure for a <strong className="text-slate-900 dark:text-white">$100M experimental research facility</strong>.
                </p>
                <p>
                  At AutonOps, Jaderic is directly involved in flight operations as a Part 107 pilot, while leading the development of AI-enabled mission systems that integrate sensor feeds, autonomy, and real-time analytics into the mission control environment. His dual role ensures that AI capabilities are designed with operator input from the start.
                </p>
              </div>

              {/* Key highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">10+</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Years in AI</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">$100M</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Facility Managed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">AFLCMC</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Digital Lead</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">Cornell</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">AI/ML Training</p>
                </div>
              </div>
            </div>

            {/* Photo - on right */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <TiltCard className="relative" tiltAmount={5}>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
                  <Image
                    src="/jaderic-dawson.jpg"
                    alt="Jaderic Dawson, M.S. - Chief Technology Officer"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Credentials badge */}
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-xl border border-slate-200 dark:border-slate-700 float-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Specialty</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">AI/ML</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
              {/* Credential tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm rounded-full border border-blue-200 dark:border-blue-800">M.S. Engineering</span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm rounded-full border border-purple-200 dark:border-purple-800">Cornell AI/ML</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-sm rounded-full border border-green-200 dark:border-green-800">FAA Part 107</span>
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-sm rounded-full border border-orange-200 dark:border-orange-800">GraphRAG</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Team Member - Matthew Sunday */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient opacity-20" />

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[500px] h-[500px] bg-green-500/20 top-[-100px] left-[20%]" />
          <div className="gradient-orb w-[400px] h-[400px] bg-orange-500/20 bottom-[-100px] right-[10%]" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Photo */}
            <div className="lg:col-span-1">
              <TiltCard className="relative" tiltAmount={5}>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                  <Image
                    src="/matt-sunday.png"
                    alt="Matthew B. Sunday - Chief Operating Officer"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Credentials badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-xl float-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Service</p>
                      <p className="text-sm font-semibold text-slate-900">30+ Years</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
              {/* Credential tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full border border-green-500/30">USMC Veteran</span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30">Fire Captain (Ret.)</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">Emergency Response</span>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Featured Team Member
              </div>
              <h2 className="text-3xl font-bold mb-2">Matthew B. Sunday</h2>
              <p className="text-green-400 font-medium mb-6">Co-Founder | Chief Operating Officer</p>

              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Matthew B. Sunday brings more than <strong className="text-white">30 years of leadership and operational experience</strong> across military service, emergency response, and advanced engineering to his role as Chief Operating Officer at AutonOps. His career spans the <strong className="text-white">United States Marine Corps, law enforcement, firefighting, and emergency medical services</strong>, where he has consistently led teams operating in high-risk, high-consequence environments with a focus on precision, safety, and mission success.
                </p>
                <p>
                  A <strong className="text-white">retired Fire Captain and former Sergeant of Marines</strong>, Matthew has commanded multidisciplinary teams during complex emergency operations and technical initiatives alike. His firsthand experience as a first responder provides AutonOps with a grounded, end-user perspective, ensuring that operational decisions, workflows, and technologies are built to perform reliably when conditions are most demanding.
                </p>
                <p>
                  In addition to his public service, Matthew is the <strong className="text-white">Founder and CEO of The Science and Engineering Corporation</strong>, where he leads initiatives bridging advanced technology with real-world operational needs.
                </p>
              </div>

              {/* Key highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-700">
                <div className="text-center">
                  <p className="text-2xl font-bold text-shimmer">30+</p>
                  <p className="text-sm text-slate-400">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-shimmer">USMC</p>
                  <p className="text-sm text-slate-400">Sergeant (Ret.)</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-shimmer">Fire</p>
                  <p className="text-sm text-slate-400">Captain (Ret.)</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-shimmer">CEO</p>
                  <p className="text-sm text-slate-400">S&E Corp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[300px] h-[300px] bg-red-200 dark:bg-red-900 top-0 right-0" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-600 dark:text-red-400 text-sm mb-4">
              <Target className="w-4 h-4" />
              Our Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What We Do
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              We handle the entire drone operation so you can focus on your core mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TiltCard
              className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-red-200 dark:hover:border-red-500/50 hover:shadow-lg transition-all duration-300"
              tiltAmount={8}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-red-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />
                <div className="relative w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Provide Operators
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Professional pilots and mission controllers trained for demanding
                operational environments. Remote PIC, visual observers, and support
                personnel as your mission requires.
              </p>
            </TiltCard>
            <TiltCard
              className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-red-200 dark:hover:border-red-500/50 hover:shadow-lg transition-all duration-300"
              tiltAmount={8}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-blue-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />
                <div className="relative w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Supply Equipment
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                We bring the aircraft, sensors, ground control stations, and support
                equipment. You don&apos;t need to build or maintain a fleet—we handle it.
              </p>
            </TiltCard>
            <TiltCard
              className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-red-200 dark:hover:border-red-500/50 hover:shadow-lg transition-all duration-300"
              tiltAmount={8}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-green-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />
                <div className="relative w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Execute Missions
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                From planning through delivery, we manage the entire operation.
                You define objectives, we execute and deliver results.
              </p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-purple-200 dark:bg-purple-900 bottom-[-100px] right-[-100px]" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-sm mb-4">
              <Shield className="w-4 h-4" />
              Core Principles
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The principles that guide how we operate and serve our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const colorClasses: Record<string, { bg: string; bgDark: string; icon: string; glow: string }> = {
                red: { bg: 'bg-red-50', bgDark: 'dark:bg-red-900/30', icon: 'text-red-600', glow: 'bg-red-500' },
                blue: { bg: 'bg-blue-50', bgDark: 'dark:bg-blue-900/30', icon: 'text-blue-600', glow: 'bg-blue-500' },
                purple: { bg: 'bg-purple-50', bgDark: 'dark:bg-purple-900/30', icon: 'text-purple-600', glow: 'bg-purple-500' },
                green: { bg: 'bg-green-50', bgDark: 'dark:bg-green-900/30', icon: 'text-green-600', glow: 'bg-green-500' },
              };
              const colors = colorClasses[value.color];

              return (
                <TiltCard
                  key={value.title}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-red-200 dark:hover:border-red-500/50 hover:shadow-lg transition-all duration-300"
                  tiltAmount={8}
                >
                  <div className="relative">
                    <div className={`absolute -inset-2 ${colors.glow} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
                    <div className={`relative w-12 h-12 ${colors.bg} ${colors.bgDark} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <value.icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{value.description}</p>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Government & Enterprise Ready */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[300px] h-[300px] bg-blue-200 dark:bg-blue-900 top-0 left-0" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-blue-700 dark:text-blue-400 text-sm mb-6">
                <Building className="w-4 h-4" />
                Enterprise Ready
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Government & Enterprise Qualified
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                AutonOps is structured to work with government agencies and enterprise
                organizations that require formal contracting relationships and compliance verification.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-medium text-slate-900 dark:text-white">SAM.gov Registration</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Registered for federal contracting opportunities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-medium text-slate-900 dark:text-white">UEI Number</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Unique Entity Identifier for government procurement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-medium text-slate-900 dark:text-white">Ohio LLP</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Formally registered limited liability partnership</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-medium text-slate-900 dark:text-white">Grant Eligible</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Positioned for federal grants and programs like Tradewinds</p>
                  </div>
                </div>
              </div>
            </div>
            <TiltCard className="relative" tiltAmount={5}>
              <div className="bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <FileCheck className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Compliance Ready</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Structured for government procurement, grants, and enterprise contracts
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Entity Type</p>
                    <p className="font-medium text-slate-900 dark:text-white">LLP</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400">State</p>
                    <p className="font-medium text-slate-900 dark:text-white">Ohio</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Established</p>
                    <p className="font-medium text-slate-900 dark:text-white">2025</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Status</p>
                    <p className="font-medium text-green-600">Active</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Training Pipeline */}
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-green-200 dark:bg-green-900 top-[-100px] right-[-100px]" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full text-green-700 dark:text-green-400 text-sm mb-6">
                <GraduationCap className="w-4 h-4" />
                Workforce Development
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Training & Talent Pipeline
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                We&apos;re building a sustainable workforce through partnerships with
                educational institutions that specialize in aviation and UAV technology.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Sinclair Community College Partnership</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Access to certified UAV pilot programs and trained graduates ready for commercial operations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Pilot Certification Pipeline</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Continuous supply of FAA Part 107 certified pilots with professional training.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Wrench className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">UAV Mechanics Training</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Trained technicians for aircraft maintenance, repair, and field support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <TiltCard className="lg:order-1" tiltAmount={5}>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 text-center">Workforce Growth</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl group hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Users className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">Remote Pilots</span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Scaling</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl group hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Radio className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">Mission Controllers</span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Scaling</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl group hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Wrench className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">UAV Technicians</span>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Scaling</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient opacity-20" />

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[400px] h-[400px] bg-red-500/20 top-[-100px] left-[20%]" />
          <div className="gradient-orb w-[300px] h-[300px] bg-blue-500/20 bottom-[-100px] right-[20%]" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Based in <span className="text-shimmer">Ohio</span></h2>
              <p className="text-slate-300 mb-6">
                AutonOps LLP is headquartered in Ohio. Our central location allows
                us to deploy teams efficiently across the region and beyond.
              </p>
              <p className="text-slate-300">
                We work with organizations nationwide, providing professional drone
                operations wherever the mission takes us.
              </p>
            </div>
            <TiltCard className="relative" tiltAmount={6}>
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 text-center border border-slate-700">
                <div className="text-8xl font-bold text-shimmer mb-4">OH</div>
                <p className="text-slate-400">Ohio, United States</p>
                <div className="mt-6 flex justify-center gap-2">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-400">Central Time</span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-400">Nationwide Service</span>
                </div>
              </div>
            </TiltCard>
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
            Want to <span className="text-shimmer">work with us</span>?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            We&apos;re always interested in discussing how we can support your mission.
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
