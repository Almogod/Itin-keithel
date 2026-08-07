import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Breadcrumb } from '@/components/primitives/Breadcrumb';
import { ProductGrid } from '@/components/patterns/ProductGrid';
import { productsApi } from '@/services';
import { ROUTES } from '@/config/routes';

export const metadata = { title: 'Shop · All Pieces' };

export default function ShopPage() {
  const products = productsApi.all();
  return (
    <Section space="xl">
      <Container size="wide">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Shop' }]} className="mb-8" />
        <div className="flex flex-col gap-4 max-w-2xl">
          <Eyebrow tone="vermilion">The Shop</Eyebrow>
          <h1 className="font-display font-normal text-ink text-[clamp(2.25rem,5vw,4rem)] leading-[1.08]">
            Every piece we make, on one shelf.
          </h1>
          <p className="text-[1.0625rem] text-ink-700 leading-[1.6]">
            {products.length} pieces from four guilds, each named by maker and framed by place.
          </p>
        </div>
        <div className="mt-16">
          <ProductGrid products={products} />
        </div>
      </Container>
    </Section>
  );
}
