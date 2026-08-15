'use client';

import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/features/cart/CartContext';
import { Drawer } from '@ik/ui';
import { formatPrice } from '@ik/utils';
import { ROUTES } from '@ik/config';

export function CartDrawer() {
  const { drawerOpen, closeDrawer, items, totals, setQuantity, remove } = useCart();

  return (
    <Drawer open={drawerOpen} onClose={closeDrawer} side="right" title="Your cart">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center gap-5 p-8">
          <p className="uppercase tracking-[0.14em] text-[1rem] font-semibold text-mono-ink">
            Your cart is quiet.
          </p>
          <p className="text-[0.9375rem] text-mono-muted max-w-[280px]">
            Browse the winter edit and add something to your bag.
          </p>
          <Link
            href={ROUTES.SHOP}
            onClick={closeDrawer}
            className="mt-2 inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
          >
            Continue shopping
            <span aria-hidden>→</span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <ul className="flex-1 divide-y divide-mono-line">
            {items.map((it) => (
              <li key={it.id} className="flex gap-4 p-6">
                <Link
                  href={ROUTES.PRODUCT(it.snapshot.slug)}
                  onClick={closeDrawer}
                  className="w-20 h-24 bg-mono-line overflow-hidden shrink-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.snapshot.image.src} alt={it.snapshot.image.alt} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                  <Link
                    href={ROUTES.PRODUCT(it.snapshot.slug)}
                    onClick={closeDrawer}
                    className="uppercase tracking-[0.02em] text-[0.875rem] font-medium text-mono-ink hover:text-brand-red transition-colors truncate"
                  >
                    {it.snapshot.title}
                  </Link>
                  <p className="text-[0.75rem] text-mono-muted uppercase tracking-[0.1em]">
                    {it.snapshot.optionLabel}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="inline-flex items-center border border-mono-ink">
                      <button
                        type="button"
                        aria-label="Decrease"
                        onClick={() => setQuantity(it.id, it.quantity - 1)}
                        className="w-8 h-8 inline-flex items-center justify-center text-mono-ink hover:bg-mono-ink hover:text-mono-surface"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="w-8 text-center text-[0.875rem] tabular-nums">{it.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase"
                        onClick={() => setQuantity(it.id, it.quantity + 1)}
                        className="w-8 h-8 inline-flex items-center justify-center text-mono-ink hover:bg-mono-ink hover:text-mono-surface"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(it.id)}
                      aria-label="Remove"
                      className="text-mono-muted hover:text-brand-red"
                    >
                      <X size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
                <p className="text-[0.9375rem] text-mono-ink tabular-nums shrink-0">
                  {formatPrice(it.snapshot.unitPrice * it.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="border-t border-mono-line p-6 flex flex-col gap-4">
            <div className="flex justify-between uppercase tracking-[0.14em] text-[0.8rem] font-semibold text-mono-ink">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatPrice(totals.subtotal)}</span>
            </div>
            <p className="text-[0.72rem] text-mono-muted">
              Shipping and taxes calculated at checkout.
            </p>
            <Link
              href={ROUTES.CHECKOUT}
              onClick={closeDrawer}
              className="inline-flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
            >
              Proceed to checkout
              <span aria-hidden>→</span>
            </Link>
            <Link
              href={ROUTES.CART}
              onClick={closeDrawer}
              className="text-center uppercase tracking-[0.16em] text-[0.7rem] font-semibold text-mono-muted underline underline-offset-4 hover:text-mono-ink"
            >
              View full cart
            </Link>
          </div>
        </div>
      )}
    </Drawer>
  );
}
