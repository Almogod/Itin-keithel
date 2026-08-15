'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, Select, Radio } from '@ik/ui';
import { useCart } from '@/features/cart/CartContext';
import { formatPrice } from '@ik/utils';
import { ROUTES } from '@ik/config';
import { cn } from '@ik/utils';

const STEPS = ['Address', 'Shipping', 'Payment'] as const;
type Step = (typeof STEPS)[number];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totals, clear } = useCart();
  const [step, setStep] = useState<Step>('Address');
  const [payment, setPayment] = useState('UPI');

  function next() {
    const i = STEPS.indexOf(step);
    if (i < STEPS.length - 1) setStep(STEPS[i + 1]!);
  }

  function submit() {
    clear();
    router.push(ROUTES.ORDER_SUCCESS);
  }

  if (items.length === 0) {
    return (
      <div className="bg-mono-surface text-mono-ink">
        <section className="py-24">
          <div className="mx-auto w-full max-w-[780px] px-5 md:px-12 flex flex-col items-center gap-5 text-center">
            <p className="uppercase tracking-[0.14em] text-[1.25rem] font-semibold text-mono-ink">
              Nothing to check out.
            </p>
            <p className="text-[0.9375rem] text-mono-muted">Add a piece to your cart first.</p>
            <Link
              href={ROUTES.SHOP}
              className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
            >
              Continue shopping
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Checkout
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.25rem)]">
            A few last details.
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          {/* Stepper */}
          <ol className="flex items-center gap-2 md:gap-4 mb-10 flex-wrap">
            {STEPS.map((s, i) => {
              const done = STEPS.indexOf(step) > i;
              const on = s === step;
              return (
                <li key={s} className="inline-flex items-center gap-3">
                  <span
                    className={cn(
                      'inline-flex items-center justify-center w-6 h-6 border tabular-nums text-[0.7rem] font-semibold',
                      on
                        ? 'bg-mono-ink text-mono-surface border-mono-ink'
                        : done
                          ? 'bg-brand-red text-mono-surface border-brand-red'
                          : 'border-mono-line text-mono-muted',
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      'uppercase tracking-[0.16em] text-[0.7rem] font-semibold',
                      on ? 'text-mono-ink' : 'text-mono-muted',
                    )}
                  >
                    {s}
                  </span>
                  {i < STEPS.length - 1 ? <span className="w-6 md:w-8 h-px bg-mono-line mx-1 md:mx-2" /> : null}
                </li>
              );
            })}
          </ol>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">
            <div className="flex flex-col gap-8">
              {step === 'Address' ? (
                <div className="flex flex-col gap-6">
                  <h2 className="uppercase tracking-[0.14em] text-[1rem] font-semibold text-mono-ink">
                    Shipping address
                  </h2>
                  <hr className="border-mono-line" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Full name" name="fullName" />
                    <Input label="Phone" name="phone" type="tel" />
                  </div>
                  <Input label="Address line 1" name="line1" />
                  <Input label="Address line 2 (optional)" name="line2" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="City" name="city" />
                    <Input label="State" name="state" />
                    <Input label="Pincode" name="pincode" />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
                    >
                      Continue to shipping
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                </div>
              ) : null}

              {step === 'Shipping' ? (
                <div className="flex flex-col gap-6">
                  <h2 className="uppercase tracking-[0.14em] text-[1rem] font-semibold text-mono-ink">
                    Shipping method
                  </h2>
                  <hr className="border-mono-line" />
                  <Radio name="ship" defaultChecked label="Standard · 5–7 days · Free" hint="Delhivery, tracked." />
                  <Radio name="ship" label="Express · 2–3 days · ₹350" hint="BlueDart, priority." />
                  <Radio name="ship" label="Same-day (Imphal only) · ₹150" hint="Available inside Imphal municipal area." />
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('Address')}
                      className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 border border-mono-ink text-mono-ink hover:bg-mono-ink hover:text-mono-surface transition-colors"
                    >
                      <span aria-hidden>←</span> Back
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
                    >
                      Continue to payment <span aria-hidden>→</span>
                    </button>
                  </div>
                </div>
              ) : null}

              {step === 'Payment' ? (
                <div className="flex flex-col gap-6">
                  <h2 className="uppercase tracking-[0.14em] text-[1rem] font-semibold text-mono-ink">
                    Payment
                  </h2>
                  <hr className="border-mono-line" />
                  <div className="flex flex-col gap-3">
                    {['UPI', 'CARD', 'NETBANKING', 'WALLET', 'COD'].map((m) => (
                      <Radio
                        key={m}
                        name="pay"
                        value={m}
                        checked={payment === m}
                        onChange={() => setPayment(m)}
                        label={m === 'COD' ? 'Cash on delivery' : m}
                      />
                    ))}
                  </div>
                  {payment === 'CARD' ? (
                    <div className="flex flex-col gap-4">
                      <Input label="Card number" placeholder="1234 5678 9012 3456" name="card" />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input label="Expiry" placeholder="MM/YY" name="exp" />
                        <Input label="CVV" placeholder="123" name="cvv" />
                        <Select label="Save card" options={[{ label: 'Yes', value: 'y' }, { label: 'No', value: 'n' }]} />
                      </div>
                    </div>
                  ) : null}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('Shipping')}
                      className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 border border-mono-ink text-mono-ink hover:bg-mono-ink hover:text-mono-surface transition-colors"
                    >
                      <span aria-hidden>←</span> Back
                    </button>
                    <button
                      type="button"
                      onClick={submit}
                      className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
                    >
                      Place order · {formatPrice(totals.total)}
                      <span aria-hidden>→</span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-24 self-start border border-mono-ink p-6 flex flex-col gap-4">
              <h2 className="uppercase tracking-[0.16em] text-[0.85rem] font-semibold text-mono-ink">
                Order
              </h2>
              <ul className="flex flex-col gap-4">
                {items.map((it) => (
                  <li key={it.id} className="flex gap-3">
                    <div className="w-16 h-20 bg-mono-line overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.snapshot.image.src} alt={it.snapshot.image.alt} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.8125rem] uppercase tracking-[0.02em] text-mono-ink truncate">
                        {it.snapshot.title}
                      </p>
                      <p className="text-[0.72rem] text-mono-muted uppercase tracking-[0.08em]">× {it.quantity}</p>
                    </div>
                    <p className="text-[0.875rem] tabular-nums text-mono-ink">
                      {formatPrice(it.snapshot.unitPrice * it.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
              <hr className="border-mono-line" />
              <SummaryRow label="Subtotal" value={formatPrice(totals.subtotal)} />
              <SummaryRow label="Shipping" value={totals.shipping ? formatPrice(totals.shipping) : 'Free'} />
              <SummaryRow label="Tax" value={formatPrice(totals.tax)} />
              <hr className="border-mono-line" />
              <div className="flex items-baseline justify-between uppercase tracking-[0.14em] text-[0.9rem] font-semibold text-mono-ink">
                <span>Total</span>
                <span className="tabular-nums text-[1.125rem]">{formatPrice(totals.total)}</span>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[0.8125rem]">
      <span className="uppercase tracking-[0.1em] text-mono-muted">{label}</span>
      <span className="tabular-nums text-mono-ink">{value}</span>
    </div>
  );
}
