'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import { RadarPulse } from '@/components/AnimatedDrone';

const inquiryTypes = [
  'General Inquiry',
  'Capability Brief Request',
  'Emergency Response',
  'Reconnaissance Operations',
  'Other',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual form handling
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <>
        <section className="relative bg-slate-900 text-white py-20 sm:py-28 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 animated-gradient opacity-30" />

          {/* Gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="gradient-orb w-[400px] h-[400px] bg-green-500/20 top-[-100px] right-[-50px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Contact Us
              </h1>
              <p className="text-lg sm:text-xl text-slate-300">
                Get in touch with our operations team.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-white dark:bg-slate-900">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Message Received
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Thank you for contacting AutonOps. Our team will review your message
              and respond within one business day.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  organization: '',
                  phone: '',
                  inquiryType: '',
                  message: '',
                });
              }}
              className="text-red-600 font-medium hover:text-red-700 transition-colors"
            >
              Send another message
            </button>
          </div>
        </section>
      </>
    );
  }

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
              <Clock className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-300">24hr Response</span>
            </div>
          </div>
          <div className="absolute bottom-24 right-[25%] float-medium hidden lg:block" style={{ animationDelay: '2s' }}>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Get in Touch</span>
            </div>
          </div>
          <div className="absolute top-1/2 right-[8%] hidden xl:block float-fast">
            <RadarPulse size={60} color="#ef4444" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Ready to Connect
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-shimmer">Contact</span> Us
            </h1>
            <p className="text-lg sm:text-xl text-slate-300">
              Ready to discuss your mission requirements? Reach out to our
              operations team. We respond to all inquiries within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Background orb */}
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-orb w-[400px] h-[400px] bg-blue-200 dark:bg-blue-900 bottom-[-100px] right-[-100px]" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <TiltCard className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700" tiltAmount={8}>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">
                    Email
                  </h3>
                  <div className="flex items-center gap-3 text-slate-400">
                    <Mail className="w-5 h-5" />
                    <span>Coming soon</span>
                  </div>
                </TiltCard>

                <TiltCard className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700" tiltAmount={8}>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">
                    Phone
                  </h3>
                  <a
                    href="tel:+19372696420"
                    className="flex items-center gap-3 text-slate-600 dark:text-slate-300 hover:text-red-600 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    (937) 269-6420
                  </a>
                </TiltCard>

                <TiltCard className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700" tiltAmount={8}>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">
                    Location
                  </h3>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <MapPin className="w-5 h-5" />
                    Ohio, United States
                  </div>
                </TiltCard>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">
                  Response Time
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  We respond to all inquiries within one business day. For urgent
                  operational matters, please call directly.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <TiltCard
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8"
                tiltAmount={3}
              >
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="">Select an option</option>
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your mission requirements..."
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
