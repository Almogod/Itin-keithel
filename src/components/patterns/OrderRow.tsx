import Link from 'next/link';
import type { Order } from '@/types';
import { formatDate, formatPrice } from '@/lib/format';
import { Badge } from '@/components/primitives/Badge';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/cn';

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
        'flex items-center gap-6 py-6 border-t border-ink-100',
        'transition-colors hover:bg-frame/50 -mx-4 px-4',
        className,
      )}
    >
      <div className="w-20 h-24 shrink-0 bg-frame rounded-md overflow-hidden">
        {first ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={first.snapshot.image.src} alt={first.snapshot.image.alt} className="w-full h-full object-cover" />
        ) : null}
      </div>
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="small-caps text-[0.7rem] text-muted">Order #{order.code}</span>
          <Badge tone={STATUS_TONE[order.status]}>{STATUS_LABEL[order.status]}</Badge>
        </div>
        <p className="font-display text-[1.125rem] text-ink truncate">
          {first?.snapshot.title}
          {extra > 0 ? <span className="text-muted text-[0.9375rem]"> + {extra} more</span> : null}
        </p>
        <p className="text-[0.8125rem] text-muted">
          Placed {formatDate(order.placedAt)} · {order.items.length} item{order.items.length === 1 ? '' : 's'}
        </p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[1rem] text-ink tabular-nums">{formatPrice(order.totals.total)}</p>
      </div>
    </Link>
  );
}
