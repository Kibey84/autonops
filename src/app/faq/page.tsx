import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Script from 'next/script';

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
  return (
    <>
      {/* FAQ Schema for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl text-slate-300">
              Common questions about our drone operations services, technology,
              and how we work with clients.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqs.map((category) => (
              <div key={category.category}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <details
                      key={index}
                      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-red-200 transition-colors"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <span className="font-medium text-slate-900 pr-4">
                          {faq.q}
                        </span>
                        <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  ))}
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
            Have more questions?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            We&apos;re happy to discuss your specific requirements and answer any
            questions about our services.
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
