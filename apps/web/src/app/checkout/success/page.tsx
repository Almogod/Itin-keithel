import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Button } from '@ik/ui';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Order confirmed' };

export default function OrderSuccessPage() {
  return (
    <Section space="chapter">
      <Container size="editorial">
        <Stack gap={6} align="center" className="text-center">
          <Eyebrow tone="vermilion">Order confirmed</Eyebrow>
          <h1 className="font-display font-normal text-ink text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02]">
            Thank you.
          </h1>
          <Hairline vermilion className="w-16 mx-auto" />
          <p className="text-[1.125rem] text-ink-700 max-w-prose leading-[1.6]">
            Your order has been received. We’ll send a confirmation by email, along with a note when the guild
            begins to prepare your piece. Every piece is folded with tissue and packed by hand — we’ll take our time.
          </p>
          <p className="small-caps text-[0.72rem] text-muted mt-4">Order · IK-2026-0500</p>
          <div className="flex gap-3 flex-wrap justify-center mt-4">
            <Button as="link" href={ROUTES.ORDERS}>View my orders</Button>
            <Button as="link" href={ROUTES.SHOP} variant="ghost">Continue browsing</Button>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
