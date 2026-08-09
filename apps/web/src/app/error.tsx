'use client';

import { useEffect } from 'react';
import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Button } from '@ik/ui';
import { ROUTES } from '@ik/config';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
  }, [error]);

  return (
    <Section space="chapter">
      <Container size="editorial">
        <Stack gap={6} align="center" className="text-center">
          <Eyebrow tone="vermilion">500</Eyebrow>
          <h1 className="font-display font-normal text-ink text-[clamp(3rem,7vw,6rem)] leading-[1.02]">
            Something slipped a stitch.
          </h1>
          <Hairline vermilion className="w-16 mx-auto" />
          <p className="text-[1.0625rem] text-ink-700 max-w-prose">
            An unexpected error occurred while preparing this page. Our loom has flagged it and
            we&apos;ll take a look. Please try again in a moment.
          </p>
          {error.digest ? (
            <p className="small-caps text-[0.7rem] text-muted">Reference · {error.digest}</p>
          ) : null}
          <div className="pt-4 flex gap-3 justify-center flex-wrap">
            <Button onClick={reset}>Try again</Button>
            <Button as="link" href={ROUTES.HOME} variant="ghost">
              Return home
            </Button>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
