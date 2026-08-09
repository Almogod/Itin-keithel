'use client';

import Link from 'next/link';
import { Drawer } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { PRIMARY_NAV, CATEGORY_STRIP, ROUTES } from '@ik/config';

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} side="left" title="Menu" width="w-[85vw] max-w-[360px]">
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="muted">Sections</Eyebrow>
          <ul className="flex flex-col gap-3">
            {PRIMARY_NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={onClose}
                  className="font-display text-[1.5rem] text-ink hover:text-vermilion transition-colors"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Eyebrow tone="muted">Categories</Eyebrow>
          <ul className="flex flex-col gap-2">
            {CATEGORY_STRIP.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={onClose}
                  className="text-[0.9375rem] text-ink hover:text-vermilion transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-4 border-t border-ink-100">
          <Link href={ROUTES.ACCOUNT} onClick={onClose} className="text-[0.9375rem] text-ink">
            Account
          </Link>
          <Link href={ROUTES.WISHLIST} onClick={onClose} className="text-[0.9375rem] text-ink">
            Wishlist
          </Link>
          <Link href={ROUTES.LOGIN} onClick={onClose} className="text-[0.9375rem] text-vermilion">
            Sign in
          </Link>
        </div>
      </div>
    </Drawer>
  );
}
