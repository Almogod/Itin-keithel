import { notFound } from 'next/navigation';
import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Grid } from '@ik/ui';
import { Frame } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { ChapterMarker } from '@ik/ui';
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
    <>
      {/* Framed hero — signature move: Framed Object Hero */}
      <Section space="lg">
        <Container size="wide">
          <Breadcrumb
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'Collections', href: ROUTES.COLLECTIONS },
              { label: collection.title },
            ]}
            className="mb-8"
          />
          <div className="flex flex-col items-center gap-6 mb-12 text-center">
            <Eyebrow tone="vermilion">
              {collection.season ? collection.season.toLowerCase() + ' · ' : ''}
              {products.length} pieces
            </Eyebrow>
            <h1 className="font-display font-normal text-ink text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] max-w-3xl">
              {collection.title}
            </h1>
            <p className="text-[1.125rem] text-ink-500 italic max-w-xl">{collection.tagline}</p>
          </div>

          <Frame tone="frame" padding="lg" className="mx-auto max-w-4xl">
            <div className="aspect-[16/9] overflow-hidden bg-canvas rounded-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={collection.hero.src}
                alt={collection.hero.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center small-caps text-[0.72rem] text-muted mt-6">
              Published {formatDate(collection.publishedAt)}
            </p>
          </Frame>
        </Container>
      </Section>

      {/* Editorial description */}
      <Section space="md">
        <Container size="editorial">
          <div className="flex flex-col items-center gap-6 text-center">
            <Hairline vermilion className="w-16" />
            <p className="text-[1.125rem] text-ink-700 leading-[1.7] max-w-prose">
              {collection.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* Pieces in this collection */}
      <Section space="chapter">
        <Container size="wide">
          <ChapterMarker chapter="Pieces" title="In this edit" />
          {products.length === 0 ? (
            <p className="mt-16 text-center text-muted text-[0.9375rem]">
              This collection is being prepared. Please return in a few days.
            </p>
          ) : (
            <Grid cols={3} gap={12} className="mt-16">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Grid>
          )}
        </Container>
      </Section>
    </>
  );
}
