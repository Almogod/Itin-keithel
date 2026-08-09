import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <Section space="xl">
      <Container size="editorial">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Terms' }]} className="mb-8" />
        <Eyebrow tone="vermilion">Last updated · August 2026</Eyebrow>
        <h1 className="mt-4 font-display font-normal text-ink text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08]">
          Terms of Service
        </h1>
        <Hairline vermilion className="w-16 my-8" />

        <Stack gap={8} className="text-[1rem] text-ink-700 leading-[1.7]">
          <Clause n="1" title="Who we are">
            Itin Keithel is a partnership registered in Manipur, India. Registered office: Wangkhei
            Bazaar, Imphal East, 795005. In these terms, &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to Itin Keithel.
          </Clause>
          <Clause n="2" title="Acceptance">
            By placing an order, you agree to these terms and to our privacy policy. If you do not
            agree, please do not order.
          </Clause>
          <Clause n="3" title="Orders and pricing">
            All prices are in Indian Rupees and include applicable GST. We reserve the right to
            refuse or cancel any order, in which case we refund the full amount within seven working days.
          </Clause>
          <Clause n="4" title="Made pieces">
            Custom and ceremonial pieces are made to order and are non-returnable. Lead times are
            approximate — hand-loomed goods vary with weather, thread quality, and the maker&apos;s health.
          </Clause>
          <Clause n="5" title="Provenance">
            We publish the artisan, village, and (where applicable) GI code for every piece. This
            information is offered in good faith based on records provided by the guild. If you have a
            question about a piece&apos;s provenance, please write to us.
          </Clause>
          <Clause n="6" title="Intellectual property">
            All photography, text, and design on this site are the property of Itin Keithel or the
            respective guilds. You may not reproduce, resell, or use them commercially without permission.
          </Clause>
          <Clause n="7" title="Limitation of liability">
            To the extent permitted by law, we are not liable for indirect or consequential loss.
            Our maximum liability for any single order is the amount you paid for that order.
          </Clause>
          <Clause n="8" title="Governing law">
            These terms are governed by the laws of India. Any dispute is subject to the exclusive
            jurisdiction of the courts of Imphal, Manipur.
          </Clause>
          <Clause n="9" title="Contact">
            Questions about these terms may be sent to hello@itin-keithel.com.
          </Clause>
        </Stack>
      </Container>
    </Section>
  );
}

function Clause({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[1.375rem] text-ink mb-2">
        <span className="text-vermilion tabular-nums mr-3">{n}.</span>
        {title}
      </h2>
      <div className="text-ink-700">{children}</div>
    </section>
  );
}
