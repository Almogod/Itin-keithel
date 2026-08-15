import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGrid } from '@ik/ui';
import { FilterSidebar, SortBar } from '@ik/ui';
import { getCategory, getGuilds, getProducts } from '@ik/services';
import { ROUTES } from '@ik/config';
import { collectFibres, filterAndSortProducts, parseFilterParams } from '@ik/utils';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: 'Category' };
  return { title: category.name };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const [{ items: allProducts }, guilds, sp] = await Promise.all([
    getProducts({ categorySlug: slug, pageSize: 100 }),
    getGuilds(),
    searchParams,
  ]);
  const q = parseFilterParams(sp);
  const products = filterAndSortProducts(allProducts, q, guilds);
  const fibres = collectFibres(allProducts);

  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="relative">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] max-h-[560px] overflow-hidden bg-mono-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={category.hero.src}
            alt={category.hero.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mono-ink/60 via-mono-ink/10 to-transparent" />
          <div className="relative h-full flex items-end pb-12 md:pb-16">
            <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
              <nav className="mb-5" aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-surface/80">
                  <li>
                    <Link href={ROUTES.HOME} className="hover:text-mono-surface">Home</Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href={ROUTES.CATEGORIES} className="hover:text-mono-surface">Categories</Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li className="text-mono-surface">{category.name}</li>
                </ol>
              </nav>
              {category.meiteiName ? (
                <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-mono-surface mb-3 opacity-90">
                  {category.meiteiName}
                </p>
              ) : null}
              <h1 className="font-sans font-semibold uppercase leading-[0.98] tracking-[-0.01em] text-mono-surface text-[clamp(2.25rem,5.5vw,4.5rem)]">
                {category.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-b border-mono-line">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12">
          <p className="text-[1.0625rem] text-mono-ink leading-[1.65]">
            {category.description}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 md:gap-14">
            <FilterSidebar guilds={guilds} fibres={fibres} />
            <div>
              <SortBar totalCount={products.length} />
              <ProductGrid products={products} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
