import { cn } from '@/lib/cn';

export interface SkeletonProps {
  className?: string;
  radius?: 'sm' | 'md' | 'lg' | 'full';
}

const RADIUS = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export function Skeleton({ className, radius = 'md' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden bg-frame',
        RADIUS[radius],
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-[linear-gradient(90deg,transparent,rgba(247,244,238,0.7),transparent)]',
        'before:animate-[shimmer_1.6s_infinite]',
        className,
      )}
    />
  );
}
