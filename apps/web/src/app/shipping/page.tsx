import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Grid } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Shipping' };

export default function ShippingPage() {
  return (
    <Section space="xl">
      <Container size="editorial">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Shipping' }]} className="mb-8" />
        <Eyebrow tone="vermilion">Slow, folded, tracked</Eyebrow>
        <h1 className="mt-4 font-display font-normal text-ink text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08]">
          Shipping
        </h1>
        <p className="mt-6 text-[1.125rem] text-ink-700 leading-[1.7]">
          We ship twice a week from Imphal — Tuesdays and Fridays. Every parcel is packed by hand,
          folded with tissue between the panels, and marked with the artisan&apos;s name.
        </p>

        <Hairline vermilion className="w-16 my-10" />

        <h2 className="font-display text-[1.75rem] text-ink mb-6">Domestic (India)</h2>
        <Grid cols={2} gap={6}>
          <ShipCard title="Standard" body="5 to 7 working days · free above ₹5,000, otherwise ₹150. Tracked with Delhivery." />
          <ShipCard title="Express" body="2 to 3 working days · ₹350. BlueDart priority service." />
          <ShipCard title="Same day (Imphal only)" body="₹150 · within the Imphal municipal area, order by 12:00 IST." />
          <ShipCard title="Cash on delivery" body="Available for orders below ₹15,000. Add ₹80." />
        </Grid>

        <h2 className="font-display text-[1.75rem] text-ink mt-16 mb-6">International</h2>
        <Grid cols={2} gap={6}>
          <ShipCard title="South Asia" body="7 to 10 working days · from ₹1,400. DTDC tracked." />
          <ShipCard title="Rest of world" body="10 to 21 working days · from ₹3,200. DHL tracked. Duties billed to recipient." />
        </Grid>

        <Hairline className="my-12" />

        <Stack gap={6}>
          <h2 className="font-display text-[1.75rem] text-ink">Notes</h2>
          <ul className="flex flex-col gap-3 text-[1rem] text-ink-700 leading-[1.6]">
            <li>· Ceremonial pieces are made to order — please read the piece page for a lead time.</li>
            <li>· We never use plastic mailers. Some parcels arrive with a faint kraft-paper crease. That is the paper, not the piece.</li>
            <li>· For gift orders, we can omit the invoice and tuck in a hand-written note. Ask us at checkout.</li>
          </ul>
        </Stack>
      </Container>
    </Section>
  );
}

function ShipCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-6 border border-ink-100 rounded-lg flex flex-col gap-2">
      <h3 className="font-display text-[1.25rem] text-ink">{title}</h3>
      <p className="text-[0.9375rem] text-ink-700 leading-[1.6]">{body}</p>
    </div>
  );
}
