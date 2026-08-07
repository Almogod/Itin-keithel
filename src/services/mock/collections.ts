import type { Collection } from '@/types';
import { img } from './_media';

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-winter-muga',
    slug: 'winter-muga',
    title: 'The Muga Edit',
    tagline: 'Wild-silk stoles and scarves — Winter 2026.',
    hero: img('col-muga', 1600, 900, 'Muga silks in a still-life'),
    description:
      'Ten pieces in undyed and madder-dyed muga silk, hand-woven by the Kongba weavers of Imphal Silk House.',
    productIds: ['prod-013', 'prod-014', 'prod-015', 'prod-016', 'prod-024'],
    season: 'WINTER',
    publishedAt: '2026-06-01T00:00:00.000Z',
    isFeatured: true,
  },
];
