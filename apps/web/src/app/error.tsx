'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { ROUTES } from '@ik/config';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-[680px] px-5 md:px-12 flex flex-col items-center gap-6 text-center">
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red">
            500
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[0.98] tracking-[-0.01em] text-mono-ink text-[clamp(2.5rem,6vw,5rem)]">
            Something slipped a stitch.
          </h1>
          <span className="block w-16 h-[2px] bg-brand-red" aria-hidden />
          <p className="text-[1.0625rem] text-mono-ink max-w-xl leading-[1.7]">
            An unexpected error occurred while preparing this page. Our loom has flagged it and
            we&rsquo;ll take a look. Please try again in a moment.
          </p>
          {error.digest ? (
            <p className="uppercase tracking-[0.16em] text-[0.68rem] font-medium text-mono-muted">
              Reference · {error.digest}
            </p>
          ) : null}
          <div className="pt-4 flex gap-3 justify-center flex-wrap">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
            >
              Try again <span aria-hidden>→</span>
            </button>
            <Link
              href={ROUTES.HOME}
              className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 border border-mono-ink text-mono-ink hover:bg-mono-ink hover:text-mono-surface transition-colors"
            >
              Return home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
