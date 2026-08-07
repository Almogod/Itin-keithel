# Itin Keithel — Product Requirements Document (PRD)

> **Version:** 0.3 (Design language approved · single-app-now, monorepo-later)
> **Owner:** Aakash
> **Last updated:** 2026-08-07
> **Status:** Living document — updated as scope evolves

---

## 1. Vision

**Itin Keithel** is a premium artisan marketplace showcasing the living crafts of **Manipur** (and, over time, the wider North East). It positions heritage crafts — Meitei phanek weaves, Longpi pottery, Kauna reed craft, cane and bamboo, muga silks, Loktak-lake wood, Naga jewellery — inside an experience that reads more like a **museum, an editorial magazine, and a boutique** than an ecommerce site.

The three moods, in strict order, are:
1. **Museum first** — the object is a specimen, framed and captioned.
2. **Editorial magazine second** — long-form storytelling. Every product is a piece with a village, a weaver, a dye source, a season.
3. **Boutique third** — purchase is invited quietly. Commerce disappears until the visitor wants it.

Reference constellation: **Aesop · Officine Universelle Buly · MoMA Store · a printed exhibition catalog** — not Amazon, not Shopify, not Fabindia.

The product treats artisans as first-class citizens (through **Artisan Guilds**, **GI-tag** authenticity, and the **Provenance Card** on every product) — not faceless suppliers.

Itin Keithel is **not one website**. It is a **platform** — multiple independent applications connected to one backend and one MongoDB database (see [ARCHITECTURE.md](./ARCHITECTURE.md)) — although the current phase ships a single Next.js app whose internal structure is designed to migrate cleanly into that monorepo later.

## 2. Guiding Principles

1. **The object earns the room.** If a pixel does not serve the craft, remove it. See [DESIGN.md §2](./DESIGN.md).
2. **Culture over decoration** — motifs, palette, typography, and copy must reference Manipur authentically; never touristy, never pan-Asian clichéd.
3. **Restraint** — luxury is spacing, hierarchy, and micro-interactions, not heavy graphics or excessive animation.
4. **Trust** — GI-tag validation, guild provenance, and artisan stories are structurally more important than promo copy.
5. **Enterprise from day one** — architecture must survive thousands of vendors and millions of consumers. No shortcut is worth a refactor cycle.
6. **One backend, many frontends** — every app renders from the same design system, the same types, and the same API. Consistency is structural, not a discipline.
7. **Desktop-first, fully responsive** — laptop, tablet, mobile all first-class.
8. **No dark patterns.** No countdowns, no fake scarcity, no discount stickers, no "someone in Delhi just bought this" nudges.

## 3. Applications & Roles

| App | Consumers | Primary Goals |
|---|---|---|
| **Customer Website** (`apps/web`) | Public / buyers | Discover & purchase handcrafted products, verify authenticity, follow artisan stories, gift, track orders. |
| **Vendor Portal** (`apps/vendor`) | Artisan guilds & individual artisans | List products, manage inventory, view orders & analytics, respond to reviews, message support. |
| **Admin Portal** (`apps/admin`) | Internal operations | Oversee catalogue, vendors, banners, categories, guilds, customers, reports; monitor platform. |
| **Support Portal** (`apps/support`) | Customer support agents | Look up customers & orders, process refunds, manage complaints & tickets, run live chat, curate the knowledge base. |
| **Delivery Portal** (`apps/delivery`) — **future** | Delivery partners | Assignments, navigation, earnings, proof of delivery. Placeholder in this phase. |

Each app is independently deployable, has its own domain, and consumes the same shared design system, types, and services.

## 4. Pages (Frontend Scope)

Auth is **deferred**. Frontend renders auth screens as UI shells only; no session logic is implemented this phase. See §7.

### 4.1 Customer Website (`apps/web`)

- **Landing**
- **Collections** (list + detail)
- **Categories** (grid + detail)
- **Product Listing (PLP)** — filters, sort, quick-view
- **Product Details (PDP)** — gallery, variants, artisan story, GI tag, reviews, related
- **Search** — instant results, recent, trending
- **Wishlist**
- **Cart**
- **Checkout** — address, delivery slot, payment (UI only)
- **Order Success**
- **Order History** (list + detail)
- **Profile**
- **Settings**
- **Authentication** — login, signup, forgot-password (UI shells only; deferred logic)
- **Static Pages** — About, Story, Sustainability, Craft Journal, GI Registry primer, Contact, FAQ, Terms, Privacy, Shipping, Returns
- **404 / 500 / Coming Soon**

### 4.2 Vendor Portal (`apps/vendor`)

- **Dashboard** — KPIs, recent orders, alerts
- **Orders** — fulfilment queue with status transitions
- **Products** — list, create/edit sheets, GI status, media
- **Inventory** — stock levels, low-stock alerts, variants
- **Analytics** — revenue, top products, funnel
- **Reviews** — incoming reviews, response drafts
- **Messages** — thread view with support & customers (UI only)
- **Profile** — guild bio, artisan roster, story
- **Settings** — payout account (later), preferences, notifications

### 4.3 Admin Portal (`apps/admin`)

- **Dashboard**
- **Analytics** — platform-wide KPIs, cohort views
- **Orders** — all orders, status overrides, refunds ledger
- **Products** — global catalogue moderation
- **Vendor Management** — onboarding, verification, suspensions
- **Customer Management** — profiles, communications, flags
- **Banner Management** — editorial slots on Home, Category heads, PDP sides
- **Categories** — CRUD + hierarchy
- **Guild Management** — CRUD, GI certificates, stories
- **Reports** — exports, scheduled reports
- **Site Settings** — brand config, feature flags, taxonomy toggles

### 4.4 Support Portal (`apps/support`)

- **Customer Lookup** — search by email/phone/order code
- **Orders** — investigate, annotate, transition on customer's behalf
- **Refunds** — initiate, approve (mock)
- **Complaints** — case files linked to orders and vendors
- **Tickets** — queue, priorities, assignments
- **Live Chat UI** — agent-side chat surface
- **Knowledge Base** — internal + customer-facing article management

### 4.5 Delivery Portal (`apps/delivery`) — placeholder

- **Coming Soon** screen only. Future scope: Dashboard, Assignments, Navigation, Earnings, Proof of Delivery.

## 5. Signature Features (Beyond Standard E-com)

- **The Provenance Card** — a meta table on every product: Artisan · Village · Craft · Fibre · Days-to-make · Year · GI code. Right-aligned values, small-caps labels. This is our credibility signature.
- **The Chapter PDP** — the product page is an essay in four chapters: *The Object · The Maker · The Craft · Care & Living*. Each opens with an Oversized Marker (a single serif word/number set very large).
- **The Framed Object Hero** — the object floats inside a colored vitrine frame set within the page, echoing museum display.
- **Artisan Guilds** — every product is affiliated to a guild with a public profile and portrait photography.
- **GI-Tag Validation** — visible authenticity indicator with a "verify" flow linking to the registry.
- **Hamper Builder** — configure a bamboo / rosewood / cane **casket** (Assamese heritage term) with tea, silk, and jewellery add-ons.
- **Virtual Stylist Booking** — appointment scheduling for high-value silks / jewellery.
- **Guild-first Discovery** — browse by cooperative, not only by category.
- **Craft Journal** — long-form editorial essays on techniques, seasons, and makers.

## 6. Non-Goals (This Phase)

- No backend logic. `apps/api` is scaffolded but not wired.
- No MongoDB, no Zoho, no Redis, no search engine.
- No `localStorage` / `sessionStorage` for domain data.
- **No authentication.** Auth screens exist as UI only; there is no session, no gate, no role check.
- **No payments.** Checkout is UI-only.
- No third-party BaaS.
- No i18n framework yet (English only; copy structured to allow later i18n).
- No PWA / offline.

## 7. Success Criteria

The frontend phase is done when:
1. Every page in §4 renders with realistic mock data via `src/services/*` (single-app phase) or `packages/services` (monorepo phase).
2. A senior engineer can swap `services` from mock mode to real HTTP against `apps/api` **without touching UI components**.
3. All UI is driven by tokens in `src/styles/tokens.css` — **zero hex values in components**. When monorepo lands, tokens promote to `packages/config` unchanged.
4. Lighthouse **accessibility ≥ 95** and best-practices ≥ 90 on the top consumer pages.
5. All routes fully responsive (≥ 360px width up to 1920px). PDP switches from 7/5 split to stacked below `md`.
6. **Zero `any`** in TypeScript, **zero inline styles**, zero hard-coded design tokens outside the tokens file.
7. Every product page expresses all four signature moves (Provenance Card · Chapter PDP · Oversized Marker · Framed Object Hero).
8. `prefers-reduced-motion` is honored on every animated surface.

## 8. Out-of-Scope but Planned (Future Phases)

The current frontend is architected against this target stack — see [ARCHITECTURE.md §1](./ARCHITECTURE.md).

- **Backend:** Next.js Route Handlers in `apps/api` (same monorepo); no separate service.
- **Database:** MongoDB + Mongoose (schemas mirror `packages/types`).
- **Image storage:** **VPS local filesystem** at `/var/www/itin-keithel/uploads/` (no R2, S3, Firebase, Supabase). Provider-agnostic storage service in `apps/api/src/server/storage/` — future swap is one-module change. See [ARCHITECTURE.md §3](./ARCHITECTURE.md).
- **Email:** Zoho Mail (SMTP), called only from `apps/api`.
- **Authentication:** custom (Route Handler + JWT + refresh in httpOnly cookie); not a BaaS.
- **Deployment:** Ubuntu VPS + Nginx (reverse proxy) + PM2 (per-app processes).
- **Caching:** Redis in `apps/api`.
- **Search:** Meilisearch or Typesense in `apps/api`.
- **Payments:** Razorpay.
- **Delivery portal:** full app under `apps/delivery`.
- Vendor payout ledger, Admin RBAC, i18n (Assamese, Manipuri, Nagamese, Bengali, Hindi, English).

## 9. Open Questions

- Final domain / brand-mark treatment for launch?
- Exact taxonomy of categories vs. guilds (which is primary in nav)?
- Do we support digital gifting (e-vouchers) in v1?
- Do vendors and support share a messaging backbone or do they run separately?
- Return / exchange policy copy source?

---

_Related docs: [ARCHITECTURE.md](./ARCHITECTURE.md) · [DESIGN.md](./DESIGN.md) · [DATA_MODELS.md](./DATA_MODELS.md) · [ROADMAP.md](./ROADMAP.md) · [STATUS.md](./STATUS.md)_
