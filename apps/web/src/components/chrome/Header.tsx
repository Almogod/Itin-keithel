'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { Wordmark } from './Wordmark';
import { CATEGORY_STRIP, PRIMARY_NAV, ROUTES } from '@ik/config';
import { useScrollDirection } from '@ik/hooks';
import { useCart } from '@/features/cart/CartContext';
import { cn } from '@ik/utils';
import { MobileNav } from './MobileNav';
import { CartDrawer } from './CartDrawer';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrolled } = useScrollDirection();
  const { count, openDrawer } = useCart();

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-[background-color,border-color,padding] duration-[200ms]',
          scrolled
            ? 'bg-mono-surface/95 backdrop-blur-md border-b border-mono-line'
            : 'bg-mono-surface border-b border-mono-line',
        )}
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className={cn('grid grid-cols-[1fr_auto_1fr] items-center', scrolled ? 'py-3' : 'py-4')}>
            {/* Left — mobile menu / desktop nav */}
            <nav className="flex items-center gap-8" aria-label="Primary">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 -ml-2 text-mono-ink hover:text-brand-red transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
              <ul className="hidden md:flex items-center gap-7">
                {PRIMARY_NAV.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="uppercase tracking-[0.18em] text-[0.72rem] font-semibold text-mono-ink hover:text-brand-red transition-colors"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Centre — wordmark */}
            <div className="flex items-center justify-center">
              <Wordmark size={scrolled ? 'sm' : 'md'} />
            </div>

            {/* Right — utilities */}
            <div className="flex items-center justify-end gap-1">
              <Link
                href={ROUTES.SEARCH}
                aria-label="Search"
                className="inline-flex items-center justify-center w-10 h-10 text-mono-ink hover:text-brand-red transition-colors"
              >
                <Search size={20} strokeWidth={1.5} />
              </Link>
              <Link
                href={ROUTES.ACCOUNT}
                aria-label="Account"
                className="hidden md:inline-flex items-center justify-center w-10 h-10 text-mono-ink hover:text-brand-red transition-colors"
              >
                <User size={20} strokeWidth={1.5} />
              </Link>
              <button
                type="button"
                onClick={openDrawer}
                aria-label={'Cart with ' + count + ' items'}
                className="relative inline-flex items-center justify-center w-10 h-10 text-mono-ink hover:text-brand-red transition-colors"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {count > 0 ? (
                  <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-brand-red text-mono-surface text-[0.625rem] font-semibold tabular-nums">
                    {count}
                  </span>
                ) : null}
              </button>
            </div>
          </div>

          {/* Category strip */}
          <div
            className={cn(
              'hidden md:block overflow-hidden transition-[max-height,opacity,padding] duration-[200ms]',
              scrolled ? 'max-h-0 opacity-0 py-0' : 'max-h-10 opacity-100 pb-3',
            )}
          >
            <ul className="flex items-center justify-center gap-7">
              {CATEGORY_STRIP.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="uppercase tracking-[0.16em] text-[0.68rem] font-medium text-mono-muted hover:text-mono-ink transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer />
    </>
  );
}
