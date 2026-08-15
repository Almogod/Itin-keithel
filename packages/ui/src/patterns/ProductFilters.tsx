'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import type { Guild } from '@ik/types';
import { PRICE_BUCKETS, SORT_OPTIONS } from '@ik/utils';
import { Eyebrow } from '../primitives/Eyebrow';

function useFilterHelpers() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function updateMulti(key: 'guild' | 'price' | 'fibre', value: string, checked: boolean) {
    const next = new URLSearchParams(params.toString());
    const current = next.getAll(key);
    next.delete(key);
    const merged = checked ? [...current, value] : current.filter((v) => v !== value);
    for (const v of merged) next.append(key, v);
    router.replace(pathname + (next.toString() ? '?' + next.toString() : ''), { scroll: false });
  }

  function setSort(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === 'newest') next.delete('sort');
    else next.set('sort', value);
    router.replace(pathname + (next.toString() ? '?' + next.toString() : ''), { scroll: false });
  }

  function clearAll() {
    const next = new URLSearchParams();
    const sort = params.get('sort');
    if (sort && sort !== 'newest') next.set('sort', sort);
    router.replace(pathname + (next.toString() ? '?' + next.toString() : ''), { scroll: false });
  }

  return { params, updateMulti, setSort, clearAll };
}

export function FilterSidebar({ guilds, fibres }: { guilds: Guild[]; fibres: string[] }) {
  const { params, updateMulti, clearAll } = useFilterHelpers();

  const selected = useMemo(
    () => ({
      guild: params.getAll('guild'),
      price: params.getAll('price'),
      fibre: params.getAll('fibre'),
    }),
    [params],
  );

  const hasAny = selected.guild.length + selected.price.length + selected.fibre.length > 0;

  return (
    <aside className="flex flex-col gap-8">
      <p className="uppercase tracking-[0.16em] text-[0.68rem] font-semibold text-mono-ink border-b border-mono-ink pb-2">
        Filter &amp; sort
      </p>
      {hasAny ? (
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center gap-2 uppercase tracking-[0.14em] text-[0.7rem] font-semibold text-mono-muted hover:text-mono-ink self-start"
        >
          <X size={14} strokeWidth={1.5} />
          Clear all
        </button>
      ) : null}

      <Group title="Guild">
        {guilds.map((g) => (
          <FilterCheck
            key={g.id}
            label={g.name}
            checked={selected.guild.includes(g.slug)}
            onChange={(c) => updateMulti('guild', g.slug, c)}
          />
        ))}
      </Group>

      <Group title="Price">
        {PRICE_BUCKETS.map((b) => (
          <FilterCheck
            key={b.key}
            label={b.label}
            checked={selected.price.includes(b.key)}
            onChange={(c) => updateMulti('price', b.key, c)}
          />
        ))}
      </Group>

      {fibres.length > 0 ? (
        <Group title="Fibre">
          {fibres.map((f) => (
            <FilterCheck
              key={f}
              label={f}
              checked={selected.fibre.includes(f)}
              onChange={(c) => updateMulti('fibre', f, c)}
            />
          ))}
        </Group>
      ) : null}
    </aside>
  );
}

export function SortBar({ totalCount }: { totalCount: number }) {
  const { params, setSort } = useFilterHelpers();
  const current = params.get('sort') ?? 'newest';

  return (
    <div className="flex items-center justify-between mb-10 border-b border-mono-line pb-4">
      <p className="uppercase tracking-[0.16em] text-[0.72rem] font-semibold text-mono-ink tabular-nums">
        {totalCount} pieces
      </p>
      <label className="inline-flex items-center gap-3">
        <span className="uppercase tracking-[0.16em] text-[0.68rem] font-semibold text-mono-muted">
          Sort
        </span>
        <select
          value={current}
          onChange={(e) => setSort(e.target.value)}
          className="bg-transparent uppercase tracking-[0.14em] text-[0.72rem] font-semibold text-mono-ink border-none focus:outline-none cursor-pointer"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow tone="ink">{title}</Eyebrow>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function FilterCheck({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <li>
      <label className="inline-flex items-center gap-2.5 text-[0.875rem] text-mono-ink cursor-pointer hover:text-brand-red transition-colors">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="accent-mono-ink"
        />
        {label}
      </label>
    </li>
  );
}
