import Link from 'next/link';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Terms</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Last updated · August 2026
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.25rem)]">
            Terms of service
          </h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12 flex flex-col gap-8 text-[1rem] text-mono-ink leading-[1.7]">
          <Clause n="1" title="Who we are">
            Itin Keithel is a partnership registered in Manipur, India. Registered office: Wangkhei
            Bazaar, Imphal East, 795005. In these terms, &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to Itin Keithel.
          </Clause>
          <Clause n="2" title="Acceptance">
            By placing an order, you agree to these terms and to our privacy policy. If you do not
            agree, please do not order.
          </Clause>
          <Clause n="3" title="Orders and pricing">
            All prices are in Indian Rupees and include applicable GST. We reserve the right to
            refuse or cancel any order, in which case we refund the full amount within seven working days.
          </Clause>
          <Clause n="4" title="Made pieces">
            Custom and ceremonial pieces are made to order and are non-returnable. Lead times are
            approximate — hand-loomed goods vary with weather, thread quality, and the maker&rsquo;s health.
          </Clause>
          <Clause n="5" title="Provenance">
            We publish the artisan, village, and (where applicable) GI code for every piece. This
            information is offered in good faith based on records provided by the guild.
          </Clause>
          <Clause n="6" title="Intellectual property">
            All photography, text, and design on this site are the property of Itin Keithel or the
            respective guilds. You may not reproduce, resell, or use them commercially without permission.
          </Clause>
          <Clause n="7" title="Limitation of liability">
            To the extent permitted by law, we are not liable for indirect or consequential loss.
            Our maximum liability for any single order is the amount you paid for that order.
          </Clause>
          <Clause n="8" title="Governing law">
            These terms are governed by the laws of India. Any dispute is subject to the exclusive
            jurisdiction of the courts of Imphal, Manipur.
          </Clause>
          <Clause n="9" title="Contact">
            Questions about these terms may be sent to hello@itin-keithel.com.
          </Clause>
        </div>
      </section>
    </div>
  );
}

function Clause({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-mono-line pb-6 last:border-none">
      <h2 className="uppercase tracking-[0.06em] font-sans font-semibold text-[1.125rem] text-mono-ink mb-2 flex items-baseline gap-3">
        <span className="text-brand-red tabular-nums">{n}.</span>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
