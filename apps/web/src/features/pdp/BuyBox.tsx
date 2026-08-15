'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Product } from '@ik/types';
import { useCart } from '@/features/cart/CartContext';
import { useWishlist } from '@/features/wishlist/WishlistContext';
import { useToast } from '@ik/ui';
import { formatPrice } from '@ik/utils';
import { cn } from '@ik/utils';

export function BuyBox({ product }: { product: Product }) {
  const { add } = useCart();
  const wishlist = useWishlist();
  const toast = useToast();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? '');
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]!;
  const saved = wishlist.has(product.id);

  function onAdd() {
    add(product, variant, 1);
    toast.push('Added to cart — ' + product.title, 'success');
  }

  function onSave() {
    wishlist.toggle(product.id);
    toast.push(saved ? 'Removed from wishlist' : 'Saved to wishlist', 'success');
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[1.5rem] font-semibold text-mono-ink tabular-nums">
        {formatPrice(variant.price)}
      </p>

      {product.variants.length > 1 ? (
        <div className="flex flex-col gap-3">
          <span className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-ink">
            Variant
          </span>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={cn(
                  'px-4 py-2 border text-[0.8125rem] uppercase tracking-[0.1em] font-medium transition-colors',
                  v.id === variant.id
                    ? 'border-mono-ink bg-mono-ink text-mono-surface'
                    : 'border-mono-ink text-mono-ink hover:bg-mono-ink hover:text-mono-surface',
                )}
              >
                {v.optionLabel}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-4 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
        >
          Add to cart
          <span aria-hidden>→</span>
        </button>
        <button
          type="button"
          onClick={onSave}
          aria-pressed={saved}
          className="inline-flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-4 bg-transparent text-mono-ink border border-mono-ink hover:bg-mono-ink hover:text-mono-surface transition-colors"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={cn(saved && 'fill-brand-red text-brand-red')}
          />
          {saved ? 'Saved' : 'Save for later'}
        </button>
      </div>

      <ul className="flex flex-col gap-2 text-[0.8125rem] text-mono-muted pt-4 border-t border-mono-line">
        <li>Ships from Imphal within 5 days.</li>
        <li>Free returns for 14 days.</li>
        <li>Each purchase pays the guild a direct share.</li>
      </ul>
    </div>
  );
}
