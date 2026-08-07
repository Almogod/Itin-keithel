'use client';

import type { ReactNode } from 'react';
import { CartProvider } from '@/features/cart/CartContext';
import { ToastProvider } from '@/components/primitives/Toast';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>{children}</CartProvider>
    </ToastProvider>
  );
}
