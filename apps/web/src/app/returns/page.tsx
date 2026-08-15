import Link from 'next/link';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Returns & Repairs' };

export default function ReturnsPage() {
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Returns</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Fourteen days, a decade of repair
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.25rem)]">
            Returns &amp; repairs
          </h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12 flex flex-col gap-10">
          <PolicyBlock title="Return window">
            <p>Fourteen days from delivery. Piece must be unworn, unwashed, and returned in the original packaging with the tissue and cotton label intact.</p>
          </PolicyBlock>

          <PolicyBlock title="What we cannot accept">
            <ul className="flex flex-col gap-2">
              <li>· Custom or ceremonial pieces (marked at checkout).</li>
              <li>· Longpi pottery once it has been oiled.</li>
              <li>· Muga stoles that have been draped or ironed.</li>
              <li>· Pieces beyond the fourteen-day window.</li>
            </ul>
          </PolicyBlock>

          <PolicyBlock title="Refund">
            <p>We refund the piece price to the original payment method within seven working days of receiving the return. Shipping is not refunded. If the return is due to our error, we cover both ways.</p>
          </PolicyBlock>

          <PolicyBlock title="Ten-year repair">
            <p>We repair every piece we sell for ten years from the delivery date. This includes:</p>
            <ul className="mt-3 flex flex-col gap-2">
              <li>· Re-stitching a seam, hem, or border.</li>
              <li>· Re-oiling a Longpi vessel.</li>
              <li>· Re-weaving a Kauna basket panel.</li>
              <li>· Re-tying a muga fringe.</li>
            </ul>
            <p className="mt-4">You cover the shipping to Imphal. We cover the labour and materials, and the return shipping. Please write to us before you send anything.</p>
          </PolicyBlock>

          <PolicyBlock title="To return a piece">
            <ol className="flex flex-col gap-3 list-decimal pl-5">
              <li>Write to us at hello@itin-keithel.com with your order code and reason.</li>
              <li>We reply within a working day with a return label and instructions.</li>
              <li>Ship the piece back in the original packaging.</li>
              <li>Once received and checked, we refund within seven working days.</li>
            </ol>
          </PolicyBlock>
        </div>
      </section>
    </div>
  );
}

function PolicyBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="uppercase tracking-[0.14em] text-[1rem] font-semibold text-mono-ink border-b border-mono-ink pb-3 mb-4">
        {title}
      </h2>
      <div className="text-[1rem] text-mono-ink leading-[1.7]">{children}</div>
    </section>
  );
}
