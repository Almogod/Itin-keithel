'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input, ProductGrid } from '@ik/ui';
import { searchProducts, type SearchResults } from '@ik/services';
import { useDebounce } from '@ik/hooks';
import { ROUTES } from '@ik/config';

const EMPTY: SearchResults = { query: '', products: [], categories: [], guilds: [] };

export default function SearchPage() {
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 200);
  const [results, setResults] = useState<SearchResults>(EMPTY);
  const isSearching = q !== debouncedQ;

  useEffect(() => {
    let cancelled = false;
    searchProducts(debouncedQ).then((r) => {
      if (!cancelled) setResults(r);
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedQ]);

  const totalHits = results.products.length + results.categories.length + results.guilds.length;

  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <div className="max-w-xl">
            <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
              Search
            </p>
            <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(1.75rem,4vw,2.75rem)] mb-6">
              Find a piece
            </h1>
            <Input
              label="Search"
              hideLabel
              placeholder="Search by maker, village, craft"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              leading={<SearchIcon size={18} strokeWidth={1.5} />}
              autoFocus
            />
            <p className="mt-3 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              {isSearching
                ? 'Searching…'
                : q.trim() === ''
                ? 'Try “muga” or “Longpi” or an artisan name.'
                : totalHits + ' hits'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          {results.guilds.length > 0 ? (
            <div className="mb-10">
              <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted mb-4">
                Guilds
              </p>
              <ul className="flex flex-wrap gap-2">
                {results.guilds.map((g) => (
                  <li key={g.id}>
                    <Link
                      href={ROUTES.GUILD(g.slug)}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-mono-ink uppercase tracking-[0.1em] text-[0.75rem] font-medium text-mono-ink hover:bg-mono-ink hover:text-mono-surface transition-colors"
                    >
                      {g.name}
                      <span className="text-[0.65rem] tracking-[0.14em] opacity-70">{g.region}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {results.categories.length > 0 ? (
            <div className="mb-10">
              <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted mb-4">
                Categories
              </p>
              <ul className="flex flex-wrap gap-2">
                {results.categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={ROUTES.CATEGORY(c.slug)}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-mono-ink uppercase tracking-[0.1em] text-[0.75rem] font-medium text-mono-ink hover:bg-mono-ink hover:text-mono-surface transition-colors"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {results.products.length > 0 ? (
            <>
              {(results.guilds.length > 0 || results.categories.length > 0) ? (
                <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted mb-4 border-t border-mono-ink pt-6">
                  Pieces
                </p>
              ) : null}
              <ProductGrid products={results.products} />
            </>
          ) : q.trim() !== '' && !isSearching ? (
            <div className="py-24 flex flex-col items-center gap-3 text-center border border-mono-line">
              <p className="uppercase tracking-[0.14em] text-[1.125rem] font-semibold text-mono-ink">
                Nothing found.
              </p>
              <p className="text-[0.9375rem] text-mono-muted max-w-md">
                We couldn&rsquo;t match that query to any piece, category, or guild.
                Try a broader term — a craft, a village, or a fibre.
              </p>
            </div>
          ) : (
            <ProductGrid products={results.products} />
          )}
        </div>
      </section>
    </div>
  );
}
