'use client';

import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/features/cart/CartContext';
import { formatPrice } from '@ik/utils';
import { ROUTES } from '@ik/config';

export default function CartPage() {
  const { items, totals, setQuantity, remove } = useCart();

  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li>
                <Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Cart</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">Cart</p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.5rem)]">
            Your selection
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          {items.length === 0 ? (
            <div className="py-20 md:py-24 flex flex-col items-center gap-5 text-center">
              <p className="uppercase tracking-[0.14em] text-[1.125rem] font-semibold text-mono-ink">
                Your cart is quiet.
              </p>
              <p className="text-[0.9375rem] text-mono-muted max-w-md">
                Browse the winter edit and add something meaningful.
              </p>
              <Link
                href={ROUTES.SHOP}
                className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
              >
                Continue shopping
                <span aria-hidden>→</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">
              <ul className="divide-y divide-mono-line border-y border-mono-line">
                {items.map((it) => (
                  <li key={it.id} className="flex gap-6 py-8">
                    <Link href={ROUTES.PRODUCT(it.snapshot.slug)} className="w-24 md:w-28 h-32 md:h-36 shrink-0 bg-mono-line overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.snapshot.image.src} alt={it.snapshot.image.alt} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      <Link
                        href={ROUTES.PRODUCT(it.snapshot.slug)}
                        className="uppercase tracking-[0.02em] font-sans font-medium text-[1.0625rem] text-mono-ink hover:text-brand-red transition-colors"
                      >
                        {it.snapshot.title}
                      </Link>
                      <p className="text-[0.75rem] text-mono-muted uppercase tracking-[0.1em]">
                        By {it.snapshot.guildName}
                      </p>
                      <p className="text-[0.72rem] text-mono-muted uppercase tracking-[0.08em]">
                        {it.snapshot.optionLabel}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="inline-flex items-center border border-mono-ink">
                          <button
                            type="button"
                            aria-label="Decrease"
                            onClick={() => setQuantity(it.id, it.quantity - 1)}
                            className="w-9 h-9 inline-flex items-center justify-center text-mono-ink hover:bg-mono-ink hover:text-mono-surface"
                          >
                            <Minus size={14} strokeWidth={1.5} />
                          </button>
                          <span className="w-8 text-center text-[0.875rem] tabular-nums">{it.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase"
                            onClick={() => setQuantity(it.id, it.quantity + 1)}
                            className="w-9 h-9 inline-flex items-center justify-center text-mono-ink hover:bg-mono-ink hover:text-mono-surface"
                          >
                            <Plus size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(it.id)}
                          className="inline-flex items-center gap-1.5 uppercase tracking-[0.16em] text-[0.68rem] font-semibold text-mono-muted hover:text-brand-red"
                        >
                          <X size={14} strokeWidth={1.5} />
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-[1rem] text-mono-ink tabular-nums shrink-0 font-medium">
                      {formatPrice(it.snapshot.unitPrice * it.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <aside className="lg:sticky lg:top-24 self-start border border-mono-ink p-8 flex flex-col gap-4">
                <h2 className="uppercase tracking-[0.16em] text-[0.9rem] font-semibold text-mono-ink">
                  Summary
                </h2>
                <hr className="border-mono-line" />
                <SummaryRow label="Subtotal" value={formatPrice(totals.subtotal)} />
                <SummaryRow label="Shipping" value={totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)} />
                <SummaryRow label="Tax (5%)" value={formatPrice(totals.tax)} />
                <hr className="border-mono-line" />
                <div className="flex items-baseline justify-between uppercase tracking-[0.14em] text-[0.9rem] font-semibold text-mono-ink">
                  <span>Total</span>
                  <span className="tabular-nums text-[1.125rem]">{formatPrice(totals.total)}</span>
                </div>
                <Link
                  href={ROUTES.CHECKOUT}
                  className="mt-2 inline-flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-4 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
                >
                  Proceed to checkout
                  <span aria-hidden>→</span>
                </Link>
                <p className="text-[0.7rem] text-mono-muted text-center">
                  Prices in INR. Includes a direct share to the guild.
                </p>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[0.875rem] text-mono-ink">
      <span className="uppercase tracking-[0.1em] text-mono-muted">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
