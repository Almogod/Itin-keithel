'use client';

import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: ReactNode;
  hint?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, hint, id, className, ...rest },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <label htmlFor={inputId} className={cn('inline-flex items-start gap-3 cursor-pointer select-none', className)}>
      <span className="relative inline-flex items-center justify-center w-5 h-5 mt-0.5">
        <input ref={ref} type="radio" id={inputId} className="peer sr-only" {...rest} />
        <span
          className={cn(
            'w-5 h-5 rounded-full border border-ink-300 bg-canvas transition-colors',
            'peer-checked:border-action',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-vermilion peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-canvas',
          )}
        />
        <span
          className={cn(
            'absolute w-2.5 h-2.5 rounded-full bg-action scale-0 transition-transform',
            'peer-checked:scale-100',
          )}
        />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[0.9375rem] text-ink leading-tight">{label}</span>
        {hint ? <span className="text-[0.75rem] text-muted">{hint}</span> : null}
      </span>
    </label>
  );
});
