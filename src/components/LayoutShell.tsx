'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AskAeryl from '@/components/AskAeryl';

const BARE_ROUTES = ['/dashboard', '/login', '/admin'];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = BARE_ROUTES.some((r) => pathname.startsWith(r));
  const isLogin = pathname.startsWith('/login');

  if (isBare) {
    return (
      <>
        {children}
        {/* Ask Aeryl on all pages except login */}
        {!isLogin && <AskAeryl />}
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
      <AskAeryl />
    </>
  );
}
