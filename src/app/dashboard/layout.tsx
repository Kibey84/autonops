import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Portal | AutonOps',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
