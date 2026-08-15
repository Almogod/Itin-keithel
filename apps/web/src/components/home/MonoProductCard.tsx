import Link from 'next/link';
import type { Product } from '@ik/types';
import { formatPrice } from '@ik/utils';
import { ROUTES } from '@ik/config';
import { cn } from '@ik/utils';

export interface MonoProductCardProps {
  product: Product;
  badge?: 'NEW' | 'RESTOCK' | null;
  eager?: boolean;
  className?: string;
}

export function MonoProductCard({ product, badge, eager, className }: MonoProductCardProps) {
  const front = product.media[0];
  const back = product.media[1] ?? product.media[0];
  return (
    <Link
      href={ROUTES.PRODUCT(product.slug)}
      className={cn('group flex flex-col gap-3 shrink-0', className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-mono-line">
        {front ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={front.src}
            alt={front.alt}
            loading={eager ? 'eager' : 'lazy'}
            className={cn(
              'absolute inset-0 w-full h-full object-cover',
              'transition-opacity duration-500 ease-[cubic-bezier(0.2,0,0,1)]',
              'group-hover:opacity-0',
            )}
          />
        ) : null}
        {back ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={back.src}
            alt={back.alt}
            loading="lazy"
            className={cn(
              'absolute inset-0 w-full h-full object-cover',
              'opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.2,0,0,1)]',
              'group-hover:opacity-100 scale-[1.02]',
            )}
          />
        ) : null}
        {badge ? (
          <span
            className={cn(
              'absolute top-3 left-3 z-10',
              'px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] leading-none',
              badge === 'NEW' ? 'bg-mono-ink text-mono-surface' : 'bg-brand-red text-mono-surface',
            )}
          >
            {badge === 'NEW' ? 'New Arrival' : 'Restock'}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-mono-ink font-medium uppercase tracking-[0.02em] text-[0.875rem] leading-tight">
          {product.title}
        </h3>
        <p className="text-mono-ink tabular-nums text-[0.9375rem]">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
