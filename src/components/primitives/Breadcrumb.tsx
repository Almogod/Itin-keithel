import Link from 'next/link';
import { Fragment } from 'react';
import { cn } from '@/lib/cn';

export interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-[0.8125rem] text-muted', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={c.label + i}>
              <li>
                {c.href && !isLast ? (
                  <Link href={c.href} className="text-ink-500 hover:text-vermilion transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className={cn(isLast ? 'text-muted' : 'text-ink-500')}>{c.label}</span>
                )}
              </li>
              {!isLast ? <li aria-hidden="true" className="text-ink-300">·</li> : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
