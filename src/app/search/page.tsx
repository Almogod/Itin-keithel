'use client';

import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Input } from '@/components/primitives/Input';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { ProductGrid } from '@/components/patterns/ProductGrid';
import { searchProducts } from '@/services';
import { useDebounce } from '@/lib/hooks';
import type { Product } from '@/types';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 200);
  const [products, setProducts] = useState<Product[]>([]);
  const isSearching = q !== debouncedQ;

  useEffect(() => {
    let cancelled = false;
    searchProducts(debouncedQ).then((results) => {
      if (!cancelled) setProducts(results.products);
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedQ]);

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
          />
          <p className="mt-3 small-caps text-[0.7rem] text-muted">
            {isSearching ? 'Searching…' : products.length + ' pieces'}
          </p>
        </div>
        <ProductGrid products={products} />
      </Container>
    </Section>
  );
}
