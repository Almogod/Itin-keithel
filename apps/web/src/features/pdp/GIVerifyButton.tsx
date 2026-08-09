'use client';

import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import type { GICertificate } from '@ik/types';
import { Modal } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { verifyGICertificate } from '@ik/services';
import { formatDate } from '@ik/utils';

export function GIVerifyButton({ code }: { code: string }) {
  const [open, setOpen] = useState(false);
  const [cert, setCert] = useState<GICertificate | null | 'loading'>(null);

  async function openModal() {
    setOpen(true);
    if (cert !== null && cert !== 'loading') return;
    setCert('loading');
    const c = await verifyGICertificate(code);
    setCert(c);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center gap-2 text-[0.8125rem] text-vermilion hover:text-vermilion-hover underline underline-offset-4"
      >
        <ShieldCheck size={14} strokeWidth={1.5} />
        Verify {code}
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="GI Verification" size="sm">
        {cert === 'loading' || cert === null ? (
          <p className="text-[0.9375rem] text-muted">Checking the GI registry…</p>
        ) : (
          <div className="flex flex-col gap-4">
            <Eyebrow tone="vermilion">Verified · {cert.code}</Eyebrow>
            <p className="font-display text-[1.375rem] text-ink leading-tight">{cert.productName}</p>
            <Hairline />
            <dl className="flex flex-col gap-3 text-[0.9375rem]">
              <Row label="Issued to" value={cert.issuedTo} />
              <Row label="Issued on" value={formatDate(cert.issuedOn)} />
              <Row label="Status" value={cert.status.toLowerCase()} />
            </dl>
            <p className="text-[0.75rem] text-muted mt-2">
              This confirms the craft is registered with the Geographical Indications Registry, India.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-4">
      <dt className="small-caps text-[0.72rem] text-muted">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
