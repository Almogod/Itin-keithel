import type { ComponentType, SVGProps } from 'react';
import { cn } from '@/lib/cn';

export interface IconProps {
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number }>;
  size?: 14 | 16 | 20 | 24 | 28;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

export function Icon({ icon: I, size = 20, strokeWidth = 1.25, className, label }: IconProps) {
  return (
    <I
      size={size}
      strokeWidth={strokeWidth}
      className={cn('align-middle shrink-0', className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  );
}
