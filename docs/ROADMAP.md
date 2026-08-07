# Itin Keithel — Roadmap

> Phased delivery plan. Each phase ends at a **checkpoint** where the app is demoable and reviewable before the next phase begins.
>
> **Path decision (2026-08-07):** we build a **single Next.js app first**, structured so it maps cleanly onto `apps/web` inside the future Turborepo. All monorepo prep (splitting into `apps/*` and `packages/*`) lands as **Phase M** after Phase 4, when the customer frontend is validated.

---

## Phase 0 — Docs & Design Alignment ✅

- Reference-image analysis complete (9 images).
- Design philosophy approved: color system, typography, motion, four signature moves (Provenance Card · Chapter PDP · Oversized Marker · Framed Object Hero).
- Decisions locked: TypeScript strict, pnpm, VPS-local storage, no Auth this phase, Delivery deferred, single-app-now.
- Docs synced: PRD.md, ARCHITECTURE.md, DESIGN.md, DATA_MODELS.md, ROADMAP.md, STATUS.md.

---

## Phase 1 — Single-App Foundation

**Goal:** TypeScript Next.js app with the approved design tokens, layout primitives, and a Kitchen-Sink route proving every UI primitive.

Scope:
1. Delete legacy `src/App.jsx` and clean legacy `globals.css`.
2. Add `tsconfig.json` (strict). Convert `layout.jsx` / `page.jsx` to `.tsx`. Install `@types/react`, `@types/node`.
3. Establish target internal structure (single app now, monorepo-ready):
   ```
   src/
   ├── app/            # Next.js routes
   ├── features/       # feature modules (products, cart, orders, …)
   ├── components/     # UI primitives + patterns (→ packages/ui later)
   ├── lib/            # utils, hooks, motion, cn
   ├── services/       # mock services (→ packages/services later)
   ├── types/          # domain types (→ packages/types later)
   ├── config/         # routes, enums (→ packages/config later)
   └── styles/         # tokens.css, globals.css
   ```
4. **`src/styles/tokens.css`** — every color / typography / spacing / radius / shadow / motion token from DESIGN.md as CSS custom properties, plumbed into Tailwind v4 `@theme`.
5. **`src/styles/globals.css`** — Tailwind entry, base reset, font-face declarations (Fraunces + Inter via `next/font`), scrollbar & selection colors.
6. **`src/lib/cn.ts`**, **`src/lib/motion.ts`** (Framer presets), **`src/lib/format.ts`** (currency in paise, dates).
7. **`src/lib/hooks/`** — `useMediaQuery`, `useDebounce`, `useLockBody`, `useIntersection`, `useGsap`.
8. **`src/types/`** — full domain type set per DATA_MODELS.md.
9. **`src/config/routes.ts`**, **`src/config/enums.ts`**, **`src/config/site.ts`**.
10. **`src/components/layout/`** — `Container`, `Section`, `Stack`, `Cluster`, `Grid`.
11. **`src/components/primitives/`** — `Button`, `Badge`, `Divider`, `Hairline`, `Eyebrow`, `Marker` (Oversized Marker), `MetaTable` (Provenance Card scaffold), `Skeleton`, `Icon` (lucide wrapper), `Input`, `Select`, `Checkbox`, `Radio`, `Accordion`.
12. **`src/components/motion/`** — `FadeIn`, `Reveal`, `StaggerList`, `PageTransition`.
13. **`app/dev/kitchen-sink/page.tsx`** — internal route rendering every primitive, every variant, with keyboard smoke test.

Exit criteria:
- `pnpm dev` runs a clean Next.js 16 app on `http://localhost:3000`.
- Kitchen-sink renders every primitive; keyboard tab-order works; `prefers-reduced-motion` respected.
- Zero `any`. Zero inline styles. Zero hex outside tokens.css.
- `pnpm lint` clean.

Checkpoint: user reviews Kitchen Sink.

---

## Phase 2 — Chrome (Nav + Footer)

**Goal:** the two elements that appear on every page.

- Editorial header: centered Fraunces wordmark, slim category strip on scroll, cart & search icons, mobile drawer.
- Footer: newsletter (one line, ghost button), sitemap, cultural attribution ("Rooted in Manipur · Woven by Guilds"), fine print.
- Skip-to-content link, focus rings visible.

Exit criteria:
- Header and Footer render across every existing route.
- Mobile drawer traps focus and returns focus on close.

---

## Phase 3 — Mock Data & Services

**Goal:** realistic seeded catalog + typed service functions.

- Mock data under `src/services/mock/`:
  - ≥ 24 products across ≥ 6 categories and ≥ 4 guilds
  - ≥ 12 reviews, ≥ 4 collections, ≥ 3 banners, ≥ 6 users, ≥ 3 coupons
  - ≥ 10 orders across statuses, ≥ 6 GI certificates, ≥ 3 appointments
- Service functions per file: `products`, `categories`, `guilds`, `orders`, `cart`, `users`, `reviews`, `banners`, `notifications`, `appointments`, `search`.
- All async, all typed, all mock-mode with 120–300ms artificial delay.

Exit criteria:
- Any page can `await getProducts()` and receive typed, paginated data.
- No page imports from `mock/` directly.

---

## Phase 4 — Customer App Pages (in order)

Build order matches the user directive (development order 10 → 20):

1. **Landing** — Framed Object hero, The Living Craft, Guild Spotlight, The Edit (3 products), Craft Journal strip, Provenance & GI, Categories 3-up, Newsletter.
2. **Categories** — grid → detail.
3. **Collections** — list → detail.
4. **PLP** — filter sidebar (desktop) / drawer (mobile), 3-up grid, text sort, numeric pagination.
5. **PDP** — full Chapter PDP (all four signature moves).
6. **Wishlist**.
7. **Cart** — drawer + full page.
8. **Checkout** — 3-step (address → delivery → payment). UI only.
9. **Order Success**.
10. **Order History** + single order detail.
11. **Profile** + **Settings**.
12. **Authentication** — login / signup / forgot-password (UI shells only).
13. **Search** — instant results, trending, empty state.
14. **Static Pages** — About, Story, Sustainability, Craft Journal, Contact, FAQ, Terms, Privacy, Shipping, Returns.
15. **404 / 500 / Coming Soon**.

Exit criteria:
- End-to-end mock journey: browse → PDP → cart → checkout → success → history.
- All pages responsive down to 360px.
- Every PDP expresses all four signature moves.

Checkpoint: user reviews the consumer experience.

---

## Phase M — Monorepo Split (after Phase 4)

Land after the customer app is validated. Zero UX change.

- Introduce Turborepo + pnpm workspaces at the root.
- Move `src/` into `apps/web/`.
- Extract shared code into `packages/ui`, `packages/types`, `packages/config`, `packages/utils`, `packages/hooks`, `packages/services`, `packages/tsconfig`, `packages/eslint-config`.
- Scaffold `apps/vendor`, `apps/admin`, `apps/support`, `apps/api`, `apps/delivery` (Coming Soon).
- `apps/api` gets `GET /api/v1/health` only.

Exit criteria:
- `pnpm dev` runs all active apps in parallel on distinct ports.
- `pnpm build`, `pnpm lint`, `pnpm typecheck` clean.
- Consumer app renders identically to Phase 4 output.

---

## Phase 5 — Vendor Portal (`apps/vendor`)

Portal shell (left sidebar, top utility bar) + pages:
- Dashboard, Orders, Products, Inventory, Analytics, Reviews, Messages, Profile, Settings.

Exit criteria:
- Vendor can walk an order through the fulfilment states in mock.
- CRUD flows go through services; no UI hard-codes.

---

## Phase 6 — Admin Portal (`apps/admin`)

Portal shell + pages:
- Dashboard, Analytics, Orders, Products, Vendor Management, Customer Management, Banner Management, Categories, Guild Management, Reports, Site Settings.

Exit criteria:
- Admin can toggle a banner active/inactive and see it reflected on the customer Landing (via mock service round-trip).

---

## Phase 7 — Support Portal (`apps/support`)

Portal shell + pages:
- Customer Lookup, Orders, Refunds, Complaints, Tickets, Live Chat UI, Knowledge Base.

Exit criteria:
- Agent can open a ticket, link it to an order, and mark it resolved (in mock).

---

## Phase 8 — Signature Features

Cross-app features gated by feature flags:
- **Hamper Builder** (cart-integrated in `apps/web`).
- **Virtual Stylist Booking** (`apps/web` + surfaces in `apps/vendor`).
- **GI-Tag Verify** modal on PDP.

---

## Phase 9 — `apps/api` Stub Hardening

Even though the backend is not implemented this phase, tighten the scaffold so it's a small step from stub to real:
- `/api/v1/health`
- Route Handler skeletons per resource that return `{ ok: false, error: { code: 'NOT_IMPLEMENTED' } }`
- zod schemas for every request/response (empty bodies until Phase 10+).
- `packages/services` toggle: setting `NEXT_PUBLIC_MOCK=0` starts hitting `apps/api` and receiving the standard "not implemented" envelope — proving the wire is real without any DB.

Exit criteria:
- Flipping `NEXT_PUBLIC_MOCK` doesn't break the customer app — errors render through `ErrorState` cleanly.

---

## Phase 10 — Polish & Handoff

- Motion pass across every app (page transitions, hero timelines).
- Empty & error states audited.
- Lighthouse a11y sweep on `apps/web`.
- README + `CONTRIBUTING.md` + per-app READMEs.
- Handoff notes for the backend team on wiring real APIs, MongoDB, storage, mailer, cache, search, and auth.

---

## Deferred (Future Phases, Outside This Roadmap)

- **Authentication** (JWT + refresh, role-gated redirects across apps).
- **`apps/delivery`** full implementation.
- **Payments** integration (Razorpay).
- **Redis** + **Meilisearch/Typesense** wiring.
- Vendor payouts.
- Admin RBAC.
- i18n.

---

## Sequencing Notes

- Phases 1–3 are **not user-facing** but are the highest-leverage work. Ship them tightly.
- Phase 4 is the single largest block; sub-checkpoint after PLP + PDP.
- **Phase M (Monorepo split) lands after Phase 4** — customer app is validated first, then extracted.
- Phases 5–7 share a "portal shell" — build the shell once inside `packages/ui` and reuse.
- Phase 8 features touch multiple apps; land after 4–7 to avoid rework.
- Phase 9 is small but proves the whole architecture works end-to-end.

_Live progress: [STATUS.md](./STATUS.md)._
