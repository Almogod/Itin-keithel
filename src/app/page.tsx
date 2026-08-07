import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Frame } from '@/components/layout/Frame';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Button } from '@/components/primitives/Button';
import { Hairline } from '@/components/primitives/Hairline';
import { ProductCard } from '@/components/patterns/ProductCard';
import { CategoryCard } from '@/components/patterns/CategoryCard';
import { ChapterMarker } from '@/components/patterns/ChapterMarker';
import { Reveal } from '@/components/motion/Reveal';
import { bannersApi, categoriesApi, guildsApi, journalApi, productsApi } from '@/services';
import { ROUTES } from '@/config/routes';
import { formatDate } from '@/lib/format';

export default function HomePage() {
  const hero = bannersApi.bySlot('HOME_HERO')[0];
  const spotlight = guildsApi.spotlight();
  const featured = productsApi.featured(3);
  const journal = journalApi.latest(2);
  const categories = categoriesApi.all().slice(0, 3);

  return (
    <>
      {/* 1. Framed Object Hero */}
      <Section space="xl">
        <Container size="wide">
          <div className="flex flex-col items-center gap-6 mb-12 md:mb-16 text-center">
            <Eyebrow tone="vermilion">Winter 2026 · The Muga Edit</Eyebrow>
            <h1 className="font-display font-normal text-ink text-[clamp(3rem,7vw,6rem)] leading-[1.02] tracking-[-0.02em] max-w-3xl">
              A quiet catalogue of Manipur’s living crafts.
            </h1>
            <p className="text-[1.125rem] text-ink-500 max-w-xl">
              Named by maker. Framed by place. Shipped from Imphal, folded with tissue.
            </p>
          </div>

          <Frame tone="frame" padding="lg" className="mx-auto max-w-4xl">
            <div className="aspect-[4/5] max-h-[640px] mx-auto overflow-hidden bg-canvas rounded-md">
              {hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={hero.media.src} alt={hero.media.alt} className="w-full h-full object-cover" />
              ) : null}
            </div>
            <p className="text-center small-caps text-[0.72rem] text-muted mt-6">
              {hero?.title ?? 'A hand-loomed muga stole'} · {hero?.subtitle}
            </p>
          </Frame>
        </Container>
      </Section>

      {/* 2. Living Craft — full bleed artisan photograph */}
      <Section space="chapter">
        <div className="relative w-full h-[70vh] min-h-[520px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/hands-on-loom/1800/1100"
            alt="Hands passing a fly-shuttle across a warp of muga silk"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/45" />
          <Container size="wide" className="relative h-full flex items-end pb-16 md:pb-24">
            <Reveal>
              <p className="font-display font-light text-canvas text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.15] max-w-3xl">
                “A phanek is not a size — it is a piece with a village, a weaver, a dye, and a season.”
              </p>
              <p className="small-caps text-canvas/80 text-[0.72rem] mt-6">— Rimjhim Konjengbam, Wangkhei</p>
            </Reveal>
          </Container>
        </div>
      </Section>

      {/* 3. Guild Spotlight */}
      <Section space="chapter">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-16 items-center">
            <div className="relative aspect-[3/4] bg-frame rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={spotlight.portrait.src} alt={spotlight.portrait.alt} className="w-full h-full object-cover" />
            </div>
            <div>
              <Eyebrow tone="vermilion">Guild Spotlight</Eyebrow>
              <h2 className="mt-4 font-display font-normal text-ink text-[clamp(2.25rem,5vw,4rem)] leading-[1.08]">
                {spotlight.name}
              </h2>
              <p className="mt-4 text-[0.9375rem] text-muted small-caps tracking-[0.14em]">
                {spotlight.region} · since {spotlight.foundedYear}
              </p>
              <p className="mt-8 text-[1.0625rem] text-ink-700 leading-[1.6] max-w-prose">
                {spotlight.story}
              </p>
              <div className="mt-10">
                <Button as="link" href={ROUTES.GUILD(spotlight.slug)}>
                  Meet the guild
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. The Edit — three curated pieces */}
      <Section space="chapter">
        <Container size="wide">
          <ChapterMarker chapter="The Edit" title="Three Pieces" />
          <Grid cols={3} gap={12} className="mt-16">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} eager />
            ))}
          </Grid>
          <div className="flex justify-center mt-16">
            <Button as="link" href={ROUTES.SHOP} variant="ghost">
              Enter the shop
            </Button>
          </div>
        </Container>
      </Section>

      {/* 5. Craft Journal */}
      <Section space="chapter">
        <Container size="wide">
          <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
            <ChapterMarker chapter="Craft Journal" title="Read First" />
            <Link href={ROUTES.JOURNAL} className="text-[0.9375rem] text-ink underline underline-offset-4 decoration-muted hover:decoration-vermilion">
              All essays →
            </Link>
          </div>
          <Grid cols={2} gap={12}>
            {journal.map((a) => (
              <Link key={a.id} href={ROUTES.JOURNAL_ARTICLE(a.slug)} className="group flex flex-col gap-4">
                <div className="aspect-[3/2] overflow-hidden rounded-lg bg-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.cover.src} alt={a.cover.alt} className="w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]" />
                </div>
                <Eyebrow tone="vermilion">{a.eyebrow}</Eyebrow>
                <h3 className="font-display text-[1.75rem] text-ink leading-tight">{a.title}</h3>
                <p className="text-[1rem] text-ink-700 leading-[1.6] max-w-prose">{a.excerpt}</p>
                <p className="small-caps text-[0.7rem] text-muted">
                  {a.author} · {formatDate(a.publishedAt)} · {a.readMinutes} min
                </p>
              </Link>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 6. Provenance & GI */}
      <Section space="chapter">
        <Container size="editorial">
          <Stack gap={6} align="center" className="text-center">
            <Eyebrow tone="vermilion">Provenance</Eyebrow>
            <h2 className="font-display font-normal text-ink text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15]">
              Every piece names its maker.
            </h2>
            <p className="text-[1.0625rem] text-ink-700 leading-[1.6] max-w-prose">
              We publish the artisan, the village, the fibre, the days on the loom, and — where applicable —
              the Geographical Indication registry code. You can verify each piece with the GI office.
            </p>
            <Hairline vermilion className="w-16 mt-2" />
            <div className="pt-4">
              <Button as="link" href={ROUTES.GI_REGISTRY} variant="ghost">
                See the GI registry
              </Button>
            </div>
          </Stack>
        </Container>
      </Section>

      {/* 7. Categories */}
      <Section space="chapter">
        <Container size="wide">
          <ChapterMarker chapter="Categories" title="By Craft" />
          <Grid cols={3} gap={8} className="mt-16">
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
}
