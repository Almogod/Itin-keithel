import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface EyebrowProps {
  children: ReactNode;
  tone?: 'muted' | 'vermilion' | 'ink';
  className?: string;
}

const TONE = {
  muted: 'text-muted',
  vermilion: 'text-vermilion',
  ink: 'text-ink',
};

export function Eyebrow({ children, tone = 'muted', className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-block text-[0.75rem] leading-[1.4] uppercase tracking-[0.18em] font-medium',
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
