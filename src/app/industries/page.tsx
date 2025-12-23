import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
  Zap,
  TreePine,
  HardHat,
  Waves,
  Mountain,
  Car,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industries & Use Cases',
  description:
    'Professional drone operations for emergency response, government, municipal, and enterprise applications. Fire response, search and rescue, reconnaissance, and disaster assessment.',
  openGraph: {
    title: 'Industries & Use Cases | AutonOps',
    description: 'Drone operations for emergency services, government, defense, utilities, and enterprise organizations.',
    images: [{ url: '/aircraft-fire.jpg', width: 1200, height: 630, alt: 'AutonOps Fire Response Operations' }],
  },
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
    useCases: ['Wildfire monitoring', 'Structural fire assessment', 'Mass casualty incidents', 'Hazmat response'],
  },
  {
    icon: Landmark,
    title: 'Government & Municipal',
    description:
      'Federal, state, and local agencies benefit from drone operations for public safety, infrastructure, and environmental monitoring.',
    useCases: ['Public safety operations', 'Infrastructure inspection', 'Event security', 'Environmental surveys'],
  },
  {
    icon: Building2,
    title: 'Defense & Security',
    description:
      'Defense contractors and security organizations leverage aerial reconnaissance and surveillance capabilities.',
    useCases: ['Perimeter security', 'Tactical reconnaissance', 'Force protection', 'Training exercises'],
  },
  {
    icon: Factory,
    title: 'Enterprise',
    description:
      'Large organizations require drone operations for facility security, asset monitoring, and incident response support.',
    useCases: ['Campus security', 'Asset inspection', 'Emergency response', 'Executive protection'],
  },
  {
    icon: Zap,
    title: 'Utilities & Energy',
    description:
      'Power companies and energy infrastructure operators need aerial inspection for vast networks of assets.',
    useCases: ['Power line inspection', 'Pipeline monitoring', 'Substation surveys', 'Storm damage assessment'],
  },
  {
    icon: TreePine,
    title: 'Forestry & Conservation',
    description:
      'Land management agencies and conservation groups benefit from large-area monitoring capabilities.',
    useCases: ['Forest health surveys', 'Wildlife monitoring', 'Illegal activity detection', 'Controlled burn support'],
  },
  {
    icon: HardHat,
    title: 'Construction & Mining',
    description:
      'Large-scale operations require regular aerial surveys for progress tracking and site safety.',
    useCases: ['Site surveys', 'Progress documentation', 'Safety monitoring', 'Volumetric analysis'],
  },
  {
    icon: Waves,
    title: 'Coastal & Maritime',
    description:
      'Port authorities and coastal agencies need aerial support for maritime operations and coastal monitoring.',
    useCases: ['Port security', 'Coastal erosion monitoring', 'Search and rescue', 'Environmental response'],
  },
];

const scenarios = [
  {
    title: 'Wildfire Initial Attack',
    industry: 'Fire Response',
    icon: Flame,
    color: 'from-orange-500 to-red-600',
    description: 'When a wildfire is reported, every minute counts. Our aircraft can be airborne within minutes, providing incident commanders with real-time thermal imagery to identify the fire\'s exact location, direction of spread, and intensity.',
    benefits: ['Immediate situational awareness', 'Thermal hotspot identification', 'Real-time video to command post', 'Resource deployment guidance'],
  },
  {
    title: 'Missing Person Search',
    industry: 'Search & Rescue',
    icon: Search,
    color: 'from-blue-500 to-cyan-600',
    description: 'Time-critical searches in difficult terrain benefit from aerial thermal imaging. Our aircraft can cover vast areas quickly, detecting heat signatures that ground teams would miss, especially in dense vegetation or at night.',
    benefits: ['Cover 10x more area than ground teams', 'Thermal detection day or night', 'Coordinate ground team positioning', 'Document search patterns'],
  },
  {
    title: 'Critical Infrastructure Protection',
    industry: 'Security',
    icon: Eye,
    color: 'from-purple-500 to-indigo-600',
    description: 'Protecting large facilities, pipelines, or border areas requires persistent surveillance. Our remote operations model enables continuous monitoring without the cost of on-site personnel at every location.',
    benefits: ['24/7 surveillance capability', 'Rapid response to alerts', 'Wide area coverage', 'Integration with security systems'],
  },
  {
    title: 'Post-Storm Damage Assessment',
    industry: 'Disaster Response',
    icon: AlertTriangle,
    color: 'from-amber-500 to-orange-600',
    description: 'After severe weather, communities need rapid damage assessment to prioritize response and recovery. Aerial surveys can cover entire regions in hours, documenting damage for emergency management and insurance purposes.',
    benefits: ['Rapid county-wide assessment', 'Detailed damage documentation', 'Access route identification', 'Recovery prioritization'],
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

      {/* Real-World Scenarios */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Real-World Scenarios
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              How our capabilities apply to actual operational situations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {scenarios.map((scenario) => (
              <div
                key={scenario.title}
                className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${scenario.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <scenario.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{scenario.industry}</p>
                    <h3 className="text-xl font-semibold text-white">{scenario.title}</h3>
                  </div>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">{scenario.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {scenario.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-slate-400">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 sm:py-20">
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
                className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-red-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                  <industry.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {industry.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4">{industry.description}</p>
                <div className="flex flex-wrap gap-1">
                  {industry.useCases.map((useCase) => (
                    <span key={useCase} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Why Organizations Choose AutonOps
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Operational Maturity</h3>
                    <p className="text-slate-600 text-sm">
                      We operate with discipline and structure. Our processes are
                      designed for consistency and reliability, not improvisation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Mission Focus</h3>
                    <p className="text-slate-600 text-sm">
                      We understand that your mission is what matters. Our role is to
                      provide the aerial capability you need, when you need it.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Professional Team</h3>
                    <p className="text-slate-600 text-sm">
                      Trained operators who understand both the technical and operational
                      aspects of drone flight in demanding environments.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Reliable Execution</h3>
                    <p className="text-slate-600 text-sm">
                      When you engage AutonOps, you get a partner committed to
                      successful mission outcomes, not excuses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/aircraft-fire.jpg"
                alt="Aircraft performing fire response"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to discuss your needs?</h3>
                <p className="text-slate-300 mb-6 text-sm">
                  Every organization has unique requirements. Let&apos;s talk about how
                  our capabilities can support your operations.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Contact Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
