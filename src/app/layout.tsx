import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { SITE } from '@/config/site';
import { Header } from '@/components/chrome/Header';
import { Footer } from '@/components/chrome/Footer';
import { Providers } from '@/components/chrome/Providers';
import '@/styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name + ' — ' + SITE.tagline,
    template: '%s · ' + SITE.name,
  },
  description: SITE.description,
  keywords: [
    'Manipur crafts',
    'Meitei phanek',
    'Longpi pottery',
    'Muga silk',
    'Kauna reed',
    'handloom',
    'North East India',
    'artisan marketplace',
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name + ' — ' + SITE.tagline,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F7F4EE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fraunces.variable + ' ' + inter.variable}>
      <body>
        <a href="#main" className="skip-to-content">Skip to content</a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
