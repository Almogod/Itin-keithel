'use client';

import Link from 'next/link';
import { Drawer } from '@ik/ui';
import { PRIMARY_NAV, CATEGORY_STRIP, ROUTES } from '@ik/config';

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} side="left" title="Menu" width="w-[85vw] max-w-[360px]">
      <div className="flex flex-col gap-10 p-6">
        <div className="flex flex-col gap-4">
          <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted">
            Sections
          </p>
          <ul className="flex flex-col gap-3">
            {PRIMARY_NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={onClose}
                  className="uppercase tracking-[0.05em] text-[1.25rem] font-semibold text-mono-ink hover:text-brand-red transition-colors"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted">
            Shop
          </p>
          <ul className="flex flex-col gap-2.5">
            {CATEGORY_STRIP.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={onClose}
                  className="text-[0.9375rem] text-mono-ink hover:text-brand-red transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-mono-line">
          <Link
            href={ROUTES.ACCOUNT}
            onClick={onClose}
            className="uppercase tracking-[0.18em] text-[0.75rem] font-semibold text-mono-ink"
          >
            Account
          </Link>
          <Link
            href={ROUTES.WISHLIST}
            onClick={onClose}
            className="uppercase tracking-[0.18em] text-[0.75rem] font-semibold text-mono-ink"
          >
            Wishlist
          </Link>
          <Link
            href={ROUTES.LOGIN}
            onClick={onClose}
            className="uppercase tracking-[0.18em] text-[0.75rem] font-semibold text-brand-red"
          >
            Sign in
          </Link>
        </div>
      </div>
    </Drawer>
  );
}
