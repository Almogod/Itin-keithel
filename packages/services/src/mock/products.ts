import type { Product } from '@ik/types';
import { img } from './_media';

const now = '2026-08-07T00:00:00.000Z';

function make(
  i: number,
  slug: string,
  title: string,
  category: string,
  categoryId: string,
  guildId: string,
  provenance: Product['provenance'],
  price: number,
  eyebrow: string,
): Product {
  const media = [
    img('prod-' + slug + '-1', 900, 1125, title + ' — front'),
    img('prod-' + slug + '-2', 900, 1125, title + ' — detail'),
    img('prod-' + slug + '-3', 900, 1125, title + ' — draped'),
    img('prod-' + slug + '-4', 900, 1125, title + ' — folded'),
  ];
  return {
    id: 'prod-' + String(i).padStart(3, '0'),
    slug,
    title,
    subtitle: category,
    eyebrow,
    description:
      'Woven by ' +
      provenance.artisan +
      ' in ' +
      provenance.village +
      '. ' +
      provenance.daysToMake +
      ' days on the loom.',
    chapterMaker:
      provenance.artisan +
      ' inherited the loom from her mother in 1998. She still dyes her yarn in a copper vat behind her house, using indigo grown in her garden.',
    chapterCraft:
      'The ' +
      provenance.craft +
      ' is set on a fly-shuttle loom. The weft is passed by hand across a warp of ' +
      (provenance.fibre ?? 'natural fibre') +
      ' in a rhythm handed down through five generations.',
    chapterCare:
      'Wash by hand in cold water with a mild soap. Line-dry in shade. Iron on the reverse. Fold with tissue between the panels.',
    highlights: [
      'Hand-loomed on a fly-shuttle loom',
      'Naturally dyed with plant indigo',
      'Village of origin verified by GI',
    ],
    categoryIds: [categoryId],
    primaryCategoryId: categoryId,
    guildId,
    media,
    materialCloseUp: img('mat-' + slug, 1200, 800, 'Close-up of the weave'),
    price,
    currency: 'INR',
    rating: { average: 4.7, count: 24 + (i % 40) },
    stock: 4 + (i % 5),
    status: 'ACTIVE',
    variants: [
      {
        id: 'var-' + slug + '-a',
        sku: 'IK-' + slug.toUpperCase() + '-A',
        optionLabel: 'One size',
        options: { size: 'One size' },
        price,
        stock: 4 + (i % 5),
      },
    ],
    provenance,
    tags: ['handloom', 'natural dye'],
    collectionIds: i % 4 === 0 ? ['col-winter-muga'] : [],
    createdAt: now,
    updatedAt: now,
  };
}

const P: Array<Omit<Parameters<typeof make>[0] extends number ? never : never, never>> = [];
void P;

const rows: Array<[string, string, string, string, string, Product['provenance'], number, string]> = [
  ['meitei-phanek-ochre', 'Meitei Phanek in Ochre', 'Phanek', 'cat-phanek', 'guild-wangkhei', {
    artisan: 'Rimjhim Konjengbam', village: 'Wangkhei, Imphal East', craft: 'Meitei Phanek', fibre: 'Cotton · plant indigo', daysToMake: 47, year: 2026, giCode: 'GI-283', giVerified: true,
  }, 780000, 'Winter 2026 · Wangkhei'],
  ['meitei-phanek-indigo', 'Meitei Phanek in Deep Indigo', 'Phanek', 'cat-phanek', 'guild-wangkhei', {
    artisan: 'Sanahal Devi', village: 'Wangkhei, Imphal East', craft: 'Meitei Phanek', fibre: 'Cotton · natural indigo', daysToMake: 54, year: 2026, giCode: 'GI-283', giVerified: true,
  }, 820000, 'Winter 2026'],
  ['phanek-mayek-naibi', 'Phanek Mayek Naibi', 'Phanek', 'cat-phanek', 'guild-wangkhei', {
    artisan: 'Ibemcha', village: 'Kongba, Imphal East', craft: 'Ceremonial Phanek', fibre: 'Muga silk · madder', daysToMake: 92, year: 2025, giCode: 'GI-283', giVerified: true,
  }, 1450000, 'Ceremonial'],
  ['phanek-madder-stripe', 'Phanek in Madder Stripe', 'Phanek', 'cat-phanek', 'guild-wangkhei', {
    artisan: 'Rimjhim Konjengbam', village: 'Wangkhei, Imphal East', craft: 'Meitei Phanek', fibre: 'Cotton · madder', daysToMake: 39, year: 2026,
  }, 690000, 'Everyday'],
  ['longpi-serving-pot', 'Longpi Serving Pot', 'Longpi', 'cat-longpi', 'guild-longpi', {
    artisan: 'Ashem Chumthing', village: 'Nunggbi, Ukhrul', craft: 'Longpi Pottery', material: 'Serpentine stone · clay', daysToMake: 21, year: 2026, giCode: 'GI-118', giVerified: true,
  }, 340000, 'Kitchen'],
  ['longpi-kettle', 'Longpi Water Kettle', 'Longpi', 'cat-longpi', 'guild-longpi', {
    artisan: 'Somi Kasar', village: 'Nunggbi, Ukhrul', craft: 'Longpi Pottery', material: 'Serpentine stone', daysToMake: 26, year: 2026, giCode: 'GI-118', giVerified: true,
  }, 420000, 'Everyday ritual'],
  ['longpi-tea-cups', 'Longpi Tea Cups (Set of Four)', 'Longpi', 'cat-longpi', 'guild-longpi', {
    artisan: 'Ningthou Yaikhom', village: 'Nunggbi, Ukhrul', craft: 'Longpi Pottery', material: 'Serpentine stone', daysToMake: 18, year: 2026,
  }, 280000, 'Set'],
  ['longpi-bowl-set', 'Longpi Bowl Set', 'Longpi', 'cat-longpi', 'guild-longpi', {
    artisan: 'Ashem Chumthing', village: 'Nunggbi, Ukhrul', craft: 'Longpi Pottery', material: 'Serpentine stone', daysToMake: 22, year: 2026,
  }, 380000, 'Kitchen'],
  ['kauna-round-basket', 'Kauna Round Basket', 'Kauna', 'cat-kauna', 'guild-thanga', {
    artisan: 'Ibetombi Devi', village: 'Thanga, Bishnupur', craft: 'Kauna Weaving', material: 'Kauna reed', daysToMake: 12, year: 2026, giCode: 'GI-092', giVerified: true,
  }, 145000, 'Home'],
  ['kauna-floor-mat', 'Kauna Floor Mat', 'Kauna', 'cat-kauna', 'guild-thanga', {
    artisan: 'Thoi Yumkhaibam', village: 'Thanga, Bishnupur', craft: 'Kauna Weaving', material: 'Kauna reed · cotton', daysToMake: 34, year: 2026,
  }, 260000, 'Home'],
  ['kauna-cushion-cover', 'Kauna Cushion Cover', 'Kauna', 'cat-kauna', 'guild-thanga', {
    artisan: 'Bimola Devi', village: 'Ithing, Bishnupur', craft: 'Kauna Weaving', material: 'Kauna reed', daysToMake: 9, year: 2026,
  }, 95000, 'Living'],
  ['kauna-bread-tray', 'Kauna Bread Tray', 'Kauna', 'cat-kauna', 'guild-thanga', {
    artisan: 'Ibetombi Devi', village: 'Thanga, Bishnupur', craft: 'Kauna Weaving', material: 'Kauna reed', daysToMake: 8, year: 2026,
  }, 78000, 'Kitchen'],
  ['muga-stole-natural', 'Muga Stole, Natural Gold', 'Muga', 'cat-muga', 'guild-imphal-silk', {
    artisan: 'Yumnam Ibetombi', village: 'Kongba, Imphal East', craft: 'Muga Silk Weaving', fibre: 'Muga silk (undyed)', daysToMake: 28, year: 2026, giCode: 'GI-005', giVerified: true,
  }, 640000, 'The Muga Edit'],
  ['muga-scarf-madder', 'Muga Scarf in Madder', 'Muga', 'cat-muga', 'guild-imphal-silk', {
    artisan: 'Yumnam Ibetombi', village: 'Kongba, Imphal East', craft: 'Muga Silk Weaving', fibre: 'Muga silk · madder', daysToMake: 32, year: 2026, giCode: 'GI-005', giVerified: true,
  }, 720000, 'The Muga Edit'],
  ['muga-runner', 'Muga Table Runner', 'Muga', 'cat-muga', 'guild-imphal-silk', {
    artisan: 'Ojasvi Devi', village: 'Kongba, Imphal East', craft: 'Muga Silk Weaving', fibre: 'Muga silk · cotton', daysToMake: 41, year: 2026,
  }, 890000, 'The Table'],
  ['muga-shawl-plain', 'Muga Shawl, Plain Weave', 'Muga', 'cat-muga', 'guild-imphal-silk', {
    artisan: 'Yumnam Ibetombi', village: 'Kongba, Imphal East', craft: 'Muga Silk Weaving', fibre: 'Muga silk', daysToMake: 36, year: 2026,
  }, 980000, 'Winter'],
  ['cane-lamp-tall', 'Cane Lamp, Tall', 'Cane', 'cat-cane', 'guild-thanga', {
    artisan: 'Rajen Meetei', village: 'Sekmai, Imphal West', craft: 'Cane Weaving', material: 'Cane · brass', daysToMake: 15, year: 2026,
  }, 320000, 'Living'],
  ['cane-tray-oval', 'Cane Tray, Oval', 'Cane', 'cat-cane', 'guild-thanga', {
    artisan: 'Rajen Meetei', village: 'Sekmai, Imphal West', craft: 'Cane Weaving', material: 'Cane', daysToMake: 7, year: 2026,
  }, 115000, 'Serving'],
  ['bamboo-stool-low', 'Bamboo Low Stool', 'Bamboo', 'cat-cane', 'guild-thanga', {
    artisan: 'Chandan Singh', village: 'Kakching, Imphal', craft: 'Bamboo Joinery', material: 'Bamboo', daysToMake: 11, year: 2026,
  }, 220000, 'Furniture'],
  ['bamboo-lamp-cluster', 'Bamboo Cluster Lamp', 'Bamboo', 'cat-cane', 'guild-thanga', {
    artisan: 'Chandan Singh', village: 'Kakching, Imphal', craft: 'Bamboo Joinery', material: 'Bamboo · linen', daysToMake: 14, year: 2026,
  }, 385000, 'Living'],
  ['wood-champak-bowl', 'Champak Wood Bowl', 'Wood', 'cat-wood', 'guild-longpi', {
    artisan: 'Priyokumar Singh', village: 'Andro, Imphal East', craft: 'Wood Turning', material: 'Champak', daysToMake: 6, year: 2026,
  }, 175000, 'The Table'],
  ['wood-serving-spoons', 'Serving Spoons (Pair)', 'Wood', 'cat-wood', 'guild-longpi', {
    artisan: 'Priyokumar Singh', village: 'Andro, Imphal East', craft: 'Wood Turning', material: 'Teak', daysToMake: 4, year: 2026,
  }, 95000, 'Kitchen'],
  ['wood-hair-comb', 'Hand-Carved Hair Comb', 'Wood', 'cat-wood', 'guild-longpi', {
    artisan: 'Priyokumar Singh', village: 'Andro, Imphal East', craft: 'Wood Carving', material: 'Teak', daysToMake: 3, year: 2026,
  }, 45000, 'Everyday'],
  ['muga-cushion-pair', 'Muga Cushion Pair', 'Muga', 'cat-muga', 'guild-imphal-silk', {
    artisan: 'Ojasvi Devi', village: 'Kongba, Imphal East', craft: 'Muga Silk Weaving', fibre: 'Muga silk', daysToMake: 22, year: 2026,
  }, 560000, 'Living'],
  ['phanek-summer-cotton', 'Summer Phanek in Cotton', 'Phanek', 'cat-phanek', 'guild-wangkhei', {
    artisan: 'Sanahal Devi', village: 'Wangkhei, Imphal East', craft: 'Meitei Phanek', fibre: 'Cotton', daysToMake: 28, year: 2026,
  }, 490000, 'Summer'],
  ['phanek-festive-gold', 'Festive Phanek with Gold Border', 'Phanek', 'cat-phanek', 'guild-wangkhei', {
    artisan: 'Ibemcha', village: 'Kongba, Imphal East', craft: 'Ceremonial Phanek', fibre: 'Silk · zari', daysToMake: 74, year: 2025, giCode: 'GI-283', giVerified: true,
  }, 1980000, 'Ceremonial'],
];

export const PRODUCTS: Product[] = rows.map((r, i) => make(i + 1, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]));

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsInCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((p) => p.categoryIds.includes(categoryId));
}

export function productsInGuild(guildId: string): Product[] {
  return PRODUCTS.filter((p) => p.guildId === guildId);
}

export function featuredProducts(n = 3): Product[] {
  return [PRODUCTS[0], PRODUCTS[4], PRODUCTS[12]].filter((p): p is Product => !!p).slice(0, n);
}

export function relatedProducts(product: Product, n = 4): Product[] {
  return PRODUCTS.filter((p) => p.id !== product.id && p.primaryCategoryId === product.primaryCategoryId).slice(0, n);
}
