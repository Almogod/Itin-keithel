import { notFound } from 'next/navigation';
import { Badge } from '@ik/ui';
import { getOrder } from '@ik/services';
import { formatDate, formatPrice } from '@ik/utils';

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
      <header className="flex items-start justify-between flex-wrap gap-4 border-b border-mono-ink pb-4">
        <div>
          <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-brand-red">
            Order · {order.code}
          </p>
          <h2 className="mt-2 uppercase tracking-[0.06em] text-[1.375rem] font-semibold text-mono-ink">
            Placed {formatDate(order.placedAt)}
          </h2>
        </div>
        <Badge tone={order.status === 'DELIVERED' ? 'green' : 'default'}>{LABEL[order.status]}</Badge>
      </header>

      <section>
        <h3 className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted mb-4">
          Items
        </h3>
        <ul className="divide-y divide-mono-line border-y border-mono-line">
          {order.items.map((it) => (
            <li key={it.id} className="flex gap-4 py-4">
              <div className="w-16 h-20 bg-mono-line overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.snapshot.image.src} alt={it.snapshot.image.alt} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="uppercase tracking-[0.02em] font-medium text-[0.9375rem] text-mono-ink">
                  {it.snapshot.title}
                </p>
                <p className="text-[0.75rem] text-mono-muted uppercase tracking-[0.08em]">
                  {it.snapshot.optionLabel} · × {it.quantity}
                </p>
              </div>
              <p className="text-[0.9375rem] tabular-nums text-mono-ink">
                {formatPrice(it.snapshot.unitPrice * it.quantity)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted mb-3">
            Shipping to
          </h3>
          <address className="not-italic text-[0.9375rem] text-mono-ink leading-[1.6]">
            {order.shippingAddress.fullName}<br />
            {order.shippingAddress.line1}<br />
            {order.shippingAddress.line2 ? <>{order.shippingAddress.line2}<br /></> : null}
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
            {order.shippingAddress.phone}
          </address>
        </div>
        <div>
          <h3 className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted mb-3">
            Payment
          </h3>
          <p className="text-[0.9375rem] text-mono-ink">{order.payment.method} · {order.payment.status}</p>
          {order.payment.transactionId ? (
            <p className="text-[0.72rem] text-mono-muted mt-1 uppercase tracking-[0.08em]">
              TXN {order.payment.transactionId}
            </p>
          ) : null}
        </div>
      </section>

      <section>
        <h3 className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted mb-4">
          Timeline
        </h3>
        <div className="flex flex-col gap-3">
          {order.timeline.map((t, i) => (
            <div key={i} className="grid grid-cols-[140px_1fr] gap-4 text-[0.9375rem] border-b border-mono-line pb-3 last:border-none">
              <time className="text-mono-muted tabular-nums uppercase tracking-[0.08em] text-[0.75rem]">
                {formatDate(t.at)}
              </time>
              <div>
                <p className="text-mono-ink uppercase tracking-[0.04em] font-medium">{LABEL[t.status]}</p>
                {t.note ? <p className="text-[0.8125rem] text-mono-muted">{t.note}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-6 border-t border-mono-ink">
        <div className="flex justify-between items-baseline uppercase tracking-[0.14em] text-[1rem] font-semibold text-mono-ink">
          <span>Total</span>
          <span className="tabular-nums text-[1.25rem]">{formatPrice(order.totals.total)}</span>
        </div>
      </section>
    </div>
  );
}
