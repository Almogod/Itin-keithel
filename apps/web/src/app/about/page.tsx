import Link from 'next/link';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div className="bg-mono-surface text-mono-ink">
      {/* Hero */}
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-16 md:py-24">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">About</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Rooted in Manipur · Woven by guilds
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[0.98] tracking-[-0.01em] text-mono-ink text-[clamp(2.5rem,6vw,5rem)] max-w-4xl">
            A quiet catalogue, made honestly.
          </h1>
          <p className="mt-8 text-[1.125rem] text-mono-ink leading-[1.6] max-w-2xl">
            Itin Keithel is a small house that names its makers, publishes its supply chain,
            and shares its revenue with the guilds. We are three people in Imphal and one in Bangalore.
          </p>
        </div>
      </section>

      {/* Full-bleed workspace image */}
      <section>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[640px] overflow-hidden bg-mono-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/imphal-shop/2000/1000"
            alt="Interior of the Itin Keithel workspace in Imphal"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <p className="text-center uppercase tracking-[0.18em] text-[0.7rem] font-medium text-mono-muted py-4 border-b border-mono-line">
            Our workspace · Wangkhei, Imphal East
          </p>
        </div>
      </section>

      {/* Chapter I */}
      <section className="py-16 md:py-24 border-b border-mono-line">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12">
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Chapter I
          </p>
          <h2 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.01em] text-mono-ink text-[clamp(1.75rem,3.5vw,2.75rem)] mb-6">
            Why we started
          </h2>
          <p className="text-[1.0625rem] text-mono-ink leading-[1.7] mb-4">
            In 2024 we watched a Longpi kettle sell online for four times its village price
            with no mention of the potter, the village, or the fibre. The next weekend, we drove
            to Nunggbi. We came back with two things: a promise that no piece we sold would be
            anonymous, and a spreadsheet of every artisan we met.
          </p>
          <p className="text-[1.0625rem] text-mono-ink leading-[1.7]">
            Itin Keithel opened seven months later. Every product page names its maker, every
            purchase pays the guild a direct share, and every craft is certified — where a GI
            exists — with the office in New Delhi.
          </p>
        </div>
      </section>

      {/* Chapter II */}
      <section className="py-16 md:py-24 border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Chapter II
          </p>
          <h2 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.01em] text-mono-ink text-[clamp(1.75rem,3.5vw,2.75rem)] mb-10">
            What we practise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <Practice title="Name the maker">
              Every piece names its artisan and their village on the product page and on the packing slip.
            </Practice>
            <Practice title="Publish the share">
              We disclose the split between artisan, guild, logistics, and house. See it under the price.
            </Practice>
            <Practice title="Verify the craft">
              Where a Geographical Indication exists, we cite the code and let you verify it with the GI office.
            </Practice>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 md:py-32 bg-mono-ink text-mono-surface">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12 text-center">
          <span className="block w-16 h-[2px] bg-brand-red mx-auto mb-6" aria-hidden />
          <p className="font-sans font-semibold uppercase text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.15] tracking-[-0.005em] max-w-3xl mx-auto">
            &ldquo;A phanek is not a size — it is a piece with a village, a weaver, a dye, and a season.&rdquo;
          </p>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-mono-surface/70 mt-8">
            — Rimjhim Konjengbam, Wangkhei
          </p>
          <Link
            href={ROUTES.GUILDS}
            className="mt-10 inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-surface text-mono-ink hover:bg-brand-red hover:text-mono-surface transition-colors"
          >
            Meet the guilds
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

function Practice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-t border-mono-ink pt-6">
      <h3 className="uppercase tracking-[0.02em] font-sans font-semibold text-[1.25rem] text-mono-ink leading-tight">
        {title}
      </h3>
      <p className="text-[0.9375rem] text-mono-ink leading-[1.6]">{children}</p>
    </div>
  );
}
