import type { Money } from '@/types';

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPrice(paise: Money): string {
  return inrFormatter.format(paise / 100);
}

export function formatCount(n: number): string {
  return new Intl.NumberFormat('en-IN').format(n);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function pad(n: number, width = 3): string {
  return String(n).padStart(width, '0');
}
