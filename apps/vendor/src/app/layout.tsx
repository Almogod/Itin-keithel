import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import '@ik/ui/styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Itin Keithel · Vendor',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fraunces.variable + ' ' + inter.variable}>
      <body>{children}</body>
    </html>
  );
}
