import { cn } from '@/lib/cn';

export function Hairline({ vermilion = false, className }: { vermilion?: boolean; className?: string }) {
  return <hr className={cn(vermilion ? 'hairline-vermilion' : 'hairline', className)} />;
}
