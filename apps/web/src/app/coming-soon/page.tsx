import Link from 'next/link';
import { NewsletterForm } from '@/components/chrome/NewsletterForm';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Coming Soon' };

export default function ComingSoonPage() {
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-[680px] px-5 md:px-12 flex flex-col items-center gap-6 text-center">
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red">
            In preparation
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[0.98] tracking-[-0.01em] text-mono-ink text-[clamp(2.5rem,6vw,5rem)]">
            The loom is still warm.
          </h1>
          <span className="block w-16 h-[2px] bg-brand-red" aria-hidden />
          <p className="text-[1.0625rem] text-mono-ink max-w-xl leading-[1.7]">
            This chapter isn&rsquo;t open yet. We&rsquo;re publishing it slowly and by hand — you&rsquo;ll
            see it as soon as it&rsquo;s honest. Leave your email if you&rsquo;d like to be told first,
            or return to the shop.
          </p>
          <div className="pt-6 w-full max-w-md">
            <NewsletterForm />
          </div>
          <Link
            href={ROUTES.HOME}
            className="mt-6 inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 border border-mono-ink text-mono-ink hover:bg-mono-ink hover:text-mono-surface transition-colors"
          >
            Return home
          </Link>
        </div>
      </section>
    </div>
  );
}
