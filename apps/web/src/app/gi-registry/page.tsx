import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { getGICertificates } from '@ik/services';
import { ROUTES } from '@ik/config';
import { formatDate } from '@ik/utils';
import { GIVerifyForm } from './GIVerifyForm';

export const metadata = { title: 'GI Registry' };

export default async function GIRegistryPage() {
  const certs = await getGICertificates();

  return (
    <Section space="xl">
      <Container size="editorial">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'GI Registry' }]} className="mb-8" />
        <Eyebrow tone="vermilion">Provenance you can verify</Eyebrow>
        <h1 className="mt-4 font-display font-normal text-ink text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08]">
          GI Registry
        </h1>
        <p className="mt-6 text-[1.0625rem] text-ink-700 leading-[1.7]">
          A Geographical Indication (GI) is a legal certification that a craft belongs to a specific
          region. Every GI-eligible piece on our shelf cites its code. Enter one below to verify.
        </p>
        <Hairline vermilion className="w-16 my-10" />

        <GIVerifyForm />

        <Stack gap={6} className="mt-16">
          <h2 className="font-display text-[1.5rem] text-ink mb-6">Registered crafts we work with</h2>
          <ul className="divide-y divide-ink-100 border-t border-ink-100">
            {certs.map((c) => (
              <li key={c.id} className="py-5 grid grid-cols-[auto_1fr_auto] gap-6 items-baseline">
                <p className="small-caps text-[0.72rem] text-vermilion tabular-nums w-20">{c.code}</p>
                <div>
                  <p className="text-[1rem] text-ink">{c.productName}</p>
                  <p className="text-[0.8125rem] text-muted italic">Issued to {c.issuedTo}</p>
                </div>
                <p className="text-[0.8125rem] text-muted tabular-nums">{formatDate(c.issuedOn)}</p>
              </li>
            ))}
          </ul>
        </Stack>
      </Container>
    </Section>
  );
}
