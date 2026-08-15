import Link from 'next/link';
import type { ReactNode } from 'react';

export interface AuthShellProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  altLabel: string;
  altHref: string;
  altText: string;
}

export function AuthShell({ eyebrow, title, subtitle, children, altLabel, altHref, altText }: AuthShellProps) {
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[520px] px-5 md:px-8">
          <div className="border border-mono-ink p-8 md:p-10">
            <div className="flex flex-col gap-4 mb-8">
              <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red">
                {eyebrow}
              </p>
              <h1 className="font-sans font-semibold uppercase leading-[1.05] tracking-[-0.005em] text-mono-ink text-[clamp(1.75rem,3.5vw,2.5rem)]">
                {title}
              </h1>
              {subtitle ? (
                <p className="text-[0.9375rem] text-mono-muted max-w-md leading-[1.55]">{subtitle}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-4">{children}</div>
            <p className="mt-8 text-[0.8125rem] text-mono-muted">
              {altText}{' '}
              <Link
                href={altHref}
                className="uppercase tracking-[0.16em] text-[0.7rem] font-semibold text-mono-ink border-b border-mono-ink hover:text-brand-red hover:border-brand-red"
              >
                {altLabel}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
