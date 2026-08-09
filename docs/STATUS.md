# Itin Keithel — Status

> Live progress tracker. Update as work lands. Keyed to phases in [ROADMAP.md](./ROADMAP.md).

**Legend:** ✅ done · 🟡 in progress · ⬜ not started · ⛔ blocked

**Last updated:** 2026-08-10 (Phase M)

---

## Phase 0 — Docs & Design Alignment ✅

- ✅ Reference-image analysis (9 images inspected)
- ✅ Design philosophy approved (six laws, four signature moves)
- ✅ Color system locked (Rice Paper · Loktak Ink · Kauna Reed · Muga Silk · Manipur Vermilion · Ereima Green · Loktak Indigo)
- ✅ Typography locked (Fraunces display · Inter sans)
- ✅ DESIGN.md rewritten to reflect approval
- ✅ PRD.md · ROADMAP.md · STATUS.md synced to new decisions

## Phase 1 — Single-App Foundation ✅

- ✅ Legacy `src/App.jsx` and legacy `globals.css` removed (clean `src/` tree)
- ✅ `tsconfig.json` (strict, `noUncheckedIndexedAccess`, `noImplicitOverride`) + `layout.tsx` / `page.tsx`
- ✅ `@types/react`, `@types/node`, `@types/react-dom` installed
- ✅ `src/styles/tokens.css` — full color / type / spacing / radius / shadow / motion token set
- ✅ `src/styles/globals.css` — Tailwind v4 `@theme`, `next/font` (Fraunces + Inter), scrollbar/selection, reset
- ✅ `src/lib/cn.ts`, `src/lib/motion.ts` (framer presets), `src/lib/format.ts` (paise + dates)
- ✅ `src/lib/hooks/` — `useMediaQuery`, `useDebounce`, `useLockBody`, `useIntersection`, `useGsap`, `useScrollDirection` + barrel `index.ts`
- ✅ `src/types/index.ts` — full domain type set per DATA_MODELS.md (Product, Order, Cart, User, Artisan, Coupon, Notification, Appointment, Hamper, Ticket, Complaint, KBArticle, ChatMessage, Analytics, `ApiEnvelope<T>`, …)
- ✅ `src/config/` — `routes.ts`, `enums.ts`, `site.ts`
- ✅ `src/components/layout/` — `Container`, `Section`, `Stack`, `Cluster`, `Grid`, `Frame` + barrel
- ✅ `src/components/primitives/` — `Accordion`, `Avatar`, `Badge`, `Breadcrumb`, `Button`, `Checkbox`, `Divider`, `Drawer`, `Eyebrow`, `Hairline`, `Icon`, `Input`, `Marker`, `MetaTable`, `Modal`, `Radio`, `Select`, `Skeleton`, `Switch`, `Tabs`, `Textarea`, `Toast`, `Tooltip` + barrel
- ✅ `src/components/motion/` — `FadeIn`, `Reveal`, `StaggerList` (+ `StaggerItem`), `PageTransition` + barrel
- ✅ `app/dev/kitchen-sink/page.tsx` — every primitive, every variant, live overlays & toast triggers

**Exit-criteria run (2026-08-08):**
- `pnpm lint` — clean
- `npx tsc --noEmit` — clean
- `pnpm build` — clean (20 routes prerendered incl. `/dev/kitchen-sink`)

## Phase 2 — Chrome ✅

- ✅ Header — centered Fraunces wordmark, slim category strip appears on scroll, cart + search + account utilities (`src/components/chrome/Header.tsx`)
- ✅ Mobile drawer — left-side `Drawer`, Escape to close, focus trap + focus return via new `useFocusTrap` (`src/components/chrome/MobileNav.tsx`)
- ✅ Footer — one-line newsletter, three sitemap columns, "Rooted in Manipur · Woven by Guilds" attribution, guild-share line, © + social (`src/components/chrome/Footer.tsx`)
- ✅ Skip-to-content link rendered in `RootLayout`; visible on `:focus`

**Extras landed:** `useFocusTrap` hook applied to both `Drawer` and `Modal` (Phase 1 primitives now meet WCAG 2.2 AA focus management).

**Exit-criteria run (2026-08-08):**
- Header + Footer render on every route via `src/app/layout.tsx`
- Drawer / Modal trap Tab / Shift+Tab and restore focus to trigger on close
- `pnpm lint` · `tsc --noEmit` · `pnpm build` — all clean (20 routes)

## Phase 3 — Mock Data & Services ✅

**Mock data (all ≥ roadmap floors):**
- ✅ `services/mock/categories.ts` — 6 categories
- ✅ `services/mock/guilds.ts` — 4 guilds
- ✅ `services/mock/artisans.ts` — 6 artisans
- ✅ `services/mock/products.ts` — 26 products across 6 categories / 4 guilds
- ✅ `services/mock/collections.ts` — 4 collections (Muga, Longpi Table, Ceremonial Phanek, Loktak Kauna)
- ✅ `services/mock/reviews.ts` — 13 reviews across 10 products
- ✅ `services/mock/users.ts` — 6 users
- ✅ `services/mock/orders.ts` — 10 orders spanning every `OrderStatus`
- ✅ `services/mock/coupons.ts` — 4 coupons (percent / flat / free-shipping / guild-share)
- ✅ `services/mock/gi.ts` — 6 GI certificates
- ✅ `services/mock/banners.ts` — 4 banners covering every slot (`HOME_HERO`, `HOME_STRIP`, `CATEGORY_HEAD`, `PDP_SIDE`)
- ✅ `services/mock/appointments.ts` — 4 stylist appointments
- ✅ `services/mock/notifications.ts` — 3 notifications

**Service functions — all async, all typed, 120–300ms artificial delay in dev:**
- ✅ Products — `getProducts` (paginated + `categorySlug` / `guildSlug` / `collectionSlug` / `sort`), `getProduct`, `getFeaturedProducts`, `getRelatedProducts`, `getProductSlugs`
- ✅ Categories — `getCategories`, `getCategory`, `getCategorySlugs`
- ✅ Guilds — `getGuilds`, `getGuild`, `getGuildById`, `getSpotlightGuild`, `getGuildSlugs`
- ✅ Artisans — `getArtisans`, `getArtisan`, `getArtisansInGuild`
- ✅ Collections — `getCollections`, `getCollection`, `getFeaturedCollection`
- ✅ Reviews — `getReviewsForProduct` (paginated), `getAllReviews`
- ✅ Users — `getCurrentUser`, `getUser`
- ✅ Orders — `getOrdersForUser` (paginated), `getOrder`
- ✅ Banners — `getBannersForSlot`
- ✅ Notifications — `getNotificationsForUser`, `getAllNotifications`
- ✅ Appointments — `getAppointmentsForUser`, `getAllAppointments`
- ✅ Coupons — `getCoupons`, `applyCoupon`
- ✅ GI — `getGICertificates`, `verifyGICertificate`
- ✅ Journal — `getJournal` (paginated), `getLatestJournal`, `getJournalArticle`, `getJournalSlugs`
- ✅ Search — `searchProducts(query, limit)` returns typed `SearchResults` (products + categories + guilds), plus `getSearchIndex`

**Exit-criteria run (2026-08-08):**
- Every consuming page (16 in total, incl. `AccountLayout`) is now `async` and `await`s the new API
- No page imports from `services/mock/` directly
- `pnpm lint` · `tsc --noEmit` · `pnpm build` — all clean (20 routes)

## Phase 4 — Customer App Pages ✅

- ✅ Landing (`/`) — 7 editorial sections: framed hero, living-craft quote, guild spotlight, the edit, journal, provenance, categories
- ✅ Categories index (`/categories`) + detail (`/categories/[slug]`) — hero + editorial description + real filter sidebar (guild / price / fibre) + sort, all URL-driven
- ✅ Collections list (`/collections`) + detail (`/collections/[slug]`) — editorial hero (Framed Object), tagline, product grid
- ✅ PLP (`/shop`) — full filter/sort via URL search params, reusable `FilterSidebar` + `SortBar`
- ✅ PDP (`/shop/[slug]`) — all 4 signature moves: Chapter PDP (Object · Maker · Craft · Care), Provenance Card, Oversized `ChapterMarker`, Framed Object (materialCloseUp in `<Frame>`); + working GI-Verify modal
- ✅ Wishlist (`/wishlist`) — real `WishlistContext`, heart toggle on PDP BuyBox, empty state + clear
- ✅ Cart page (`/cart`) + `CartDrawer` — quantity, remove, sticky summary
- ✅ Checkout (`/checkout`) — 3-step flow: Address · Shipping · Payment (UPI/Card/COD/etc)
- ✅ Order Success (`/checkout/success`)
- ✅ Order History (`/account/orders`) + detail (`/account/orders/[code]`) — timeline, address, payment, totals
- ✅ Profile (`/account/profile`) — personal + addresses
- ✅ Settings (`/account/settings`) — notifications, preferences, danger zone
- ✅ Auth UI shells — `/auth/login`, `/auth/signup`, `/auth/forgot` via shared `AuthShell`
- ✅ Search (`/search`) — debounced, typed `SearchResults` (products + categories + guilds), empty state
- ✅ Static pages — `/about`, `/story`, `/sustainability`, `/contact`, `/faq`, `/terms`, `/privacy`, `/shipping`, `/returns`, `/gi-registry` (with live verify form)
- ✅ 404 (`not-found.tsx`), 500 (`error.tsx`), Coming Soon (`/coming-soon`)

**Exit-criteria run (2026-08-10):**
- `pnpm lint` — clean
- `npx tsc --noEmit` — clean
- `pnpm build` — clean (**37 routes** prerendered / on-demand; up from 20 after Phase 2)

## Phase M — Monorepo Split ✅

**Workspace layout:**
```
root/
├── apps/
│   ├── web/       (3000) — the customer app, identical UX to Phase 4
│   ├── vendor/    (3001) — portal shell
│   ├── admin/     (3002) — portal shell
│   ├── support/   (3003) — portal shell
│   ├── api/       (3004) — /api/v1/health returns typed ApiEnvelope
│   └── delivery/  (3005) — Coming Soon placeholder
├── packages/
│   ├── ui/               — primitives + layout + motion + patterns + styles (tokens + globals)
│   ├── types/            — domain types
│   ├── config/           — routes, enums, site
│   ├── utils/            — cn, format, motion presets, filterProducts + PRICE_BUCKETS + SORT_OPTIONS
│   ├── hooks/            — useDebounce, useFocusTrap, useGsap, useIntersection, useLockBody, useMediaQuery, useScrollDirection
│   ├── services/         — mock services (getProducts, getOrder, verifyGICertificate, searchProducts, etc.)
│   ├── tsconfig/         — base.json · nextjs.json · react-library.json
│   └── eslint-config/    — base + next.mjs
├── turbo.json
├── pnpm-workspace.yaml
└── package.json          — turbo run dev/build/lint/typecheck
```

**Package graph:** apps consume `@ik/*` packages via `workspace:*`. `@ik/ui` re-exports every primitive, layout, motion, and pattern component through a single barrel. `@ik/ui/styles/globals.css` is Tailwind v4 entry with `@source` globs pointing at both `apps/**` and `packages/**` so classes anywhere in the workspace are detected.

**Refactor for isolation:** `ProvenanceCard` (in ui) no longer imports `GIVerifyButton` (a web-only feature). It now accepts an optional `verifyAction?: ReactNode` slot; the web PDP passes the `<GIVerifyButton />`. Same pattern will let vendor/admin reuse it.

**Exit-criteria run (2026-08-10):**
- `pnpm install` — 15 workspace projects linked
- `turbo run typecheck` — 6 successful, 6 total (~29s)
- `turbo run lint` — 6 successful, 6 total (~66s)
- `turbo run build` — 6 successful, 6 total (~80s). Web still ships 37 routes (33 static + 4 dynamic), identical to Phase 4 output.

## Phase 5 — Vendor Portal (`apps/vendor`)

- ⬜ Portal shell (sidebar + top bar)
- ⬜ Dashboard, Orders, Products, Inventory, Analytics, Reviews, Messages, Profile, Settings

## Phase 6 — Admin Portal (`apps/admin`)

- ⬜ Portal shell
- ⬜ Dashboard, Analytics, Orders, Products, Vendor Management, Customer Management, Banner Management, Categories, Guild Management, Reports, Site Settings

## Phase 7 — Support Portal (`apps/support`)

- ⬜ Portal shell
- ⬜ Customer Lookup, Orders, Refunds, Complaints, Tickets, Live Chat UI, Knowledge Base

## Phase 8 — Signature Features

- ⬜ Hamper Builder (in `apps/web`)
- ⬜ Virtual Stylist Booking
- ⬜ GI-Tag Verify modal on PDP

## Phase 9 — `apps/api` Stub Hardening

- ⬜ `/api/v1/health`
- ⬜ Route Handler skeletons per resource
- ⬜ zod schemas per endpoint
- ⬜ `NEXT_PUBLIC_MOCK=0` toggle proves wire without breaking UI

## Phase 10 — Polish

- ⬜ Motion pass across all apps
- ⬜ Empty / error state audit
- ⬜ Lighthouse + a11y on `apps/web`
- ⬜ Root README + `CONTRIBUTING.md` + per-app READMEs
- ⬜ Backend handoff notes

---

## Deferred (out of this roadmap)

- ⬜ Authentication
- ⬜ `apps/delivery` full build
- ⬜ Payments (Razorpay)
- ⬜ Redis + Meilisearch/Typesense
- ⬜ Vendor payouts
- ⬜ Admin RBAC
- ⬜ i18n

---

## Decisions log

| Date | Decision | Notes |
|---|---|---|
| 2026-08-06 | Delete `src/App.jsx`; start clean | User directive |
| 2026-08-06 | Full TypeScript from the start | User directive |
| 2026-08-06 | Package manager = pnpm | Matches existing lockfile |
| 2026-08-06 | In-memory state only; no `localStorage` | Per PRD non-goals |
| 2026-08-06 | Target backend = Next.js Route Handlers in `apps/api` | Same monorepo, separate app so it deploys independently |
| 2026-08-06 | DB = MongoDB + Mongoose; mail = Zoho | User directive |
| 2026-08-06 | Deploy = Ubuntu VPS + Nginx + PM2 → build must use Node runtime, not Edge | Constrains route/handler runtime choices |
| 2026-08-06 | Later additions: Redis (cache), Meilisearch/Typesense (search) | Adapters live inside `apps/api` |
| 2026-08-06 | Image storage = VPS local filesystem at `/var/www/itin-keithel/uploads/` | Supersedes earlier R2 decision |
| 2026-08-06 | MongoDB stores **relative paths only** (e.g. `/uploads/products/…webp`); UI consumes as-is | Keeps documents valid across any future storage swap |
| 2026-08-06 | Storage service under `apps/api/src/server/storage/` with `StorageDriver` interface — rest of platform never touches FS directly | Provider-agnostic seam |
| 2026-08-06 | Uploads pipeline: WebP conversion + thumbnail/medium/large sizes + UUID filenames + MIME/size validation | Enforced in `optimize.ts` |
| 2026-08-06 | Directory sharding under each bucket: `<bucket>/<uuid[0:2]>/<uuid[2:4]>/<uuid>/` | Avoids single-dir inode blow-up |
| 2026-08-06 | **Monorepo: Turborepo + pnpm workspaces** | 5 apps (`web`, `vendor`, `admin`, `support`, `api`) + 8 packages |
| 2026-08-06 | **New app: `apps/support`** for customer support | Distinct permissions/audit from admin |
| 2026-08-06 | **Deferred: Authentication** (no auth logic this phase) | Auth screens exist as UI shells only |
| 2026-08-06 | **Deferred: `apps/delivery`** — placeholder only ("Coming Soon") | Reserves workspace path for future team |
| 2026-08-06 | Shared packages: `ui`, `types`, `config`, `eslint-config`, `tsconfig`, `utils`, `hooks`, `services` | Enforced consistency across apps |
| 2026-08-06 | Frontend apps talk to `apps/api` via `packages/services` — HTTP hop even for Server Components | Rewrites earlier "no HTTP hop" note; now correct for separate deployables |
| **2026-08-07** | **Design language approved** — Rice Paper canvas, Loktak Ink, Kauna Reed, Muga Silk, Manipur Vermilion (voice), Ereima Green (action), Loktak Indigo (editorial). Fraunces display + Inter sans. | Distilled from reference-image analysis; museum-first / editorial-second / boutique-third |
| **2026-08-07** | **Four signature moves** — Provenance Card, Chapter PDP, Oversized Marker, Framed Object Hero | Every PDP must express all four |
| **2026-08-07** | **Single-app now, monorepo later (Phase M)** — build `src/` in monorepo-ready shape, extract after Phase 4 validates the customer app | Fastest path to a working frontend; monorepo migration is a Phase-M move |
| **2026-08-07** | **Fonts via `next/font`** — Fraunces (display) + Inter (sans), self-hosted, no Google Fonts network hit | Perf + privacy |
| **2026-08-07** | **Icons: lucide-react at stroke 1.25** | Matches editorial serif weight |
| **2026-08-07** | **No dark patterns** — no countdowns, no scarcity nudges, no discount stickers, no wishlist-heart-cart-badge overload | Locked; violations trigger design review |
| **2026-08-08** | **Phase 1 complete** — Kitchen Sink live at `/dev/kitchen-sink`; lint + tsc + build all clean | Ready for Phase 2 (Chrome) |
| **2026-08-08** | **Phase 2 complete** — Header + Footer + MobileNav shipped; `useFocusTrap` hook added and applied to `Drawer` + `Modal` | Ready for Phase 3 (Mock Data & Services) |
| **2026-08-08** | **Phase 3 complete** — Async, typed, paginated service layer; five new mock modules (artisans / coupons / gi / appointments / notifications); every page migrated to `await`. `Order.courier` added to types to match DATA_MODELS.md. | Ready for Phase 4 (Customer App Pages) |
| **2026-08-10** | **Phase 4 complete** — 37 routes shipped. New: collections (list + detail), real `WishlistContext` + wishlist page, URL-driven PLP filters (`FilterSidebar` + `SortBar` + `lib/filterProducts`), search results extended to categories + guilds, GI Verify modal on PDP (`GIVerifyButton`), full static content set (about, story, sustainability, contact, faq, terms, privacy, shipping, returns, gi-registry), `error.tsx` + `/coming-soon`. | Ready for Phase M (Monorepo Split) |
| **2026-08-10** | **Phase M complete** — Turborepo + pnpm workspaces. 8 packages (`ui`, `types`, `config`, `utils`, `hooks`, `services`, `tsconfig`, `eslint-config`) + 6 apps (`web`, `vendor`, `admin`, `support`, `api`, `delivery`). Zero UX regression: `@ik/web` still ships the same 37 routes. `ProvenanceCard` refactored to accept a `verifyAction` slot so `packages/ui` has no dependency on web-only features. | Ready for Phase 5 (Vendor Portal) |

## Open blockers

_None._
