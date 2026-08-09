import type { Collection } from '@ik/types';
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
  {
    id: 'col-longpi-table',
    slug: 'longpi-table',
    title: 'The Longpi Table',
    tagline: 'Serving stone from Nunggbi — pots, kettles, and tea cups.',
    hero: img('col-longpi-table', 1600, 900, 'Longpi pottery on a wooden table'),
    description:
      'A quiet still-life for the dinner table: matte black stone pieces from the Nunggbi potters, wheel-less and open-fired.',
    productIds: ['prod-005', 'prod-006', 'prod-007', 'prod-008'],
    season: 'AUTUMN',
    publishedAt: '2026-05-10T00:00:00.000Z',
    isFeatured: false,
  },
  {
    id: 'col-ceremonial-phanek',
    slug: 'ceremonial-phanek',
    title: 'Ceremonial Phanek',
    tagline: 'Silk, madder, and zari — for the days that matter.',
    hero: img('col-ceremonial', 1600, 900, 'Ceremonial phanek with gold border'),
    description:
      'A tight selection of phaneks woven for weddings and festivals — ninety-plus days on the loom, GI-verified.',
    productIds: ['prod-003', 'prod-026'],
    season: 'FESTIVE',
    publishedAt: '2026-04-20T00:00:00.000Z',
    isFeatured: false,
  },
  {
    id: 'col-loktak-kauna',
    slug: 'loktak-kauna',
    title: 'The Loktak Kauna Series',
    tagline: 'Baskets, mats, and cushions from the floating phumdis of Loktak.',
    hero: img('col-kauna', 1600, 900, 'Kauna baskets and mats stacked'),
    description:
      'Woven by the women of Thanga from reeds cut at first light. Each basket takes forty days from cut to finish.',
    productIds: ['prod-009', 'prod-010', 'prod-011', 'prod-012'],
    season: 'MONSOON',
    publishedAt: '2026-06-15T00:00:00.000Z',
    isFeatured: false,
  },
];
