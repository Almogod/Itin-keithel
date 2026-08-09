'use client';

import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';

interface WishlistState {
  ids: string[];
}

type Action =
  | { type: 'ADD'; id: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' };

function reducer(state: WishlistState, a: Action): WishlistState {
  switch (a.type) {
    case 'ADD':
      return state.ids.includes(a.id) ? state : { ids: [...state.ids, a.id] };
    case 'REMOVE':
      return { ids: state.ids.filter((id) => id !== a.id) };
    case 'CLEAR':
      return { ids: [] };
  }
}

interface WishlistCtx {
  ids: string[];
  count: number;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const Ctx = createContext<WishlistCtx | null>(null);

export function useWishlist(): WishlistCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useWishlist must be used inside WishlistProvider');
  return v;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { ids: [] });

  const has = useCallback((id: string) => state.ids.includes(id), [state.ids]);
  const toggle = useCallback(
    (id: string) => dispatch({ type: state.ids.includes(id) ? 'REMOVE' : 'ADD', id }),
    [state.ids],
  );

  const value = useMemo<WishlistCtx>(
    () => ({
      ids: state.ids,
      count: state.ids.length,
      has,
      toggle,
      add: (id) => dispatch({ type: 'ADD', id }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [state.ids, has, toggle],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
