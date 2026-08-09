import { getProducts } from '@ik/services';
import { WishlistView } from './WishlistView';

export const metadata = { title: 'Wishlist' };

export default async function WishlistPage() {
  const { items: products } = await getProducts({ pageSize: 100 });
  return <WishlistView allProducts={products} />;
}
