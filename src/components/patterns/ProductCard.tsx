import Link from 'next/link';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/format';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/cn';

export interface ProductCardProps {
  product: Product;
  className?: string;
  eager?: boolean;
}

export function ProductCard({ product, className, eager }: ProductCardProps) {
  const cover = product.media[0];
  return (
    <Link
      href={ROUTES.PRODUCT(product.slug)}
      className={cn('group flex flex-col gap-4', className)}
    >
      <div className="relative overflow-hidden bg-frame rounded-lg aspect-[4/5]">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover.src}
            alt={cover.alt}
            loading={eager ? 'eager' : 'lazy'}
            className={cn(
              'w-full h-full object-cover',
              'transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0,0,1)]',
              'group-hover:scale-[1.02]',
            )}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        {product.eyebrow ? (
          <span className="small-caps text-[0.7rem] text-muted">{product.eyebrow}</span>
        ) : null}
        <h3 className="font-display text-[1.125rem] leading-tight text-ink font-normal">
          {product.title}
        </h3>
        <p className="text-[0.8125rem] text-ink-500">
          by <span className="italic">{product.provenance.artisan}</span>
        </p>
        <p className="text-[0.9375rem] text-ink tabular-nums mt-1">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
