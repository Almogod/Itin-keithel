import { cn } from '@ik/utils';

export interface AvatarProps {
  name: string;
  src?: string;
  shape?: 'square' | 'circle';
  size?: 24 | 32 | 40 | 48 | 64 | 80;
  className?: string;
}

const SIZE = { 24: 'w-6 h-6', 32: 'w-8 h-8', 40: 'w-10 h-10', 48: 'w-12 h-12', 64: 'w-16 h-16', 80: 'w-20 h-20' };

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
}

export function Avatar({ name, src, shape = 'square', size = 40, className }: AvatarProps) {
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-md';
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center bg-frame text-ink-500 overflow-hidden',
        'font-sans text-[0.75rem] font-medium uppercase tracking-[0.06em]',
        SIZE[size],
        shapeClass,
        className,
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span aria-hidden="true">{initials(name).toUpperCase()}</span>
      )}
    </span>
  );
}
