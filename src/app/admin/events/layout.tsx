'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';

import { LucideZap } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: { pathname: '/admin/dashboard' },
    icon: LucideZap,
  },
  {
    title: 'Events',
    href: { pathname: '/admin/events' },
    icon: LucideZap,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleCreateEvent = () => {
    console.log('Create event clicked');
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const getHeaderConfig = () => {
    if (pathname.match('/admin/dashboard')) {
      return {
        title: 'Dashboard',
        showBackButton: false,
      };
    } else if (pathname.match('/admin/events/pending-approval')) {
      return {
        title: 'Palm Tree Music Festival The Hamptons',
        showBackButton: true,
        backUrl: '/admin/events',
      };
    } else if (pathname.match('/admin/events')) {
      return {
        title: 'Events',
        showBackButton: false,
      };
    }
    return {
      title: 'Dashboard',
      showBackButton: false,
    };
  };

  return (
    <div className="flex h-screen bg-ui-neutralSurfaceOnColor">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        sidebarItems={sidebarItems}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div className="mx-2 mb-[1px] mt-3 flex flex-1 flex-col overflow-hidden rounded-tl-3xl rounded-tr-3xl bg-ui-neutralSurfaceBackground">
        <Header
          config={getHeaderConfig()}
          onCreateEvent={handleCreateEvent}
          onOpenSidebar={() => setIsMobileOpen(true)}
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
