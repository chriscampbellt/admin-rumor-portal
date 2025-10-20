import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { RouteProvider } from '@/context/RouteContext';
import { ThemeProvider } from '@/context/ThemeContext';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { ToastProvider } from '@/providers/ToastProvider';

import './globals.css';

const romieFont = localFont({
  src: '../fonts/romie-regular.otf',
  variable: '--font-romie',
  weight: '400',
  style: 'normal',
  display: 'swap',
});
const abcDiatype = localFont({
  src: [
    {
      path: '../fonts/abc-diatype-light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/abc-diatype-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/abc-diatype-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/abc-diatype-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-abc-diatype',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Admin Rumor Portal',
  description: 'Experience discovery and RSVP management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${abcDiatype.variable} ${romieFont.variable}`}>
        <ReactQueryProvider>
          <ThemeProvider>
            <RouteProvider>
              <ToastProvider>{children}</ToastProvider>
            </RouteProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
