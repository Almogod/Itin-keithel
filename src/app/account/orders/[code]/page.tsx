import { notFound } from 'next/navigation';
import { Hairline } from '@/components/primitives/Hairline';
import { Badge } from '@/components/primitives/Badge';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Stack } from '@/components/layout/Stack';
import { getOrder } from '@/services';
import { formatDate, formatPrice } from '@/lib/format';

interface Props {
  params: Promise<{ code: string }>;
}

const LABEL = {
  PLACED: 'Placed',
  CONFIRMED: 'Confirmed',
  PACKED: 'Packed',
  HANDED_TO_COURIER: 'With courier',
  OUT_FOR_DELIVERY: 'Out for delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  RETURNED: 'Returned',
} as const;

export default async function OrderDetailPage({ params }: Props) {
  const { code } = await params;
  const order = await getOrder(code);
  if (!order) notFound();

  return (
    <div className="flex flex-col gap-12">
      <header className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <Eyebrow tone="vermilion">Order #{order.code}</Eyebrow>
          <h2 className="mt-2 font-display text-[1.75rem] text-ink">Placed {formatDate(order.placedAt)}</h2>
        </div>
        <Badge tone={order.status === 'DELIVERED' ? 'green' : 'default'}>{LABEL[order.status]}</Badge>
      </header>

      <section>
        <h3 className="small-caps text-[0.72rem] text-muted mb-4">Items</h3>
        <ul className="divide-y divide-ink-100">
          {order.items.map((it) => (
            <li key={it.id} className="flex gap-4 py-4">
              <div className="w-16 h-20 bg-frame rounded-md overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.snapshot.image.src} alt={it.snapshot.image.alt} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-[1.125rem] text-ink">{it.snapshot.title}</p>
                <p className="text-[0.8125rem] text-muted">{it.snapshot.optionLabel} · × {it.quantity}</p>
              </div>
              <p className="text-[0.9375rem] tabular-nums">{formatPrice(it.snapshot.unitPrice * it.quantity)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="small-caps text-[0.72rem] text-muted mb-3">Shipping to</h3>
          <address className="not-italic text-[0.9375rem] text-ink-700 leading-[1.6]">
            {order.shippingAddress.fullName}<br />
            {order.shippingAddress.line1}<br />
            {order.shippingAddress.line2 ? <>{order.shippingAddress.line2}<br /></> : null}
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
            {order.shippingAddress.phone}
          </address>
        </div>
        <div>
          <h3 className="small-caps text-[0.72rem] text-muted mb-3">Payment</h3>
          <p className="text-[0.9375rem] text-ink-700">{order.payment.method} · {order.payment.status}</p>
          {order.payment.transactionId ? <p className="text-[0.75rem] text-muted mt-1">TXN {order.payment.transactionId}</p> : null}
        </div>
      </section>

      <section>
        <h3 className="small-caps text-[0.72rem] text-muted mb-4">Timeline</h3>
        <Stack gap={3}>
          {order.timeline.map((t, i) => (
            <div key={i} className="grid grid-cols-[140px_1fr] gap-4 text-[0.9375rem]">
              <time className="text-muted tabular-nums">{formatDate(t.at)}</time>
              <div>
                <p className="text-ink">{LABEL[t.status]}</p>
                {t.note ? <p className="text-[0.8125rem] text-muted">{t.note}</p> : null}
              </div>
            </div>
          ))}
        </Stack>
      </section>

      <section className="pt-6 border-t border-ink-100">
        <div className="flex justify-between text-[1.125rem] text-ink">
          <span>Total</span>
          <span className="font-display tabular-nums">{formatPrice(order.totals.total)}</span>
        </div>
      </section>
    </div>
  );
}
