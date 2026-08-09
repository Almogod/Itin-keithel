import { notFound } from 'next/navigation';
import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
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
    <>
      <Section space="lg">
        <Container size="wide">
          <Breadcrumb
            items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'Categories', href: ROUTES.CATEGORIES },
              { label: category.name },
            ]}
            className="mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-12 items-end">
            <div className="relative aspect-[16/9] bg-frame rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={category.hero.src} alt={category.hero.alt} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-6">
              {category.meiteiName ? <Eyebrow tone="vermilion">{category.meiteiName}</Eyebrow> : null}
              <h1 className="font-display font-normal text-ink text-[clamp(2.25rem,5vw,4rem)] leading-[1.08]">
                {category.name}
              </h1>
              <p className="text-[1.0625rem] text-ink-700 leading-[1.6] max-w-prose">
                {category.description}
              </p>
              <Hairline vermilion className="w-16" />
              <p className="small-caps text-[0.72rem] text-muted">{allProducts.length} pieces</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section space="lg">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
            <FilterSidebar guilds={guilds} fibres={fibres} />
            <div>
              <SortBar totalCount={products.length} />
              <ProductGrid products={products} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
