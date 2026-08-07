import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface MarkerProps {
  children: ReactNode;
  eyebrow?: string;
  as?: 'h2' | 'h3' | 'div';
  align?: 'left' | 'center';
  className?: string;
}

export function Marker({ children, eyebrow, as: As = 'h2', align = 'left', className }: MarkerProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  return (
    <div className={cn('flex flex-col gap-6', alignClass, className)}>
      {eyebrow ? (
        <span
          className={cn(
            'text-[0.75rem] uppercase tracking-[0.18em] font-medium text-vermilion',
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <As
        className={cn(
          'font-display font-light text-ink',
          'text-[clamp(4rem,12vw,9rem)] leading-[0.95] tracking-[-0.02em]',
        )}
      >
        {children}
      </As>
      <hr className={cn('hairline-vermilion', align === 'center' ? 'mx-auto w-16' : 'w-16')} />
    </div>
  );
}
