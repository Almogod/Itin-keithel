'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { Container } from '@ik/ui';
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
            ? 'bg-canvas/95 backdrop-blur-md border-b border-ink-100'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <Container size="wide">
          <div className={cn('grid grid-cols-[1fr_auto_1fr] items-center', scrolled ? 'py-3' : 'py-5')}>
            {/* Left — mobile menu / desktop nav */}
            <nav className="flex items-center gap-6" aria-label="Primary">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 -ml-2 text-ink hover:text-vermilion transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.25} />
              </button>
              <ul className="hidden md:flex items-center gap-8">
                {PRIMARY_NAV.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="text-[0.875rem] text-ink hover:text-vermilion transition-colors"
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
            <div className="flex items-center justify-end gap-2">
              <Link
                href={ROUTES.SEARCH}
                aria-label="Search"
                className="inline-flex items-center justify-center w-10 h-10 text-ink hover:text-vermilion transition-colors"
              >
                <Search size={20} strokeWidth={1.25} />
              </Link>
              <Link
                href={ROUTES.ACCOUNT}
                aria-label="Account"
                className="hidden md:inline-flex items-center justify-center w-10 h-10 text-ink hover:text-vermilion transition-colors"
              >
                <User size={20} strokeWidth={1.25} />
              </Link>
              <button
                type="button"
                onClick={openDrawer}
                aria-label={'Cart with ' + count + ' items'}
                className="relative inline-flex items-center justify-center w-10 h-10 text-ink hover:text-vermilion transition-colors"
              >
                <ShoppingBag size={20} strokeWidth={1.25} />
                {count > 0 ? (
                  <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-vermilion text-canvas text-[0.625rem] font-semibold tabular-nums">
                    {count}
                  </span>
                ) : null}
              </button>
            </div>
          </div>

          {/* Category strip — appears when scrolled */}
          <div
            className={cn(
              'hidden md:block overflow-hidden transition-[max-height,opacity] duration-[200ms]',
              scrolled ? 'max-h-10 opacity-100 pb-3' : 'max-h-0 opacity-0',
            )}
          >
            <ul className="flex items-center justify-center gap-8">
              {CATEGORY_STRIP.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="small-caps text-[0.7rem] text-muted hover:text-vermilion transition-colors tracking-[0.14em]"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer />
    </>
  );
}
