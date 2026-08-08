'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useLockBody } from '@/lib/hooks/useLockBody';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import { cn } from '@/lib/cn';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right';
  title?: string;
  children: ReactNode;
  width?: string;
  className?: string;
}

export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  width = 'w-full max-w-[420px]',
  className,
}: DrawerProps) {
  useLockBody(open);
  const panelRef = useFocusTrap<HTMLElement>(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const panelBase = 'absolute top-0 bottom-0 bg-canvas shadow-lifted flex flex-col outline-none';
  const panelSide =
    side === 'right'
      ? 'right-0 animate-[drawer-in-right_320ms_cubic-bezier(0.2,0,0,1)]'
      : 'left-0 animate-[drawer-in-left_320ms_cubic-bezier(0.2,0,0,1)]';

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-[fade-in_200ms_ease-out]" onClick={onClose} />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(panelBase, panelSide, width, className)}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
          <h2 className="font-display text-[1.25rem] text-ink">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-ink-500 hover:text-ink">
            <X size={20} strokeWidth={1.25} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    </div>
  );
}
