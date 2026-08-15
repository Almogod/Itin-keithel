import Link from 'next/link';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Shipping' };

export default function ShippingPage() {
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Shipping</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Slow, folded, tracked
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.25rem)]">
            Shipping
          </h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12">
          <p className="text-[1.0625rem] text-mono-ink leading-[1.7]">
            We ship twice a week from Imphal — Tuesdays and Fridays. Every parcel is packed by hand,
            folded with tissue between the panels, and marked with the artisan&rsquo;s name.
          </p>

          <h2 className="uppercase tracking-[0.14em] text-[1.125rem] font-semibold text-mono-ink border-b border-mono-ink pb-3 mt-12 mb-6">
            Domestic (India)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ShipCard title="Standard" body="5 to 7 working days · free above ₹5,000, otherwise ₹150. Tracked with Delhivery." />
            <ShipCard title="Express" body="2 to 3 working days · ₹350. BlueDart priority service." />
            <ShipCard title="Same day (Imphal only)" body="₹150 · within the Imphal municipal area, order by 12:00 IST." />
            <ShipCard title="Cash on delivery" body="Available for orders below ₹15,000. Add ₹80." />
          </div>

          <h2 className="uppercase tracking-[0.14em] text-[1.125rem] font-semibold text-mono-ink border-b border-mono-ink pb-3 mt-14 mb-6">
            International
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ShipCard title="South Asia" body="7 to 10 working days · from ₹1,400. DTDC tracked." />
            <ShipCard title="Rest of world" body="10 to 21 working days · from ₹3,200. DHL tracked. Duties billed to recipient." />
          </div>

          <h2 className="uppercase tracking-[0.14em] text-[1.125rem] font-semibold text-mono-ink border-b border-mono-ink pb-3 mt-14 mb-6">
            Notes
          </h2>
          <ul className="flex flex-col gap-3 text-[1rem] text-mono-ink leading-[1.6]">
            <li>· Ceremonial pieces are made to order — please read the piece page for a lead time.</li>
            <li>· We never use plastic mailers. Some parcels arrive with a faint kraft-paper crease. That is the paper, not the piece.</li>
            <li>· For gift orders, we can omit the invoice and tuck in a hand-written note. Ask us at checkout.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function ShipCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-6 border border-mono-line flex flex-col gap-2">
      <h3 className="uppercase tracking-[0.06em] font-sans font-semibold text-[1rem] text-mono-ink">
        {title}
      </h3>
      <p className="text-[0.9375rem] text-mono-ink leading-[1.55]">{body}</p>
    </div>
  );
}
