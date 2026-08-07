import type { Banner } from '@/types';
import { img } from './_media';

export const BANNERS: Banner[] = [
  {
    id: 'bnr-home-hero',
    slot: 'HOME_HERO',
    title: 'A Winter Catalog of Muga',
    subtitle: 'Ten pieces, one guild, one season.',
    media: img('home-hero', 1600, 1200, 'A hand-loomed muga stole in warm light'),
    ctaLabel: 'Read the edit',
    ctaHref: '/collections/winter-muga',
    startsAt: '2026-06-01T00:00:00.000Z',
    endsAt: '2027-01-01T00:00:00.000Z',
    isActive: true,
    priority: 1,
  },
];
