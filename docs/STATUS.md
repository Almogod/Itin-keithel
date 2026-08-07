# Itin Keithel — Status

> Live progress tracker. Update as work lands. Keyed to phases in [ROADMAP.md](./ROADMAP.md).

**Legend:** ✅ done · 🟡 in progress · ⬜ not started · ⛔ blocked

**Last updated:** 2026-08-07

---

## Phase 0 — Docs & Design Alignment ✅

- ✅ Reference-image analysis (9 images inspected)
- ✅ Design philosophy approved (six laws, four signature moves)
- ✅ Color system locked (Rice Paper · Loktak Ink · Kauna Reed · Muga Silk · Manipur Vermilion · Ereima Green · Loktak Indigo)
- ✅ Typography locked (Fraunces display · Inter sans)
- ✅ DESIGN.md rewritten to reflect approval
- ✅ PRD.md · ROADMAP.md · STATUS.md synced to new decisions

## Phase 1 — Single-App Foundation

- 🟡 Delete legacy `src/App.jsx` and legacy `globals.css`
- 🟡 Add `tsconfig.json` (strict) + convert `layout` / `page` to `.tsx`
- 🟡 Install `@types/react`, `@types/node`
- ⬜ `src/styles/tokens.css` — CSS custom properties for every design token
- ⬜ `src/styles/globals.css` — Tailwind v4 entry, font-face via `next/font`
- ⬜ `src/lib/cn.ts`, `src/lib/motion.ts`, `src/lib/format.ts`
- ⬜ `src/lib/hooks/` — `useMediaQuery`, `useDebounce`, `useLockBody`, `useIntersection`, `useGsap`
- ⬜ `src/types/` — full domain type set
- ⬜ `src/config/` — routes, enums, site config
- ⬜ `src/components/layout/` — `Container`, `Section`, `Stack`, `Cluster`, `Grid`
- ⬜ `src/components/primitives/` — `Button`, `Badge`, `Divider`, `Hairline`, `Eyebrow`, `Marker`, `MetaTable`, `Skeleton`, `Icon`, `Input`, `Select`, `Checkbox`, `Radio`, `Accordion`
- ⬜ `src/components/motion/` — `FadeIn`, `Reveal`, `StaggerList`, `PageTransition`
- ⬜ `app/dev/kitchen-sink/page.tsx`

## Phase 2 — Chrome

- ⬜ Header (centered serif wordmark, slim category strip on scroll, cart & search)
- ⬜ Mobile drawer (focus trap, escape to close)
- ⬜ Footer (newsletter, sitemap, cultural attribution)
- ⬜ Skip-to-content link

## Phase 3 — Mock Data & Services

- ⬜ `services/mock/categories.ts`
- ⬜ `services/mock/guilds.ts`
- ⬜ `services/mock/artisans.ts`
- ⬜ `services/mock/products.ts` (≥ 24)
- ⬜ `services/mock/collections.ts`
- ⬜ `services/mock/reviews.ts`
- ⬜ `services/mock/users.ts`
- ⬜ `services/mock/orders.ts`
- ⬜ `services/mock/coupons.ts`
- ⬜ `services/mock/gi.ts`
- ⬜ `services/mock/banners.ts`
- ⬜ `services/mock/appointments.ts`
- ⬜ Service functions (`products`, `categories`, `guilds`, `orders`, `cart`, `users`, `reviews`, `banners`, `notifications`, `appointments`, `search`)

## Phase 4 — Customer App Pages

- ⬜ Landing
- ⬜ Categories (grid + detail)
- ⬜ Collections (list + detail)
- ⬜ PLP
- ⬜ PDP (all 4 signature moves)
- ⬜ Wishlist
- ⬜ Cart (drawer + page)
- ⬜ Checkout (3-step)
- ⬜ Order Success
- ⬜ Order History (list + detail)
- ⬜ Profile
- ⬜ Settings
- ⬜ Authentication (login / signup / forgot — UI only)
- ⬜ Search
- ⬜ Static Pages (About, Story, Sustainability, Craft Journal, Contact, FAQ, Terms, Privacy, Shipping, Returns)
- ⬜ 404 / 500 / Coming Soon

## Phase M — Monorepo Split

- ⬜ Turborepo + pnpm workspaces at root
- ⬜ Move `src/` → `apps/web/`
- ⬜ Extract `packages/{ui,types,config,utils,hooks,services,tsconfig,eslint-config}`
- ⬜ Scaffold `apps/{vendor,admin,support,api,delivery}`

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

## Open blockers

_None._
