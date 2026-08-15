import Link from 'next/link';
import { Input, Textarea } from '@ik/ui';
import { ROUTES, SITE } from '@ik/config';

export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Contact</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Write to us
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.25rem)]">
            We reply within a working day.
          </h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-16">
            <div className="flex flex-col gap-6">
              <p className="text-[1rem] text-mono-ink leading-[1.6] max-w-md">
                For orders and shipping, please quote your order code. For guild introductions
                and wholesale, please tell us the piece and the quantity.
              </p>
              <div className="flex flex-col gap-5 pt-4 border-t border-mono-ink">
                <div>
                  <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted">
                    Email
                  </p>
                  <a
                    href={'mailto:' + SITE.email}
                    className="text-[1rem] text-mono-ink hover:text-brand-red border-b border-mono-ink hover:border-brand-red pb-0.5"
                  >
                    {SITE.email}
                  </a>
                </div>
                <div>
                  <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted">
                    Studio
                  </p>
                  <p className="text-[0.9375rem] text-mono-ink leading-[1.6]">
                    Wangkhei Bazaar, Imphal East<br />
                    Manipur 795005, India
                  </p>
                </div>
                <div>
                  <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted">
                    Hours
                  </p>
                  <p className="text-[0.9375rem] text-mono-ink">Mon — Sat · 10:00 to 18:00 IST</p>
                </div>
              </div>
            </div>

            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full name" name="fullName" required />
                <Input label="Email" name="email" type="email" required />
              </div>
              <Input label="Subject" name="subject" />
              <Textarea label="Message" name="message" rows={6} required />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
                >
                  Send message <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
