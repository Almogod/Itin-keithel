import Link from 'next/link';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Order confirmed' };

export default function OrderSuccessPage() {
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12 flex flex-col items-center gap-6 text-center">
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red">
            Order confirmed
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[0.98] tracking-[-0.01em] text-mono-ink text-[clamp(2.5rem,6vw,4.5rem)]">
            Thank you.
          </h1>
          <span className="block w-16 h-[2px] bg-brand-red" aria-hidden />
          <p className="text-[1.0625rem] text-mono-ink max-w-xl leading-[1.65]">
            Your order has been received. We&rsquo;ll send a confirmation by email, along with a note when
            the guild begins to prepare your piece. Every piece is folded with tissue and packed by hand
            — we&rsquo;ll take our time.
          </p>
          <p className="uppercase tracking-[0.18em] text-[0.72rem] font-medium text-mono-muted mt-2">
            Order · IK-2026-0500
          </p>
          <div className="flex gap-3 flex-wrap justify-center mt-4">
            <Link
              href={ROUTES.ORDERS}
              className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
            >
              View my orders <span aria-hidden>→</span>
            </Link>
            <Link
              href={ROUTES.SHOP}
              className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 border border-mono-ink text-mono-ink hover:bg-mono-ink hover:text-mono-surface transition-colors"
            >
              Continue browsing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
