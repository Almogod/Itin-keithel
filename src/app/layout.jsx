import './globals.css';

export const metadata = {
  title: 'Itin Keithel - NE-Rooted Prestige Artisan Ecosystem',
  description: 'Experience high-end organic artisan storytelling and luxury e-commerce. Handcrafted textiles, heritage woodcarvings, and local treasures from North East India.',
  keywords: 'North East India, Artisan, Handicrafts, Majuli, Nagaland, Muga Silk, Handloom, Luxury Crafts',
  icons: {
    icon: '/images/ne_artisan_logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF9F6] text-[#1A1A1A] antialiased">
        {children}
      </body>
    </html>
  );
}
