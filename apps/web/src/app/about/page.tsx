import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Grid } from '@ik/ui';
import { Frame } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Button } from '@ik/ui';
import { ChapterMarker } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <>
      <Section space="xl">
        <Container size="wide">
          <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'About' }]} className="mb-8" />
          <div className="max-w-3xl">
            <Eyebrow tone="vermilion">Rooted in Manipur · Woven by Guilds</Eyebrow>
            <h1 className="mt-4 font-display font-normal text-ink text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em]">
              A quiet catalogue, made honestly.
            </h1>
            <p className="mt-8 text-[1.25rem] text-ink-700 leading-[1.6] max-w-prose">
              Itin Keithel is a small house that names its makers, publishes its supply chain,
              and shares its revenue with the guilds. We are three people in Imphal and one in Bangalore.
            </p>
          </div>
        </Container>
      </Section>

      <Section space="chapter">
        <Container size="wide">
          <Frame tone="frame" padding="lg" className="mx-auto max-w-4xl">
            <div className="aspect-[16/9] overflow-hidden bg-canvas rounded-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/imphal-shop/1600/900"
                alt="Interior of the Itin Keithel workspace in Imphal"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center small-caps text-[0.72rem] text-muted mt-6">
              Our workspace · Wangkhei, Imphal East
            </p>
          </Frame>
        </Container>
      </Section>

      <Section space="chapter">
        <Container size="editorial">
          <Stack gap={6}>
            <ChapterMarker chapter="I" title="Why we started" />
            <p className="text-[1.0625rem] text-ink-700 leading-[1.7]">
              In 2024 we watched a Longpi kettle sell online for four times its village price
              with no mention of the potter, the village, or the fibre. The next weekend, we drove
              to Nunggbi. We came back with two things: a promise that no piece we sold would be
              anonymous, and a spreadsheet of every artisan we met.
            </p>
            <p className="text-[1.0625rem] text-ink-700 leading-[1.7]">
              Itin Keithel opened seven months later. Every product page names its maker, every
              purchase pays the guild a direct share, and every craft is certified — where a GI
              exists — with the office in New Delhi.
            </p>
          </Stack>
        </Container>
      </Section>

      <Section space="chapter">
        <Container size="wide">
          <ChapterMarker chapter="II" title="What we practise" />
          <Grid cols={3} gap={8} className="mt-16">
            <Practice title="Name the maker">
              Every piece names its artisan and their village on the product page and on the packing slip.
            </Practice>
            <Practice title="Publish the share">
              We disclose the split between artisan, guild, logistics, and house. See it under the price.
            </Practice>
            <Practice title="Verify the craft">
              Where a Geographical Indication exists, we cite the code and let you verify it with the GI office.
            </Practice>
          </Grid>
        </Container>
      </Section>

      <Section space="chapter">
        <Container size="editorial">
          <Stack gap={6} align="center" className="text-center">
            <Hairline vermilion className="w-16 mx-auto" />
            <p className="font-display italic text-[1.75rem] text-ink leading-[1.3] max-w-prose">
              &ldquo;A phanek is not a size — it is a piece with a village, a weaver, a dye, and a season.&rdquo;
            </p>
            <p className="small-caps text-[0.72rem] text-muted">— Rimjhim Konjengbam, Wangkhei</p>
            <div className="mt-6">
              <Button as="link" href={ROUTES.GUILDS}>Meet the guilds</Button>
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}

function Practice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <Hairline vermilion className="w-8" />
      <h3 className="font-display text-[1.5rem] text-ink leading-tight">{title}</h3>
      <p className="text-[0.9375rem] text-ink-700 leading-[1.6]">{children}</p>
    </div>
  );
}
