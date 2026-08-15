import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@ik/utils';

type Variant = 'primary' | 'ghost' | 'text';
type Size = 'sm' | 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold uppercase tracking-[0.18em] ' +
  'transition-[background-color,color,border-color,transform] duration-[200ms] ease-[cubic-bezier(0.2,0,0,1)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-ink focus-visible:ring-offset-2 focus-visible:ring-offset-mono-surface ' +
  'disabled:opacity-40 disabled:cursor-not-allowed select-none';

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-mono-ink text-mono-surface hover:bg-brand-red active:translate-y-[1px]',
  ghost:
    'bg-transparent text-mono-ink border border-mono-ink hover:bg-mono-ink hover:text-mono-surface',
  text:
    'bg-transparent text-mono-ink border-b border-mono-ink pb-0.5 hover:text-brand-red hover:border-brand-red normal-case tracking-[0.14em]',
};

const SIZE: Record<Size, string> = {
  sm: 'text-[0.7rem] px-4 py-2 min-h-[36px]',
  md: 'text-[0.75rem] px-6 py-3.5 min-h-[44px]',
  lg: 'text-[0.8125rem] px-8 py-4 min-h-[52px]',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

type ButtonAsButton = CommonProps & Omit<ComponentProps<'button'>, keyof CommonProps> & { as?: 'button' };
type ButtonAsLink = CommonProps & Omit<ComponentProps<typeof Link>, keyof CommonProps> & { as: 'link'; href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, fullWidth } = props;
  const classes = cn(BASE, VARIANT[variant], SIZE[size], fullWidth && 'w-full', className);

  if (props.as === 'link') {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, fullWidth: _fw, ...rest } = props;
    void _as; void _v; void _s; void _c; void _ch; void _fw;
    return (
      <Link {...rest} className={classes}>
        {children}
      </Link>
    );
  }

  const { as: _as, variant: _v, size: _s, className: _c, children: _ch, fullWidth: _fw, ...rest } = props;
  void _as; void _v; void _s; void _c; void _ch; void _fw;
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}
