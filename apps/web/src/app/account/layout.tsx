import Link from 'next/link';
import type { ReactNode } from 'react';
import { Avatar } from '@ik/ui';
import { getCurrentUser } from '@ik/services';
import { ROUTES } from '@ik/config';

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
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-10 md:py-14">
          <div className="flex items-center gap-4">
            <Avatar name={user.fullName} shape="circle" size={64} />
            <div>
              <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red">
                Account
              </p>
              <h1 className="mt-1 font-sans font-semibold uppercase leading-[1.05] tracking-[-0.005em] text-mono-ink text-[clamp(1.5rem,3vw,2.25rem)]">
                {user.fullName}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 md:gap-14">
            <nav aria-label="Account">
              <ul className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-invisible border-b lg:border-b-0 border-mono-line pb-2 lg:pb-0">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="block px-3 py-2 uppercase tracking-[0.16em] text-[0.72rem] font-semibold text-mono-ink hover:text-brand-red transition-colors whitespace-nowrap"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
