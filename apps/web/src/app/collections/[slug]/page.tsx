import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@ik/ui';
import { getCollection, getProducts } from '@ik/services';
import { ROUTES } from '@ik/config';
import { formatDate } from '@ik/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = await getCollection(slug);
  return { title: c ? c.title : 'Collection' };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) notFound();

  const { items: products } = await getProducts({ collectionSlug: slug, pageSize: 100 });

  return (
    <div className="bg-mono-surface text-mono-ink">
      {/* Full-bleed hero */}
      <section className="relative">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[720px] overflow-hidden bg-mono-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={collection.hero.src}
            alt={collection.hero.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mono-ink/60 via-mono-ink/10 to-transparent" />
          <div className="relative h-full flex items-end pb-14 md:pb-20">
            <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
              <nav className="mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-surface/80">
                  <li>
                    <Link href={ROUTES.HOME} className="hover:text-mono-surface">Home</Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href={ROUTES.COLLECTIONS} className="hover:text-mono-surface">Collections</Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="text-mono-surface">{collection.title}</li>
                </ol>
              </nav>
              <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-mono-surface mb-3">
                {collection.season ? collection.season + ' · ' : ''}
                {products.length} pieces
              </p>
              <h1 className="font-sans font-semibold uppercase leading-[0.98] tracking-[-0.01em] text-mono-surface text-[clamp(2.25rem,5.5vw,4.5rem)] max-w-4xl">
                {collection.title}
              </h1>
              <p className="mt-5 text-[1.0625rem] text-mono-surface/85 max-w-xl leading-[1.5]">
                {collection.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial description */}
      <section className="py-16 md:py-24 border-b border-mono-line">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12">
          <p className="text-[1.125rem] text-mono-ink leading-[1.65]">
            {collection.description}
          </p>
          <p className="uppercase tracking-[0.16em] text-[0.7rem] font-medium text-mono-muted mt-8">
            Published {formatDate(collection.publishedAt)}
          </p>
        </div>
      </section>

      {/* Pieces in this collection */}
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="flex items-end justify-between border-b border-mono-ink pb-4 mb-10">
            <h2 className="uppercase tracking-[0.04em] font-sans font-semibold text-mono-ink text-[clamp(1.25rem,2.4vw,1.75rem)]">
              In this edit
            </h2>
            <p className="uppercase tracking-[0.16em] text-[0.72rem] font-semibold text-mono-muted tabular-nums">
              {products.length} pieces
            </p>
          </div>
          {products.length === 0 ? (
            <p className="text-center text-mono-muted text-[0.9375rem] py-16">
              This collection is being prepared. Please return in a few days.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
