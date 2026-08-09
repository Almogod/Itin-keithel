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
    <Link href={ROUTES.GUILD(guild.slug)} className={cn('group flex flex-col gap-4', className)}>
      <div className="relative overflow-hidden rounded-lg bg-frame aspect-[3/4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={guild.portrait.src}
          alt={guild.portrait.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-[1.375rem] text-ink">{guild.name}</h3>
        <p className="text-[0.8125rem] text-muted">
          {guild.region} · {guild.memberCount} weavers
        </p>
      </div>
    </Link>
  );
}
