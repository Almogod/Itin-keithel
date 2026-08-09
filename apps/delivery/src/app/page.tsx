import { Container, Section, Stack, Eyebrow, Hairline, Button } from '@ik/ui';

export default function DeliveryHomePage() {
  return (
    <Section space="chapter">
      <Container size="editorial">
        <Stack gap={6} align="center" className="text-center">
          <Eyebrow tone="vermilion">Portal · Delivery</Eyebrow>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-ink">
            Coming soon.
          </h1>
          <Hairline vermilion className="w-16 mx-auto" />
          <p className="text-[1.0625rem] text-ink-700 leading-[1.7] max-w-prose">
            The delivery agent portal will land in a later phase. This workspace is reserved so
            when the team is ready to build, the wiring is already in place.
          </p>
          <p className="small-caps text-[0.72rem] text-muted">
            localhost:3005 · placeholder only
          </p>
          <div className="pt-4">
            <Button as="link" href="http://localhost:3000" variant="ghost">
              Back to the shop
            </Button>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
