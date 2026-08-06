# Itin Keithel — Roadmap

> Phased delivery plan. Each phase ends at a **checkpoint** where the site is demoable and reviewable before the next phase begins.

---

## Phase 0 — Docs & Alignment ✅

Deliverables:
- `docs/PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `DATA_MODELS.md`, `ROADMAP.md`, `STATUS.md`
- Decisions locked: TypeScript, App.jsx removed, pnpm, phased delivery.

Checkpoint: user approves docs.

---

## Phase 1 — Foundation

**Goal:** empty-but-correct scaffolding. No pages yet, but every file a page would need already exists and works.

Scope:
1. **TypeScript setup** — `tsconfig.json` (strict), migrate `layout.jsx` → `layout.tsx`, `page.jsx` → `page.tsx`, delete `src/App.jsx`.
2. **Folder skeleton** exactly as in `ARCHITECTURE.md` §3 (create empty `.gitkeep` files so folders commit).
3. **Design tokens** — `src/styles/tokens.css` with every variable in `DESIGN.md`.
4. **Tailwind theme wiring** — `@theme` block references tokens.
5. **Type files** — full set from `DATA_MODELS.md` §19 with real interfaces (no `TODO` bodies).
6. **Constants & config** — `constants/routes.ts`, `constants/env.ts`, `constants/enums.ts`.
7. **`lib/`** — `cn.ts`, `currency.ts`, `date.ts`, `motion.ts`, `http.ts` (mock adapter).
8. **Root providers** — `ThemeProvider`, `ToastProvider`, `CartProvider`, `SessionProvider` (all in-memory).
9. **Base layout chrome** — `<Navbar>` and `<Footer>` shells, `<Container>`, `<Section>` primitives.
10. **404 / 500 / Coming Soon** pages using primitives.

Exit criteria:
- `pnpm build` succeeds with zero TS errors and zero ESLint errors.
- Visiting `/` renders navbar + footer + placeholder home body.
- Any 404 route renders the branded 404.

Checkpoint: user reviews foundation before we build pages.

---

## Phase 2 — Design System Primitives

**Goal:** every reusable UI component exists, is styled, is documented via a props table in code, and is demo-visited at `/dev/kitchen-sink` (dev-only route).

Components: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Card`, `Modal`, `Drawer`, `Toast`, `Tabs`, `Accordion`, `Breadcrumb`, `Badge`, `Avatar`, `Tooltip`, `Skeleton`, `RatingStars`, `Price`, `GITag`, `EmptyState`, `ErrorState`, `ProductCard`, `CategoryCard`, `ReviewCard`.

Exit criteria:
- Kitchen sink page renders all variants of each component.
- All components pass keyboard & screen-reader smoke test.
- Motion respects `prefers-reduced-motion`.

Checkpoint: user reviews design system.

---

## Phase 3 — Mock Data & Service Layer

**Goal:** realistic seeded catalog and service functions the pages will call.

Deliverables:
- `mock/` — ≥ 60 products across ≥ 8 categories and ≥ 6 guilds, ≥ 30 reviews, ≥ 8 collections, ≥ 4 banners, ≥ 8 users (one per role variant), ≥ 5 coupons, ≥ 20 orders across statuses, ≥ 4 delivery agents, ≥ 10 GI certificates, ≥ 5 appointments.
- `services/*.service.ts` — full set per `ARCHITECTURE.md` §6, with artificial network delay.

Exit criteria:
- A component can `await getProducts()` and receive a typed, paginated result.
- No UI file imports from `mock/` directly.

---

## Phase 4 — Consumer Site (Public)

Pages, in build order:

1. **Home** — hero, featured collections, guild spotlight, editorial strips, seasonal edit, testimonials, newsletter.
2. **Collections** listing → single collection detail.
3. **Categories** grid → category page.
4. **Product Listing (PLP)** with filter drawer, sort, quick-view.
5. **Product Details (PDP)** — gallery, variant selector, GI badge, artisan story, reviews, related.
6. **Search** — instant results, trending, empty state.
7. **Wishlist**.
8. **Cart** — drawer + full page.
9. **Checkout** — 3-step (address → delivery → payment) with review.
10. **Order Success**.
11. **Order History** + single order detail.
12. **Profile** + **Settings**.

Exit criteria:
- End-to-end mock journey: browse → PDP → cart → checkout → success → history.
- All pages responsive down to 360 px.

Checkpoint: user reviews consumer experience.

---

## Phase 5 — Auth

Pages: Login, Signup, Forgot Password (+ mock verify screen).
Session lives in `SessionProvider`. Role-gated routes redirect appropriately.

Exit criteria:
- Fake-login as any role transitions cleanly to the right dashboard.

---

## Phase 6 — Vendor Portal

Pages: Vendor Dashboard, Vendor Products (list + create/edit sheets), Vendor Orders (queue with status transitions), Vendor Analytics (KPIs + charts stubs).

Exit criteria:
- Layout shell with left sidebar, top utility bar, consistent with brand.
- All CRUD is mock-through-service (no UI hard-codes).

---

## Phase 7 — Delivery Portal

Pages: Delivery Dashboard, Delivery Orders (pickup / in-transit / delivered), Delivery Earnings.

Exit criteria:
- Rider can walk an order from `HANDED_TO_COURIER` → `DELIVERED` in the mock timeline.

---

## Phase 8 — Admin Portal

Pages: Admin Dashboard, Analytics, Product Management, Vendor Management, Banner Management, Customer Management.

Exit criteria:
- Admin can toggle a banner active/inactive and see it reflected on Home (in-memory).

---

## Phase 9 — Signature Features

- **Hamper Builder** flow (cart-integrated).
- **Virtual Stylist Booking** flow.
- **GI-Tag Verify** modal on PDP.

---

## Phase 10 — Polish & Handoff

- Motion pass across the site (page transitions, hero GSAP timelines).
- Empty & error states audited.
- Lighthouse audit; a11y sweep.
- README + `CONTRIBUTING.md`.
- Handoff notes for backend team on where to wire real APIs.

---

## Sequencing Notes

- Phases 1–3 are **not user-facing** but are the highest-leverage work. Ship them tightly.
- Phase 4 is the single largest block; expect to sub-checkpoint after PLP+PDP.
- Phases 6–8 share a "portal shell" that must be built once and reused.
- Phase 9 features touch multiple portals; land them after 4 & 6 to avoid rework.

_Live progress: [STATUS.md](./STATUS.md)._
