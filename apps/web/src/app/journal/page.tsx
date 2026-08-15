import Link from 'next/link';
import { getJournal } from '@ik/services';
import { ROUTES } from '@ik/config';
import { formatDate } from '@ik/utils';

export const metadata = { title: 'Craft Journal' };

export default async function JournalPage() {
  const { items: articles } = await getJournal({ pageSize: 100 });
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Journal</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Read First
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.5rem)]">
            Craft journal
          </h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {articles.map((a) => (
              <Link key={a.id} href={ROUTES.JOURNAL_ARTICLE(a.slug)} className="group flex flex-col gap-4">
                <div className="aspect-[3/2] overflow-hidden bg-mono-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.cover.src}
                    alt={a.cover.alt}
                    className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-brand-red">
                  {a.eyebrow}
                </p>
                <h3 className="font-sans font-semibold uppercase tracking-[-0.005em] text-[clamp(1.25rem,2.4vw,1.75rem)] text-mono-ink leading-tight group-hover:text-brand-red transition-colors">
                  {a.title}
                </h3>
                <p className="text-[1rem] text-mono-ink leading-[1.6] max-w-prose">{a.excerpt}</p>
                <p className="uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
                  {a.author} · {formatDate(a.publishedAt)} · {a.readMinutes} min
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
