export type Money = number;
export type ISODate = string;

export interface Media {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface Address {
  id: string;
  label: 'HOME' | 'WORK' | 'OTHER';
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

export interface Paginated<T> {
  items: T[];
  pagination: Pagination;
}

/* -------- Provenance -------- */

export interface Provenance {
  artisan: string;
  village: string;
  craft: string;
  fibre?: string;
  material?: string;
  daysToMake: number;
  year: number;
  giCode?: string;
  giVerified?: boolean;
}

/* -------- Category / Guild / GI -------- */

export interface Category {
  id: string;
  slug: string;
  name: string;
  meiteiName?: string;
  description: string;
  hero: Media;
  parentId: string | null;
  productCount: number;
}

export interface Guild {
  id: string;
  slug: string;
  name: string;
  region: string;
  foundedYear: number;
  story: string;
  cover: Media;
  portrait: Media;
  memberCount: number;
  specialisations: string[];
}

export interface GICertificate {
  id: string;
  code: string;
  productName: string;
  issuedTo: string;
  issuedOn: ISODate;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
}

/* -------- Product -------- */

export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'OUT_OF_STOCK' | 'ARCHIVED';

export interface ProductVariant {
  id: string;
  sku: string;
  optionLabel: string;
  options: Record<string, string>;
  price: Money;
  compareAtPrice?: Money;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  description: string;
  chapterMaker: string;
  chapterCraft: string;
  chapterCare: string;
  highlights: string[];
  categoryIds: string[];
  primaryCategoryId: string;
  guildId: string;
  media: Media[];
  materialCloseUp?: Media;
  price: Money;
  compareAtPrice?: Money;
  currency: 'INR';
  rating: { average: number; count: number };
  stock: number;
  status: ProductStatus;
  variants: ProductVariant[];
  provenance: Provenance;
  tags: string[];
  collectionIds: string[];
  createdAt: ISODate;
  updatedAt: ISODate;
}

/* -------- Collection -------- */

export interface Collection {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  hero: Media;
  description: string;
  productIds: string[];
  season?: 'SPRING' | 'SUMMER' | 'MONSOON' | 'AUTUMN' | 'WINTER' | 'FESTIVE';
  publishedAt: ISODate;
  isFeatured: boolean;
}

/* -------- Cart / Order -------- */

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  addedAt: ISODate;
  snapshot: {
    title: string;
    optionLabel: string;
    unitPrice: Money;
    image: Media;
    guildName: string;
    slug: string;
  };
}

export interface CartTotals {
  subtotal: Money;
  discount: Money;
  shipping: Money;
  tax: Money;
  total: Money;
}

export interface Cart {
  id: string;
  userId: string | null;
  items: CartItem[];
  appliedCoupons: string[];
  totals: CartTotals;
  updatedAt: ISODate;
}

export type OrderStatus =
  | 'PLACED' | 'CONFIRMED' | 'PACKED' | 'HANDED_TO_COURIER'
  | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';

export type PaymentMethod = 'CARD' | 'UPI' | 'NETBANKING' | 'WALLET' | 'COD';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface OrderTimelineEvent {
  status: OrderStatus;
  at: ISODate;
  note?: string;
  location?: string;
}

export interface Order {
  id: string;
  code: string;
  userId: string;
  items: CartItem[];
  totals: CartTotals;
  status: OrderStatus;
  timeline: OrderTimelineEvent[];
  shippingAddress: Address;
  billingAddress: Address;
  payment: { method: PaymentMethod; status: PaymentStatus; transactionId?: string };
  placedAt: ISODate;
  expectedDeliveryAt: ISODate;
  deliveredAt?: ISODate;
}

/* -------- User / Review / Notification / Banner -------- */

export type UserRole = 'CONSUMER' | 'VENDOR' | 'DELIVERY' | 'ADMIN';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: Media;
  addresses: Address[];
  createdAt: ISODate;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  authorName: string;
  authorAvatar?: Media;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  body: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: ISODate;
}

export interface Banner {
  id: string;
  slot: 'HOME_HERO' | 'HOME_STRIP' | 'CATEGORY_HEAD' | 'PDP_SIDE';
  title: string;
  subtitle?: string;
  media: Media;
  ctaLabel?: string;
  ctaHref?: string;
  startsAt: ISODate;
  endsAt: ISODate;
  isActive: boolean;
  priority: number;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  body: string;
  cover: Media;
  author: string;
  publishedAt: ISODate;
  readMinutes: number;
}
