'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Input } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { ProductGrid } from '@ik/ui';
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

  const totalHits =
    results.products.length + results.categories.length + results.guilds.length;

  return (
    <Section space="xl">
      <Container size="wide">
        <div className="max-w-xl mb-12">
          <Eyebrow tone="vermilion">Search</Eyebrow>
          <h1 className="mt-3 font-display font-normal text-ink text-[clamp(2rem,4vw,3rem)] leading-[1.08] mb-8">
            Find a piece
          </h1>
          <Input
            label="Search"
            hideLabel
            placeholder="Search by maker, village, craft"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            leading={<SearchIcon size={18} strokeWidth={1.25} />}
            autoFocus
          />
          <p className="mt-3 small-caps text-[0.7rem] text-muted">
            {isSearching
              ? 'Searching…'
              : q.trim() === ''
              ? 'Try “muga” or “Longpi” or an artisan name.'
              : totalHits + ' hits'}
          </p>
        </div>

        {results.guilds.length > 0 ? (
          <div className="mb-10">
            <Eyebrow tone="muted">Guilds</Eyebrow>
            <ul className="mt-4 flex flex-wrap gap-3">
              {results.guilds.map((g) => (
                <li key={g.id}>
                  <Link
                    href={ROUTES.GUILD(g.slug)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink-300 text-[0.875rem] text-ink hover:border-vermilion hover:text-vermilion transition-colors"
                  >
                    {g.name}
                    <span className="small-caps text-[0.65rem] text-muted">{g.region}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {results.categories.length > 0 ? (
          <div className="mb-10">
            <Eyebrow tone="muted">Categories</Eyebrow>
            <ul className="mt-4 flex flex-wrap gap-3">
              {results.categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={ROUTES.CATEGORY(c.slug)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink-300 text-[0.875rem] text-ink hover:border-vermilion hover:text-vermilion transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {(results.guilds.length > 0 || results.categories.length > 0) && results.products.length > 0 ? (
          <Hairline className="my-10" />
        ) : null}

        {results.products.length > 0 ? (
          <>
            {(results.guilds.length > 0 || results.categories.length > 0) ? (
              <Eyebrow tone="muted" className="mb-6">
                Pieces
              </Eyebrow>
            ) : null}
            <ProductGrid products={results.products} />
          </>
        ) : q.trim() !== '' && !isSearching ? (
          <div className="py-24 flex flex-col items-center gap-3 text-center">
            <p className="font-display text-[1.5rem] text-ink">Nothing found.</p>
            <p className="text-[0.9375rem] text-muted max-w-md">
              We couldn&apos;t match that query to any piece, category, or guild.
              Try a broader term — a craft, a village, or a fibre.
            </p>
          </div>
        ) : (
          <ProductGrid products={results.products} />
        )}
      </Container>
    </Section>
  );
}
