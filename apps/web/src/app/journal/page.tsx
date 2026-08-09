import Link from 'next/link';
import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Grid } from '@ik/ui';
import { ChapterMarker } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { getJournal } from '@ik/services';
import { ROUTES } from '@ik/config';
import { formatDate } from '@ik/utils';

export const metadata = { title: 'Craft Journal' };

export default async function JournalPage() {
  const { items: articles } = await getJournal({ pageSize: 100 });
  return (
    <Section space="xl">
      <Container size="wide">
        <ChapterMarker chapter="Read First" title="Craft Journal" />
        <Grid cols={2} gap={12} className="mt-16">
          {articles.map((a) => (
            <Link key={a.id} href={ROUTES.JOURNAL_ARTICLE(a.slug)} className="group flex flex-col gap-4">
              <div className="aspect-[3/2] overflow-hidden rounded-lg bg-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.cover.src} alt={a.cover.alt} className="w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]" />
              </div>
              <Eyebrow tone="vermilion">{a.eyebrow}</Eyebrow>
              <h3 className="font-display text-[1.75rem] text-ink leading-tight">{a.title}</h3>
              <p className="text-[1rem] text-ink-700 leading-[1.6] max-w-prose">{a.excerpt}</p>
              <p className="small-caps text-[0.7rem] text-muted">
                {a.author} · {formatDate(a.publishedAt)} · {a.readMinutes} min
              </p>
            </Link>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
