import { Grid } from '../layout/Grid';
import { ProductCard } from './ProductCard';
import type { Product } from '@ik/types';

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-2">
        <p className="font-display text-[1.375rem] text-ink">No pieces match your filters.</p>
        <p className="text-[0.9375rem] text-muted">Try loosening a filter, or clear them.</p>
      </div>
    );
  }
  return (
    <Grid cols={3} gap={12}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </Grid>
  );
}
