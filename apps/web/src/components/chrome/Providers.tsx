'use client';

import type { ReactNode } from 'react';
import { CartProvider } from '@/features/cart/CartContext';
import { WishlistProvider } from '@/features/wishlist/WishlistContext';
import { ToastProvider } from '@ik/ui';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
