import { Metadata } from 'next';
import Link from 'next/link';
import {
  ClipboardList,
  Truck,
  Radio,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How We Operate',
  description:
    'Our structured approach to drone flight operations: mission planning, deployment, execution, and debriefing with emphasis on safety and coordination.',
};

const phases = [
  {
    number: '01',
    title: 'Mission Brief',
    icon: ClipboardList,
    description:
      'Every operation begins with thorough planning and coordination.',
    details: [
      'Define mission objectives and success criteria',
      'Conduct site assessment and airspace analysis',
      'Identify risks and develop mitigation strategies',
      'Coordinate with stakeholders and authorities',
      'Establish communication protocols',
      'Brief all team members on roles and procedures',
    ],
  },
  {
    number: '02',
    title: 'Deploy',
    icon: Truck,
    description:
      'Mobilize personnel and equipment to the operational area.',
    details: [
      'Dispatch operators and support personnel',
      'Transport aircraft and ground equipment',
      'Establish ground control station',
      'Verify communications and data links',
      'Conduct pre-flight checks and system tests',
      'Confirm go/no-go criteria',
    ],
  },
  {
    number: '03',
    title: 'Execute',
    icon: Radio,
    description:
      'Conduct flight operations with continuous monitoring and communication.',
    details: [
      'Launch and manage flight operations',
      'Maintain real-time telemetry monitoring',
      'Coordinate with ground teams and command',
      'Capture required data and imagery',
      'Adapt to changing conditions as needed',
      'Maintain safety protocols throughout',
    ],
  },
  {
    number: '04',
    title: 'Debrief',
    icon: FileText,
    description:
      'Document outcomes and deliver results to stakeholders.',
    details: [
      'Recover and secure all equipment',
      'Process and organize captured data',
      'Prepare mission reports and deliverables',
      'Conduct after-action review',
      'Document lessons learned',
      'Archive data per retention requirements',
    ],
  },
];

const safetyPrinciples = [
  {
    icon: Shield,
    title: 'Safety First',
    description:
      'No mission is worth compromising safety. We maintain strict protocols and never pressure operators to fly in unsafe conditions.',
  },
  {
    icon: AlertTriangle,
    title: 'Risk Management',
    description:
      'Every mission includes formal risk assessment. We identify hazards early and develop specific mitigation strategies.',
  },
  {
    icon: CheckCircle,
    title: 'Continuous Improvement',
    description:
      'We learn from every operation. After-action reviews and lessons learned feed back into our procedures.',
  },
];

export default function OperationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              How We Operate
            </h1>
            <p className="text-lg sm:text-xl text-slate-300">
              A structured, disciplined approach to every mission. From initial planning
              through final delivery, we follow proven processes that prioritize safety,
              coordination, and mission success.
            </p>
          </div>
        </div>
      </section>

      {/* Phases */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Our Operational Process
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Four phases ensure consistent, professional execution across all missions.
            </p>
          </div>

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <div
                key={phase.number}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Number */}
                <div className="lg:col-span-2">
                  <div className="text-6xl sm:text-7xl font-bold text-slate-200">
                    {phase.number}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-10 bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <phase.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{phase.title}</h3>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">{phase.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {phase.details.map((detail) => (
                      <div key={detail} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Safety & Standards</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Safety is not negotiable. Our operational culture is built on discipline,
              accountability, and continuous improvement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safetyPrinciples.map((principle) => (
              <div
                key={principle.title}
                className="bg-slate-800 rounded-lg p-6"
              >
                <principle.icon className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                <p className="text-slate-400">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Section */}
      <section id="planning" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Mission Planning Excellence
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Thorough planning is the foundation of successful operations. We invest
                significant effort in pre-mission preparation to ensure smooth execution.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-900">Airspace Analysis</span>
                    <p className="text-slate-600 text-sm">
                      Verify airspace class, NOTAMs, TFRs, and any special requirements.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-900">Site Assessment</span>
                    <p className="text-slate-600 text-sm">
                      Evaluate terrain, obstacles, and environmental factors.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-900">Stakeholder Coordination</span>
                    <p className="text-slate-600 text-sm">
                      Align with all parties on objectives, timing, and communication.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-slate-900">Contingency Planning</span>
                    <p className="text-slate-600 text-sm">
                      Develop procedures for equipment failure, weather, and emergencies.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-slate-100 rounded-lg aspect-square flex items-center justify-center">
              <ClipboardList className="w-32 h-32 text-slate-300" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Want to learn more about our approach?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Contact us to discuss how our operational methodology can support your mission.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
          >
            Talk to Operations
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
