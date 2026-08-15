import Link from 'next/link';
import { getGICertificates } from '@ik/services';
import { ROUTES } from '@ik/config';
import { formatDate } from '@ik/utils';
import { GIVerifyForm } from './GIVerifyForm';

export const metadata = { title: 'GI Registry' };

export default async function GIRegistryPage() {
  const certs = await getGICertificates();

  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li><Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">GI Registry</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            Provenance you can verify
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.25rem)]">
            GI registry
          </h1>
          <p className="mt-6 text-[1.0625rem] text-mono-ink leading-[1.65] max-w-2xl">
            A Geographical Indication (GI) is a legal certification that a craft belongs to a specific
            region. Every GI-eligible piece on our shelf cites its code. Enter one below to verify.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[780px] px-5 md:px-12">
          <GIVerifyForm />

          <div className="mt-14">
            <h2 className="uppercase tracking-[0.14em] text-[1rem] font-semibold text-mono-ink border-b border-mono-ink pb-3 mb-4">
              Registered crafts we work with
            </h2>
            <ul className="divide-y divide-mono-line">
              {certs.map((c) => (
                <li key={c.id} className="py-5 grid grid-cols-[auto_1fr_auto] gap-6 items-baseline">
                  <p className="uppercase tracking-[0.16em] text-[0.68rem] font-semibold text-brand-red tabular-nums w-20">
                    {c.code}
                  </p>
                  <div>
                    <p className="uppercase tracking-[0.02em] text-[0.9375rem] font-medium text-mono-ink">
                      {c.productName}
                    </p>
                    <p className="text-[0.8125rem] text-mono-muted uppercase tracking-[0.08em]">
                      Issued to {c.issuedTo}
                    </p>
                  </div>
                  <p className="text-[0.8125rem] text-mono-muted tabular-nums">{formatDate(c.issuedOn)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
