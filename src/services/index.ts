import { PRODUCTS, findProduct, productsInCategory, productsInGuild, featuredProducts, relatedProducts } from './mock/products';
import { CATEGORIES, findCategoryBySlug } from './mock/categories';
import { GUILDS, findGuild, findGuildById } from './mock/guilds';
import { REVIEWS, reviewsFor } from './mock/reviews';
import { COLLECTIONS } from './mock/collections';
import { CURRENT_USER } from './mock/users';
import { ORDERS, findOrder } from './mock/orders';
import { BANNERS } from './mock/banners';
import { JOURNAL } from './mock/journal';

export const productsApi = {
  all: () => PRODUCTS,
  byId: (id: string) => PRODUCTS.find((p) => p.id === id),
  bySlug: findProduct,
  byCategory: productsInCategory,
  byGuild: productsInGuild,
  featured: featuredProducts,
  related: relatedProducts,
};

export const categoriesApi = {
  all: () => CATEGORIES,
  bySlug: findCategoryBySlug,
  byId: (id: string) => CATEGORIES.find((c) => c.id === id),
};

export const guildsApi = {
  all: () => GUILDS,
  bySlug: findGuild,
  byId: findGuildById,
  spotlight: () => GUILDS[0]!,
};

export const reviewsApi = {
  all: () => REVIEWS,
  byProduct: reviewsFor,
};

export const collectionsApi = {
  all: () => COLLECTIONS,
  bySlug: (slug: string) => COLLECTIONS.find((c) => c.slug === slug),
  featured: () => COLLECTIONS.find((c) => c.isFeatured) ?? COLLECTIONS[0],
};

export const usersApi = {
  current: () => CURRENT_USER,
};

export const ordersApi = {
  all: () => ORDERS,
  byUser: (userId: string) => ORDERS.filter((o) => o.userId === userId),
  byCode: findOrder,
};

export const bannersApi = {
  bySlot: (slot: string) => BANNERS.filter((b) => b.slot === slot && b.isActive),
};

export const journalApi = {
  all: () => JOURNAL,
  bySlug: (slug: string) => JOURNAL.find((j) => j.slug === slug),
  latest: (n = 2) => JOURNAL.slice(0, n),
};
