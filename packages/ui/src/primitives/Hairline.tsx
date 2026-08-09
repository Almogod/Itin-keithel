import { cn } from '@ik/utils';

export function Hairline({ vermilion = false, className }: { vermilion?: boolean; className?: string }) {
  return <hr className={cn(vermilion ? 'hairline-vermilion' : 'hairline', className)} />;
}
