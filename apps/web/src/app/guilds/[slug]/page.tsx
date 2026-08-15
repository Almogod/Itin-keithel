import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@ik/ui';
import { getGuild, getProducts } from '@ik/services';
import { ROUTES } from '@ik/config';

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
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href={ROUTES.GUILDS} className="hover:text-mono-ink">Guilds</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">{guild.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">
            <div className="aspect-[3/4] bg-mono-line overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={guild.portrait.src} alt={guild.portrait.alt} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-5">
              <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red">
                Guild · since {guild.foundedYear}
              </p>
              <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.5rem)]">
                {guild.name}
              </h1>
              <p className="uppercase tracking-[0.18em] text-[0.7rem] font-medium text-mono-muted">
                {guild.region} · {guild.memberCount} weavers
              </p>
              <p className="text-[1.0625rem] text-mono-ink leading-[1.65] max-w-prose">
                {guild.story}
              </p>
              <ul className="flex flex-wrap gap-2 pt-2">
                {guild.specialisations.map((s) => (
                  <li
                    key={s}
                    className="px-3 py-1.5 border border-mono-ink text-[0.72rem] uppercase tracking-[0.12em] font-semibold text-mono-ink"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="flex items-end justify-between border-b border-mono-ink pb-4 mb-10">
            <h2 className="uppercase tracking-[0.04em] font-sans font-semibold text-mono-ink text-[clamp(1.25rem,2.4vw,1.75rem)]">
              From this guild
            </h2>
            <p className="uppercase tracking-[0.16em] text-[0.72rem] font-semibold text-mono-muted tabular-nums">
              {products.length} pieces
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
