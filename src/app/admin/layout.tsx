import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | AutonOps',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
