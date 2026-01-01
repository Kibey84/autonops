import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronDown, HelpCircle, Zap, Shield, Settings } from 'lucide-react';
import { RadarPulse } from '@/components/AnimatedDrone';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about AutonOps drone flight operations, services, technology, and how we work with clients.',
  alternates: {
    canonical: 'https://autonops.com/faq',
  },
};

const faqs = [
  {
    category: 'Services & Capabilities',
    icon: Zap,
    color: 'red',
    questions: [
      {
        q: 'What services does AutonOps provide?',
        a: 'We provide complete drone flight operations including professional pilots, mission controllers, aircraft, and full mission execution. Our services cover fire response, search and rescue, law enforcement support, reconnaissance, and disaster assessment.',
      },
      {
        q: 'What types of missions can you support?',
        a: 'We specialize in four primary mission categories: Fire Response (hotspot identification, perimeter mapping), Search & Rescue (thermal imaging, victim location), Law Enforcement (tactical overwatch, scene documentation), and Reconnaissance (surveillance, infrastructure inspection).',
      },
      {
        q: 'Do you provide the aircraft or do we need our own?',
        a: 'We provide everything—aircraft, sensors, ground control stations, and all support equipment. You don\'t need to own or maintain any drone equipment to work with us.',
      },
      {
        q: 'What areas do you serve?',
        a: 'We\'re based in Ohio but serve clients nationwide. Our remote operations model allows us to pre-position aircraft at your location while pilots operate from our Ohio headquarters via satellite link.',
      },
    ],
  },
  {
    category: 'Technology & Operations',
    icon: Settings,
    color: 'blue',
    questions: [
      {
        q: 'What is the M2 Platform?',
        a: 'The M2 Multi-Mission Platform is our AI-powered command and control system developed in partnership with Aeryl AI. It handles mission planning, real-time sensor feeds, waypoint navigation, and generates automated after-action reports.',
      },
      {
        q: 'How does remote piloting work?',
        a: 'Aircraft are pre-positioned at client facilities (like fire stations). When a mission is needed, our FAA-certified pilots operate the aircraft remotely from our Ohio operations center via Starlink satellite connection, providing 24/7 coverage without requiring on-site personnel.',
      },
      {
        q: 'What kind of aircraft do you use?',
        a: 'We operate VTOL (Vertical Take-Off and Landing) aircraft equipped with thermal and visual cameras, GPS waypoint navigation, and satellite connectivity. Our aircraft are selected based on mission requirements for range, endurance, and payload capacity.',
      },
      {
        q: 'How quickly can you respond to an incident?',
        a: 'With pre-positioned aircraft at your facility, response time is minimal. Once an incident is reported, our system automatically generates a mission plan and notifies available pilots. Aircraft can be airborne within minutes of authorization.',
      },
    ],
  },
  {
    category: 'Working With Us',
    icon: HelpCircle,
    color: 'purple',
    questions: [
      {
        q: 'How do we get started?',
        a: 'Contact us to discuss your mission requirements. We\'ll assess your needs, explain our capabilities, and develop a service agreement tailored to your operations. We can arrange a demonstration to show you the M2 platform in action.',
      },
      {
        q: 'Do you work with government agencies?',
        a: 'Yes. AutonOps is registered on SAM.gov with a UEI number, making us qualified for federal contracts and grants. We\'re structured as an Ohio LLP specifically to work with government and enterprise clients.',
      },
      {
        q: 'What certifications do your pilots have?',
        a: 'All our pilots are FAA Part 107 certified for commercial drone operations. Our team maintains current certifications and undergoes regular training to ensure professional, safe operations.',
      },
      {
        q: 'How is pricing structured?',
        a: 'Pricing depends on your specific requirements—mission frequency, coverage area, equipment needs, and service level. Contact us for a customized quote based on your operational needs.',
      },
    ],
  },
  {
    category: 'Safety & Compliance',
    icon: Shield,
    color: 'green',
    questions: [
      {
        q: 'How do you handle FAA compliance?',
        a: 'The M2 platform integrates with FAA systems for automated flight plan filing and airspace clearance. We handle all regulatory requirements so you can focus on your mission objectives.',
      },
      {
        q: 'What safety protocols do you follow?',
        a: 'Safety is foundational to our operations. Every mission includes formal risk assessment, pre-flight checks, and contingency planning. We never pressure operators to fly in unsafe conditions, and we maintain strict protocols throughout every operation.',
      },
      {
        q: 'What happens if there\'s an equipment failure?',
        a: 'Our aircraft have redundant systems and failsafe protocols. The M2 platform monitors all systems in real-time. In case of any anomaly, automated safety procedures activate, and our pilots are trained to handle contingencies.',
      },
    ],
  },
];

// Generate FAQ schema for rich results
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.flatMap((category) =>
    category.questions.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    }))
  ),
};

export default function FAQPage() {
  const colorClasses: Record<string, { bg: string; bgDark: string; icon: string; border: string }> = {
    red: { bg: 'bg-red-50', bgDark: 'dark:bg-red-900/30', icon: 'text-red-600', border: 'border-red-200 dark:border-red-800' },
    blue: { bg: 'bg-blue-50', bgDark: 'dark:bg-blue-900/30', icon: 'text-blue-600', border: 'border-blue-200 dark:border-blue-800' },
    purple: { bg: 'bg-purple-50', bgDark: 'dark:bg-purple-900/30', icon: 'text-purple-600', border: 'border-purple-200 dark:border-purple-800' },
    green: { bg: 'bg-green-50', bgDark: 'dark:bg-green-900/30', icon: 'text-green-600', border: 'border-green-200 dark:border-green-800' },
  };

  return (
    <>
      {/* FAQ Schema for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-20 sm:py-28 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animated-gradient opacity-30" />

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gradient-orb w-[500px] h-[500px] bg-purple-500/20 top-[-150px] right-[-100px]" />
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-500/20 bottom-[-100px] left-[-50px]" style={{ animationDelay: '5s' }} />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-[15%] float-slow hidden lg:block">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-300">Quick Answers</span>
            </div>
          </div>
          <div className="absolute top-1/2 right-[8%] hidden xl:block float-fast">
            <RadarPulse size={60} color="#a855f7" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm mb-6">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              Common Questions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Frequently Asked <span className="text-shimmer">Questions</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300">
              Common questions about our drone operations services, technology,
              and how we work with clients.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-purple-200 dark:bg-purple-900 top-[-100px] right-[-100px]" />
          <div className="gradient-orb w-[300px] h-[300px] bg-blue-200 dark:bg-blue-900 bottom-[-100px] left-[-100px]" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqs.map((category) => {
              const colors = colorClasses[category.color];
              const Icon = category.icon;

              return (
                <div key={category.category}>
                  <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <div className={`w-10 h-10 ${colors.bg} ${colors.bgDark} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {category.category}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <details
                        key={index}
                        className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:border-red-200 dark:hover:border-red-500/50 hover:shadow-lg transition-all duration-300"
                      >
                        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                          <span className="font-medium text-slate-900 dark:text-white pr-4">
                            {faq.q}
                          </span>
                          <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                        </summary>
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient opacity-30" />
        <div className="absolute inset-0">
          <div className="gradient-orb w-[500px] h-[500px] bg-purple-500/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Have more <span className="text-shimmer">questions</span>?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            We&apos;re happy to discuss your specific requirements and answer any
            questions about our services.
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
