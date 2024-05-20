import ThemeProvider from '@/context/ThemeProvider';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';

import { cn } from '@/lib/utils';

import SessionAuthProvider from '../context/SessionAuthProvider';

export const metadata: Metadata = {
  title: 'Cabildo',
  description: 'Construida con Next.js y TypeScript',
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="{inter.className}">
        <main>
          <SessionAuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <main className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
                {children}
              </main>
              <Toaster />
            </ThemeProvider>
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}
