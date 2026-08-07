'use client';

import { useMemo, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Input } from '@/components/primitives/Input';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { ProductGrid } from '@/components/patterns/ProductGrid';
import { productsApi } from '@/services';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const products = useMemo(() => {
    if (!q.trim()) return productsApi.all().slice(0, 6);
    const s = q.toLowerCase();
    return productsApi.all().filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.provenance.artisan.toLowerCase().includes(s) ||
        p.provenance.village.toLowerCase().includes(s) ||
        p.tags.some((t) => t.toLowerCase().includes(s)),
    );
  }, [q]);

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
        </div>
        <ProductGrid products={products} />
      </Container>
    </Section>
  );
}
