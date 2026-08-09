'use client';

import type { Product } from '@ik/types';
import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Grid } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { Button } from '@ik/ui';
import { ProductCard } from '@ik/ui';
import { useWishlist } from '@/features/wishlist/WishlistContext';
import { ROUTES } from '@ik/config';

export function WishlistView({ allProducts }: { allProducts: Product[] }) {
  const { ids, clear } = useWishlist();
  const products = allProducts.filter((p) => ids.includes(p.id));

  return (
    <Section space="xl">
      <Container size="wide">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Wishlist' }]} className="mb-8" />
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <Eyebrow tone="vermilion">Saved</Eyebrow>
            <h1 className="mt-3 font-display font-normal text-ink text-[clamp(2.25rem,5vw,4rem)] leading-[1.08]">
              Wishlist
            </h1>
            <p className="mt-3 text-[0.9375rem] text-muted">
              {products.length === 0
                ? 'No pieces saved yet.'
                : products.length + (products.length === 1 ? ' piece' : ' pieces') + ' waiting.'}
            </p>
          </div>
          {products.length > 0 ? (
            <Button variant="ghost" onClick={clear} size="sm">
              Clear wishlist
            </Button>
          ) : null}
        </div>

        {products.length === 0 ? (
          <Stack gap={4} align="center" className="py-24 text-center">
            <p className="font-display text-[1.5rem] text-ink">The shelf is empty.</p>
            <p className="text-[0.9375rem] text-muted max-w-md">
              Save a piece from any product page — the heart lives under &ldquo;Save for later.&rdquo;
            </p>
            <Button as="link" href={ROUTES.SHOP}>Enter the shop</Button>
          </Stack>
        ) : (
          <Grid cols={3} gap={12}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Grid>
        )}
      </Container>
    </Section>
  );
}
