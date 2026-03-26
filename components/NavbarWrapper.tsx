'use client';

import { usePathname } from 'next/navigation';

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show Navbar on dashboard
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  return <>{children}</>;
}
