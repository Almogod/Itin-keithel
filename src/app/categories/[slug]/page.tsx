import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Hairline } from '@/components/primitives/Hairline';
import { Breadcrumb } from '@/components/primitives/Breadcrumb';
import { ProductGrid } from '@/components/patterns/ProductGrid';
import { categoriesApi, productsApi } from '@/services';
import { ROUTES } from '@/config/routes';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = categoriesApi.bySlug(slug);
  if (!category) return { title: 'Category' };
  return { title: category.name };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categoriesApi.bySlug(slug);
  if (!category) notFound();

  const products = productsApi.byCategory(category.id);

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
              <p className="small-caps text-[0.72rem] text-muted">{products.length} pieces</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section space="lg">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
            <aside className="hidden lg:flex flex-col gap-8">
              <FilterGroup title="Guild" options={['Wangkhei Weavers', 'Longpi Potters', 'Thanga Reed Weavers', 'Imphal Silk House']} />
              <FilterGroup title="Price" options={['Under ₹5,000', '₹5,000 — ₹10,000', '₹10,000 — ₹20,000', 'Above ₹20,000']} />
              <FilterGroup title="Fibre" options={['Cotton', 'Muga silk', 'Kauna reed', 'Stone']} />
            </aside>
            <div>
              <div className="flex items-center justify-between mb-10">
                <p className="text-[0.875rem] text-muted">{products.length} pieces</p>
                <select className="bg-transparent text-[0.875rem] text-ink border-none focus:outline-none">
                  <option>Recently added</option>
                  <option>Price: low → high</option>
                  <option>Price: high → low</option>
                  <option>By artisan</option>
                </select>
              </div>
              <ProductGrid products={products} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function FilterGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow tone="muted">{title}</Eyebrow>
      <ul className="flex flex-col gap-2">
        {options.map((o) => (
          <li key={o}>
            <label className="inline-flex items-center gap-2 text-[0.9375rem] text-ink cursor-pointer">
              <input type="checkbox" className="accent-action" />
              {o}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
