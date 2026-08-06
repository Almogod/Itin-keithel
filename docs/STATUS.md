# Itin Keithel — Status

> Live progress tracker. Update as work lands. Keyed to phases in [ROADMAP.md](./ROADMAP.md).

**Legend:** ✅ done · 🟡 in progress · ⬜ not started · ⛔ blocked

**Last updated:** 2026-08-06

---

## Phase 0 — Docs & Alignment

- ✅ `PRD.md`
- ✅ `ARCHITECTURE.md`
- ✅ `DESIGN.md`
- ✅ `DATA_MODELS.md`
- ✅ `ROADMAP.md`
- ✅ `STATUS.md`
- 🟡 User approval of docs

## Phase 1 — Foundation

- ⬜ `tsconfig.json` (strict)
- ⬜ Convert `layout.jsx` → `layout.tsx`
- ⬜ Convert `page.jsx` → `page.tsx`
- ⬜ Delete `src/App.jsx`
- ⬜ Folder skeleton (`components/`, `features/`, `hooks/`, `lib/`, `services/`, `mock/`, `types/`, `constants/`, `styles/`, `utils/`)
- ⬜ `styles/tokens.css`
- ⬜ Tailwind `@theme` wired to tokens
- ⬜ `types/` — all interfaces per DATA_MODELS §19
- ⬜ `constants/routes.ts`, `env.ts`, `enums.ts`
- ⬜ `lib/cn.ts`, `currency.ts`, `date.ts`, `motion.ts`, `http.ts`
- ⬜ Providers: `Theme`, `Toast`, `Cart`, `Session`
- ⬜ `Navbar`, `Footer`, `Container`, `Section`
- ⬜ `404`, `500`, `coming-soon`
- ⬜ Build & lint clean

## Phase 2 — Design System Primitives

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
- ⬜ `ProductCard`
- ⬜ `CategoryCard`
- ⬜ `ReviewCard`
- ⬜ `/dev/kitchen-sink`

## Phase 3 — Mock Data & Services

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
- ⬜ `services/*.service.ts` (full set)

## Phase 4 — Consumer Pages

- ⬜ Home
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

## Phase 5 — Auth

- ⬜ Login
- ⬜ Signup
- ⬜ Forgot Password
- ⬜ Role-gated redirects

## Phase 6 — Vendor Portal

- ⬜ Portal shell (sidebar layout)
- ⬜ Vendor Dashboard
- ⬜ Vendor Products
- ⬜ Vendor Orders
- ⬜ Vendor Analytics

## Phase 7 — Delivery Portal

- ⬜ Delivery Dashboard
- ⬜ Delivery Orders
- ⬜ Delivery Earnings

## Phase 8 — Admin Portal

- ⬜ Admin Dashboard
- ⬜ Analytics
- ⬜ Product Management
- ⬜ Vendor Management
- ⬜ Banner Management
- ⬜ Customer Management

## Phase 9 — Signature Features

- ⬜ Hamper Builder
- ⬜ Virtual Stylist Booking
- ⬜ GI-Tag Verify modal

## Phase 10 — Polish

- ⬜ Motion pass
- ⬜ Empty / error state audit
- ⬜ Lighthouse + a11y
- ⬜ README refresh
- ⬜ Backend handoff notes

---

## Decisions log

| Date | Decision | Notes |
|---|---|---|
| 2026-08-06 | Delete `src/App.jsx`; start clean | User directive |
| 2026-08-06 | Full TypeScript from the start | User directive |
| 2026-08-06 | Package manager = pnpm | Matches existing lockfile |
| 2026-08-06 | In-memory state only; no `localStorage` | Per PRD non-goals |

## Open blockers

_None._
