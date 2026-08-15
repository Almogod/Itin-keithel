import Link from 'next/link';
import { Accordion } from '@ik/ui';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Questions & Answers' };

const FAQ = [
  {
    heading: 'Orders & shipping',
    items: [
      {
        id: 'ship-time',
        title: 'When will my order ship?',
        content:
          'We ship twice a week from Imphal — usually within five working days of the order. Ceremonial pieces made to order may take three to twelve weeks. We&#39;ll email you the ship date as soon as we know it.',
      },
      {
        id: 'ship-fee',
        title: 'How much is shipping?',
        content:
          'Standard shipping to India is free above ₹5,000 and ₹150 otherwise. Express (2–3 days) is ₹350. International rates are calculated at checkout.',
      },
      {
        id: 'ship-track',
        title: 'How do I track my order?',
        content:
          'When your parcel leaves Imphal, you receive an email with the courier and tracking code. You can also see the timeline under Account · Orders.',
      },
    ],
  },
  {
    heading: 'Returns & repairs',
    items: [
      {
        id: 'return-window',
        title: 'What is the return window?',
        content:
          'Fourteen days from delivery for unused pieces in original packaging. Custom or ceremonial pieces are not returnable. See our returns policy for details.',
      },
      {
        id: 'repair',
        title: 'Do you repair pieces?',
        content:
          'Yes — for a decade after purchase, we offer free stitching, restoration, and Longpi re-oiling. You pay only the shipping to Imphal.',
      },
    ],
  },
  {
    heading: 'The pieces',
    items: [
      {
        id: 'gi',
        title: 'What is a GI code?',
        content:
          'A Geographical Indication (GI) is a legal certification that a craft originates from a defined region. Where a GI exists — Phanek (GI-283), Longpi (GI-118), Kauna (GI-092), Muga (GI-005) — we cite it on the product page and let you verify it in our GI registry.',
      },
      {
        id: 'custom',
        title: 'Do you take custom orders?',
        content:
          'For Phanek and Muga stoles, yes. Please write to us with the piece, colour, and dimensions. Expect twelve weeks on the loom.',
      },
      {
        id: 'care',
        title: 'How do I care for my piece?',
        content:
          'Every product page has a Care chapter written by the maker. In short: hand-wash cold, line-dry in shade, iron on the reverse, fold with tissue.',
      },
    ],
  },
] as const;

export default function FAQPage() {
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Questions</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Questions we hear
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.25rem)]">
            Answers, in short.
          </h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12 flex flex-col gap-12">
          {FAQ.map((group) => (
            <div key={group.heading}>
              <h2 className="uppercase tracking-[0.14em] text-[1rem] font-semibold text-mono-ink border-b border-mono-ink pb-3 mb-4">
                {group.heading}
              </h2>
              <Accordion
                items={group.items.map((i) => ({
                  id: i.id,
                  title: i.title,
                  content: <p dangerouslySetInnerHTML={{ __html: i.content }} />,
                }))}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
