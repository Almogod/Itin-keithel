import type { ReactNode } from 'react';
import { cn } from '@ik/utils';

type Cols = 1 | 2 | 3 | 4 | 6 | 12;
type Gap = 2 | 4 | 6 | 8 | 12 | 16;

const COLS: Record<Cols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-12',
};

const GAP: Record<Gap, string> = { 2: 'gap-2', 4: 'gap-4', 6: 'gap-6', 8: 'gap-8', 12: 'gap-12', 16: 'gap-16' };

export interface GridProps {
  cols?: Cols;
  gap?: Gap;
  className?: string;
  children: ReactNode;
}

export function Grid({ cols = 3, gap = 8, className, children }: GridProps) {
  return <div className={cn('grid', COLS[cols], GAP[gap], className)}>{children}</div>;
}
