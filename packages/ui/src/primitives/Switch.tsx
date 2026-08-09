'use client';

import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@ik/utils';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: string;
  hideLabel?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, hideLabel, id, className, ...rest },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <label htmlFor={inputId} className={cn('inline-flex items-center gap-3 cursor-pointer', className)}>
      <span className="relative inline-flex">
        <input ref={ref} type="checkbox" role="switch" id={inputId} className="peer sr-only" {...rest} />
        <span
          className={cn(
            'w-10 h-6 rounded-full bg-ink-300 transition-colors',
            'peer-checked:bg-action',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-vermilion peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-canvas',
          )}
        />
        <span
          className={cn(
            'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-canvas',
            'transition-transform peer-checked:translate-x-4',
          )}
        />
      </span>
      <span className={cn('text-[0.9375rem] text-ink', hideLabel && 'sr-only')}>{label}</span>
    </label>
  );
});
