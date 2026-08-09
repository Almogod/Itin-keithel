import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Returns & Repairs' };

export default function ReturnsPage() {
  return (
    <Section space="xl">
      <Container size="editorial">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Returns' }]} className="mb-8" />
        <Eyebrow tone="vermilion">Fourteen days, a decade of repair</Eyebrow>
        <h1 className="mt-4 font-display font-normal text-ink text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08]">
          Returns & Repairs
        </h1>

        <Stack gap={8} className="mt-12">
          <section>
            <h2 className="font-display text-[1.5rem] text-ink mb-3">Return window</h2>
            <p className="text-[1rem] text-ink-700 leading-[1.7]">
              Fourteen days from delivery. Piece must be unworn, unwashed, and returned in the
              original packaging with the tissue and cotton label intact.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.5rem] text-ink mb-3">What we cannot accept</h2>
            <ul className="flex flex-col gap-2 text-[1rem] text-ink-700 leading-[1.6]">
              <li>· Custom or ceremonial pieces (marked at checkout).</li>
              <li>· Longpi pottery once it has been oiled.</li>
              <li>· Muga stoles that have been draped or ironed.</li>
              <li>· Pieces beyond the fourteen-day window.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[1.5rem] text-ink mb-3">Refund</h2>
            <p className="text-[1rem] text-ink-700 leading-[1.7]">
              We refund the piece price to the original payment method within seven working days of
              receiving the return. Shipping is not refunded. If the return is due to our error, we
              cover both ways.
            </p>
          </section>

          <Hairline vermilion className="w-16" />

          <section>
            <h2 className="font-display text-[1.5rem] text-ink mb-3">Ten-year repair</h2>
            <p className="text-[1rem] text-ink-700 leading-[1.7]">
              We repair every piece we sell for ten years from the delivery date. This includes:
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-[1rem] text-ink-700 leading-[1.6]">
              <li>· Re-stitching a seam, hem, or border.</li>
              <li>· Re-oiling a Longpi vessel.</li>
              <li>· Re-weaving a Kauna basket panel.</li>
              <li>· Re-tying a muga fringe.</li>
            </ul>
            <p className="mt-4 text-[1rem] text-ink-700 leading-[1.7]">
              You cover the shipping to Imphal. We cover the labour and materials, and the return
              shipping. Please write to us before you send anything.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.5rem] text-ink mb-3">To return a piece</h2>
            <ol className="flex flex-col gap-3 text-[1rem] text-ink-700 leading-[1.7] list-decimal pl-5">
              <li>Write to us at hello@itin-keithel.com with your order code and reason.</li>
              <li>We reply within a working day with a return label and instructions.</li>
              <li>Ship the piece back in the original packaging.</li>
              <li>Once received and checked, we refund within seven working days.</li>
            </ol>
          </section>
        </Stack>
      </Container>
    </Section>
  );
}
