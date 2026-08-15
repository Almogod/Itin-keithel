import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProvenanceCard, ProductCard, ReviewCard } from '@ik/ui';
import { Gallery } from '@/features/pdp/Gallery';
import { BuyBox } from '@/features/pdp/BuyBox';
import { GIVerifyButton } from '@/features/pdp/GIVerifyButton';
import { getGuildById, getProduct, getRelatedProducts, getReviewsForProduct } from '@ik/services';
import { ROUTES } from '@ik/config';
import { pad } from '@ik/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product ? product.title : 'Product' };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [guild, related, reviewsPage] = await Promise.all([
    getGuildById(product.guildId),
    getRelatedProducts(product),
    getReviewsForProduct(product.id),
  ]);
  const reviews = reviewsPage.items;
  const firstName = product.provenance.artisan.split(' ')[0] ?? product.provenance.artisan;
  const craftName = product.provenance.craft.split(' ')[0] ?? product.provenance.craft;

  return (
    <div className="bg-mono-surface text-mono-ink">
      {/* Product hero */}
      <section className="py-8 md:py-12">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li>
                <Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={ROUTES.SHOP} className="hover:text-mono-ink">Shop</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink truncate max-w-[200px]">{product.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-10 lg:gap-16 items-start">
            <Gallery media={product.media} />

            <div className="flex flex-col gap-6 md:sticky md:top-24">
              {product.eyebrow ? (
                <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red">
                  {product.eyebrow}
                </p>
              ) : null}
              <h1 className="font-sans font-semibold uppercase leading-[1.05] tracking-[-0.005em] text-mono-ink text-[clamp(1.5rem,3vw,2.25rem)]">
                {product.title}
              </h1>
              <p className="text-[0.875rem] text-mono-muted uppercase tracking-[0.1em]">
                By <span className="text-mono-ink font-medium">{product.provenance.artisan}</span> · {product.provenance.village}
              </p>

              <BuyBox product={product} />

              <div className="pt-6 border-t border-mono-line">
                <ProvenanceCard
                  provenance={product.provenance}
                  verifyAction={
                    product.provenance.giCode && product.provenance.giVerified ? (
                      <GIVerifyButton code={product.provenance.giCode} />
                    ) : null
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter II — The Maker */}
      <section className="py-16 md:py-24 border-t border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">
            <div className="relative aspect-[3/4] bg-mono-line overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={guild?.portrait.src ?? product.media[0]!.src}
                alt={guild?.portrait.alt ?? product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-6">
              <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red">
                Chapter II · The Maker
              </p>
              <h2 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.01em] text-mono-ink text-[clamp(2rem,4vw,3rem)]">
                {firstName}
              </h2>
              <p className="text-[1.0625rem] text-mono-ink leading-[1.65] max-w-prose">
                {product.chapterMaker}
              </p>
              {guild ? (
                <p className="text-[0.875rem] text-mono-muted uppercase tracking-[0.1em]">
                  Member of {guild.name}, {guild.region}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Chapter III — The Craft */}
      <section className="py-16 md:py-24 border-t border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-10 lg:gap-16 items-start">
            <div className="flex flex-col gap-6">
              <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red">
                Chapter III · The Craft
              </p>
              <h2 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.01em] text-mono-ink text-[clamp(2rem,4vw,3rem)]">
                {craftName}
              </h2>
              <p className="text-[1.0625rem] text-mono-ink leading-[1.65] max-w-prose">
                {product.chapterCraft}
              </p>
              <dl className="grid grid-cols-2 gap-6 pt-6 border-t border-mono-line">
                <div>
                  <dt className="uppercase tracking-[0.16em] text-[0.68rem] font-semibold text-mono-muted">Fibre</dt>
                  <dd className="text-[1rem] text-mono-ink mt-1">{product.provenance.fibre ?? product.provenance.material}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-[0.16em] text-[0.68rem] font-semibold text-mono-muted">Days on the loom</dt>
                  <dd className="text-[1rem] text-mono-ink mt-1 tabular-nums">{pad(product.provenance.daysToMake)}</dd>
                </div>
              </dl>
            </div>
            <div className="aspect-[4/3] overflow-hidden bg-mono-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.materialCloseUp?.src ?? product.media[1]!.src}
                alt={product.materialCloseUp?.alt ?? 'Weave detail'}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chapter IV — Care */}
      <section className="py-16 md:py-24 border-t border-mono-line">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
              Chapter IV
            </p>
            <h2 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.01em] text-mono-ink text-[clamp(2rem,4vw,3rem)]">
              Care &amp; living
            </h2>
          </div>
          <ol className="flex flex-col gap-8">
            {product.chapterCare.split('. ').filter(Boolean).map((line, i) => (
              <li key={i} className="grid grid-cols-[80px_1fr] gap-8 items-start border-b border-mono-line pb-8 last:border-none">
                <span className="font-sans font-semibold text-brand-red text-[2.5rem] leading-none tabular-nums">
                  {pad(i + 1, 2)}
                </span>
                <p className="text-[1.0625rem] text-mono-ink leading-[1.65]">
                  {line.replace(/\.$/, '')}.
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 ? (
        <section className="py-16 md:py-24 border-t border-mono-line">
          <div className="mx-auto w-full max-w-[780px] px-5 md:px-12">
            <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
              Reviews
            </p>
            <h2 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.01em] text-mono-ink text-[clamp(1.75rem,3vw,2.25rem)] mb-8">
              What owners say
            </h2>
            <div className="flex flex-col gap-6">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Related */}
      <section className="py-16 md:py-24 border-t border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="flex items-end justify-between border-b border-mono-ink pb-4 mb-10">
            <h2 className="uppercase tracking-[0.04em] font-sans font-semibold text-mono-ink text-[clamp(1.25rem,2.4vw,1.75rem)]">
              You might also care for
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
