'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Check, X } from 'lucide-react';
import { Input } from '@ik/ui';
import { Button } from '@ik/ui';
import { verifyGICertificate } from '@ik/services';
import { formatDate } from '@ik/utils';
import type { GICertificate } from '@ik/types';
import { cn } from '@ik/utils';

type Result =
  | { kind: 'idle' }
  | { kind: 'busy' }
  | { kind: 'found'; cert: GICertificate }
  | { kind: 'missing'; code: string };

export function GIVerifyForm() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<Result>({ kind: 'idle' });

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setResult({ kind: 'busy' });
    const cert = await verifyGICertificate(code.trim());
    if (cert) setResult({ kind: 'found', cert });
    else setResult({ kind: 'missing', code: code.trim() });
  }

  return (
    <div className="border border-ink-100 rounded-lg p-6">
      <form onSubmit={submit} className="flex flex-col sm:flex-row items-end gap-4">
        <div className="flex-1 w-full">
          <Input
            label="GI code"
            placeholder="e.g. GI-283"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            hint="Codes are printed on every certified piece and on the packing slip."
          />
        </div>
        <Button type="submit" disabled={result.kind === 'busy'}>
          {result.kind === 'busy' ? 'Verifying…' : 'Verify'}
        </Button>
      </form>

      {result.kind === 'found' ? (
        <ResultCard status="ok" title="Verified">
          <p className="text-[1rem] text-ink">{result.cert.productName}</p>
          <p className="text-[0.875rem] text-ink-700">
            <span className="small-caps text-muted">Issued to · </span>
            {result.cert.issuedTo}
          </p>
          <p className="text-[0.875rem] text-ink-700">
            <span className="small-caps text-muted">Issued on · </span>
            {formatDate(result.cert.issuedOn)}
          </p>
          <p className="text-[0.875rem] text-ink-700">
            <span className="small-caps text-muted">Status · </span>
            {result.cert.status.toLowerCase()}
          </p>
        </ResultCard>
      ) : null}

      {result.kind === 'missing' ? (
        <ResultCard status="err" title="Not found">
          <p className="text-[0.9375rem] text-ink-700">
            No GI certificate matched <span className="tabular-nums">{result.code}</span>. Please
            check the code and try again — GI codes look like <em>GI-283</em>.
          </p>
        </ResultCard>
      ) : null}
    </div>
  );
}

function ResultCard({
  status,
  title,
  children,
}: {
  status: 'ok' | 'err';
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'mt-6 flex gap-4 p-4 rounded-md border',
        status === 'ok' ? 'border-success/30 bg-success/5' : 'border-danger/30 bg-danger/5',
      )}
    >
      <span
        className={cn(
          'inline-flex items-center justify-center w-8 h-8 rounded-full shrink-0',
          status === 'ok' ? 'bg-success text-canvas' : 'bg-danger text-canvas',
        )}
      >
        {status === 'ok' ? <Check size={16} strokeWidth={2} /> : <X size={16} strokeWidth={2} />}
      </span>
      <div className="flex-1 flex flex-col gap-1">
        <p className="small-caps text-[0.72rem] text-muted">{title}</p>
        {children}
      </div>
    </div>
  );
}
