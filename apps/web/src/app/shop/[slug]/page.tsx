import { notFound } from 'next/navigation';
import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Grid } from '@ik/ui';
import { Frame } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { ChapterMarker } from '@ik/ui';
import { ProvenanceCard } from '@ik/ui';
import { ProductCard } from '@ik/ui';
import { ReviewCard } from '@ik/ui';
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
    <>
      {/* Chapter I — The Object */}
      <Section space="lg">
        <Container size="wide">
          <Breadcrumb
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'Shop', href: ROUTES.SHOP },
              { label: product.title },
            ]}
            className="mb-8"
          />
          <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-12 lg:gap-20 items-start">
            <Gallery media={product.media} />

            <div className="flex flex-col gap-6 md:sticky md:top-24">
              {product.eyebrow ? <Eyebrow tone="vermilion">{product.eyebrow}</Eyebrow> : null}
              <h1 className="font-display font-normal text-ink text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]">
                {product.title}
              </h1>
              <p className="text-[0.9375rem] text-muted italic">
                by <span className="text-ink-700 not-italic">{product.provenance.artisan}</span> ·{' '}
                {product.provenance.village}
              </p>

              <BuyBox product={product} />

              <div className="pt-6 border-t border-ink-100">
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
        </Container>
      </Section>

      {/* Chapter II — The Maker */}
      <Section space="chapter">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">
            <div className="relative aspect-[3/4] bg-frame rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={guild?.portrait.src ?? product.media[0]!.src} alt={guild?.portrait.alt ?? product.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-8">
              <ChapterMarker chapter="Chapter II" title={firstName} />
              <p className="text-[1.0625rem] text-ink-700 leading-[1.6] max-w-prose">
                {product.chapterMaker}
              </p>
              {guild ? (
                <p className="text-[0.9375rem] text-muted italic">
                  Member of {guild.name}, {guild.region}.
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      {/* Chapter III — The Craft */}
      <Section space="chapter">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-12 lg:gap-20 items-start">
            <div className="flex flex-col gap-8">
              <ChapterMarker chapter="Chapter III" title={craftName} />
              <p className="text-[1.0625rem] text-ink-700 leading-[1.6] max-w-prose">
                {product.chapterCraft}
              </p>
              <dl className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <dt className="small-caps text-[0.7rem] text-muted">Fibre</dt>
                  <dd className="text-[1rem] text-ink mt-1">{product.provenance.fibre ?? product.provenance.material}</dd>
                </div>
                <div>
                  <dt className="small-caps text-[0.7rem] text-muted">Days on the loom</dt>
                  <dd className="text-[1rem] text-ink mt-1 tabular-nums">{pad(product.provenance.daysToMake)}</dd>
                </div>
              </dl>
            </div>
            <Frame tone="frame" padding="sm" radius="lg">
              <div className="aspect-[4/3] overflow-hidden rounded-md bg-canvas">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.materialCloseUp?.src ?? product.media[1]!.src} alt={product.materialCloseUp?.alt ?? 'Weave detail'} className="w-full h-full object-cover" />
              </div>
            </Frame>
          </div>
        </Container>
      </Section>

      {/* Chapter IV — Care & Living */}
      <Section space="chapter">
        <Container size="editorial">
          <ChapterMarker chapter="Chapter IV" title="Care" align="center" />
          <ol className="mt-16 flex flex-col gap-8">
            {product.chapterCare.split('. ').filter(Boolean).map((line, i) => (
              <li key={i} className="grid grid-cols-[80px_1fr] gap-8 items-start">
                <span className="font-display font-light text-vermilion text-[3rem] leading-none tabular-nums">
                  {pad(i + 1, 2)}
                </span>
                <p className="text-[1.0625rem] text-ink-700 leading-[1.6]">{line.replace(/\.$/, '')}.</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Reviews */}
      {reviews.length > 0 ? (
        <Section space="lg">
          <Container size="editorial">
            <ChapterMarker chapter="Reviews" title="What owners say" />
            <div className="mt-8">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Related — chrome-free */}
      <Section space="chapter">
        <Container size="wide">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <h2 className="font-display font-normal text-ink text-[clamp(1.5rem,3vw,2.25rem)]">You might also care for</h2>
          </div>
          <Grid cols={4} gap={8}>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
}
