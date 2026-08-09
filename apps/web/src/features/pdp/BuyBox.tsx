'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Product } from '@ik/types';
import { useCart } from '@/features/cart/CartContext';
import { useWishlist } from '@/features/wishlist/WishlistContext';
import { Button } from '@ik/ui';
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
      <p className="text-[1.5rem] text-ink tabular-nums">{formatPrice(variant.price)}</p>

      {product.variants.length > 1 ? (
        <div className="flex flex-col gap-3">
          <span className="small-caps text-[0.72rem] text-muted">Variant</span>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={cn(
                  'px-4 py-2 rounded-full border text-[0.875rem] transition-colors',
                  v.id === variant.id
                    ? 'border-ink bg-ink text-canvas'
                    : 'border-ink-300 text-ink hover:border-ink',
                )}
              >
                {v.optionLabel}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        <Button onClick={onAdd} fullWidth>Add to cart</Button>
        <Button variant="ghost" fullWidth onClick={onSave} aria-pressed={saved}>
          <Heart
            size={16}
            strokeWidth={1.25}
            className={cn('mr-2', saved && 'fill-vermilion text-vermilion')}
          />
          {saved ? 'Saved' : 'Save for later'}
        </Button>
      </div>

      <ul className="flex flex-col gap-2 text-[0.8125rem] text-muted pt-4 border-t border-ink-100">
        <li>Ships from Imphal within 5 days.</li>
        <li>Free returns for 14 days.</li>
        <li>Each purchase pays the guild a direct share.</li>
      </ul>
    </div>
  );
}
