'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { ArrowLeft, LogOut, LucideIcon, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/authStore';
import { cn } from '@/lib/utils';

import { ProfileView } from '../ui/ProfileView';

interface SidebarItem {
  title: string;
  href: { pathname: string };
  icon: LucideIcon;
}
type SetOpenFn = (open: boolean) => void;

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  sidebarItems: SidebarItem[];
  isMobileOpen: boolean;
  setIsMobileOpen: SetOpenFn;
}

export function Sidebar({
  collapsed = false,
  onToggleCollapse,
  sidebarItems,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [profileOpen, setProfileOpen] = useState(false);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/admin/auth/sign-in');
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(false); // Always expanded on mobile
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
    onToggleCollapse?.();
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          'flex h-full flex-col bg-ui-neutralSurfaceOnColor transition-all duration-300',
          isCollapsed ? 'w-16' : 'w-64',
          'fixed inset-y-0 left-0 z-50 transform lg:relative',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Toggle Button (desktop only) */}
        <div className="flex items-center justify-between p-2">
          <Button
            variant="ghost"
            onClick={toggleCollapse}
            className="hidden w-full justify-start text-zinc-400 hover:bg-zinc-800 hover:text-white lg:flex"
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4 text-white" />
            ) : (
              <div className="flex items-center">
                <ArrowLeft className="h-4 w-4 text-white" />
                <span className="ml-2 text-sm text-ui-neutralContentBody">
                  Collapse
                </span>
              </div>
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5 text-white" />
          </Button>
        </div>

        <div className="flex h-16 items-center justify-start px-4">
          {isCollapsed ? (
            <Image
              src="/images/rumor-logo-collapsed.svg"
              alt="Rumor"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
          ) : (
            <Image
              src="/images/rumor-logo-expand.svg"
              alt="Rumor Logo"
              width={120}
              height={40}
              className="h-auto max-h-10 w-auto"
              priority
            />
          )}
        </div>

        <nav
          className={cn(
            'flex-1 space-y-1',
            isCollapsed ? 'px-2 py-2' : 'px-4 py-4'
          )}
        >
          {sidebarItems.map(item => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href.pathname ||
              (item.href.pathname !== '/admin/dashboard' &&
                pathname.startsWith(item.href.pathname));

            return (
              <Link key={item.href.pathname} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'h-11 w-full justify-start gap-3 rounded-full px-3 text-zinc-400 hover:bg-zinc-800 hover:text-white',
                    isActive &&
                      'bg-white text-black hover:bg-white hover:text-black',
                    isCollapsed && 'justify-center px-0'
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="truncate font-diatype">{item.title}</span>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Profile Section */}
        <div className="flex items-center gap-3 px-4 py-2 lg:hidden">
          <div className="relative">
            <div
              onClick={() => setProfileOpen(prev => !prev)}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-ui-neutralSurfaceSupport"
            >
              <Image
                src="/images/Monogram.svg"
                width={44}
                height={44}
                alt="User Avatar"
              />
            </div>

            <ProfileView
              open={profileOpen}
              onOpenChange={setProfileOpen}
              position={{ bottom: 'calc(100% + 5rem)', left: '0' }}
            />
          </div>
        </div>

        <div
          className={cn(
            'border-t border-zinc-800',
            isCollapsed ? 'p-2' : 'p-4'
          )}
        >
          <Button
            onClick={handleLogout}
            variant="ghost"
            className={cn(
              'h-10 w-full justify-start gap-3 text-zinc-400 hover:bg-zinc-800 hover:text-white',
              isCollapsed && 'justify-center px-0'
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-diatype">Log out</span>}
          </Button>
        </div>
      </div>
    </>
  );
}
