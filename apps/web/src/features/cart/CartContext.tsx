'use client';

import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, CartTotals, Product, ProductVariant, Media } from '@ik/types';

interface CartState {
  items: CartItem[];
  drawerOpen: boolean;
}

type Action =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; id: string }
  | { type: 'SET_QTY'; id: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' };

function reducer(state: CartState, a: Action): CartState {
  switch (a.type) {
    case 'ADD': {
      const existing = state.items.find(
        (i) => i.productId === a.item.productId && i.variantId === a.item.variantId,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === existing.id ? { ...i, quantity: i.quantity + a.item.quantity } : i,
          ),
          drawerOpen: true,
        };
      }
      return { ...state, items: [...state.items, a.item], drawerOpen: true };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== a.id) };
    case 'SET_QTY':
      return {
        ...state,
        items: state.items.map((i) => (i.id === a.id ? { ...i, quantity: Math.max(1, a.qty) } : i)),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'OPEN':
      return { ...state, drawerOpen: true };
    case 'CLOSE':
      return { ...state, drawerOpen: false };
  }
}

function totalsOf(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((s, i) => s + i.snapshot.unitPrice * i.quantity, 0);
  const shipping = subtotal >= 500000 || subtotal === 0 ? 0 : 15000;
  const tax = Math.round(subtotal * 0.05);
  return { subtotal, discount: 0, shipping, tax, total: subtotal + shipping + tax };
}

interface CartCtx {
  items: CartItem[];
  totals: CartTotals;
  count: number;
  drawerOpen: boolean;
  add: (product: Product, variant: ProductVariant, quantity?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function useCart(): CartCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCart must be used inside CartProvider');
  return v;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], drawerOpen: false });

  const add = useCallback((product: Product, variant: ProductVariant, quantity = 1) => {
    const image: Media = product.media[0] ?? {
      id: 'ph',
      src: '',
      alt: product.title,
      width: 400,
      height: 500,
    };
    const item: CartItem = {
      id: 'ci-' + Math.random().toString(36).slice(2, 8),
      productId: product.id,
      variantId: variant.id,
      quantity,
      addedAt: new Date().toISOString(),
      snapshot: {
        title: product.title,
        optionLabel: variant.optionLabel,
        unitPrice: variant.price,
        image,
        guildName: product.provenance.artisan,
        slug: product.slug,
      },
    };
    dispatch({ type: 'ADD', item });
  }, []);

  const value = useMemo<CartCtx>(
    () => ({
      items: state.items,
      totals: totalsOf(state.items),
      count: state.items.reduce((n, i) => n + i.quantity, 0),
      drawerOpen: state.drawerOpen,
      add,
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      setQuantity: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
      openDrawer: () => dispatch({ type: 'OPEN' }),
      closeDrawer: () => dispatch({ type: 'CLOSE' }),
    }),
    [state, add],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
