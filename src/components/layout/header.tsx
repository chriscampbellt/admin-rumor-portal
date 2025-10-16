'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ChevronLeft, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';

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
          <h1 className="line-clamp-1 max-w-48 truncate font-romie font-bold tracking-[1.25px] text-ui-neutralSurfaceOnColor sm:max-w-full lg:text-2xl xl:text-h2">
            {config.title}
          </h1>{' '}
        </div>
        {onOpenSidebar && (
          <Button
            size="sm"
            onClick={onOpenSidebar}
            className="mr-2 h-8 w-8 rounded-full bg-ui-neutralSurfaceSupport p-0 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-5 w-5 text-ui-neutralSurfaceOnColor" />
          </Button>
        )}
        <div className="hidden items-center gap-1 lg:flex">
          <div className="flex items-center gap-2">
            <div
              onClick={() => setOpen(prev => !prev)}
              className="flex cursor-pointer items-center justify-center"
            >
              <Image
                src="/images/Monogram.svg"
                width={44}
                height={44}
                alt="Bell Icon"
              />
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
