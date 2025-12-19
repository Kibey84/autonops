import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'AutonOps LLP privacy policy.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-slate-900 text-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-300">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
            <p className="text-slate-600 mb-6">
              When you contact us through our website, we collect the information you provide,
              including your name, email address, phone number, organization, and message content.
              This information is used solely to respond to your inquiry and communicate with you
              about our services.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
            <p className="text-slate-600 mb-6">
              We use the information you provide to respond to your inquiries, communicate about
              our services, and fulfill any requests you make. We do not sell, rent, or share your
              personal information with third parties for marketing purposes.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-600 mb-6">
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the internet is completely secure, and we
              cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600 mb-6">
              If you have questions about this privacy policy, please contact us at{' '}
              <a href="mailto:contact@autonops.com" className="text-red-600 hover:text-red-700">
                contact@autonops.com
              </a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
