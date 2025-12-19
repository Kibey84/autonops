import { Metadata } from 'next';
import Link from 'next/link';
import {
  Flame,
  Search,
  Eye,
  AlertTriangle,
  Building2,
  Shield,
  Landmark,
  Factory,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries & Use Cases',
  description:
    'Professional drone operations for emergency response, government, municipal, and enterprise applications. Fire response, search and rescue, reconnaissance, and disaster assessment.',
};

const primaryUseCases = [
  {
    icon: Flame,
    title: 'Fire Response',
    description:
      'Support wildfire and structural fire operations with aerial intelligence.',
    applications: [
      'Active fire perimeter mapping',
      'Hotspot identification with thermal imaging',
      'Structure assessment before entry',
      'Resource deployment guidance',
      'Post-fire damage documentation',
    ],
  },
  {
    icon: Search,
    title: 'Search and Rescue',
    description:
      'Cover more ground faster with aerial search capabilities.',
    applications: [
      'Wide-area visual search',
      'Thermal detection of persons',
      'Difficult terrain coverage',
      'Night search operations',
      'Coordination with ground teams',
    ],
  },
  {
    icon: Eye,
    title: 'Reconnaissance',
    description:
      'Gain situational awareness for tactical and strategic decisions.',
    applications: [
      'Area surveillance and monitoring',
      'Pre-operation intelligence',
      'Route reconnaissance',
      'Critical infrastructure observation',
      'Crowd and event monitoring',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Disaster Assessment',
    description:
      'Rapidly evaluate damage and support recovery operations.',
    applications: [
      'Post-storm damage surveys',
      'Flood extent mapping',
      'Infrastructure inspection',
      'Access route identification',
      'Insurance and recovery documentation',
    ],
  },
];

const industries = [
  {
    icon: Shield,
    title: 'Emergency Services',
    description:
      'Fire departments, EMS, and emergency management agencies rely on aerial support for incident response and situational awareness.',
  },
  {
    icon: Landmark,
    title: 'Government & Municipal',
    description:
      'Federal, state, and local agencies benefit from drone operations for public safety, infrastructure, and environmental monitoring.',
  },
  {
    icon: Building2,
    title: 'Defense & Security',
    description:
      'Defense contractors and security organizations leverage aerial reconnaissance and surveillance capabilities.',
  },
  {
    icon: Factory,
    title: 'Enterprise',
    description:
      'Large organizations require drone operations for facility security, asset monitoring, and incident response support.',
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Industries & Use Cases
            </h1>
            <p className="text-lg sm:text-xl text-slate-300">
              We support organizations that need reliable, professional drone operations
              for critical applications. From emergency response to enterprise security,
              our capabilities adapt to your mission.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Use Cases */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Primary Use Cases
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our core operational focus areas where drone operations make the greatest impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {primaryUseCases.map((useCase) => (
              <div
                key={useCase.title}
                className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                    <useCase.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{useCase.title}</h3>
                </div>
                <p className="text-slate-600 mb-6">{useCase.description}</p>
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                  Applications
                </h4>
                <ul className="space-y-2">
                  {useCase.applications.map((app) => (
                    <li key={app} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-700">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Organizations that require professional, mission-focused drone operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <div
                key={industry.title}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors"
              >
                <industry.icon className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {industry.title}
                </h3>
                <p className="text-sm text-slate-600">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Why Organizations Choose AutonOps
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Operational Maturity
                  </h3>
                  <p className="text-slate-600">
                    We operate with discipline and structure. Our processes are
                    designed for consistency and reliability, not improvisation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Mission Focus
                  </h3>
                  <p className="text-slate-600">
                    We understand that your mission is what matters. Our role is to
                    provide the aerial capability you need, when you need it.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Professional Team
                  </h3>
                  <p className="text-slate-600">
                    Trained operators who understand both the technical and operational
                    aspects of drone flight in demanding environments.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Reliable Execution
                  </h3>
                  <p className="text-slate-600">
                    When you engage AutonOps, you get a partner committed to
                    successful mission outcomes, not excuses.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-8 sm:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Ready to discuss your needs?</h3>
              <p className="text-slate-300 mb-8">
                Every organization has unique requirements. Let&apos;s talk about how
                our capabilities can support your operations.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
              >
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
