import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'frame' | 'indigo' | 'ink' | 'canvas';

const TONE: Record<Tone, string> = {
  frame: 'bg-frame',
  indigo: 'bg-indigo text-canvas',
  ink: 'bg-ink text-canvas',
  canvas: 'bg-canvas',
};

export interface FrameProps {
  tone?: Tone;
  padding?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
}

const PAD = { sm: 'p-6 md:p-8', md: 'p-10 md:p-16', lg: 'p-14 md:p-24' };
const RADIUS = { none: 'rounded-none', md: 'rounded-md', lg: 'rounded-lg' };

export function Frame({ tone = 'frame', padding = 'md', radius = 'lg', className, children }: FrameProps) {
  return (
    <div className={cn('relative', TONE[tone], PAD[padding], RADIUS[radius], className)}>
      {children}
    </div>
  );
}
