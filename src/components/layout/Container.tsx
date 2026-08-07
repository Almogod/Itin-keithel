import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ContainerSize = 'prose' | 'editorial' | 'content' | 'wide' | 'full';

const SIZE: Record<ContainerSize, string> = {
  prose: 'max-w-[68ch]',
  editorial: 'max-w-[780px]',
  content: 'max-w-[1180px]',
  wide: 'max-w-[1440px]',
  full: 'max-w-none',
};

export interface ContainerProps {
  size?: ContainerSize;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function Container({ size = 'content', as: As = 'div', className, children }: ContainerProps) {
  return (
    <As
      className={cn(
        'mx-auto w-full px-5 md:px-12 lg:px-16 xl:px-[88px]',
        SIZE[size],
        className,
      )}
    >
      {children}
    </As>
  );
}
