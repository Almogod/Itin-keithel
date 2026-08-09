import type { Product, Guild } from '@ik/types';

export const PRICE_BUCKETS = [
  { key: 'u5', label: 'Under ₹5,000' },
  { key: '5-10', label: '₹5,000 — ₹10,000' },
  { key: '10-20', label: '₹10,000 — ₹20,000' },
  { key: 'o20', label: 'Above ₹20,000' },
] as const;

export type PriceBucketKey = (typeof PRICE_BUCKETS)[number]['key'];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Recently added' },
  { value: 'price-asc', label: 'Price: low → high' },
  { value: 'price-desc', label: 'Price: high → low' },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]['value'];

export function priceInBucket(price: number, bucketKey: string): boolean {
  const rupees = price / 100;
  switch (bucketKey) {
    case 'u5':
      return rupees < 5000;
    case '5-10':
      return rupees >= 5000 && rupees < 10000;
    case '10-20':
      return rupees >= 10000 && rupees < 20000;
    case 'o20':
      return rupees >= 20000;
    default:
      return true;
  }
}

export interface ProductFilterQuery {
  guild?: string[];
  price?: string[];
  fibre?: string[];
  sort?: string;
}

export function filterAndSortProducts(
  products: Product[],
  q: ProductFilterQuery,
  guilds: Guild[],
): Product[] {
  const bySlug = new Map(guilds.map((g) => [g.slug, g.id]));
  const guildIds = (q.guild ?? []).map((slug) => bySlug.get(slug)).filter((v): v is string => !!v);

  let items = products;

  if (guildIds.length > 0) {
    items = items.filter((p) => guildIds.includes(p.guildId));
  }
  if (q.price && q.price.length > 0) {
    items = items.filter((p) => q.price!.some((bucket) => priceInBucket(p.price, bucket)));
  }
  if (q.fibre && q.fibre.length > 0) {
    items = items.filter((p) => {
      const mat = (p.provenance.fibre ?? p.provenance.material ?? '').toLowerCase();
      return q.fibre!.some((f) => mat.includes(f.toLowerCase()));
    });
  }

  const sort = q.sort ?? 'newest';
  const sorted = [...items];
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
  else sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return sorted;
}

export function collectFibres(products: Product[]): string[] {
  const set = new Set<string>();
  for (const p of products) {
    const raw = p.provenance.fibre ?? p.provenance.material;
    if (!raw) continue;
    const primary = raw.split(' · ')[0]?.trim();
    if (primary) set.add(primary);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function parseFilterParams(
  searchParams: Record<string, string | string[] | undefined>,
): ProductFilterQuery {
  const asArray = (v: string | string[] | undefined): string[] => {
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
  };
  return {
    guild: asArray(searchParams.guild),
    price: asArray(searchParams.price),
    fibre: asArray(searchParams.fibre),
    sort: typeof searchParams.sort === 'string' ? searchParams.sort : undefined,
  };
}
