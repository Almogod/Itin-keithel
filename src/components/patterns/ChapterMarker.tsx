import { cn } from '@/lib/cn';
import { Hairline } from '@/components/primitives/Hairline';

export interface ChapterMarkerProps {
  chapter?: string;
  title: string;
  align?: 'left' | 'center';
  className?: string;
}

export function ChapterMarker({ chapter, title, align = 'left', className }: ChapterMarkerProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <div className={cn('flex flex-col gap-5', alignClass, className)}>
      {chapter ? (
        <span className="small-caps text-[0.72rem] text-vermilion tracking-[0.24em]">{chapter}</span>
      ) : null}
      <h2 className="font-display font-light text-ink text-[clamp(3rem,9vw,7rem)] leading-[0.95] tracking-[-0.02em]">
        {title}
      </h2>
      <Hairline vermilion className={cn(align === 'center' ? 'mx-auto w-24' : 'w-24')} />
    </div>
  );
}
