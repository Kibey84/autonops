import { Metadata } from 'next';
import Link from 'next/link';
import { Target, Shield, Users, Zap, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description:
    'AutonOps LLP is an Ohio-based professional drone flight operations company. We provide pilots, mission controllers, aircraft, and complete mission execution.',
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

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
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
            <div>
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
            <div className="bg-slate-100 rounded-lg aspect-square flex items-center justify-center">
              <div className="w-32 h-32 bg-slate-900 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-4xl">AO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 sm:py-20 bg-slate-50">
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
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Provide Operators
              </h3>
              <p className="text-slate-600">
                Professional pilots and mission controllers trained for demanding
                operational environments. Remote PIC, visual observers, and support
                personnel as your mission requires.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Supply Equipment
              </h3>
              <p className="text-slate-600">
                We bring the aircraft, sensors, ground control stations, and support
                equipment. You don&apos;t need to build or maintain a fleet—we handle it.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
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
      <section className="py-16 sm:py-20">
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
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors"
              >
                <value.icon className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="bg-slate-800 rounded-lg p-8 text-center">
              <div className="text-6xl font-bold text-slate-600 mb-4">OH</div>
              <p className="text-slate-400">Ohio, United States</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Want to work with us?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            We&apos;re always interested in discussing how we can support your mission.
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
