import { ProductCard } from './ProductCard';
import type { Product } from '@ik/types';

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-3 border border-mono-line">
        <p className="uppercase tracking-[0.16em] text-[0.9rem] font-semibold text-mono-ink">
          No pieces match your filters.
        </p>
        <p className="text-[0.875rem] text-mono-muted">Try loosening a filter, or clear them.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
