'use client';

import { ReactNode, createContext, useContext } from 'react';

import { useRouter } from 'next/navigation';

interface RouteContextProps {
  switchRoute: (path: string) => void;
}

const RouteContext = createContext<RouteContextProps | undefined>(undefined);

export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const switchRoute = (path: string) => {
    router.push(path);
  };

  return (
    <RouteContext.Provider value={{ switchRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRouteSwitch = () => {
  const ctx = useContext(RouteContext);
  if (!ctx) {
    throw new Error('useRouteSwitch must be used inside RouteProvider');
  }
  return ctx;
};
