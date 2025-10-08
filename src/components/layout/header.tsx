'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ChevronLeft, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { NotificationList } from '../ui/NotificationList';
import { ProfileView } from '../ui/ProfileView';

interface HeaderConfig {
  title: string;
  showBackButton: boolean;
  backUrl?: string;
}

interface HeaderProps {
  config: HeaderConfig;
  onOpenSidebar?: () => void;
  onCreateEvent?: () => void;
}

export function Header({ config, onOpenSidebar }: HeaderProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleBackClick = () => {
    if (config.backUrl) {
      router.push(config.backUrl);
    } else {
      router.back();
    }
  };

  return (
    <>
      <header className="my-2 flex h-16 items-center justify-between bg-transparent px-6">
        <div className="flex items-center gap-2">
          {config.showBackButton && (
            <Button
              size="sm"
              onClick={handleBackClick}
              className="mr-2 h-8 w-8 rounded-full bg-ui-neutralSurfaceSupport p-0 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-ui-neutralSurfaceOnColor" />
            </Button>
          )}
          {onOpenSidebar && (
            <Button
              size="sm"
              onClick={onOpenSidebar}
              className="mr-2 h-8 w-8 rounded-full bg-ui-neutralSurfaceSupport p-0 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-5 w-5 text-ui-neutralSurfaceOnColor" />
            </Button>
          )}
          <h1 className="font-romie font-bold tracking-[1.25px] text-ui-neutralSurfaceOnColor lg:text-2xl xl:text-h2">
            {config.title}
          </h1>
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          <Button
            className="relative h-[44px] w-[52px] rounded-[128px] bg-white text-center"
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
            position={{ top: '2rem', right: '1rem' }}
          />

          <div className="flex items-center gap-2">
            <div
              onClick={() => setOpen(prev => !prev)}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-ui-neutralSurfaceSupport"
            >
              <span className="text-center font-diatype text-[18px] font-medium text-zinc-700">
                WW
              </span>
            </div>
            <ProfileView
              open={open}
              onOpenChange={setOpen}
              position={{ top: '2rem', right: '2rem' }}
            />
          </div>
        </div>
      </header>
    </>
  );
}
