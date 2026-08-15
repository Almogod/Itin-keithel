import Link from 'next/link';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-[680px] px-5 md:px-12 flex flex-col items-center gap-6 text-center">
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red">
            404
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[0.98] tracking-[-0.01em] text-mono-ink text-[clamp(3rem,7vw,6rem)]">
            The page is quiet.
          </h1>
          <span className="block w-16 h-[2px] bg-brand-red" aria-hidden />
          <p className="text-[1.0625rem] text-mono-ink max-w-xl leading-[1.7]">
            We couldn&rsquo;t find what you were looking for. Perhaps it was moved to another shelf,
            or perhaps it was never here.
          </p>
          <div className="pt-4 flex gap-3 justify-center flex-wrap">
            <Link
              href={ROUTES.HOME}
              className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
            >
              Return home <span aria-hidden>→</span>
            </Link>
            <Link
              href={ROUTES.SHOP}
              className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 border border-mono-ink text-mono-ink hover:bg-mono-ink hover:text-mono-surface transition-colors"
            >
              Browse the shop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
