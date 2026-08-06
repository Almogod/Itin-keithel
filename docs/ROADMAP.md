# Itin Keithel — Roadmap

> Phased delivery plan. Each phase ends at a **checkpoint** where the platform is demoable and reviewable before the next phase begins.

---

## Phase 0 — Docs & Alignment ✅

- `docs/PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `DATA_MODELS.md`, `ROADMAP.md`, `STATUS.md`
- Decisions locked: TypeScript, monorepo (Turborepo), pnpm, VPS-local storage, no Auth this phase, Delivery deferred.

Checkpoint: user approves docs.

---

## Phase 1 — Monorepo Bootstrap

**Goal:** empty-but-correct Turborepo skeleton. No pages yet, but every workspace and shared preset exists.

Scope:
1. **Delete** the current single-app `src/` (including `App.jsx`, `app/`, `globals.css`).
2. **Workspace root** — `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `.npmrc`, `.gitignore`.
3. **`packages/tsconfig`** — base / nextjs / react-library / node presets.
4. **`packages/eslint-config`** — shared preset.
5. **`packages/config`** — routes, enums, uploads, env (zod), tokens.css, Tailwind preset.
6. **`packages/utils`** — cn, currency, date, slugify, motion presets.
7. **`packages/hooks`** — useMediaQuery, useDebounce, useLockBody, useIntersection, useGsap.
8. **`packages/types`** — full domain type set per DATA_MODELS.md.
9. **`packages/ui`** — scaffold with a single `Button` primitive to prove the pipeline.
10. **`packages/services`** — scaffold with `http.ts` and one service (`products`) in mock mode.
11. **`apps/web`**, **`apps/vendor`**, **`apps/admin`**, **`apps/support`** — Next.js 16 apps that boot, consume the shared Tailwind preset, and render a placeholder home.
12. **`apps/api`** — Next.js app that boots and exposes `GET /api/v1/health`.
13. **`apps/delivery`** — placeholder app with a "Coming Soon" screen.

Exit criteria:
- `pnpm install` and `pnpm build` succeed at the root.
- `pnpm dev` runs all five active apps in parallel (`web`, `vendor`, `admin`, `support`, `api`) on distinct ports.
- Every app renders the shared `Button` from `packages/ui` on its home page.
- `pnpm lint` and `pnpm typecheck` clean.

Checkpoint: user reviews scaffold.

---

## Phase 2 — Design System (`packages/ui`)

**Goal:** every reusable UI primitive and pattern exists in `packages/ui`, is styled, and is demonstrated in a **`apps/web/dev/kitchen-sink`** route (dev-only).

Primitives: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Card`, `Modal`, `Drawer`, `Toast`, `Tabs`, `Accordion`, `Breadcrumb`, `Badge`, `Avatar`, `Tooltip`, `Skeleton`, `RatingStars`, `Price`, `GITag`, `EmptyState`, `ErrorState`.

Patterns: `ProductCard`, `CategoryCard`, `ReviewCard`, `GuildCard`, `OrderRow`.

Layout primitives: `Container`, `Section`, `Grid`, `Stack`, `Cluster`.

Motion primitives: `<FadeIn>`, `<Reveal>`, `<StaggerList>`, page transitions.

Exit criteria:
- Kitchen sink renders all variants of every component.
- Keyboard / screen-reader smoke test passes.
- Motion respects `prefers-reduced-motion`.

Checkpoint: user reviews design system.

---

## Phase 3 — Mock Data & Services (`packages/services`)

**Goal:** realistic seeded catalogue + service functions the apps will call.

Deliverables:
- Mock data under `packages/services/src/mock/`:
  - ≥ 60 products across ≥ 8 categories and ≥ 6 guilds
  - ≥ 30 reviews, ≥ 8 collections, ≥ 4 banners, ≥ 8 users, ≥ 5 coupons
  - ≥ 20 orders across statuses, ≥ 4 delivery agents, ≥ 10 GI certificates, ≥ 5 appointments
  - ≥ 10 support tickets, ≥ 20 messages
- Full set of `services/*.service.ts` per ARCHITECTURE.md §6 — including `support.service.ts` (tickets, kb).

Exit criteria:
- Any app can `await getProducts()` and receive typed, paginated data.
- No app imports from `mock/` directly.

---

## Phase 4 — Customer App (`apps/web`)

Pages, in build order:
1. **Landing** — hero, featured collections, guild spotlight, editorial strips, seasonal edit, testimonials, newsletter.
2. **Collections** listing → detail.
3. **Categories** grid → detail.
4. **PLP** with filter drawer, sort, quick-view.
5. **PDP** — gallery, variant selector, GI badge, artisan story, reviews, related.
6. **Search** — instant results, trending, empty state.
7. **Wishlist**.
8. **Cart** — drawer + full page.
9. **Checkout** — 3-step (address → delivery → payment).
10. **Order Success**.
11. **Order History** + single order detail.
12. **Profile** + **Settings**.
13. **Authentication** — login, signup, forgot-password (UI shells only; no logic).
14. **Static Pages** — About, Story, Sustainability, Craft Journal, Contact, FAQ, Terms, Privacy, Shipping, Returns.
15. **404 / 500 / Coming Soon**.

Exit criteria:
- End-to-end mock journey: browse → PDP → cart → checkout → success → history.
- All pages responsive down to 360 px.

Checkpoint: user reviews consumer experience.

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
- Phases 5–7 share a "portal shell" — build the shell once inside `packages/ui` and reuse.
- Phase 8 features touch multiple apps; land after 4–7 to avoid rework.
- Phase 9 is small but proves the whole architecture works end-to-end.

_Live progress: [STATUS.md](./STATUS.md)._
