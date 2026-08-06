# Itin Keithel

An NE-rooted prestige artisan e-commerce prototype — a single-page Next.js experience showcasing handcrafted textiles, heritage woodcarvings, bamboo craft, and other treasures from North East India.

The project models a full four-sided marketplace (buyer, vendor, rider, admin) inside one immersive storefront, along with luxury retail flourishes like a hero carousel, hamper builder, GI-tag validator, and virtual stylist booking.

## Highlights

- **Multi-role storefront** — switch between `consumer`, `vendor`, `delivery`, and `admin` views to see the same catalogue from every angle.
- **Guild-first catalogue** — products are grouped under artisan cooperatives (Majuli Weavers, Sualkuchi Silk, Agartala Cane, Mokokchung Carvers, and more).
- **Hamper builder** — configure a bamboo/rosewood casket with tea, silk, and jewellery add-ons directly from the cart drawer.
- **GI-tag validation** — simulated authenticity check for each Geographical Indication tag.
- **Rider logistics view** — pickup slots, geotagging, delivery confirmation, and live earnings.
- **Admin control tower** — telemetry feed, price/stock override sync, and banner flash indicators.
- **Motion & polish** — Framer Motion transitions, GSAP animations, a custom fluid cursor, and Playfair/Outfit/Inter type stack.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Webpack dev mode)
- **UI:** React 19, Tailwind CSS 4, Lucide icons
- **Animation:** Framer Motion, GSAP
- **Tooling:** ESLint 9, pnpm

## Getting Started

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # run ESLint
```

## Project Structure

```
src/
  App.jsx           # the entire storefront (data, state, and views)
  app/
    layout.jsx      # root layout, fonts, metadata
    page.jsx        # client-only shell that mounts <App />
    globals.css     # Tailwind layer + custom styles
public/
  images/           # artisan photography and logo assets
```

`src/App.jsx` is intentionally a single file — it keeps the prototype browsable end-to-end and easy to demo. Data models, role state, and every view live inside it.

## Notes

This is a UI/UX prototype: there is no backend, payments, or persistence. Cart, wishlist, manifests, and telemetry are all in-memory and reset on refresh.
