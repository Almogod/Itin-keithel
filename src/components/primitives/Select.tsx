'use client';

import { forwardRef, useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label: string;
  options: SelectOption[];
  hint?: string;
  error?: string;
  hideLabel?: boolean;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, hint, error, hideLabel, placeholder, id, className, ...rest },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={inputId} className={cn('small-caps text-[0.72rem] text-muted', hideLabel && 'sr-only')}>
        {label}
      </label>
      <div
        className={cn(
          'relative flex items-center bg-canvas border border-ink-300 rounded-md',
          'focus-within:border-vermilion focus-within:ring-2 focus-within:ring-vermilion/20',
          error && 'border-danger',
        )}
      >
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'appearance-none bg-transparent w-full outline-none px-3 py-2.5 pr-9',
            'text-ink text-[0.9375rem]',
          )}
          {...rest}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={16} strokeWidth={1.25} className="absolute right-3 text-muted pointer-events-none" />
      </div>
      {hint && !error ? <p className="text-[0.75rem] text-muted">{hint}</p> : null}
      {error ? <p className="text-[0.75rem] text-danger">{error}</p> : null}
    </div>
  );
});
