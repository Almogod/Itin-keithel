import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Button } from '@ik/ui';
import { NewsletterForm } from '@/components/chrome/NewsletterForm';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Coming Soon' };

export default function ComingSoonPage() {
  return (
    <Section space="chapter">
      <Container size="editorial">
        <Stack gap={6} align="center" className="text-center">
          <Eyebrow tone="vermilion">In preparation</Eyebrow>
          <h1 className="font-display font-normal text-ink text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em]">
            The loom is still warm.
          </h1>
          <Hairline vermilion className="w-16 mx-auto" />
          <p className="text-[1.0625rem] text-ink-700 max-w-prose leading-[1.7]">
            This chapter isn&apos;t open yet. We&apos;re publishing it slowly and by hand — you&apos;ll
            see it as soon as it&apos;s honest. Leave your email if you&apos;d like to be told first,
            or return to the shop.
          </p>
          <div className="pt-6 w-full max-w-md">
            <NewsletterForm />
          </div>
          <div className="pt-6">
            <Button as="link" href={ROUTES.HOME} variant="ghost">
              Return home
            </Button>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
