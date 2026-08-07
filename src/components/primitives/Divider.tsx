import { cn } from '@/lib/cn';

type Orientation = 'horizontal' | 'vertical';

export interface DividerProps {
  orientation?: Orientation;
  tone?: 'ink' | 'vermilion' | 'muted';
  className?: string;
}

const TONE = {
  ink: 'bg-ink-100',
  vermilion: 'bg-vermilion',
  muted: 'bg-ink-300/40',
};

export function Divider({ orientation = 'horizontal', tone = 'ink', className }: DividerProps) {
  const base =
    orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full min-h-[1em] self-stretch';
  return <div role="separator" aria-orientation={orientation} className={cn(base, TONE[tone], className)} />;
}
