import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface MetaRow {
  label: string;
  value: ReactNode;
}

export interface MetaTableProps {
  rows: MetaRow[];
  className?: string;
}

export function MetaTable({ rows, className }: MetaTableProps) {
  return (
    <dl className={cn('w-full', className)}>
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={cn(
            'grid grid-cols-[minmax(96px,140px)_1fr] gap-6 py-3',
            i > 0 && 'border-t border-ink-100',
          )}
        >
          <dt className="small-caps text-[0.7rem] text-muted">{row.label}</dt>
          <dd className="text-right text-ink font-sans text-[0.9375rem] tabular-nums">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
