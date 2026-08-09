import Link from 'next/link';
import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { getCategorySlugs, getCollections, getGuildSlugs, getJournalSlugs, getOrdersForUser, getCurrentUser, getProductSlugs } from '@ik/services';

export const metadata = { title: 'Dev · All Routes' };

interface RouteRow {
  href: string;
  label: string;
  note?: string;
}

interface RouteGroup {
  heading: string;
  intro: string;
  rows: RouteRow[];
}

export default async function DevRoutesPage() {
  const [categorySlugs, guildSlugs, journalSlugs, productSlugs, collections, user] = await Promise.all([
    getCategorySlugs(),
    getGuildSlugs(),
    getJournalSlugs(),
    getProductSlugs(),
    getCollections(),
    getCurrentUser(),
  ]);
  const { items: orders } = await getOrdersForUser(user.id, { pageSize: 100 });

  const groups: RouteGroup[] = [
    {
      heading: 'Landing & discovery',
      intro: 'The public front door and browsing surfaces.',
      rows: [
        { href: '/', label: 'Landing', note: '7 editorial sections, framed hero' },
        { href: '/search', label: 'Search', note: 'debounced, hits categories + guilds too' },
      ],
    },
    {
      heading: 'Categories & collections',
      intro: 'Category and collection indexes with detail pages.',
      rows: [
        { href: '/categories', label: 'Categories (index)' },
        ...categorySlugs.map((slug) => ({ href: '/categories/' + slug, label: '↳ /categories/' + slug })),
        { href: '/collections', label: 'Collections (index)', note: 'NEW · added this session' },
        ...collections.map((c) => ({ href: '/collections/' + c.slug, label: '↳ /collections/' + c.slug, note: c.title })),
      ],
    },
    {
      heading: 'Guilds',
      intro: 'Guild directory and per-guild pages.',
      rows: [
        { href: '/guilds', label: 'Guilds (index)' },
        ...guildSlugs.map((slug) => ({ href: '/guilds/' + slug, label: '↳ /guilds/' + slug })),
      ],
    },
    {
      heading: 'Shop / PLP / PDP',
      intro: 'Full shop with URL-driven filters and product detail pages.',
      rows: [
        { href: '/shop', label: 'Shop (all pieces)', note: 'try ?guild=wangkhei&sort=price-desc' },
        { href: '/shop?sort=price-desc', label: '↳ /shop?sort=price-desc' },
        { href: '/shop?guild=wangkhei&price=10-20', label: '↳ /shop?guild=wangkhei&price=10-20' },
        ...productSlugs.slice(0, 6).map((slug) => ({ href: '/shop/' + slug, label: '↳ /shop/' + slug })),
      ],
    },
    {
      heading: 'Cart · Wishlist · Checkout',
      intro: 'Purchase flow. Add pieces from any PDP first.',
      rows: [
        { href: '/cart', label: 'Cart page' },
        { href: '/wishlist', label: 'Wishlist', note: 'NEW behaviour · real WishlistContext' },
        { href: '/checkout', label: 'Checkout (3-step)' },
        { href: '/checkout/success', label: 'Order success' },
      ],
    },
    {
      heading: 'Account',
      intro: 'Authenticated area (mock — always signed in as the seeded user).',
      rows: [
        { href: '/account', label: 'Overview' },
        { href: '/account/orders', label: 'Orders' },
        ...orders.slice(0, 4).map((o) => ({ href: '/account/orders/' + o.code, label: '↳ /account/orders/' + o.code, note: o.status })),
        { href: '/account/profile', label: 'Profile' },
        { href: '/account/settings', label: 'Settings' },
      ],
    },
    {
      heading: 'Auth (UI shells)',
      intro: 'UI only — no real auth logic per current phase.',
      rows: [
        { href: '/auth/login', label: 'Sign in' },
        { href: '/auth/signup', label: 'Create account' },
        { href: '/auth/forgot', label: 'Forgot password' },
      ],
    },
    {
      heading: 'Craft Journal',
      intro: 'Long-form editorial.',
      rows: [
        { href: '/journal', label: 'Journal (index)' },
        ...journalSlugs.map((slug) => ({ href: '/journal/' + slug, label: '↳ /journal/' + slug })),
      ],
    },
    {
      heading: 'Static content · about, policy, help',
      intro: 'Everything below is NEW this session.',
      rows: [
        { href: '/about', label: 'About', note: 'NEW' },
        { href: '/story', label: 'Our Story', note: 'NEW' },
        { href: '/sustainability', label: 'Sustainability', note: 'NEW' },
        { href: '/contact', label: 'Contact', note: 'NEW' },
        { href: '/faq', label: 'Questions & Answers', note: 'NEW' },
        { href: '/shipping', label: 'Shipping', note: 'NEW' },
        { href: '/returns', label: 'Returns & Repairs', note: 'NEW' },
        { href: '/terms', label: 'Terms of Service', note: 'NEW' },
        { href: '/privacy', label: 'Privacy Policy', note: 'NEW' },
        { href: '/gi-registry', label: 'GI Registry', note: 'NEW · has a working verify form' },
      ],
    },
    {
      heading: 'Error & placeholder',
      intro: 'System pages.',
      rows: [
        { href: '/this-route-does-not-exist', label: '404 · try any bad URL', note: 'e.g. /not-a-route' },
        { href: '/coming-soon', label: 'Coming Soon', note: 'NEW' },
      ],
    },
    {
      heading: 'Dev tools',
      intro: 'Internal-only surfaces.',
      rows: [
        { href: '/dev/kitchen-sink', label: 'Kitchen Sink — every primitive + variant' },
        { href: '/dev/routes', label: 'This page' },
      ],
    },
  ];

  return (
    <Section space="lg">
      <Container size="wide">
        <Eyebrow tone="vermilion">Development</Eyebrow>
        <h1 className="mt-3 font-display font-normal text-ink text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08]">
          All routes
        </h1>
        <p className="mt-4 text-[1rem] text-ink-700 max-w-prose leading-[1.6]">
          Every page in the app, grouped by area. Click any link to open it. Marked{' '}
          <span className="text-vermilion small-caps">NEW</span> means it was added or rebuilt in
          the Phase 4 pass on 2026-08-10.
        </p>
        <Hairline vermilion className="w-16 mt-8" />

        <div className="mt-12 flex flex-col gap-16">
          {groups.map((g) => (
            <section key={g.heading}>
              <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
                <h2 className="font-display text-[1.5rem] text-ink">{g.heading}</h2>
                <p className="text-[0.8125rem] text-muted italic">{g.intro}</p>
              </div>
              <ul className="divide-y divide-ink-100 border-t border-ink-100">
                {g.rows.map((r) => (
                  <li key={r.href} className="grid grid-cols-[1fr_auto] gap-6 py-3 items-baseline">
                    <Link
                      href={r.href}
                      className="text-[0.9375rem] text-ink hover:text-vermilion transition-colors font-mono"
                    >
                      {r.label}
                    </Link>
                    {r.note ? (
                      <span className={r.note === 'NEW' ? 'small-caps text-[0.7rem] text-vermilion' : 'text-[0.8125rem] text-muted italic'}>
                        {r.note}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 p-6 bg-frame rounded-lg">
          <p className="small-caps text-[0.72rem] text-muted mb-2">Local dev</p>
          <p className="text-[0.9375rem] text-ink-700 leading-[1.6]">
            Base URL: <code className="font-mono text-ink">http://localhost:3000</code>
          </p>
          <p className="text-[0.8125rem] text-muted mt-2">
            If a link 404s, restart the dev server — Next 16 with Turbopack occasionally needs a
            restart after new route files are added.
          </p>
        </div>
      </Container>
    </Section>
  );
}
