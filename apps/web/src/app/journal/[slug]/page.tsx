import { notFound } from 'next/navigation';
import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { getJournalArticle } from '@ik/services';
import { formatDate } from '@ik/utils';

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const a = await getJournalArticle(slug);
  return { title: a ? a.title : 'Journal' };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = await getJournalArticle(slug);
  if (!a) notFound();

  return (
    <>
      <Section space="lg">
        <Container size="editorial">
          <Eyebrow tone="vermilion">{a.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-display font-normal text-ink text-[clamp(2.25rem,5vw,4rem)] leading-[1.08]">
            {a.title}
          </h1>
          <p className="mt-4 small-caps text-[0.72rem] text-muted">
            {a.author} · {formatDate(a.publishedAt)} · {a.readMinutes} min
          </p>
          <Hairline vermilion className="w-16 mt-8" />
        </Container>
      </Section>

      <Section space="md">
        <Container size="editorial">
          <div className="aspect-[3/2] overflow-hidden rounded-lg bg-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.cover.src} alt={a.cover.alt} className="w-full h-full object-cover" />
          </div>
        </Container>
      </Section>

      <Section space="lg">
        <Container size="prose">
          <div className="flex flex-col gap-6 text-[1.0625rem] text-ink-700 leading-[1.7]">
            <p className="text-[1.375rem] font-display italic text-ink">{a.excerpt}</p>
            <p>{a.body}</p>
            <p>
              We publish these essays alongside the pieces they describe — so the object earns the page, and the
              maker is named before the buying begins.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
