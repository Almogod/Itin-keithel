import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Avatar } from '@/components/primitives/Avatar';
import { getCurrentUser } from '@/services';
import { ROUTES } from '@/config/routes';

const NAV = [
  { href: ROUTES.ACCOUNT, label: 'Overview' },
  { href: ROUTES.ORDERS, label: 'Orders' },
  { href: ROUTES.WISHLIST, label: 'Wishlist' },
  { href: ROUTES.PROFILE, label: 'Profile' },
  { href: ROUTES.SETTINGS, label: 'Settings' },
];

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  return (
    <Section space="lg">
      <Container size="wide">
        <div className="flex items-center gap-4 mb-12">
          <Avatar name={user.fullName} shape="circle" size={64} />
          <div>
            <Eyebrow tone="vermilion">Account</Eyebrow>
            <h1 className="mt-1 font-display font-normal text-ink text-[clamp(1.75rem,3.5vw,2.75rem)]">
              {user.fullName}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
          <nav aria-label="Account">
            <ul className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-invisible border-b lg:border-b-0 border-ink-100 pb-2 lg:pb-0">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="block px-3 py-2 text-[0.9375rem] text-ink hover:bg-frame rounded-md transition-colors whitespace-nowrap"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>{children}</div>
        </div>
      </Container>
    </Section>
  );
}
