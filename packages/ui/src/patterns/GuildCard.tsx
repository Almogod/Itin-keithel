import Link from 'next/link';
import type { Guild } from '@ik/types';
import { ROUTES } from '@ik/config';
import { cn } from '@ik/utils';

export interface GuildCardProps {
  guild: Guild;
  className?: string;
}

export function GuildCard({ guild, className }: GuildCardProps) {
  return (
    <Link href={ROUTES.GUILD(guild.slug)} className={cn('group flex flex-col gap-3', className)}>
      <div className="relative overflow-hidden bg-mono-line aspect-[3/4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={guild.portrait.src}
          alt={guild.portrait.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="uppercase tracking-[0.02em] font-sans font-semibold text-[1.125rem] text-mono-ink group-hover:text-brand-red transition-colors">
          {guild.name}
        </h3>
        <p className="text-[0.75rem] uppercase tracking-[0.14em] font-medium text-mono-muted">
          {guild.region} · {guild.memberCount} weavers
        </p>
      </div>
    </Link>
  );
}
