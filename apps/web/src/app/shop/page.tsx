import Link from 'next/link';
import { ProductGrid } from '@ik/ui';
import { FilterSidebar, SortBar } from '@ik/ui';
import { getGuilds, getProducts } from '@ik/services';
import { ROUTES } from '@ik/config';
import { collectFibres, filterAndSortProducts, parseFilterParams } from '@ik/utils';

export const metadata = { title: 'Shop · All Pieces' };

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ShopPage({ searchParams }: Props) {
  const [{ items: allProducts }, guilds, sp] = await Promise.all([
    getProducts({ pageSize: 100 }),
    getGuilds(),
    searchParams,
  ]);
  const q = parseFilterParams(sp);
  const products = filterAndSortProducts(allProducts, q, guilds);
  const fibres = collectFibres(allProducts);

  return (
    <div className="bg-mono-surface text-mono-ink">
      {/* Page header */}
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li>
                <Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Shop</li>
            </ol>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
                The Shop
              </p>
              <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.5rem)]">
                Every piece we make, on one shelf.
              </h1>
            </div>
            <p className="text-[0.9375rem] text-mono-muted md:text-right">
              <span className="tabular-nums text-mono-ink font-semibold">{allProducts.length}</span> pieces from four guilds — each named by maker, framed by place.
            </p>
          </div>
        </div>
      </section>

      {/* Grid + filters */}
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
