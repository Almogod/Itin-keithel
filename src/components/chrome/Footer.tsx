import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Wordmark } from './Wordmark';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { NewsletterForm } from './NewsletterForm';
import { ROUTES } from '@/config/routes';
import { SITE } from '@/config/site';

export function Footer() {
  return (
    <footer className="mt-32 bg-canvas border-t border-ink-100">
      <Container size="wide">
        <div className="py-16 md:py-24 grid gap-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <Wordmark size="lg" />
            <p className="text-[0.9375rem] text-ink-700 max-w-sm">
              A quiet, warm catalogue of Manipur’s living crafts — named by maker,
              framed by place. Shipped from Imphal, folded with tissue.
            </p>
            <NewsletterForm />
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
          <FooterColumn
            title="Support"
            links={[
              { label: 'Shipping', href: ROUTES.SHIPPING },
              { label: 'Returns', href: ROUTES.RETURNS },
              { label: 'FAQ', href: ROUTES.FAQ },
              { label: 'Terms', href: ROUTES.TERMS },
              { label: 'Privacy', href: ROUTES.PRIVACY },
            ]}
          />
        </div>

        <hr className="hairline" />

        <div className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-center md:text-left">
          <p className="small-caps text-[0.7rem] text-vermilion tracking-[0.18em]">
            Rooted in Manipur · Woven by Guilds
          </p>
          <p className="text-[0.75rem] text-muted max-w-lg md:text-right">
            Every price includes a direct share to the guild. Shipped from Imphal, folded with tissue.
          </p>
        </div>

        <hr className="hairline" />

        <div className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[0.75rem] text-muted">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" className="hover:text-vermilion transition-colors">
              Instagram
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

interface Col {
  title: string;
  links: { label: string; href: string }[];
}

function FooterColumn({ title, links }: Col) {
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow tone="muted">{title}</Eyebrow>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[0.9375rem] text-ink hover:text-vermilion transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
