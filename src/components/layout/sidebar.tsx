'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowLeft, LogOut, LucideIcon, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { NotificationList } from '../ui/NotificationList';
import { ProfileView } from '../ui/ProfileView';

// Define the type for sidebar items
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

  // State for desktop collapse only (not for mobile drawer)
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(false); // always expanded in drawer mode
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
    if (onToggleCollapse) onToggleCollapse();
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

          {/* Mobile close button */}
          <Button
            variant="ghost"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5 text-white" />
          </Button>
        </div>

        {/* Logo Section */}
        <div className="flex h-16 items-center justify-start px-4">
          {!isCollapsed ? (
            <Image
              src="/images/rumor-logo-expand.svg"
              alt="Rumor Logo"
              width={120}
              height={40}
              className="h-auto max-h-10 w-auto"
              priority
            />
          ) : (
            <Image
              src="/images/rumor-logo-collapsed.svg"
              alt="Rumor"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
          )}
        </div>

        {/* Navigation */}
        <nav
          className={`flex-1 space-y-1 ${isCollapsed ? 'px-2' : 'px-4'} ${
            isCollapsed ? 'py-2' : 'py-4'
          }`}
        >
          {sidebarItems.map(item => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href.pathname ||
              (item.href.pathname !== '/dashboard' &&
                pathname.startsWith(item.href.pathname));

            return (
              <Link key={item.href.pathname} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'h-10 w-full justify-start gap-3 rounded-full px-3 text-zinc-400 hover:bg-zinc-800 hover:text-white',
                    isActive &&
                      'bg-white text-black hover:bg-white hover:text-black',
                    isCollapsed && 'justify-center px-0'
                  )}
                  onClick={() => setIsMobileOpen(false)} // close on mobile nav click
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

        {/* Promo Section (only visible when expanded) */}
        {!isCollapsed && (
          <div className="p-4">
            <div className="rounded-lg bg-zinc-800 p-4">
              <p className="mb-3 font-diatype text-sm leading-relaxed text-zinc-300">
                Apply to Rumor to unlock all event management tools.
              </p>
              <Button className="w-full bg-white font-diatype font-medium text-black hover:bg-zinc-200">
                Apply Now
              </Button>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 px-4 py-2 lg:hidden">
          {/* Notification */}
          <div className="relative">
            <Button
              className="relative h-[44px] w-[52px] rounded-[128px] bg-white"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <Image
                src="/images/bell-04.svg"
                width={21}
                height={21}
                alt="Bell Icon"
              />
              <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-ui-neutralDarkRed" />
            </Button>

            <NotificationList
              open={notificationOpen}
              onOpenChange={setNotificationOpen}
              position={{ bottom: 'calc(100% + 5rem)', left: '0' }}
            />
          </div>

          {/* Profile */}
          <div className="relative">
            <div
              onClick={() => setProfileOpen(prev => !prev)}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-ui-neutralSurfaceSupport"
            >
              <span className="text-center font-diatype text-[18px] font-medium text-zinc-700">
                WW
              </span>
            </div>

            <ProfileView
              open={profileOpen}
              onOpenChange={setProfileOpen}
              position={{ bottom: 'calc(100% + 5rem)', left: '0' }}
            />
          </div>
        </div>

        {/* Logout */}
        <div
          className={cn(
            'border-t border-zinc-800',
            isCollapsed ? 'p-2' : 'p-4'
          )}
        >
          <Button
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
