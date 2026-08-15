import Link from 'next/link';
import type { Product } from '@ik/types';
import { formatPrice } from '@ik/utils';
import { ROUTES } from '@ik/config';
import { cn } from '@ik/utils';

export interface ProductCardProps {
  product: Product;
  className?: string;
  eager?: boolean;
}

export function ProductCard({ product, className, eager }: ProductCardProps) {
  const front = product.media[0];
  const back = product.media[1] ?? product.media[0];
  return (
    <Link
      href={ROUTES.PRODUCT(product.slug)}
      className={cn('group flex flex-col gap-3', className)}
    >
      <div className="relative overflow-hidden bg-mono-line aspect-[4/5]">
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
      </div>
      <div className="flex flex-col gap-1">
        {product.eyebrow ? (
          <span className="uppercase tracking-[0.16em] text-[0.65rem] font-semibold text-mono-muted">
            {product.eyebrow}
          </span>
        ) : null}
        <h3 className="uppercase tracking-[0.02em] text-[0.875rem] font-medium text-mono-ink leading-tight">
          {product.title}
        </h3>
        <p className="text-[0.75rem] text-mono-muted uppercase tracking-[0.08em]">
          {product.provenance.artisan}
        </p>
        <p className="text-[0.9375rem] text-mono-ink tabular-nums mt-1">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
