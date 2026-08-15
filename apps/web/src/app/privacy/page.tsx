import Link from 'next/link';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Privacy</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Last updated · August 2026
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.25rem)]">
            Privacy policy
          </h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12 flex flex-col gap-10 text-[1rem] text-mono-ink leading-[1.7]">
          <PolicyBlock title="What we collect">
            <p>To place and ship your order, we collect your name, email, phone, shipping address, and payment reference. To improve the site, we also collect anonymised page views via a self-hosted analytics tool. We do not use Facebook Pixel, Google Ads, or any third-party advertising tracker.</p>
          </PolicyBlock>
          <PolicyBlock title="What we do not collect">
            <ul className="flex flex-col gap-1">
              <li>· We do not store card numbers. Payments are processed by Razorpay.</li>
              <li>· We do not sell or share your data with third parties.</li>
              <li>· We do not send unsolicited marketing.</li>
            </ul>
          </PolicyBlock>
          <PolicyBlock title="Cookies">
            <p>We use a single first-party cookie to keep you signed in and one to remember your cart. We do not use tracking cookies.</p>
          </PolicyBlock>
          <PolicyBlock title="Your rights">
            <p>You may request a copy of your personal data or ask us to delete it at any time. Write to hello@itin-keithel.com and we will action within seven working days.</p>
          </PolicyBlock>
          <PolicyBlock title="Contact">
            <p>Questions about this policy may be sent to hello@itin-keithel.com. If you are in the EU or UK, you have the right to lodge a complaint with your local data protection authority.</p>
          </PolicyBlock>
        </div>
      </section>
    </div>
  );
}

function PolicyBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="uppercase tracking-[0.14em] text-[1rem] font-semibold text-mono-ink border-b border-mono-ink pb-3 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
