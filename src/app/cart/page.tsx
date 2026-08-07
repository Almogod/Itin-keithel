'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/primitives/Button';
import { Breadcrumb } from '@/components/primitives/Breadcrumb';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Hairline } from '@/components/primitives/Hairline';
import { useCart } from '@/features/cart/CartContext';
import { formatPrice } from '@/lib/format';
import { ROUTES } from '@/config/routes';

export default function CartPage() {
  const { items, totals, setQuantity, remove } = useCart();

  return (
    <Section space="xl">
      <Container size="wide">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Cart' }]} className="mb-6" />
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <div>
            <Eyebrow tone="vermilion">Cart</Eyebrow>
            <h1 className="mt-3 font-display font-normal text-ink text-[clamp(2.25rem,5vw,4rem)] leading-[1.08]">
              Your selection
            </h1>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="py-24 flex flex-col items-center gap-4 text-center">
            <p className="font-display text-[1.5rem] text-ink">Your cart is quiet.</p>
            <p className="text-[0.9375rem] text-muted max-w-md">
              Browse the winter edit and add something meaningful.
            </p>
            <Button as="link" href={ROUTES.SHOP}>Enter the shop</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
            <ul className="divide-y divide-ink-100">
              {items.map((it) => (
                <li key={it.id} className="flex gap-6 py-8">
                  <Link href={ROUTES.PRODUCT(it.snapshot.slug)} className="w-28 h-36 shrink-0 bg-frame rounded-md overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.snapshot.image.src} alt={it.snapshot.image.alt} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col gap-2 min-w-0">
                    <Link href={ROUTES.PRODUCT(it.snapshot.slug)} className="font-display text-[1.375rem] text-ink hover:text-vermilion transition-colors">
                      {it.snapshot.title}
                    </Link>
                    <p className="text-[0.8125rem] text-muted italic">by {it.snapshot.guildName}</p>
                    <p className="text-[0.75rem] text-muted">{it.snapshot.optionLabel}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="inline-flex items-center border border-ink-300 rounded-md">
                        <button type="button" aria-label="Decrease" onClick={() => setQuantity(it.id, it.quantity - 1)} className="w-9 h-9 inline-flex items-center justify-center text-ink hover:bg-frame">
                          <Minus size={14} strokeWidth={1.25} />
                        </button>
                        <span className="w-8 text-center text-[0.875rem] tabular-nums">{it.quantity}</span>
                        <button type="button" aria-label="Increase" onClick={() => setQuantity(it.id, it.quantity + 1)} className="w-9 h-9 inline-flex items-center justify-center text-ink hover:bg-frame">
                          <Plus size={14} strokeWidth={1.25} />
                        </button>
                      </div>
                      <button type="button" onClick={() => remove(it.id)} className="inline-flex items-center gap-1 text-[0.8125rem] text-muted hover:text-danger">
                        <Trash2 size={14} strokeWidth={1.25} />
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-[1.0625rem] text-ink tabular-nums shrink-0">{formatPrice(it.snapshot.unitPrice * it.quantity)}</p>
                </li>
              ))}
            </ul>

            <aside className="lg:sticky lg:top-24 self-start bg-frame rounded-lg p-8 flex flex-col gap-4">
              <h2 className="font-display text-[1.5rem] text-ink">Summary</h2>
              <Hairline />
              <SummaryRow label="Subtotal" value={formatPrice(totals.subtotal)} />
              <SummaryRow label="Shipping" value={totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)} />
              <SummaryRow label="Tax (5%)" value={formatPrice(totals.tax)} />
              <Hairline />
              <div className="flex items-baseline justify-between text-[1.125rem] text-ink">
                <span>Total</span>
                <span className="tabular-nums font-display">{formatPrice(totals.total)}</span>
              </div>
              <Button as="link" href={ROUTES.CHECKOUT} fullWidth>Proceed to checkout</Button>
              <p className="text-[0.75rem] text-muted text-center">Prices in INR. Includes a direct share to the guild.</p>
            </aside>
          </div>
        )}
      </Container>
    </Section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[0.9375rem] text-ink-700">
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
