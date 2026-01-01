import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'Contact', href: '/contact' },
  ],
  operations: [
    { name: 'How We Operate', href: '/operations' },
    { name: 'Technology', href: '/technology' },
    { name: 'FAQ', href: '/faq' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="AutonOps"
                width={140}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm text-slate-400 mb-4 max-w-md">
              Professional drone flight operations for emergency response, reconnaissance,
              and mission-critical applications. Based in Ohio, serving organizations nationwide.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:contact@autonops.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@autonops.com
              </a>
              <a
                href="tel:+19372696420"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                (937) 269-6420
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4" />
                Ohio, United States
              </div>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Operations links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Operations</h3>
            <ul className="space-y-2">
              {footerLinks.operations.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} AutonOps LLP. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
