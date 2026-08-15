import Link from 'next/link';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Our Story' };

export default function StoryPage() {
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-16 md:py-24">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Story</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Chapter Zero
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[0.98] tracking-[-0.01em] text-mono-ink text-[clamp(2.5rem,6vw,5rem)] max-w-4xl">
            A drive to Ukhrul, and a spreadsheet.
          </h1>
        </div>
      </section>

      <section>
        <div className="relative w-full h-[60vh] min-h-[420px] max-h-[720px] overflow-hidden bg-mono-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/road-to-ukhrul/2000/1200"
            alt="Road to Ukhrul with pine forest"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {[
        {
          chapter: 'I',
          title: 'Nunggbi, 2024',
          body: [
            'We arrived at the potters’ village on a Thursday afternoon. The kilns were cool; the last firing had been on Monday. Ashem Chumthing showed us a kettle he had made from a stone quarried by his cousin. He asked, quietly, whether it was true that his kettles were being sold in Delhi for four times what he received.',
            'We drove back to Imphal that night. By the following weekend, we had a spreadsheet with three columns: artisan, village, share. That spreadsheet is now this shop.',
          ],
        },
        {
          chapter: 'II',
          title: 'Two rules',
          body: [
            'We agreed on two rules at the start. First: never sell a piece without naming its maker. Second: never take a margin the guild does not know about. Every product page publishes both — the maker on the page, the split in the fine print.',
          ],
        },
        {
          chapter: 'III',
          title: 'What we have learnt',
          body: [
            'A phanek takes a month. A ceremonial one takes three. A Longpi pot cannot be made in the monsoon — the stone will not fire. A muga cocoon needs a wild jackfruit tree.',
            'We can’t ship fast. We won’t discount. We won’t hide the maker. What we can do is publish the piece honestly, fold it in tissue, and mail it slowly.',
          ],
        },
      ].map((c) => (
        <section key={c.chapter} className="py-16 md:py-24 border-b border-mono-line">
          <div className="mx-auto w-full max-w-[780px] px-5 md:px-12">
            <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
              Chapter {c.chapter}
            </p>
            <h2 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.01em] text-mono-ink text-[clamp(1.75rem,3.5vw,2.75rem)] mb-8">
              {c.title}
            </h2>
            {c.body.map((p, i) => (
              <p key={i} className="text-[1.0625rem] text-mono-ink leading-[1.7] mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}

      <section className="py-20 md:py-28 bg-mono-ink text-mono-surface">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12 text-center">
          <p className="font-sans font-semibold uppercase text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.15] tracking-[-0.005em]">
            &ldquo;If the maker isn&rsquo;t named on the page, the piece is not for sale.&rdquo;
          </p>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-mono-surface/70 mt-8">
            Rule one
          </p>
        </div>
      </section>
    </div>
  );
}
