'use client';

import { usePathname } from 'next/navigation';

import { useRouteSwitch } from '@/context/RouteContext';

export default function RouteSwitcher() {
  const pathname = usePathname();
  const { switchRoute } = useRouteSwitch();

  const isHost = pathname.startsWith('/admin');

  const handleToggle = () => {
    if (isHost) {
      switchRoute('/co-host/auth/sign-in');
    } else {
      switchRoute('/admin/auth/sign-in');
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {isHost ? 'Host' : 'Co-Host'}
      </span>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={!isHost}
          onChange={handleToggle}
        />
        <div className="peer h-6 w-11 rounded-full bg-ui-neutralContentBody after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:transform after:rounded-full after:bg-white after:transition-all peer-checked:bg-ui-neutralContentBody peer-checked:after:translate-x-full"></div>
      </label>
    </div>
  );
}
