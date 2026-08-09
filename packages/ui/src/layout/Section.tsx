import type { ElementType, ReactNode } from 'react';
import { cn } from '@ik/utils';

type SectionSpace = 'sm' | 'md' | 'lg' | 'xl' | 'chapter';

const SPACE: Record<SectionSpace, string> = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-20 md:py-32',
  chapter: 'py-24 md:py-40',
};

export interface SectionProps {
  space?: SectionSpace;
  as?: ElementType;
  className?: string;
  id?: string;
  children: ReactNode;
}

export function Section({ space = 'lg', as: As = 'section', className, id, children }: SectionProps) {
  return (
    <As id={id} className={cn(SPACE[space], className)}>
      {children}
    </As>
  );
}
