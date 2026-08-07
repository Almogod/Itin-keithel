'use client';

import { forwardRef, useId } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, hideLabel, id, className, ...rest },
  ref,
) {
  const auto = useId();
  const inputId = id ?? auto;
  const hintId = hint ? inputId + '-hint' : undefined;
  const errId = error ? inputId + '-err' : undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={inputId} className={cn('small-caps text-[0.72rem] text-muted', hideLabel && 'sr-only')}>
        {label}
      </label>
      <textarea
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={cn(hintId, errId)}
        className={cn(
          'bg-canvas border border-ink-300 rounded-md px-3 py-2.5 min-h-[104px]',
          'text-ink text-[0.9375rem] outline-none placeholder:text-ink-300',
          'focus:border-vermilion focus:ring-2 focus:ring-vermilion/20',
          error && 'border-danger focus:border-danger focus:ring-danger/20',
        )}
        {...rest}
      />
      {hint && !error ? <p id={hintId} className="text-[0.75rem] text-muted">{hint}</p> : null}
      {error ? <p id={errId} className="text-[0.75rem] text-danger">{error}</p> : null}
    </div>
  );
});
