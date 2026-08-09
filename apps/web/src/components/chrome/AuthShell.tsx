import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Frame } from '@ik/ui';
import { Eyebrow } from '@ik/ui';

export interface AuthShellProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  altLabel: string;
  altHref: string;
  altText: string;
}

export function AuthShell({ eyebrow, title, subtitle, children, altLabel, altHref, altText }: AuthShellProps) {
  return (
    <Section space="xl">
      <Container size="editorial">
        <Frame tone="frame" padding="lg">
          <div className="flex flex-col gap-4 mb-8">
            <Eyebrow tone="vermilion">{eyebrow}</Eyebrow>
            <h1 className="font-display font-normal text-ink text-[clamp(2rem,4vw,3rem)] leading-[1.08]">
              {title}
            </h1>
            {subtitle ? <p className="text-[1rem] text-ink-700 max-w-md">{subtitle}</p> : null}
          </div>
          <div className="flex flex-col gap-4">{children}</div>
          <p className="mt-8 text-[0.875rem] text-muted">
            {altText}{' '}
            <Link href={altHref} className="text-vermilion underline underline-offset-4">
              {altLabel}
            </Link>
          </p>
        </Frame>
      </Container>
    </Section>
  );
}
