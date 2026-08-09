'use client';

import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@ik/utils';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: ReactNode;
  hint?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, hint, id, className, ...rest },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <label htmlFor={inputId} className={cn('inline-flex items-start gap-3 cursor-pointer select-none group', className)}>
      <span className="relative inline-flex items-center justify-center w-5 h-5 mt-0.5">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className="peer sr-only"
          {...rest}
        />
        <span
          className={cn(
            'w-5 h-5 rounded-sm border border-ink-300 bg-canvas transition-colors',
            'peer-checked:bg-action peer-checked:border-action',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-vermilion peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-canvas',
          )}
        />
        <Check
          size={14}
          strokeWidth={2}
          className={cn(
            'absolute text-canvas opacity-0 transition-opacity',
            'peer-checked:opacity-100',
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
