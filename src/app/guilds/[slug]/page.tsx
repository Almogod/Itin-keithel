import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Breadcrumb } from '@/components/primitives/Breadcrumb';
import { ChapterMarker } from '@/components/patterns/ChapterMarker';
import { ProductCard } from '@/components/patterns/ProductCard';
import { getGuild, getProducts } from '@/services';
import { ROUTES } from '@/config/routes';

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const g = await getGuild(slug);
  return { title: g ? g.name : 'Guild' };
}

export default async function GuildPage({ params }: Props) {
  const { slug } = await params;
  const guild = await getGuild(slug);
  if (!guild) notFound();

  const { items: products } = await getProducts({ guildSlug: slug, pageSize: 100 });

  return (
    <>
      <Section space="lg">
        <Container size="wide">
          <Breadcrumb
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'Guilds', href: ROUTES.GUILDS },
              { label: guild.name },
            ]}
            className="mb-8"
          />
          <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 items-start">
            <div className="aspect-[3/4] bg-frame rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={guild.portrait.src} alt={guild.portrait.alt} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-6">
              <Eyebrow tone="vermilion">Guild · since {guild.foundedYear}</Eyebrow>
              <h1 className="font-display font-normal text-ink text-[clamp(2.25rem,5vw,4rem)] leading-[1.08]">
                {guild.name}
              </h1>
              <p className="small-caps text-[0.72rem] text-muted">
                {guild.region} · {guild.memberCount} weavers
              </p>
              <p className="text-[1.0625rem] text-ink-700 leading-[1.6] max-w-prose">
                {guild.story}
              </p>
              <ul className="flex flex-wrap gap-2">
                {guild.specialisations.map((s) => (
                  <li key={s} className="px-3 py-1 rounded-full border border-ink-300 text-[0.8125rem] text-ink-700">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section space="chapter">
        <Container size="wide">
          <ChapterMarker chapter="Pieces" title="From this guild" />
          <Grid cols={3} gap={12} className="mt-16">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
}
