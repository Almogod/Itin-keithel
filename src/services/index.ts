import type {
  Appointment,
  Artisan,
  Banner,
  Category,
  Collection,
  Coupon,
  GICertificate,
  Guild,
  JournalArticle,
  Notification,
  Order,
  Paginated,
  Product,
  Review,
  User,
} from '@/types';
import { APPOINTMENTS } from './mock/appointments';
import { artisansInGuild, ARTISANS, findArtisan } from './mock/artisans';
import { BANNERS } from './mock/banners';
import { CATEGORIES, findCategoryBySlug } from './mock/categories';
import { COLLECTIONS } from './mock/collections';
import { COUPONS, findCoupon } from './mock/coupons';
import { findGICertificate, GI_CERTIFICATES } from './mock/gi';
import { findGuild, findGuildById, GUILDS } from './mock/guilds';
import { JOURNAL } from './mock/journal';
import { NOTIFICATIONS, notificationsFor } from './mock/notifications';
import { findOrder, ORDERS } from './mock/orders';
import {
  featuredProducts,
  findProduct,
  PRODUCTS,
  productsInCategory,
  productsInGuild,
  relatedProducts,
} from './mock/products';
import { REVIEWS, reviewsFor } from './mock/reviews';
import { CURRENT_USER, USERS } from './mock/users';

/* --------------------------- helpers --------------------------- */

const DEV = process.env.NODE_ENV !== 'production';

function delay(): Promise<void> {
  if (!DEV) return Promise.resolve();
  const ms = 120 + Math.floor(Math.random() * 180);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ListParams {
  page?: number;
  pageSize?: number;
}

function paginate<T>(items: T[], params: ListParams = {}): Paginated<T> {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.max(1, params.pageSize ?? 24);
  const start = (page - 1) * pageSize;
  const slice = items.slice(start, start + pageSize);
  return {
    items: slice,
    pagination: {
      page,
      pageSize,
      total: items.length,
      hasMore: start + slice.length < items.length,
    },
  };
}

/* --------------------------- products --------------------------- */

export interface ProductListParams extends ListParams {
  categorySlug?: string;
  guildSlug?: string;
  collectionSlug?: string;
  sort?: 'newest' | 'price-asc' | 'price-desc';
}

function sortProducts(items: Product[], sort: ProductListParams['sort']): Product[] {
  if (!sort || sort === 'newest') {
    return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  if (sort === 'price-asc') return [...items].sort((a, b) => a.price - b.price);
  return [...items].sort((a, b) => b.price - a.price);
}

export async function getProducts(params: ProductListParams = {}): Promise<Paginated<Product>> {
  await delay();
  let items = PRODUCTS;
  if (params.categorySlug) {
    const cat = findCategoryBySlug(params.categorySlug);
    items = cat ? productsInCategory(cat.id) : [];
  } else if (params.guildSlug) {
    const g = findGuild(params.guildSlug);
    items = g ? productsInGuild(g.id) : [];
  } else if (params.collectionSlug) {
    const col = COLLECTIONS.find((c) => c.slug === params.collectionSlug);
    items = col ? PRODUCTS.filter((p) => col.productIds.includes(p.id)) : [];
  }
  return paginate(sortProducts(items, params.sort), params);
}

export async function getProduct(slug: string): Promise<Product | null> {
  await delay();
  return findProduct(slug) ?? null;
}

export async function getFeaturedProducts(n = 3): Promise<Product[]> {
  await delay();
  return featuredProducts(n);
}

export async function getRelatedProducts(product: Product, n = 4): Promise<Product[]> {
  await delay();
  return relatedProducts(product, n);
}

export async function getProductSlugs(): Promise<string[]> {
  return PRODUCTS.map((p) => p.slug);
}

/* --------------------------- categories --------------------------- */

export async function getCategories(): Promise<Category[]> {
  await delay();
  return CATEGORIES;
}

export async function getCategory(slug: string): Promise<Category | null> {
  await delay();
  return findCategoryBySlug(slug) ?? null;
}

export async function getCategorySlugs(): Promise<string[]> {
  return CATEGORIES.map((c) => c.slug);
}

/* --------------------------- guilds --------------------------- */

export async function getGuilds(): Promise<Guild[]> {
  await delay();
  return GUILDS;
}

export async function getGuild(slug: string): Promise<Guild | null> {
  await delay();
  return findGuild(slug) ?? null;
}

export async function getGuildById(id: string): Promise<Guild | null> {
  await delay();
  return findGuildById(id) ?? null;
}

export async function getSpotlightGuild(): Promise<Guild> {
  await delay();
  return GUILDS[0]!;
}

export async function getGuildSlugs(): Promise<string[]> {
  return GUILDS.map((g) => g.slug);
}

/* --------------------------- artisans --------------------------- */

export async function getArtisans(): Promise<Artisan[]> {
  await delay();
  return ARTISANS;
}

export async function getArtisan(slug: string): Promise<Artisan | null> {
  await delay();
  return findArtisan(slug) ?? null;
}

export async function getArtisansInGuild(guildId: string): Promise<Artisan[]> {
  await delay();
  return artisansInGuild(guildId);
}

/* --------------------------- collections --------------------------- */

export async function getCollections(): Promise<Collection[]> {
  await delay();
  return COLLECTIONS;
}

export async function getCollection(slug: string): Promise<Collection | null> {
  await delay();
  return COLLECTIONS.find((c) => c.slug === slug) ?? null;
}

export async function getFeaturedCollection(): Promise<Collection | null> {
  await delay();
  return COLLECTIONS.find((c) => c.isFeatured) ?? COLLECTIONS[0] ?? null;
}

/* --------------------------- reviews --------------------------- */

export async function getReviewsForProduct(
  productId: string,
  params: ListParams = {},
): Promise<Paginated<Review>> {
  await delay();
  const sorted = [...reviewsFor(productId)].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return paginate(sorted, { page: params.page ?? 1, pageSize: params.pageSize ?? 10 });
}

export async function getAllReviews(): Promise<Review[]> {
  await delay();
  return REVIEWS;
}

/* --------------------------- users --------------------------- */

export async function getCurrentUser(): Promise<User> {
  await delay();
  return CURRENT_USER;
}

export async function getUser(id: string): Promise<User | null> {
  await delay();
  return USERS.find((u) => u.id === id) ?? null;
}

/* --------------------------- orders --------------------------- */

export async function getOrdersForUser(
  userId: string,
  params: ListParams = {},
): Promise<Paginated<Order>> {
  await delay();
  const sorted = ORDERS.filter((o) => o.userId === userId).sort((a, b) =>
    b.placedAt.localeCompare(a.placedAt),
  );
  return paginate(sorted, { page: params.page ?? 1, pageSize: params.pageSize ?? 10 });
}

export async function getOrder(code: string): Promise<Order | null> {
  await delay();
  return findOrder(code) ?? null;
}

/* --------------------------- banners --------------------------- */

export async function getBannersForSlot(slot: Banner['slot']): Promise<Banner[]> {
  await delay();
  return BANNERS.filter((b) => b.slot === slot && b.isActive).sort((a, b) => a.priority - b.priority);
}

/* --------------------------- notifications --------------------------- */

export async function getNotificationsForUser(userId: string): Promise<Notification[]> {
  await delay();
  return notificationsFor(userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getAllNotifications(): Promise<Notification[]> {
  await delay();
  return NOTIFICATIONS;
}

/* --------------------------- appointments --------------------------- */

export async function getAppointmentsForUser(userId: string): Promise<Appointment[]> {
  await delay();
  return APPOINTMENTS.filter((a) => a.userId === userId).sort((a, b) =>
    b.scheduledAt.localeCompare(a.scheduledAt),
  );
}

export async function getAllAppointments(): Promise<Appointment[]> {
  await delay();
  return APPOINTMENTS;
}

/* --------------------------- coupons --------------------------- */

export async function getCoupons(): Promise<Coupon[]> {
  await delay();
  return COUPONS.filter((c) => c.isActive);
}

export async function applyCoupon(code: string): Promise<Coupon | null> {
  await delay();
  return findCoupon(code) ?? null;
}

/* --------------------------- gi --------------------------- */

export async function getGICertificates(): Promise<GICertificate[]> {
  await delay();
  return GI_CERTIFICATES;
}

export async function verifyGICertificate(code: string): Promise<GICertificate | null> {
  await delay();
  return findGICertificate(code) ?? null;
}

/* --------------------------- journal --------------------------- */

export async function getJournal(params: ListParams = {}): Promise<Paginated<JournalArticle>> {
  await delay();
  const sorted = [...JOURNAL].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return paginate(sorted, { page: params.page ?? 1, pageSize: params.pageSize ?? 12 });
}

export async function getLatestJournal(n = 2): Promise<JournalArticle[]> {
  await delay();
  return [...JOURNAL]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, n);
}

export async function getJournalArticle(slug: string): Promise<JournalArticle | null> {
  await delay();
  return JOURNAL.find((j) => j.slug === slug) ?? null;
}

export async function getJournalSlugs(): Promise<string[]> {
  return JOURNAL.map((j) => j.slug);
}

/* --------------------------- search --------------------------- */

export interface SearchResults {
  query: string;
  products: Product[];
  categories: Category[];
  guilds: Guild[];
}

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function searchProducts(query: string, limit = 12): Promise<SearchResults> {
  await delay();
  const q = query.trim();
  if (!q) {
    return {
      query: q,
      products: PRODUCTS.slice(0, limit),
      categories: [],
      guilds: [],
    };
  }
  const tokens = tokenize(q);
  const matches = (haystack: string) => tokens.every((t) => haystack.toLowerCase().includes(t));
  const products = PRODUCTS.filter((p) =>
    matches(
      [p.title, p.subtitle ?? '', p.provenance.craft, p.provenance.artisan, ...p.tags].join(' '),
    ),
  ).slice(0, limit);
  const categories = CATEGORIES.filter((c) => matches(c.name + ' ' + (c.meiteiName ?? '')));
  const guilds = GUILDS.filter((g) => matches(g.name + ' ' + g.region));
  return { query: q, products, categories, guilds };
}

export async function getSearchIndex(): Promise<Product[]> {
  await delay();
  return PRODUCTS;
}
