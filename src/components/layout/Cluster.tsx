import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Gap = 1 | 2 | 3 | 4 | 6 | 8 | 12;
const GAP: Record<Gap, string> = { 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 6: 'gap-6', 8: 'gap-8', 12: 'gap-12' };

export interface ClusterProps {
  gap?: Gap;
  as?: ElementType;
  align?: 'start' | 'center' | 'end' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
  className?: string;
  children: ReactNode;
}

export function Cluster({
  gap = 4,
  as: As = 'div',
  align = 'center',
  justify = 'start',
  wrap = true,
  className,
  children,
}: ClusterProps) {
  const alignClass = { start: 'items-start', center: 'items-center', end: 'items-end', baseline: 'items-baseline' }[align];
  const justifyClass = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between' }[justify];
  return (
    <As className={cn('flex', wrap && 'flex-wrap', GAP[gap], alignClass, justifyClass, className)}>
      {children}
    </As>
  );
}
