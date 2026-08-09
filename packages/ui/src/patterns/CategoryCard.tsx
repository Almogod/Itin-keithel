import Link from 'next/link';
import type { Category } from '@ik/types';
import { ROUTES } from '@ik/config';
import { cn } from '@ik/utils';

export interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={ROUTES.CATEGORY(category.slug)}
      className={cn('group relative block overflow-hidden rounded-lg', className)}
    >
      <div className="relative aspect-[3/2] bg-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.hero.src}
          alt={category.hero.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-1 text-canvas">
        {category.meiteiName ? (
          <span className="small-caps text-[0.7rem] opacity-80">{category.meiteiName}</span>
        ) : null}
        <h3 className="font-display text-[1.75rem] leading-tight">{category.name}</h3>
        <p className="text-[0.8125rem] opacity-80 tabular-nums">
          {category.productCount} pieces
        </p>
      </div>
    </Link>
  );
}
