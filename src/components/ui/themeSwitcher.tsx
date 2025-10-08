'use client';

import { useEffect, useState } from 'react';

import { MoonStar, Sun } from 'lucide-react';

import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">
        {theme === 'dark' ? <MoonStar /> : <Sun />}
      </span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <div className="peer h-6 w-11 rounded-full bg-ui-neutralContentBody after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:transform after:rounded-full after:bg-white after:transition-all peer-checked:bg-ui-neutralContentBody peer-checked:after:translate-x-full"></div>
      </label>
    </div>
  );
}
