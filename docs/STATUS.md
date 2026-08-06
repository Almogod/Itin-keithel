# Itin Keithel — Status

> Live progress tracker. Update as work lands. Keyed to phases in [ROADMAP.md](./ROADMAP.md).

**Legend:** ✅ done · 🟡 in progress · ⬜ not started · ⛔ blocked

**Last updated:** 2026-08-06

---

## Phase 1 — Monorepo Bootstrap

- ⬜ Delete legacy `src/` (App.jsx, app/, globals.css)
- ⬜ Workspace root — `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `.npmrc`, `.gitignore`
- ⬜ `packages/tsconfig` (base / nextjs / react-library / node)
- ⬜ `packages/eslint-config`
- ⬜ `packages/config` (routes, enums, uploads, env, tokens.css, tailwind.preset)
- ⬜ `packages/utils` (cn, currency, date, slugify, motion presets)
- ⬜ `packages/hooks` (useMediaQuery, useDebounce, useLockBody, useIntersection, useGsap)
- ⬜ `packages/types` (full domain set per DATA_MODELS.md)
- ⬜ `packages/ui` scaffold + `Button` primitive
- ⬜ `packages/services` scaffold + `products.service.ts` in mock mode
- ⬜ `apps/web` — boots, renders shared `Button`
- ⬜ `apps/vendor` — boots
- ⬜ `apps/admin` — boots
- ⬜ `apps/support` — boots
- ⬜ `apps/api` — boots + `/api/v1/health`
- ⬜ `apps/delivery` — "Coming Soon" placeholder
- ⬜ `pnpm dev` runs all five active apps on distinct ports
- ⬜ Root `build`, `lint`, `typecheck` clean

## Phase 2 — Design System (`packages/ui`)

### Primitives
- ⬜ `Button`
- ⬜ `Input` / `Textarea` / `Select`
- ⬜ `Checkbox` / `Radio` / `Switch`
- ⬜ `Card`
- ⬜ `Modal` / `Drawer`
- ⬜ `Toast`
- ⬜ `Tabs`
- ⬜ `Accordion`
- ⬜ `Breadcrumb`
- ⬜ `Badge`
- ⬜ `Avatar`
- ⬜ `Tooltip`
- ⬜ `Skeleton`
- ⬜ `RatingStars`
- ⬜ `Price`
- ⬜ `GITag`
- ⬜ `EmptyState` / `ErrorState`

### Patterns
- ⬜ `ProductCard`
- ⬜ `CategoryCard`
- ⬜ `ReviewCard`
- ⬜ `GuildCard`
- ⬜ `OrderRow`

### Layout & Motion
- ⬜ `Container`, `Section`, `Grid`, `Stack`, `Cluster`
- ⬜ `<FadeIn>`, `<Reveal>`, `<StaggerList>`, page transition primitive

### Demo
- ⬜ `apps/web/dev/kitchen-sink`

## Phase 3 — Mock Data & Services (`packages/services`)

- ⬜ `mock/categories.ts`
- ⬜ `mock/guilds.ts`
- ⬜ `mock/artisans.ts`
- ⬜ `mock/products.ts` (≥ 60)
- ⬜ `mock/collections.ts`
- ⬜ `mock/reviews.ts`
- ⬜ `mock/users.ts`
- ⬜ `mock/orders.ts`
- ⬜ `mock/deliveryAgents.ts`
- ⬜ `mock/coupons.ts`
- ⬜ `mock/gi.ts`
- ⬜ `mock/banners.ts`
- ⬜ `mock/appointments.ts`
- ⬜ `mock/tickets.ts`
- ⬜ `mock/messages.ts`
- ⬜ Full `services/*.service.ts` set (products, categories, guilds, vendors, orders, cart, users, reviews, coupons, banners, notifications, appointments, search, media, support)

## Phase 4 — Customer App (`apps/web`)

- ⬜ Landing
- ⬜ Collections (list + detail)
- ⬜ Categories (grid + detail)
- ⬜ PLP
- ⬜ PDP
- ⬜ Search
- ⬜ Wishlist
- ⬜ Cart (drawer + page)
- ⬜ Checkout (3-step)
- ⬜ Order Success
- ⬜ Order History (list + detail)
- ⬜ Profile
- ⬜ Settings
- ⬜ Authentication (login / signup / forgot — UI only)
- ⬜ Static Pages (About, Story, Sustainability, Craft Journal, Contact, FAQ, Terms, Privacy, Shipping, Returns)
- ⬜ 404 / 500 / Coming Soon

## Phase 5 — Vendor Portal (`apps/vendor`)

- ⬜ Portal shell (sidebar + top bar)
- ⬜ Dashboard
- ⬜ Orders
- ⬜ Products
- ⬜ Inventory
- ⬜ Analytics
- ⬜ Reviews
- ⬜ Messages
- ⬜ Profile
- ⬜ Settings

## Phase 6 — Admin Portal (`apps/admin`)

- ⬜ Portal shell
- ⬜ Dashboard
- ⬜ Analytics
- ⬜ Orders
- ⬜ Products
- ⬜ Vendor Management
- ⬜ Customer Management
- ⬜ Banner Management
- ⬜ Categories
- ⬜ Guild Management
- ⬜ Reports
- ⬜ Site Settings

## Phase 7 — Support Portal (`apps/support`)

- ⬜ Portal shell
- ⬜ Customer Lookup
- ⬜ Orders
- ⬜ Refunds
- ⬜ Complaints
- ⬜ Tickets
- ⬜ Live Chat UI
- ⬜ Knowledge Base

## Phase 8 — Signature Features

- ⬜ Hamper Builder (in `apps/web`)
- ⬜ Virtual Stylist Booking (in `apps/web` + surfaces in `apps/vendor`)
- ⬜ GI-Tag Verify modal on PDP

## Phase 9 — `apps/api` Stub Hardening

- ⬜ `/api/v1/health`
- ⬜ Route Handler skeletons per resource (return `NOT_IMPLEMENTED`)
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

## Open blockers

_None._
