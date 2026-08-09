'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@ik/utils';

interface ToastRecord {
  id: string;
  message: string;
  tone: 'default' | 'success' | 'danger';
}

interface ToastCtx {
  push: (message: string, tone?: ToastRecord['tone']) => void;
}

const ctx = createContext<ToastCtx | null>(null);

export function useToast(): ToastCtx {
  const c = useContext(ctx);
  if (!c) throw new Error('useToast must be used inside <ToastProvider>');
  return c;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastRecord[]>([]);

  const push = useCallback((message: string, tone: ToastRecord['tone'] = 'default') => {
    const id = Math.random().toString(36).slice(2, 8);
    setItems((prev) => [...prev.slice(-2), { id, message, tone }]);
    setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), 4000);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ctx.Provider value={value}>
      {children}
      <div className="fixed z-[80] top-4 left-1/2 -translate-x-1/2 md:top-auto md:bottom-6 md:right-6 md:left-auto md:translate-x-0 flex flex-col gap-2 pointer-events-none">
        {items.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cn(
              'pointer-events-auto rounded-md shadow-soft border px-4 py-3 min-w-[260px] max-w-[380px]',
              'bg-canvas animate-[rise_200ms_ease-out]',
              t.tone === 'success' && 'border-action/40',
              t.tone === 'danger' && 'border-danger/40',
              t.tone === 'default' && 'border-ink-100',
            )}
          >
            <p className="text-[0.875rem] text-ink">{t.message}</p>
          </div>
        ))}
      </div>
    </ctx.Provider>
  );
}
