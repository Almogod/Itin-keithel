import Link from 'next/link';
import { getCollections } from '@ik/services';
import { ROUTES } from '@ik/config';
import { formatDate } from '@ik/utils';

export const metadata = { title: 'Collections' };

export default async function CollectionsPage() {
  const collections = await getCollections();
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li>
                <Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Collections</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Seasonal edits
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.5rem)]">
            Collections
          </h1>
          <p className="mt-6 text-[1.0625rem] text-mono-muted max-w-2xl leading-[1.55]">
            Small, seasonal groupings — each with its own weight, weave, and week.
            Read the tagline, then the piece.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {collections.map((c) => (
              <Link
                key={c.id}
                href={ROUTES.COLLECTION(c.slug)}
                className="group flex flex-col gap-5"
              >
                <div className="aspect-[4/3] overflow-hidden bg-mono-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.hero.src}
                    alt={c.hero.alt}
                    className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-brand-red">
                    {c.season ? c.season + ' · ' : ''}
                    {c.productIds.length} pieces
                  </p>
                  <h2 className="font-sans font-semibold uppercase tracking-[-0.005em] text-[clamp(1.5rem,2.8vw,2.25rem)] text-mono-ink leading-[1.05] group-hover:text-brand-red transition-colors">
                    {c.title}
                  </h2>
                  <p className="text-[1rem] text-mono-muted leading-[1.5]">{c.tagline}</p>
                  <p className="uppercase tracking-[0.14em] text-[0.68rem] text-mono-muted mt-2">
                    Published {formatDate(c.publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
