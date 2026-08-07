'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Hairline } from '@/components/primitives/Hairline';
import { Input } from '@/components/primitives/Input';
import { Select } from '@/components/primitives/Select';
import { Radio } from '@/components/primitives/Radio';
import { Button } from '@/components/primitives/Button';
import { useCart } from '@/features/cart/CartContext';
import { formatPrice } from '@/lib/format';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/cn';

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
      <Section space="xl">
        <Container size="editorial">
          <Stack gap={4} align="center" className="text-center py-16">
            <p className="font-display text-[1.75rem] text-ink">Nothing to check out.</p>
            <p className="text-[0.9375rem] text-muted">Add a piece to your cart first.</p>
            <Button as="link" href={ROUTES.SHOP}>Enter the shop</Button>
          </Stack>
        </Container>
      </Section>
    );
  }

  return (
    <Section space="lg">
      <Container size="wide">
        <Eyebrow tone="vermilion">Checkout</Eyebrow>
        <h1 className="mt-3 font-display font-normal text-ink text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] mb-8">
          A few last details.
        </h1>

        {/* Stepper */}
        <ol className="flex items-center gap-4 mb-10 flex-wrap">
          {STEPS.map((s, i) => {
            const done = STEPS.indexOf(step) > i;
            const on = s === step;
            return (
              <li key={s} className="inline-flex items-center gap-3">
                <span
                  className={cn(
                    'inline-flex items-center justify-center w-6 h-6 rounded-full border tabular-nums text-[0.75rem]',
                    on ? 'bg-vermilion text-canvas border-vermilion' : done ? 'bg-ink text-canvas border-ink' : 'border-ink-300 text-muted',
                  )}
                >
                  {i + 1}
                </span>
                <span className={cn('small-caps text-[0.72rem]', on ? 'text-ink' : 'text-muted')}>{s}</span>
                {i < STEPS.length - 1 ? <span className="w-8 h-px bg-ink-100 mx-2" /> : null}
              </li>
            );
          })}
        </ol>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
          <div className="flex flex-col gap-8">
            {step === 'Address' ? (
              <Stack gap={6}>
                <h2 className="font-display text-[1.5rem] text-ink">Shipping address</h2>
                <Hairline />
                <Grid cols={2} gap={4}>
                  <Input label="Full name" name="fullName" />
                  <Input label="Phone" name="phone" type="tel" />
                </Grid>
                <Input label="Address line 1" name="line1" />
                <Input label="Address line 2 (optional)" name="line2" />
                <Grid cols={3} gap={4}>
                  <Input label="City" name="city" />
                  <Input label="State" name="state" />
                  <Input label="Pincode" name="pincode" />
                </Grid>
                <div className="flex justify-end">
                  <Button onClick={next}>Continue to shipping</Button>
                </div>
              </Stack>
            ) : null}

            {step === 'Shipping' ? (
              <Stack gap={6}>
                <h2 className="font-display text-[1.5rem] text-ink">Shipping method</h2>
                <Hairline />
                <Radio name="ship" defaultChecked label="Standard · 5–7 days · Free" hint="Delhivery, tracked." />
                <Radio name="ship" label="Express · 2–3 days · ₹350" hint="BlueDart, priority." />
                <Radio name="ship" label="Same-day (Imphal only) · ₹150" hint="Available inside Imphal municipal area." />
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep('Address')}>Back</Button>
                  <Button onClick={next}>Continue to payment</Button>
                </div>
              </Stack>
            ) : null}

            {step === 'Payment' ? (
              <Stack gap={6}>
                <h2 className="font-display text-[1.5rem] text-ink">Payment</h2>
                <Hairline />
                <Stack gap={3}>
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
                </Stack>
                {payment === 'CARD' ? (
                  <Stack gap={4}>
                    <Input label="Card number" placeholder="1234 5678 9012 3456" name="card" />
                    <Grid cols={3} gap={4}>
                      <Input label="Expiry" placeholder="MM/YY" name="exp" />
                      <Input label="CVV" placeholder="123" name="cvv" />
                      <Select label="Save card" options={[{ label: 'Yes', value: 'y' }, { label: 'No', value: 'n' }]} />
                    </Grid>
                  </Stack>
                ) : null}
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep('Shipping')}>Back</Button>
                  <Button onClick={submit}>Place order · {formatPrice(totals.total)}</Button>
                </div>
              </Stack>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 self-start bg-frame rounded-lg p-6 flex flex-col gap-4">
            <h2 className="font-display text-[1.25rem] text-ink">Order</h2>
            <ul className="flex flex-col gap-4">
              {items.map((it) => (
                <li key={it.id} className="flex gap-3">
                  <div className="w-16 h-20 bg-canvas rounded-md overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.snapshot.image.src} alt={it.snapshot.image.alt} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.875rem] text-ink truncate">{it.snapshot.title}</p>
                    <p className="text-[0.75rem] text-muted">× {it.quantity}</p>
                  </div>
                  <p className="text-[0.875rem] tabular-nums">{formatPrice(it.snapshot.unitPrice * it.quantity)}</p>
                </li>
              ))}
            </ul>
            <Hairline />
            <div className="flex justify-between text-[0.875rem]"><span>Subtotal</span><span className="tabular-nums">{formatPrice(totals.subtotal)}</span></div>
            <div className="flex justify-between text-[0.875rem]"><span>Shipping</span><span className="tabular-nums">{totals.shipping ? formatPrice(totals.shipping) : 'Free'}</span></div>
            <div className="flex justify-between text-[0.875rem]"><span>Tax</span><span className="tabular-nums">{formatPrice(totals.tax)}</span></div>
            <Hairline />
            <div className="flex justify-between text-[1rem] text-ink"><span>Total</span><span className="tabular-nums font-display text-[1.25rem]">{formatPrice(totals.total)}</span></div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
