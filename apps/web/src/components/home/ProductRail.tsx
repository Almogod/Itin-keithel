'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Product } from '@ik/types';
import { cn } from '@ik/utils';
import { MonoProductCard } from './MonoProductCard';

export interface ProductRailProps {
  title: string;
  viewAllHref?: string;
  products: Product[];
  badge?: 'NEW' | 'RESTOCK' | null;
}

export function ProductRail({ title, viewAllHref, products, badge = null }: ProductRailProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const check = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    check();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [check]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const step = Math.max(el.clientWidth * 0.75, 320);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
        <div className="flex items-end justify-between gap-6 mb-8 md:mb-10">
          <h2 className="font-sans font-semibold uppercase tracking-[0.04em] text-mono-ink text-[clamp(1.5rem,3vw,2.25rem)] leading-tight">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            {viewAllHref ? (
              <Link
                href={viewAllHref}
                className="hidden md:inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[0.75rem] font-semibold text-mono-ink border-b border-mono-ink pb-0.5 hover:border-brand-red hover:text-brand-red transition-colors"
              >
                View all
                <span aria-hidden>→</span>
              </Link>
            ) : null}
            <div className="ml-4 flex items-center gap-2">
              <button
                type="button"
                aria-label="Scroll left"
                disabled={!canPrev}
                onClick={() => scrollBy(-1)}
                className={cn(
                  'w-10 h-10 flex items-center justify-center border border-mono-ink',
                  'transition-colors',
                  canPrev
                    ? 'text-mono-ink hover:bg-mono-ink hover:text-mono-surface'
                    : 'text-mono-muted border-mono-line cursor-not-allowed',
                )}
              >
                <span aria-hidden>←</span>
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                disabled={!canNext}
                onClick={() => scrollBy(1)}
                className={cn(
                  'w-10 h-10 flex items-center justify-center border border-mono-ink',
                  'transition-colors',
                  canNext
                    ? 'text-mono-ink hover:bg-mono-ink hover:text-mono-surface'
                    : 'text-mono-muted border-mono-line cursor-not-allowed',
                )}
              >
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scroller}
          className={cn(
            'flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-invisible',
            '-mx-5 px-5 md:-mx-12 md:px-12 lg:-mx-16 lg:px-16 xl:-mx-[88px] xl:px-[88px]',
          )}
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="snap-start w-[70%] sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[19%]"
            >
              <MonoProductCard product={p} badge={badge} />
            </div>
          ))}
        </div>

        {viewAllHref ? (
          <div className="md:hidden mt-8 flex justify-center">
            <Link
              href={viewAllHref}
              className="uppercase tracking-[0.2em] text-[0.75rem] font-semibold text-mono-ink border-b border-mono-ink pb-0.5"
            >
              View all →
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
