import Link from 'next/link';
import { getCategories, getFeaturedProducts, getProducts } from '@ik/services';
import { ROUTES } from '@ik/config';
import { HeroSlider, type HeroSlide } from '@/components/home/HeroSlider';
import { ProductRail } from '@/components/home/ProductRail';

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-1',
    image: {
      src: 'https://picsum.photos/seed/ik-hero-muga/2000/1200',
      alt: 'A hand-loomed muga silk stole draped across a bamboo bench',
    },
    eyebrow: 'Winter 2026 · The Muga Edit',
    title: 'Ten pieces. One guild. One season.',
    subtitle: 'A quiet catalogue of Manipur’s living crafts — shipped from Imphal, folded with tissue.',
    ctaLabel: 'Shop the edit',
    ctaHref: ROUTES.COLLECTION('winter-muga'),
  },
  {
    id: 'hero-2',
    image: {
      src: 'https://picsum.photos/seed/ik-hero-loom/2000/1200',
      alt: 'Hands passing a fly-shuttle across an indigo warp',
    },
    eyebrow: 'Guild Spotlight',
    title: 'Woven by the women of Wangkhei.',
    subtitle: 'Meet the weavers behind every phanek in this season’s edit.',
    ctaLabel: 'Meet the guild',
    ctaHref: ROUTES.GUILDS,
  },
  {
    id: 'hero-3',
    image: {
      src: 'https://picsum.photos/seed/ik-hero-longpi/2000/1200',
      alt: 'A black Longpi pot on a wooden surface',
    },
    eyebrow: 'New Category',
    title: 'Longpi. Fired in bonfires. Polished by hand.',
    subtitle: 'Wheel-less black stone pottery from Ukhrul.',
    ctaLabel: 'Shop Longpi',
    ctaHref: ROUTES.CATEGORY('longpi'),
  },
  {
    id: 'hero-4',
    image: {
      src: 'https://picsum.photos/seed/ik-hero-registry/2000/1200',
      alt: 'A GI-registered stole with its provenance card',
    },
    eyebrow: 'Provenance',
    title: 'Every piece names its maker.',
    subtitle: 'Village, weaver, fibre, days on the loom — verified with the GI registry.',
    ctaLabel: 'See the registry',
    ctaHref: ROUTES.GI_REGISTRY,
  },
];

const CATEGORY_TILES = [
  { slug: 'phanek', title: 'Phanek', seed: 'tile-phanek' },
  { slug: 'longpi', title: 'Longpi', seed: 'tile-longpi' },
  { slug: 'muga', title: 'Muga', seed: 'tile-muga' },
  { slug: 'kauna', title: 'Kauna', seed: 'tile-kauna' },
];

const SERVICES = [
  { title: 'Pan-India delivery', body: 'Free shipping on orders over ₹6,000.' },
  { title: 'Ships from Imphal', body: 'Dispatched within 48 hours of purchase.' },
  { title: 'Verified provenance', body: 'GI-registered pieces with maker details.' },
  { title: 'Secure payment', body: 'All major cards, UPI, and net banking.' },
];

export default async function HomePage() {
  const [restocked, recommends, allCategories] = await Promise.all([
    getProducts({ pageSize: 8, sort: 'newest' }),
    getFeaturedProducts(8),
    getCategories(),
  ]);

  void allCategories;

  return (
    <div className="bg-mono-surface text-mono-ink">
      {/* 1. Hero slider */}
      <HeroSlider slides={HERO_SLIDES} />

      {/* 2. Restocked rail */}
      <ProductRail
        title="Your favourites, restocked"
        products={restocked.items}
        viewAllHref={ROUTES.SHOP}
        badge="RESTOCK"
      />

      {/* 3. Explore — 4 category tiles */}
      <section className="pb-8 md:pb-12">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <h2 className="font-sans font-semibold uppercase tracking-[0.04em] text-mono-ink text-[clamp(1.5rem,3vw,2.25rem)] mb-8 md:mb-10">
            Explore
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {CATEGORY_TILES.map((tile) => (
              <Link
                key={tile.slug}
                href={ROUTES.CATEGORY(tile.slug)}
                className="group relative aspect-[3/4] overflow-hidden bg-mono-line block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${tile.seed}/800/1100`}
                  alt={tile.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-mono-ink/25 group-hover:bg-mono-ink/40 transition-colors" />
                <div className="absolute inset-0 flex items-end p-5 md:p-6">
                  <div className="flex items-center gap-3 text-mono-surface">
                    <span className="uppercase tracking-[0.2em] text-[0.9375rem] font-semibold">
                      Shop {tile.title}
                    </span>
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Recommends rail */}
      <ProductRail
        title="Brkthru recommends"
        products={recommends}
        viewAllHref={ROUTES.SHOP}
        badge="NEW"
      />

      {/* 5. Editorial split — manifesto + image */}
      <section className="py-20 md:py-32 bg-mono-ink text-mono-surface">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <p className="uppercase tracking-[0.3em] text-[0.7rem] font-medium opacity-70 mb-6">
                About
              </p>
              <h2 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.01em] text-[clamp(2rem,5vw,3.75rem)]">
                Itin Keithel isn’t for those who settle. It’s for the ones who care where things come from.
              </h2>
              <p className="mt-8 text-[1.0625rem] leading-[1.6] opacity-85 max-w-lg">
                A quiet marketplace of Manipur’s living crafts — named by maker, framed by place. Every piece
                is traceable to the loom, the village, and the fibre it came from.
              </p>
              <div className="mt-10">
                <Link
                  href={ROUTES.STORY}
                  className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.8125rem] font-semibold px-8 py-4 bg-mono-surface text-mono-ink hover:bg-brand-red hover:text-mono-surface transition-colors"
                >
                  Read the story
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
            <div className="aspect-[4/5] overflow-hidden bg-mono-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/ik-about-loom/1200/1500"
                alt="A weaver at the fly-shuttle loom"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Service strip */}
      <section className="py-14 md:py-16 border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {SERVICES.map((s) => (
              <div key={s.title} className="flex flex-col gap-2">
                <p className="uppercase tracking-[0.14em] text-[0.75rem] font-semibold text-mono-ink">
                  {s.title}
                </p>
                <p className="text-[0.875rem] text-mono-muted leading-[1.5]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12 text-center">
          <p className="uppercase tracking-[0.3em] text-[0.7rem] font-medium text-mono-muted mb-4">
            Newsletter
          </p>
          <h2 className="font-sans font-semibold uppercase leading-[1.05] tracking-[-0.01em] text-mono-ink text-[clamp(1.75rem,4vw,3rem)]">
            First look at every new drop.
          </h2>
          <p className="mt-4 text-[0.9375rem] text-mono-muted">
            Seasonal editions, guild spotlights, and restock notifications. No spam.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 px-4 py-3.5 bg-transparent border border-mono-ink text-mono-ink placeholder:text-mono-muted focus:outline-none focus:border-brand-red"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-mono-ink text-mono-surface uppercase tracking-[0.2em] text-[0.75rem] font-semibold hover:bg-brand-red transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-[0.75rem] text-mono-muted">
            By subscribing, you agree to our{' '}
            <Link href={ROUTES.PRIVACY} className="underline underline-offset-4 hover:text-mono-ink">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
