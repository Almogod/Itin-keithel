import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJournalArticle } from '@ik/services';
import { formatDate } from '@ik/utils';
import { ROUTES } from '@ik/config';

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
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12 py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href={ROUTES.JOURNAL} className="hover:text-mono-ink">Journal</Link></li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            {a.eyebrow}
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.01em] text-mono-ink text-[clamp(2rem,5vw,3.5rem)]">
            {a.title}
          </h1>
          <p className="mt-6 uppercase tracking-[0.16em] text-[0.7rem] font-medium text-mono-muted">
            {a.author} · {formatDate(a.publishedAt)} · {a.readMinutes} min
          </p>
        </div>
      </section>

      <section>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[640px] overflow-hidden bg-mono-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.cover.src} alt={a.cover.alt} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[680px] px-5 md:px-12">
          <p className="uppercase tracking-[0.02em] font-sans font-semibold text-[1.375rem] text-mono-ink leading-tight mb-8 border-l-4 border-brand-red pl-5">
            {a.excerpt}
          </p>
          <div className="flex flex-col gap-6 text-[1.0625rem] text-mono-ink leading-[1.75]">
            <p>{a.body}</p>
            <p>
              We publish these essays alongside the pieces they describe — so the object earns the page, and the
              maker is named before the buying begins.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
