import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Gap = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16;

const GAP: Record<Gap, string> = {
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8',
  12: 'gap-12',
  16: 'gap-16',
};

export interface StackProps {
  gap?: Gap;
  as?: ElementType;
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
  children: ReactNode;
}

export function Stack({ gap = 4, as: As = 'div', align = 'stretch', className, children }: StackProps) {
  const alignClass =
    align === 'center' ? 'items-center' : align === 'end' ? 'items-end' : align === 'start' ? 'items-start' : 'items-stretch';
  return (
    <As className={cn('flex flex-col', GAP[gap], alignClass, className)}>
      {children}
    </As>
  );
}
