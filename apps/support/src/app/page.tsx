import { Container, Section, Stack, Eyebrow, Hairline, Button } from '@ik/ui';

export default function SupportHomePage() {
  return (
    <Section space="chapter">
      <Container size="editorial">
        <Stack gap={6}>
          <Eyebrow tone="vermilion">Portal · Support</Eyebrow>
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-ink">
            The care desk.
          </h1>
          <Hairline vermilion className="w-16" />
          <p className="text-[1.0625rem] text-ink-700 leading-[1.7]">
            The support portal — customer lookup, orders, refunds, complaints, tickets, live chat,
            and the knowledge base. Phase 7 fills the shell you see here. For now this proves the
            workspace and the shared UI package are wired.
          </p>
          <p className="small-caps text-[0.72rem] text-muted">
            localhost:3003 · builds from packages/ui &amp; packages/services
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
