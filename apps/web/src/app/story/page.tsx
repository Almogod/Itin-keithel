import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Frame } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { ChapterMarker } from '@ik/ui';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Our Story' };

export default function StoryPage() {
  return (
    <>
      <Section space="xl">
        <Container size="wide">
          <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Story' }]} className="mb-8" />
          <div className="max-w-3xl">
            <Eyebrow tone="vermilion">Chapter Zero</Eyebrow>
            <h1 className="mt-4 font-display font-normal text-ink text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em]">
              A drive to Ukhrul, and a spreadsheet.
            </h1>
          </div>
        </Container>
      </Section>

      <Section space="md">
        <Container size="wide">
          <div className="relative w-full h-[60vh] min-h-[420px] overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/road-to-ukhrul/1800/1100"
              alt="Road to Ukhrul with pine forest"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </Container>
      </Section>

      <Section space="chapter">
        <Container size="editorial">
          <Stack gap={8}>
            <ChapterMarker chapter="I" title="Nunggbi, 2024" />
            <p className="text-[1.125rem] text-ink-700 leading-[1.7]">
              We arrived at the potters&apos; village on a Thursday afternoon. The kilns were cool;
              the last firing had been on Monday. Ashem Chumthing showed us a kettle he had made from
              a stone quarried by his cousin. He asked, quietly, whether it was true that his kettles
              were being sold in Delhi for four times what he received.
            </p>
            <p className="text-[1.125rem] text-ink-700 leading-[1.7]">
              We drove back to Imphal that night. By the following weekend, we had a spreadsheet
              with three columns: <em>artisan</em>, <em>village</em>, <em>share</em>. That spreadsheet
              is now this shop.
            </p>
          </Stack>
        </Container>
      </Section>

      <Section space="chapter">
        <Container size="editorial">
          <Stack gap={8}>
            <ChapterMarker chapter="II" title="Two rules" />
            <p className="text-[1.125rem] text-ink-700 leading-[1.7]">
              We agreed on two rules at the start. First: never sell a piece without naming its maker.
              Second: never take a margin the guild does not know about. Every product page publishes
              both — the maker on the page, the split in the fine print.
            </p>
          </Stack>
        </Container>
      </Section>

      <Section space="chapter">
        <Container size="editorial">
          <Stack gap={8}>
            <ChapterMarker chapter="III" title="What we have learnt" />
            <p className="text-[1.125rem] text-ink-700 leading-[1.7]">
              A phanek takes a month. A ceremonial one takes three. A Longpi pot cannot be made in
              the monsoon — the stone will not fire. A muga cocoon needs a wild jackfruit tree.
            </p>
            <p className="text-[1.125rem] text-ink-700 leading-[1.7]">
              We can&apos;t ship fast. We won&apos;t discount. We won&apos;t hide the maker.
              What we can do is publish the piece honestly, fold it in tissue, and mail it slowly.
            </p>
            <Hairline vermilion className="w-16 mt-4" />
          </Stack>
        </Container>
      </Section>

      <Section space="lg">
        <Container size="editorial">
          <Frame tone="frame" padding="md" radius="md">
            <p className="font-display italic text-[1.5rem] text-ink leading-[1.3] text-center">
              &ldquo;If the maker isn&apos;t named on the page, the piece is not for sale.&rdquo;
            </p>
            <p className="text-center small-caps text-[0.72rem] text-muted mt-6">Rule one</p>
          </Frame>
        </Container>
      </Section>
    </>
  );
}
