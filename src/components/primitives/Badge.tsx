import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'default' | 'vermilion' | 'green' | 'warn' | 'danger' | 'indigo';

const TONE: Record<Tone, string> = {
  default: 'bg-frame text-ink-700',
  vermilion: 'bg-transparent text-vermilion border border-vermilion/40',
  green: 'bg-transparent text-action border border-action/30',
  warn: 'bg-transparent text-warn border border-warn/30',
  danger: 'bg-transparent text-danger border border-danger/30',
  indigo: 'bg-transparent text-indigo border border-indigo/30',
};

export interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

export function Badge({ children, tone = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-[3px] rounded-sm',
        'text-[0.6875rem] font-medium uppercase tracking-[0.14em] leading-none',
        'font-sans small-caps',
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
