import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Button } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <Section space="chapter">
      <Container size="editorial">
        <Stack gap={6} align="center" className="text-center">
          <Eyebrow tone="vermilion">404</Eyebrow>
          <h1 className="font-display font-normal text-ink text-[clamp(3rem,7vw,6rem)] leading-[1.02]">
            The page is quiet.
          </h1>
          <Hairline vermilion className="w-16 mx-auto" />
          <p className="text-[1.0625rem] text-ink-700 max-w-prose">
            We couldn’t find what you were looking for. Perhaps it was moved to another shelf,
            or perhaps it was never here.
          </p>
          <div className="pt-4 flex gap-3 justify-center">
            <Button as="link" href={ROUTES.HOME}>Return home</Button>
            <Button as="link" href={ROUTES.SHOP} variant="ghost">Browse the shop</Button>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
