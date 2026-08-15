import Link from 'next/link';
import type { Order } from '@ik/types';
import { formatDate, formatPrice } from '@ik/utils';
import { Badge } from '../primitives/Badge';
import { ROUTES } from '@ik/config';
import { cn } from '@ik/utils';

const STATUS_TONE: Record<Order['status'], 'default' | 'green' | 'warn' | 'danger'> = {
  PLACED: 'default',
  CONFIRMED: 'default',
  PACKED: 'default',
  HANDED_TO_COURIER: 'warn',
  OUT_FOR_DELIVERY: 'warn',
  DELIVERED: 'green',
  CANCELLED: 'danger',
  RETURNED: 'danger',
};

const STATUS_LABEL: Record<Order['status'], string> = {
  PLACED: 'Placed',
  CONFIRMED: 'Confirmed',
  PACKED: 'Packed',
  HANDED_TO_COURIER: 'With courier',
  OUT_FOR_DELIVERY: 'Out for delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  RETURNED: 'Returned',
};

export interface OrderRowProps {
  order: Order;
  className?: string;
}

export function OrderRow({ order, className }: OrderRowProps) {
  const first = order.items[0];
  const extra = order.items.length - 1;
  return (
    <Link
      href={ROUTES.ORDER(order.code)}
      className={cn(
        'flex items-center gap-6 py-6 border-t border-mono-line',
        'transition-colors hover:bg-mono-line/40 -mx-4 px-4',
        className,
      )}
    >
      <div className="w-20 h-24 shrink-0 bg-mono-line overflow-hidden">
        {first ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={first.snapshot.image.src} alt={first.snapshot.image.alt} className="w-full h-full object-cover" />
        ) : null}
      </div>
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="uppercase tracking-[0.16em] text-[0.68rem] font-semibold text-mono-muted">
            Order · {order.code}
          </span>
          <Badge tone={STATUS_TONE[order.status]}>{STATUS_LABEL[order.status]}</Badge>
        </div>
        <p className="uppercase tracking-[0.02em] text-[1rem] font-medium text-mono-ink truncate">
          {first?.snapshot.title}
          {extra > 0 ? <span className="text-mono-muted text-[0.9375rem] normal-case tracking-normal"> + {extra} more</span> : null}
        </p>
        <p className="text-[0.75rem] text-mono-muted uppercase tracking-[0.08em]">
          Placed {formatDate(order.placedAt)} · {order.items.length} item{order.items.length === 1 ? '' : 's'}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[1rem] text-mono-ink tabular-nums font-medium">{formatPrice(order.totals.total)}</p>
      </div>
    </Link>
  );
}
