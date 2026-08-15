# BRKTHRU.store — UI/UX Inspiration Reference

Analysis of https://brkthru.store/ as a design + feature reference for building a similar streetwear/apparel storefront.

---

## 1. Brand Positioning

- **Category:** Contemporary streetwear / casual apparel (D2C).
- **Tagline:** *"BRKTHRU isn't for those who settle. It's for the ones who crave something bigger."*
- **Voice:** Bold, confident, anti-conformist, youth-oriented.
- **Audience:** Young adults (India-focused, ships internationally with unified INR pricing).
- **Catalog:** T-Shirts, Shirts, Hoodies, Pants, Denim, Puffers, Hats, Accessories — organized by **seasonal collections** (SS'26, Winter '25, Fall '25, SS'25, Winter '24).

---

## 2. Tech Stack (observed)

| Layer | Detected |
|---|---|
| Platform | **Shopify** ("Powered by Shopify" in footer) |
| Templating | Liquid (Shopify native, likely on **Dawn** or a custom OS 2.0 theme) |
| Assets | `cdn.shopify.com` with dynamic `?width=` params for responsive images |
| URL scheme | `/collections/*`, `/products/*`, `/cart`, `/policies/*` |
| Pagination | Query-string `?page=N` |

**Takeaway for our stack:** If we're on Next.js, we can replicate the UX with a headless architecture (Shopify Storefront API, Medusa, or custom). Use `next/image` for the CDN-style responsive image behavior.

---

## 3. Site Map / Navigation

```
Header
├── Logo (BRKTHRU)
├── Primary nav
│   ├── All Products         → /collections/all-products
│   ├── New Arrivals         → /collections/winter-25 (latest drop)
│   ├── Shop  ▼
│   │   ├── T-Shirts         → /collections/essentials-tee
│   │   ├── Shirts           → /collections/shirts
│   │   ├── Hoodies          → /collections/hoodies
│   │   └── Pants            → /collections/pants
│   └── Find Your Fit        → sizing guide
└── Utilities
    ├── Search (icon → modal/drawer)
    ├── Country / Currency selector (23+ countries, INR unified)
    └── Cart (with live item count → drawer)
```

Collections surfaced elsewhere: **SS'26, Winter '25, Fall '25, SS'25, Winter '24**.

---

## 4. Homepage — Section Inventory

Ordered top-to-bottom. Each is a reusable block worth mirroring.

| # | Section | Purpose | Layout |
|---|---|---|---|
| 1 | Sticky header | Persistent nav + utilities | Logo left, nav center, utilities right |
| 2 | **Hero slider** | Brand storytelling | Full-bleed, 4 slides, arrow nav + dots |
| 3 | **Your Favourites, Restocked** | FOMO + inventory signal | Horizontal 6-product carousel, "View all" link |
| 4 | **Brkthru Recommends** | Editorial merchandising | 3–4 tile carousel |
| 5 | **New! Women's Denim** | Category spotlight | Full-width carousel |
| 6 | **Explore grid** | Category shortcuts | 4-tile image grid (Hoodies / Shirts / T-Shirts / Pants) with text overlay |
| 7 | **Lookbook** | Shoppable editorial | Full-width lifestyle photo with **hotspots** ("Show details" → product) |
| 8 | **About / Manifesto** | Brand ethos | Text block + oversized lifestyle image |
| 9 | **Service strip** | Trust signals | 4-column icon row: PAN India delivery, Fast shipping, Expert advice, Secure payment |
| 10 | **Newsletter** | Capture email | Inline form with privacy consent link |
| 11 | Footer | Site utilities | Multi-column: menu / contact / newsletter / country / legal |

---

## 5. Product Card Anatomy

```
┌──────────────────────────┐
│      Product image       │  ← swaps to alt image on hover
│  [ RESTOCK ]  [ -17% ]   │  ← stacked badges (top-left / top-right)
├──────────────────────────┤
│ Product Name             │
│ ₹1,999   ~~₹2,399~~      │  ← sale price + strikethrough compare-at
│ [XXS][XS][S][M][L][XL]   │  ← inline size pills (click = pre-select)
│ [   Add to cart   ]      │  ← primary CTA (or "Choose options")
└──────────────────────────┘
```

**Badge vocabulary:** `NEW ARRIVAL`, `RESTOCK`, `Save X%`, `Sold Out`.

**Interactions to copy:**
- Hover-swap image (front → back / detail shot).
- Inline size selection — if only one size left, jump straight to Add-to-cart.
- Sold-out sizes should render disabled but visible (never hide).

---

## 6. Collection / Listing Page

**Filter & Sort panel:**
- Sort: Featured, Most relevant, Best selling, A→Z / Z→A, Price ↑ / ↓, Date old→new / new→old.
- **Price range slider** (₹ min / max).
- **In-stock only** checkbox.
- Clear all / Apply actions.
- *(Notably missing on brkthru: size + color facets. We should add these.)*

**Grid controls (nice touch):**
- Toggle between **2-up / 3-up** columns.
- Toggle **card size** (bigger / smaller).

**Pagination:** Numbered pages (`?page=2`), not infinite scroll — better for deep linking and SEO.

**Badges live inside cards** (not floating banners in the grid) — cleaner grid rhythm.

---

## 7. Design Language

### Color palette (approximate)

| Role | Color | Hex (approx) |
|---|---|---|
| Ink / primary text | Black | `#0A0A0A` |
| Surface | White | `#FFFFFF` |
| Muted | Steel grey | `#8A8A8A` |
| Divider | Soft grey | `#E5E5E5` |
| Accent — sale badge | Red | `#E53E3E` |
| Highlight — link hover | Midnight blue | `#1B2A4E` |

High-contrast monochrome. Color enters only through product photography and the sale badge.

### Typography

- Single sans-serif family, geometric / modern.
- **All-caps** for section titles and CTAs (`EXPLORE`, `PURCHASE THE LOOK`, `ADD TO CART`).
- Tight letter spacing on display, generous on all-caps micro-copy.
- Body text left-aligned, ~16px base.

### Spacing

- Section vertical rhythm: **60–100px** desktop / **40–56px** mobile.
- Container gutters: **16–24px**.
- Card grid gap: **16–20px**.

### Imagery

- High-res product photography: **flat lay + on-model + detail**.
- Desaturated, cinematic color grading.
- Full-bleed hero and lookbook — the image *is* the layout.

### Iconography

- Minimal, line-style.
- Country flag SVGs in the region switcher.
- Arrow (`←` `→`) carousel controls.

### Tone of copy

- Short, punchy, imperative: *"Purchase the look."*, *"Find your fit."*
- Section titles double as merchandising hooks (*"Your Favourites, Restocked"*).

---

## 8. Feature Checklist

Use as a build/verify list.

- [x] Sticky header with logo / nav / search / country / cart
- [x] Multi-slide hero carousel (arrows + dots)
- [x] Sliding product rails ("Restocked", "Recommends", category-specific)
- [x] Category grid with image tiles + overlay text
- [x] **Shoppable lookbook** with hotspots → product detail
- [x] Cart drawer (empty state = "Continue shopping" CTA)
- [x] Country / currency switcher (23+ countries, unified INR)
- [x] Product cards with badges, hover-swap, inline sizes, direct add-to-cart
- [x] Filter + sort with price slider, in-stock toggle, sort options
- [x] Grid density toggle (2-up ↔ 3-up)
- [x] Sizing guide page ("Find Your Fit")
- [x] Newsletter signup w/ privacy consent
- [x] Numbered pagination
- [x] Trust-signal strip (delivery / shipping / advice / payment)
- [ ] Wishlist *(missing on brkthru — worth adding)*
- [ ] Product reviews / ratings *(missing — add for social proof)*
- [ ] Account / order tracking *(missing — add)*
- [ ] Live chat *(missing — optional)*
- [ ] Size + color facets on listing *(missing — add)*
- [ ] Quick-view modal from grid *(missing — nice-to-have)*

---

## 9. Interaction & Motion Notes

Observed / inferred:
- **Hover image swap** on product cards.
- **Carousel** transitions with arrow nav — no auto-play observed on rails; hero may auto-advance.
- **Lookbook hotspots** open detail popovers on click.
- **Cart drawer** slides in from the right (Shopify default pattern).
- Region selector opens as a dropdown/modal with searchable country list.

Suggested additions if we build:
- Subtle fade-up on scroll for section entrances (Framer Motion `whileInView`).
- Cursor-follow arrow on carousels for a more editorial feel.
- Sticky "Add to cart" bar on PDP for mobile.

---

## 10. Footer

```
Menu           Contact              Newsletter          Region
────           ───────              ──────────          ──────
Shop More      brkthrustores@…      [email input]       [country ▼]
Privacy        (social handle)      [subscribe]         INR ₹ (unified)
Shipping                            + privacy consent

© 2026 Brkthrustores · Powered by Shopify · Privacy · Shipping
```

Gaps worth improving: **social icons, payment method logos, returns policy link, help / FAQ, order tracking**.

---

## 11. Ideas Worth Stealing

1. **"Restocked" as a merchandising story** — inventory events become editorial hooks; builds loyalty and urgency.
2. **Shoppable lookbook with hotspots** — bridges editorial and e-commerce; increases session depth.
3. **Grid density + card-size toggle** on collection pages — user control that respects browsing preference.
4. **Inline size pills on the card** — one fewer click to Add-to-cart.
5. **Unified pricing across regions** — trades i18n complexity for UX simplicity (works when you have a dominant home market).
6. **All-caps micro-copy + monochrome palette** — image-forward, brand-first aesthetic that costs nothing to implement.
7. **Section titles as marketing copy** — "Your Favourites, Restocked" > "Popular Products".
8. **Numbered pagination** — better than infinite scroll for a curated 58-SKU catalog.
9. **Seasonal collections as top-level nav entries** — turns navigation into a merchandising calendar.
10. **Trust-signal strip** just before the footer — cheap, high-conversion reassurance.

---

## 12. Things To Do Better Than brkthru

- Add **size + color facets** on collection pages.
- Add **wishlist / save-for-later** (memory across sessions).
- Add **reviews and ratings** on PDP + aggregate stars on cards.
- Add **account area** (orders, addresses, returns, tracking).
- Expose **payment icons + return policy** in the footer.
- Add **breadcrumbs** on collection and product pages (SEO + orientation).
- Add **stock urgency** ("Only 2 left") where genuinely true.
- Improve **accessibility**: focus states on size pills, aria labels on carousels, dot buttons with real labels, high-contrast for the disabled sold-out sizes.
