'use client';

import Link from 'next/link';
import type { Product } from '@ik/types';
import { ProductCard } from '@ik/ui';
import { useWishlist } from '@/features/wishlist/WishlistContext';
import { ROUTES } from '@ik/config';

export function WishlistView({ allProducts }: { allProducts: Product[] }) {
  const { ids, clear } = useWishlist();
  const products = allProducts.filter((p) => ids.includes(p.id));

  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Wishlist</li>
            </ol>
          </nav>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
                Saved
              </p>
              <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.5rem)]">
                Wishlist
              </h1>
              <p className="mt-3 uppercase tracking-[0.14em] text-[0.72rem] font-medium text-mono-muted">
                {products.length === 0
                  ? 'No pieces saved yet.'
                  : products.length + (products.length === 1 ? ' piece' : ' pieces') + ' waiting.'}
              </p>
            </div>
            {products.length > 0 ? (
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-2 uppercase tracking-[0.16em] text-[0.7rem] font-semibold px-4 py-2 border border-mono-ink text-mono-ink hover:bg-mono-ink hover:text-mono-surface transition-colors"
              >
                Clear wishlist
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          {products.length === 0 ? (
            <div className="py-24 flex flex-col items-center gap-5 text-center">
              <p className="uppercase tracking-[0.14em] text-[1.125rem] font-semibold text-mono-ink">
                The shelf is empty.
              </p>
              <p className="text-[0.9375rem] text-mono-muted max-w-md">
                Save a piece from any product page — the heart lives under &ldquo;Save for later.&rdquo;
              </p>
              <Link
                href={ROUTES.SHOP}
                className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
              >
                Continue shopping <span aria-hidden>→</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
