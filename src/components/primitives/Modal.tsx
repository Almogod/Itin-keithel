'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useLockBody } from '@/lib/hooks/useLockBody';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import { cn } from '@/lib/cn';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl' };

export function Modal({ open, onClose, title, children, size = 'md', className }: ModalProps) {
  useLockBody(open);
  const panelRef = useFocusTrap<HTMLDivElement>(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-[fade-in_200ms_ease-out]"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'relative w-full bg-canvas rounded-lg shadow-lifted outline-none',
          'animate-[rise_320ms_cubic-bezier(0.2,0,0,1)]',
          SIZE[size],
          className,
        )}
      >
        {title ? (
          <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100">
            <h2 className="font-display text-[1.375rem] text-ink">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-ink-500 hover:text-ink transition-colors"
            >
              <X size={20} strokeWidth={1.25} />
            </button>
          </div>
        ) : null}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
