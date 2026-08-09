import Link from 'next/link';
import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Grid } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { ChapterMarker } from '@ik/ui';
import { getCollections } from '@ik/services';
import { ROUTES } from '@ik/config';
import { formatDate } from '@ik/utils';

export const metadata = { title: 'Collections' };

export default async function CollectionsPage() {
  const collections = await getCollections();
  return (
    <Section space="xl">
      <Container size="wide">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Collections' }]} className="mb-8" />
        <ChapterMarker chapter="Edits" title="Collections" />
        <p className="mt-6 text-[1.0625rem] text-ink-700 max-w-prose leading-[1.6]">
          Small, seasonal groupings — each with its own weight, weave, and week.
          Read the tagline, then the piece.
        </p>

        <Grid cols={2} gap={12} className="mt-16">
          {collections.map((c) => (
            <Link
              key={c.id}
              href={ROUTES.COLLECTION(c.slug)}
              className="group flex flex-col gap-5"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.hero.src}
                  alt={c.hero.alt}
                  className="w-full h-full object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Eyebrow tone="vermilion">
                  {c.season ? c.season.toLowerCase() + ' · ' : ''}
                  {c.productIds.length} pieces
                </Eyebrow>
                <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-ink leading-[1.1]">
                  {c.title}
                </h2>
                <p className="text-[1rem] text-ink-700 italic">{c.tagline}</p>
                <p className="small-caps text-[0.7rem] text-muted mt-2">
                  Published {formatDate(c.publishedAt)}
                </p>
              </div>
            </Link>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
