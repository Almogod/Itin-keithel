import type { Review } from '@/types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-001',
    productId: 'prod-001',
    userId: 'usr-001',
    authorName: 'Ananya Rao',
    rating: 5,
    title: 'Every fold has weight',
    body:
      'The colour deepens when it catches the light — you can see the hand of the weaver in every inch. The tissue-wrapped packaging felt like opening a letter.',
    isVerifiedPurchase: true,
    helpfulCount: 18,
    createdAt: '2026-06-14T00:00:00.000Z',
  },
  {
    id: 'rev-002',
    productId: 'prod-001',
    userId: 'usr-002',
    authorName: 'Mira Sen',
    rating: 4,
    title: 'Beautifully made',
    body:
      'I wore it to a wedding and everyone asked about it. The border motif is more subtle than in the photographs, which I love.',
    isVerifiedPurchase: true,
    helpfulCount: 9,
    createdAt: '2026-05-22T00:00:00.000Z',
  },
  {
    id: 'rev-003',
    productId: 'prod-005',
    userId: 'usr-003',
    authorName: 'Kabir Sharma',
    rating: 5,
    title: 'The pot glows',
    body:
      'The finish is smoother than anything I own — you can see the wet cotton polish in the light. It has become the centrepiece of my kitchen shelf.',
    isVerifiedPurchase: true,
    helpfulCount: 14,
    createdAt: '2026-06-01T00:00:00.000Z',
  },
];

export function reviewsFor(productId: string): Review[] {
  return REVIEWS.filter((r) => r.productId === productId);
}
