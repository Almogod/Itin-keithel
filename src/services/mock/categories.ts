import type { Category } from '@/types';
import { img } from './_media';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-phanek',
    slug: 'phanek',
    name: 'Phanek',
    meiteiName: 'Meitei Phanek',
    description:
      'The Meitei wrap-cloth, hand-loomed in cotton, silk, or muga. Each phanek carries the border-motif of its weaver’s village.',
    hero: img('phanek-hero', 1600, 900, 'A hand-loomed Meitei phanek in ochre with lozenge border'),
    parentId: null,
    productCount: 8,
  },
  {
    id: 'cat-longpi',
    slug: 'longpi',
    name: 'Longpi',
    meiteiName: 'Loree Hamlei',
    description:
      'The wheel-less black stone pottery of Longpi, Ukhrul — fired in open bonfires, polished by hand until it glows.',
    hero: img('longpi-hero', 1600, 900, 'A black Longpi pot in matte finish beside a cotton cloth'),
    parentId: null,
    productCount: 6,
  },
  {
    id: 'cat-kauna',
    slug: 'kauna',
    name: 'Kauna',
    meiteiName: 'Kauna Reed',
    description:
      'A water-reed of Loktak’s wetlands, woven into mats, baskets, and cushions by the women of Thanga and Ithing.',
    hero: img('kauna-hero', 1600, 900, 'A Kauna reed basket standing on a wooden floor'),
    parentId: null,
    productCount: 5,
  },
  {
    id: 'cat-muga',
    slug: 'muga',
    name: 'Muga',
    meiteiName: 'Muga Silk',
    description:
      'The golden silk of the wild muga moth — spun, dyed with natural indigo, and woven into stoles and scarves.',
    hero: img('muga-hero', 1600, 900, 'A folded muga silk scarf in warm gold'),
    parentId: null,
    productCount: 5,
  },
  {
    id: 'cat-cane',
    slug: 'cane-bamboo',
    name: 'Cane & Bamboo',
    meiteiName: 'Wa · Ree',
    description:
      'Woven cane and bamboo — trays, lamps, and stools — from the hill districts.',
    hero: img('cane-hero', 1600, 900, 'A cane lamp casting soft shadow on a cloth'),
    parentId: null,
    productCount: 4,
  },
  {
    id: 'cat-wood',
    slug: 'wood',
    name: 'Wood',
    meiteiName: 'U Karba',
    description:
      'Turned and carved teak and champak — bowls, spoons, and small ceremonial pieces.',
    hero: img('wood-hero', 1600, 900, 'A turned wooden bowl on a linen cloth'),
    parentId: null,
    productCount: 3,
  },
];

export function findCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
