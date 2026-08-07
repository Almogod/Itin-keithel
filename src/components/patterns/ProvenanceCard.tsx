import type { Provenance } from '@/types';
import { pad } from '@/lib/format';
import { MetaTable } from '@/components/primitives/MetaTable';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { cn } from '@/lib/cn';

export interface ProvenanceCardProps {
  provenance: Provenance;
  className?: string;
}

export function ProvenanceCard({ provenance, className }: ProvenanceCardProps) {
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
    </aside>
  );
}
