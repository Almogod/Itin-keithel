import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ChapterMarker } from '@/components/patterns/ChapterMarker';
import { ProductGrid } from '@/components/patterns/ProductGrid';
import { getProducts } from '@/services';

export const metadata = { title: 'Wishlist' };

export default async function WishlistPage() {
  const { items: products } = await getProducts({ pageSize: 4 });
  return (
    <Section space="xl">
      <Container size="wide">
        <ChapterMarker chapter="Saved" title="Wishlist" />
        <div className="mt-16">
          <ProductGrid products={products} />
        </div>
      </Container>
    </Section>
  );
}
