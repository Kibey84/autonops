import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'AutonOps LLP terms of service.',
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-slate-900 text-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Terms of Service
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
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
            <p className="text-slate-600 mb-6">
              By accessing this website, you agree to be bound by these terms of service.
              If you do not agree with any part of these terms, you may not access the website.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Use of Website</h2>
            <p className="text-slate-600 mb-6">
              This website is provided for informational purposes about AutonOps LLP and our
              drone flight operations services. You may not use this website for any unlawful
              purpose or in any way that could damage, disable, or impair the website.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
            <p className="text-slate-600 mb-6">
              The content on this website, including text, graphics, logos, and images, is the
              property of AutonOps LLP and is protected by applicable intellectual property laws.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-slate-600 mb-6">
              AutonOps LLP shall not be liable for any indirect, incidental, special, or
              consequential damages arising from your use of this website.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Governing Law</h2>
            <p className="text-slate-600 mb-6">
              These terms shall be governed by and construed in accordance with the laws of
              the State of Ohio, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600 mb-6">
              If you have questions about these terms, please contact us at{' '}
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
