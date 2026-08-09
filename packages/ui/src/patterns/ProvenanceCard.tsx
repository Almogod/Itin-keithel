import type { ReactNode } from 'react';
import type { Provenance } from '@ik/types';
import { pad, cn } from '@ik/utils';
import { MetaTable } from '../primitives/MetaTable';
import { Eyebrow } from '../primitives/Eyebrow';

export interface ProvenanceCardProps {
  provenance: Provenance;
  verifyAction?: ReactNode;
  className?: string;
}

export function ProvenanceCard({ provenance, verifyAction, className }: ProvenanceCardProps) {
  const rows = [
    { label: 'Artisan', value: provenance.artisan },
    { label: 'Village', value: provenance.village },
    { label: 'Craft', value: provenance.craft },
    { label: 'Fibre', value: provenance.fibre ?? provenance.material ?? '—' },
    { label: 'Days to make', value: pad(provenance.daysToMake) },
    { label: 'Year', value: String(provenance.year) },
    ...(provenance.giCode
      ? [{ label: 'GI code', value: provenance.giCode + (provenance.giVerified ? ' (verified)' : '') }]
      : []),
  ];

  return (
    <aside className={cn('bg-canvas', className)}>
      <div className="flex items-center justify-between mb-4">
        <Eyebrow tone="vermilion">Provenance</Eyebrow>
        {provenance.giVerified ? <Eyebrow tone="muted">GI Verified</Eyebrow> : null}
      </div>
      <MetaTable rows={rows} />
      {verifyAction ? <div className="mt-4">{verifyAction}</div> : null}
    </aside>
  );
}
