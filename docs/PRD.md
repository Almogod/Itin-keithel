# Itin Keithel — Product Requirements Document (PRD)

> **Version:** 0.1 (Frontend-only phase)
> **Owner:** Aakash
> **Last updated:** 2026-08-06
> **Status:** Living document — updated as scope evolves

---

## 1. Vision

**Itin Keithel** is a premium artisan marketplace showcasing handcrafted products from **North East India**. It positions heritage crafts — Muga silk, Majuli weaves, Sualkuchi textiles, Agartala cane, Mokokchung wood carvings, Naga jewellery — inside a **luxury retail experience** comparable in polish to **Apple, Aesop, Hermès, Tata CliQ Luxury**, while remaining unmistakably **North East Indian** in identity.

The product treats artisans as first-class citizens (through **Artisan Guilds** and **GI-tag** authenticity), not faceless suppliers. It is a **four-sided marketplace**: buyers, vendors (artisans/guilds), delivery partners, and admins.

## 2. Guiding Principles

1. **Culture over decoration** — motifs, palette, typography, and copy must reference NE India authentically; never touristy or clichéd.
2. **Restraint** — luxury is spacing, hierarchy, and micro-interactions, not heavy graphics or excessive animation.
3. **Trust** — GI-tag validation, guild provenance, and artisan stories are as important as the products themselves.
4. **Scalable from day one** — this is not a prototype. Every folder, component, and data model must survive when a real backend replaces the mock layer.
5. **Desktop-first, fully responsive** — laptop, tablet, mobile all first-class.

## 3. Target Users & Roles

| Role | Primary Goals |
|---|---|
| **Consumer / Buyer** | Discover & purchase handcrafted products, verify authenticity, follow artisan stories, gift hampers, track orders. |
| **Vendor / Artisan Guild** | List products, manage inventory, view orders & analytics, receive payouts. |
| **Delivery Partner** | See pickup queue, complete deliveries, view earnings. |
| **Admin** | Oversee catalogue, vendors, banners, customers; monitor platform analytics. |

## 4. Pages (Frontend Scope)

### Public / Consumer
- **Home** — hero, featured collections, guilds spotlight, seasonal edit
- **Collections** — curated edits (e.g. "Festive '26", "Silk Ceremony")
- **Categories** — top-level category grid (Textiles, Jewellery, Bamboo & Cane, Wood, Tea, Ceramics …)
- **Product Listing (PLP)** — filters, sort, grid/list, quick-view
- **Product Details (PDP)** — gallery, variants, artisan story, GI tag, reviews, related
- **Search** — instant results, recent, trending
- **Wishlist**
- **Shopping Cart**
- **Checkout** — address, delivery slot, payment (mock), review
- **Order Success**
- **Order History**
- **Profile**
- **Settings**

### Auth
- **Login**
- **Signup**
- **Forgot Password**

### Vendor
- **Vendor Dashboard** — KPIs, recent orders, alerts
- **Vendor Products** — CRUD (mock), inventory, GI status
- **Vendor Orders** — fulfillment queue
- **Vendor Analytics** — revenue, top products, funnel

### Delivery
- **Delivery Dashboard**
- **Delivery Orders** — pickup / in-transit / delivered
- **Delivery Earnings**

### Admin
- **Admin Dashboard**
- **Analytics**
- **Product Management**
- **Vendor Management**
- **Banner Management**
- **Customer Management**

### System
- **404**
- **500**
- **Coming Soon**

## 5. Signature Features (Beyond Standard E-com)

- **Artisan Guilds** — every product is affiliated to a guild with a public profile.
- **GI-Tag Validation** — visible authenticity indicator with a "verify" flow.
- **Hamper Builder** — configure a bamboo/rosewood casket with tea, silk, and jewellery add-ons.
- **Virtual Stylist Booking** — appointment scheduling for high-value silks/jewellery.
- **Guild-first Discovery** — browse by cooperative, not only by category.
- **Storytelling Blocks** — long-form artisan features embedded across the site.
- **Multi-role Preview** — internal ability to see the storefront as consumer / vendor / rider / admin.

## 6. Non-Goals (This Phase)

- No real backend, database, or persistence beyond in-memory state.
- No real authentication (mocked forms only).
- No real payments (checkout is UI-only).
- No `localStorage` / `sessionStorage` use for domain data (per user directive).
- No third-party BaaS (Firebase, Supabase, Prisma).
- No i18n framework yet (English only; copy structured to allow later i18n).
- No PWA / offline.
- No SEO metadata beyond per-page basics (revisited in polish phase).

## 7. Success Criteria

The frontend phase is done when:
1. Every page in §4 renders with realistic mock data via a **service layer** that mimics API responses.
2. A senior engineer can swap the mock service for a real REST client **without touching UI components**.
3. The design system supports all four roles from the same primitives (no per-role forks).
4. Lighthouse a11y & best-practices ≥ 90 on Home, PLP, PDP, Cart, Checkout.
5. All routes fully responsive (≥ 360 px width up to 1920 px).
6. Zero `any` in TypeScript, zero inline styles, zero hard-coded design tokens outside the design-system module.

## 8. Out-of-Scope but Planned (Future Phases)

- MongoDB + REST API integration
- Zoho Mail transactional flows
- Razorpay / Stripe payments
- Real auth (JWT + refresh)
- Vendor payout ledger
- Delivery partner mobile PWA
- Admin RBAC
- i18n (Assamese, Manipuri, Nagamese, Bengali, Hindi, English)

## 9. Open Questions

- Final domain / brand-mark treatment for launch?
- Exact taxonomy of categories vs. guilds (which is primary in nav)?
- Do we support digital gifting (e-vouchers) in v1?
- Return / exchange policy copy source?

---

_Related docs: [ARCHITECTURE.md](./ARCHITECTURE.md) · [DESIGN.md](./DESIGN.md) · [DATA_MODELS.md](./DATA_MODELS.md) · [ROADMAP.md](./ROADMAP.md) · [STATUS.md](./STATUS.md)_
