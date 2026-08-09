import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
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
    <Section space="xl">
      <Container size="wide">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Shop' }]} className="mb-8" />
        <div className="flex flex-col gap-4 max-w-2xl mb-16">
          <Eyebrow tone="vermilion">The Shop</Eyebrow>
          <h1 className="font-display font-normal text-ink text-[clamp(2.25rem,5vw,4rem)] leading-[1.08]">
            Every piece we make, on one shelf.
          </h1>
          <p className="text-[1.0625rem] text-ink-700 leading-[1.6]">
            {allProducts.length} pieces from four guilds, each named by maker and framed by place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          <FilterSidebar guilds={guilds} fibres={fibres} />
          <div>
            <SortBar totalCount={products.length} />
            <ProductGrid products={products} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
