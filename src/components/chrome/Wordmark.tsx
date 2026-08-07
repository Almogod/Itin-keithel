import Link from 'next/link';
import { cn } from '@/lib/cn';

export function Wordmark({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = { sm: 'text-[1.125rem]', md: 'text-[1.5rem]', lg: 'text-[2.25rem]' }[size];
  return (
    <Link href="/" className={cn('inline-flex items-baseline gap-2 group', className)} aria-label="Itin Keithel">
      <span className={cn('font-display font-normal text-ink tracking-[-0.01em] leading-none', sz)}>
        Itin<span className="text-vermilion italic">·</span>Keithel
      </span>
    </Link>
  );
}
