'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useLockBody } from '@ik/hooks';
import { useFocusTrap } from '@ik/hooks';
import { cn } from '@ik/utils';

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

  const panelBase = 'absolute top-0 bottom-0 bg-mono-surface shadow-lifted flex flex-col outline-none';
  const panelSide =
    side === 'right'
      ? 'right-0 animate-[drawer-in-right_320ms_cubic-bezier(0.2,0,0,1)]'
      : 'left-0 animate-[drawer-in-left_320ms_cubic-bezier(0.2,0,0,1)]';

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-mono-ink/50 backdrop-blur-sm animate-[fade-in_200ms_ease-out]" onClick={onClose} />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(panelBase, panelSide, width, className)}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-mono-line">
          <h2 className="uppercase tracking-[0.16em] text-[0.8rem] font-semibold text-mono-ink">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-mono-muted hover:text-mono-ink">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    </div>
  );
}
