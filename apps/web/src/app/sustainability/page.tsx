import Link from 'next/link';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Sustainability' };

const PRACTICES = [
  { title: 'Natural dyes', body: 'Indigo, madder, turmeric, catechu — grown or foraged within 50 km of the loom.' },
  { title: 'No microplastics', body: 'We do not stock polyester, acrylic, or synthetic velvet. Every fibre biodegrades.' },
  { title: 'Recycled packaging', body: 'Kraft paper, jute twine, and cotton-fibre labels. No plastic mailers.' },
  { title: 'Slow shipping', body: 'We consolidate orders and ship twice a week from Imphal — half the freight of on-demand air.' },
  { title: 'Living wages', body: 'Every artisan we work with earns at least 2.5× the state minimum wage per day of work.' },
  { title: 'Long life', body: 'Every piece we sell is repairable. We publish care instructions and offer free stitching for a decade.' },
];

export default function SustainabilityPage() {
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-16 md:py-24">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Sustainability</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            A slower shelf
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[0.98] tracking-[-0.01em] text-mono-ink text-[clamp(2.25rem,5.5vw,4.5rem)] max-w-4xl">
            Made to last decades, not seasons.
          </h1>
          <p className="mt-8 text-[1.0625rem] text-mono-ink leading-[1.6] max-w-2xl">
            We are a small house of six practices. Every piece we publish clears them all before it goes
            on the shelf.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Six
          </p>
          <h2 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.01em] text-mono-ink text-[clamp(1.75rem,3.5vw,2.75rem)] mb-10">
            Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRACTICES.map((p) => (
              <div key={p.title} className="flex flex-col gap-3 border-t border-mono-ink pt-6">
                <h3 className="uppercase tracking-[0.02em] font-sans font-semibold text-[1.125rem] text-mono-ink">
                  {p.title}
                </h3>
                <p className="text-[0.9375rem] text-mono-ink leading-[1.6]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12">
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            What we don&rsquo;t do
          </p>
          <h2 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.01em] text-mono-ink text-[clamp(1.75rem,3.5vw,2.75rem)] mb-8">
            A short list
          </h2>
          <ul className="flex flex-col gap-4 text-[1.0625rem] text-mono-ink leading-[1.6]">
            <li>· No polyester, acrylic, or nylon of any kind.</li>
            <li>· No countdowns, coupons in banners, or wishlist badges.</li>
            <li>· No overnight air freight, ever.</li>
            <li>· No selling a piece without naming the maker.</li>
            <li>· No dyeing above 60&thinsp;°C — every colour on our shelf is natural.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
