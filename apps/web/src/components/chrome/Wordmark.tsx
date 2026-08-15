import Link from 'next/link';
import { cn } from '@ik/utils';

export function Wordmark({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = { sm: 'text-[1.05rem]', md: 'text-[1.35rem]', lg: 'text-[1.9rem]' }[size];
  return (
    <Link href="/" className={cn('inline-flex items-baseline gap-1 group', className)} aria-label="Itin Keithel">
      <span className={cn('font-sans font-bold uppercase text-mono-ink tracking-[0.02em] leading-none', sz)}>
        Itin<span className="text-brand-red">·</span>Keithel
      </span>
    </Link>
  );
}
