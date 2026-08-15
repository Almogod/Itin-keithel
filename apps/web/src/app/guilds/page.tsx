import Link from 'next/link';
import { GuildCard } from '@ik/ui';
import { getGuilds } from '@ik/services';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Guilds' };

export default async function GuildsPage() {
  const guilds = await getGuilds();
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Guilds</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Named
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.5rem)]">
            The guilds
          </h1>
          <p className="mt-6 text-[1.0625rem] text-mono-muted max-w-2xl leading-[1.55]">
            Every piece we sell belongs to a guild — a group of makers with a village, a technique,
            and a share of what you pay.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {guilds.map((g) => (
              <GuildCard key={g.id} guild={g} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
