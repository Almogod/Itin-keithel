import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Grid } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { ChapterMarker } from '@ik/ui';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Sustainability' };

const PRACTICES = [
  { title: 'Natural dyes', body: 'Indigo, madder, turmeric, catechu — grown or foraged within 50 km of the loom.' },
  { title: 'No microplastics', body: 'We do not stock polyester, acrylic, or synthetic velvet. Every fibre biodegrades.' },
  { title: 'Recycled packaging', body: 'Kraft paper, jute twine, and cotton-fibre labels. No plastic mailers.' },
  { title: 'Slow shipping', body: 'We consolidate orders and ship twice a week from Imphal — half the freight of on-demand air.' },
  { title: 'Living wages', body: 'Every artisan we work with earns at least 2.5× the state minimum wage per day of work.' },
  { title: 'Long life', body: 'Every piece we sell is repairable. We publish care instructions and offer free stitching for a decade.' },
];

export default function SustainabilityPage() {
  return (
    <>
      <Section space="xl">
        <Container size="wide">
          <Breadcrumb
            items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Sustainability' }]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <Eyebrow tone="vermilion">A slower shelf</Eyebrow>
            <h1 className="mt-4 font-display font-normal text-ink text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em]">
              Made to last decades, not seasons.
            </h1>
            <p className="mt-8 text-[1.125rem] text-ink-700 leading-[1.6] max-w-prose">
              We are a small house of six practices. Every piece we publish clears them all before it goes
              on the shelf.
            </p>
          </div>
        </Container>
      </Section>

      <Section space="chapter">
        <Container size="wide">
          <ChapterMarker chapter="Six" title="Practices" />
          <Grid cols={3} gap={8} className="mt-16">
            {PRACTICES.map((p) => (
              <Stack key={p.title} gap={3}>
                <Hairline vermilion className="w-8" />
                <h3 className="font-display text-[1.375rem] text-ink leading-tight">{p.title}</h3>
                <p className="text-[0.9375rem] text-ink-700 leading-[1.6]">{p.body}</p>
              </Stack>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section space="chapter">
        <Container size="editorial">
          <Stack gap={6}>
            <ChapterMarker chapter="What we don&apos;t do" title="A short list" />
            <ul className="mt-4 flex flex-col gap-4 text-[1.0625rem] text-ink-700 leading-[1.6]">
              <li>· No polyester, acrylic, or nylon of any kind.</li>
              <li>· No countdowns, coupons in banners, or wishlist badges.</li>
              <li>· No overnight air freight, ever.</li>
              <li>· No selling a piece without naming the maker.</li>
              <li>· No dyeing above 60&thinsp;°C — every colour on our shelf is natural.</li>
            </ul>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
