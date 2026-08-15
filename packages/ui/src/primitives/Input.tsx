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
          'uppercase tracking-[0.16em] text-[0.68rem] font-semibold text-mono-ink',
          hideLabel && 'sr-only',
        )}
      >
        {label}
      </label>

      <div
        className={cn(
          'group flex items-center gap-2 bg-mono-surface',
          'border border-mono-ink px-3 py-2.5',
          'transition-colors duration-[200ms]',
          'focus-within:border-mono-ink focus-within:outline focus-within:outline-1 focus-within:outline-mono-ink',
          error && 'border-brand-red focus-within:border-brand-red focus-within:outline-brand-red',
        )}
      >
        {leading ? <span className="text-mono-muted">{leading}</span> : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={cn(hintId, errId)}
          className={cn(
            'flex-1 bg-transparent outline-none text-mono-ink text-[0.9375rem]',
            'placeholder:text-mono-muted',
          )}
          {...rest}
        />
        {trailing ? <span className="text-mono-muted">{trailing}</span> : null}
      </div>

      {hint && !error ? (
        <p id={hintId} className="text-[0.72rem] text-mono-muted">{hint}</p>
      ) : null}
      {error ? (
        <p id={errId} className="text-[0.72rem] text-brand-red">{error}</p>
      ) : null}
    </div>
  );
});
