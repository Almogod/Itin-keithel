'use client';

import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@ik/utils';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  hint?: string;
  error?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  hideLabel?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leading, trailing, hideLabel, id, className, ...rest },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  const hintId = hint ? inputId + '-hint' : undefined;
  const errId = error ? inputId + '-err' : undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={inputId}
        className={cn(
          'small-caps text-[0.72rem] text-muted',
          hideLabel && 'sr-only',
        )}
      >
        {label}
      </label>

      <div
        className={cn(
          'group flex items-center gap-2 bg-canvas',
          'border border-ink-300 rounded-md px-3 py-2.5',
          'transition-colors duration-[200ms]',
          'focus-within:border-vermilion focus-within:ring-2 focus-within:ring-vermilion/20',
          error && 'border-danger focus-within:border-danger focus-within:ring-danger/20',
        )}
      >
        {leading ? <span className="text-muted">{leading}</span> : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={cn(hintId, errId)}
          className={cn(
            'flex-1 bg-transparent outline-none text-ink text-[0.9375rem]',
            'placeholder:text-ink-300',
          )}
          {...rest}
        />
        {trailing ? <span className="text-muted">{trailing}</span> : null}
      </div>

      {hint && !error ? (
        <p id={hintId} className="text-[0.75rem] text-muted">{hint}</p>
      ) : null}
      {error ? (
        <p id={errId} className="text-[0.75rem] text-danger">{error}</p>
      ) : null}
    </div>
  );
});
