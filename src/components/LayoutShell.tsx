'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const BARE_ROUTES = ['/dashboard', '/login', '/admin'];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = BARE_ROUTES.some((r) => pathname.startsWith(r));

  if (isBare) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
