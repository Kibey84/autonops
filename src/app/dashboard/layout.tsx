import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mission Control | AutonOps',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
