# Itin Keithel — Data Models

> TypeScript interface **spec**. This is the contract the mock layer and (later) the REST API must both satisfy. Every interface here maps to a file under `src/types/`.

Conventions:
- All IDs are opaque `string` (UUID-shaped in mock).
- All timestamps are ISO 8601 `string` (`YYYY-MM-DDTHH:mm:ss.sssZ`).
- All prices are stored as **paise** (integer, INR × 100) to avoid float drift. Display layer formats.
- Enums are string-literal unions (better for JSON round-tripping than TS `enum`).
- Optional fields use `?`; nullable fields use `| null` (explicit "known-empty").

---

## 1. Money & Common

```ts
// Money is paise (₹1.00 = 100). Display via lib/currency.ts.
export type Money = number;

export type ISODate = string;

export interface Media {
  id: string;
  url: string;
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
  state: string;         // e.g. "Assam"
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
```

## 2. Category & Guild

```ts
export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  hero: Media;
  parentId: string | null;   // supports one level of subcategory
  productCount: number;      // denormalised for UI
}

export interface Guild {
  id: string;
  slug: string;
  name: string;                 // e.g. "Majuli Weavers Collective"
  region: string;               // "Majuli, Assam"
  foundedYear: number;
  story: string;                // long-form markdown
  cover: Media;
  portrait: Media;
  memberCount: number;
  specialisations: string[];    // ["Muga silk", "Eri weave"]
  giCertificates: GICertificate[];
  socialLinks?: { instagram?: string; website?: string };
}
```

## 3. GI Certificate

```ts
export interface GICertificate {
  id: string;
  code: string;              // official GI registry number
  productName: string;       // e.g. "Muga Silk"
  issuedTo: string;          // guild or state body
  issuedOn: ISODate;
  validTill: ISODate | null;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  verifyUrl?: string;        // link to public registry (mocked)
}
```

## 4. Product

```ts
export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'OUT_OF_STOCK' | 'ARCHIVED';

export interface ProductVariant {
  id: string;
  sku: string;
  optionLabel: string;       // "Deep Indigo · 42"
  options: Record<string, string>;  // { colour: "Indigo", size: "42" }
  price: Money;
  compareAtPrice?: Money;    // for showing discount
  stock: number;
  weightGrams?: number;
  images?: Media[];          // overrides top-level when present
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;                 // markdown
  highlights: string[];                // bullet points
  categoryIds: string[];
  primaryCategoryId: string;
  guildId: string;
  artisanIds: string[];                // co-crafters
  media: Media[];                      // gallery
  price: Money;                        // effective/base
  compareAtPrice?: Money;
  currency: 'INR';
  rating: {                            // aggregates
    average: number;                   // 0..5
    count: number;
    distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  };
  stock: number;
  status: ProductStatus;
  variants: ProductVariant[];
  giCertificateId?: string;            // authenticity link
  material?: string[];                 // ["Muga silk", "Zari"]
  careInstructions?: string;
  dimensions?: { length?: number; width?: number; height?: number; unit: 'cm' | 'in' };
  tags: string[];                      // free-form for search
  collectionIds: string[];             // editorial groupings
  createdAt: ISODate;
  updatedAt: ISODate;
}
```

## 5. Artisan

```ts
export interface Artisan {
  id: string;
  slug: string;
  name: string;
  guildId: string;
  role: string;                // "Master weaver", "Apprentice", …
  yearsOfCraft: number;
  bio: string;
  portrait: Media;
  location: string;
}
```

## 6. Collection

```ts
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
```

## 7. Cart

```ts
export interface CartItem {
  id: string;                  // stable line id (not productId — variants)
  productId: string;
  variantId: string;
  quantity: number;
  addedAt: ISODate;
  // Snapshot for consistency if catalog changes mid-session:
  snapshot: {
    title: string;
    optionLabel: string;
    unitPrice: Money;
    image: Media;
    guildName: string;
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
  userId: string | null;       // null for guest
  items: CartItem[];
  appliedCoupons: string[];    // codes
  totals: CartTotals;
  updatedAt: ISODate;
}
```

## 8. Order

```ts
export type OrderStatus =
  | 'PLACED'
  | 'CONFIRMED'
  | 'PACKED'
  | 'HANDED_TO_COURIER'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

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
  code: string;                     // human-friendly, e.g. "IK-2026-0001"
  userId: string;
  items: CartItem[];                // frozen at checkout
  totals: CartTotals;
  status: OrderStatus;
  timeline: OrderTimelineEvent[];
  shippingAddress: Address;
  billingAddress: Address;
  payment: {
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId?: string;
  };
  courier?: {
    provider: string;
    trackingNumber: string;
    riderId?: string;
  };
  placedAt: ISODate;
  expectedDeliveryAt: ISODate;
  deliveredAt?: ISODate;
}
```

## 9. User

```ts
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
  preferences?: {
    newsletter: boolean;
    stylistUpdates: boolean;
    language: 'en' | 'as' | 'hi';    // stub for future i18n
  };
}

// Session shape (post-auth). Real backend will return a JWT alongside.
export interface Session {
  user: User;
  role: UserRole;
  issuedAt: ISODate;
  expiresAt: ISODate;
}
```

## 10. Delivery Agent

```ts
export type DeliveryStatus = 'AVAILABLE' | 'ON_PICKUP' | 'ON_DELIVERY' | 'OFFLINE';

export interface DeliveryAgent {
  id: string;
  fullName: string;
  phone: string;
  avatar?: Media;
  vehicle: { type: 'BIKE' | 'VAN'; number: string };
  serviceRegion: string[];         // pincodes
  status: DeliveryStatus;
  rating: number;
  earningsThisWeek: Money;
  activeOrderIds: string[];
}
```

## 11. Review

```ts
export interface Review {
  id: string;
  productId: string;
  variantId?: string;
  userId: string;
  authorName: string;
  authorAvatar?: Media;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  body: string;
  media?: Media[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: ISODate;
}
```

## 12. Coupon

```ts
export interface Coupon {
  id: string;
  code: string;                    // "FESTIVE10"
  description: string;
  type: 'PERCENT' | 'FLAT' | 'FREE_SHIPPING';
  value: number;                   // percent 0..100 OR Money for FLAT
  minSubtotal?: Money;
  maxDiscount?: Money;
  appliesTo: {
    categoryIds?: string[];
    productIds?: string[];
    guildIds?: string[];
  };
  usageLimitPerUser?: number;
  validFrom: ISODate;
  validTill: ISODate;
  isActive: boolean;
}
```

## 13. Notification

```ts
export type NotificationType =
  | 'ORDER_UPDATE'
  | 'PRICE_DROP'
  | 'BACK_IN_STOCK'
  | 'GUILD_STORY'
  | 'PROMO'
  | 'SYSTEM';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  href?: string;
  isRead: boolean;
  createdAt: ISODate;
}
```

## 14. Appointment (Virtual Stylist)

```ts
export type AppointmentStatus = 'REQUESTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: string;
  userId: string;
  stylistName: string;
  categoryFocus: string;         // "Bridal Muga", "Naga jewellery"
  scheduledAt: ISODate;
  durationMinutes: number;
  mode: 'VIDEO' | 'IN_STORE';
  status: AppointmentStatus;
  notes?: string;
}
```

## 15. Hamper (Gift Builder)

```ts
export type HamperShell = 'BAMBOO' | 'ROSEWOOD' | 'CANE';

export interface HamperItemChoice {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface Hamper {
  id: string;
  shell: HamperShell;
  ribbonColor: 'MUGA' | 'LAC' | 'IVORY' | 'INDIGO';
  giftNote?: string;
  items: HamperItemChoice[];
  totals: CartTotals;
  createdAt: ISODate;
}
```

## 16. Banner (Admin-managed)

```ts
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
  priority: number;              // ordering when multiple active
}
```

## 17. Analytics (Dashboards)

```ts
export interface TimeSeriesPoint { at: ISODate; value: number; }

export interface KPI {
  key: string;                   // "revenue.week"
  label: string;
  value: number;
  unit?: 'INR' | 'COUNT' | 'PERCENT';
  deltaPct?: number;             // vs previous period
  series?: TimeSeriesPoint[];
}

export interface VendorAnalytics {
  vendorId: string;
  kpis: KPI[];
  topProducts: Array<{ productId: string; units: number; revenue: Money }>;
  funnel: { views: number; addToCart: number; checkout: number; purchased: number };
}

export interface AdminAnalytics {
  platformKpis: KPI[];
  topGuilds: Array<{ guildId: string; revenue: Money }>;
  topCategories: Array<{ categoryId: string; revenue: Money }>;
  ordersByStatus: Record<OrderStatus, number>;
}
```

## 18. API Envelope (for the eventual REST layer)

Mock services return **the unwrapped data** for ergonomic UI code. When we introduce a real API, `lib/http.ts` will unwrap this envelope so **UI signatures don't change**.

```ts
export interface ApiEnvelope<T> {
  ok: boolean;
  data: T;
  error?: { code: string; message: string; details?: unknown };
  meta?: { requestId: string; serverTime: ISODate };
}
```

## 19. File-to-Type Map

| File | Exports |
|---|---|
| `types/common.ts` | `Money`, `ISODate`, `Media`, `Address`, `Pagination`, `Paginated` |
| `types/category.ts` | `Category` |
| `types/guild.ts` | `Guild` |
| `types/gi.ts` | `GICertificate` |
| `types/product.ts` | `Product`, `ProductVariant`, `ProductStatus` |
| `types/artisan.ts` | `Artisan` |
| `types/collection.ts` | `Collection` |
| `types/cart.ts` | `Cart`, `CartItem`, `CartTotals` |
| `types/order.ts` | `Order`, `OrderStatus`, `OrderTimelineEvent`, `PaymentMethod`, `PaymentStatus` |
| `types/user.ts` | `User`, `UserRole`, `Session` |
| `types/delivery.ts` | `DeliveryAgent`, `DeliveryStatus` |
| `types/review.ts` | `Review` |
| `types/coupon.ts` | `Coupon` |
| `types/notification.ts` | `Notification`, `NotificationType` |
| `types/appointment.ts` | `Appointment`, `AppointmentStatus` |
| `types/hamper.ts` | `Hamper`, `HamperShell`, `HamperItemChoice` |
| `types/banner.ts` | `Banner` |
| `types/analytics.ts` | `KPI`, `TimeSeriesPoint`, `VendorAnalytics`, `AdminAnalytics` |
| `types/api.ts` | `ApiEnvelope` |
| `types/index.ts` | barrel re-export |

---

_Next: [ROADMAP.md](./ROADMAP.md)._
