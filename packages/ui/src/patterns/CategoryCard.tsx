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
      className={cn('group relative block overflow-hidden', className)}
    >
      <div className="relative aspect-[3/4] bg-mono-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.hero.src}
          alt={category.hero.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-mono-ink/30 group-hover:bg-mono-ink/50 transition-colors" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col gap-1.5 text-mono-surface">
        {category.meiteiName ? (
          <span className="uppercase tracking-[0.18em] text-[0.65rem] font-medium opacity-80">
            {category.meiteiName}
          </span>
        ) : null}
        <h3 className="uppercase tracking-[0.02em] font-sans font-bold text-[clamp(1.25rem,2vw,1.75rem)] leading-tight">
          {category.name}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold tabular-nums opacity-90">
            {category.productCount} pieces
          </p>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
