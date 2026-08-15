import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { NewsletterForm } from './NewsletterForm';
import { ROUTES, SITE } from '@ik/config';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-mono-line bg-mono-surface text-mono-ink">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
        {/* Trust strip */}
        <div className="py-10 md:py-12 border-b border-mono-line grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {TRUST.map((t) => (
            <div key={t.title} className="flex flex-col gap-1.5">
              <p className="uppercase tracking-[0.16em] text-[0.7rem] font-semibold text-mono-ink">
                {t.title}
              </p>
              <p className="text-[0.8125rem] text-mono-muted leading-[1.5]">{t.body}</p>
            </div>
          ))}
        </div>

        {/* Main footer grid */}
        <div className="py-14 md:py-20 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Wordmark size="lg" />
            <p className="text-[0.9375rem] text-mono-muted max-w-sm leading-[1.55]">
              A quiet catalogue of Manipur&rsquo;s living crafts — named by maker,
              framed by place. Shipped from Imphal, folded with tissue.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-ink border-b border-mono-ink pb-0.5 hover:text-brand-red hover:border-brand-red transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          <FooterColumn
            title="Shop"
            links={[
              { label: 'All Products', href: ROUTES.SHOP },
              { label: 'Phanek', href: '/categories/phanek' },
              { label: 'Longpi', href: '/categories/longpi' },
              { label: 'Kauna', href: '/categories/kauna' },
              { label: 'Muga', href: '/categories/muga' },
              { label: 'Collections', href: ROUTES.COLLECTIONS },
            ]}
          />
          <FooterColumn
            title="The House"
            links={[
              { label: 'Our Story', href: ROUTES.STORY },
              { label: 'Guilds', href: ROUTES.GUILDS },
              { label: 'Craft Journal', href: ROUTES.JOURNAL },
              { label: 'Sustainability', href: ROUTES.SUSTAINABILITY },
              { label: 'GI Registry', href: ROUTES.GI_REGISTRY },
              { label: 'Contact', href: ROUTES.CONTACT },
            ]}
          />

          <div className="flex flex-col gap-4">
            <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-ink">
              Newsletter
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Support strip */}
        <div className="py-6 border-t border-mono-line flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.75rem] text-mono-muted">
            {[
              { label: 'Shipping', href: ROUTES.SHIPPING },
              { label: 'Returns', href: ROUTES.RETURNS },
              { label: 'FAQ', href: ROUTES.FAQ },
              { label: 'Terms', href: ROUTES.TERMS },
              { label: 'Privacy', href: ROUTES.PRIVACY },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="uppercase tracking-[0.14em] hover:text-mono-ink transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="uppercase tracking-[0.18em] text-[0.7rem] text-mono-muted">
            Ships worldwide · INR ₹
          </p>
        </div>

        <div className="py-6 border-t border-mono-line flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-[0.72rem] text-mono-muted">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="uppercase tracking-[0.18em]">Rooted in Manipur · Woven by guilds</p>
        </div>
      </div>
    </footer>
  );
}

const TRUST = [
  { title: 'Pan-India Delivery', body: 'Free shipping on orders over ₹6,000.' },
  { title: 'Ships from Imphal', body: 'Dispatched within 48 hours.' },
  { title: 'Verified Provenance', body: 'GI-registered pieces with maker details.' },
  { title: 'Secure Payment', body: 'Cards, UPI, and net banking.' },
];

interface Col {
  title: string;
  links: { label: string; href: string }[];
}

function FooterColumn({ title, links }: Col) {
  return (
    <div className="flex flex-col gap-4">
      <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-ink">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[0.875rem] text-mono-muted hover:text-mono-ink transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
