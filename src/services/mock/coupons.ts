import type { Coupon } from '@/types';

export const COUPONS: Coupon[] = [
  {
    id: 'cpn-001',
    code: 'FIRSTFOLD',
    description: '10% off your first order.',
    type: 'PERCENT',
    value: 10,
    minSubtotal: 200000,
    maxDiscount: 100000,
    appliesTo: {},
    usageLimitPerUser: 1,
    validFrom: '2026-01-01T00:00:00.000Z',
    validTill: '2027-01-01T00:00:00.000Z',
    isActive: true,
  },
  {
    id: 'cpn-002',
    code: 'IMPHALGIFT',
    description: '₹500 off orders over ₹6,000.',
    type: 'FLAT',
    value: 50000,
    minSubtotal: 600000,
    appliesTo: {},
    validFrom: '2026-06-01T00:00:00.000Z',
    validTill: '2026-12-31T00:00:00.000Z',
    isActive: true,
  },
  {
    id: 'cpn-003',
    code: 'MUGASHIP',
    description: 'Free shipping on the Muga collection.',
    type: 'FREE_SHIPPING',
    value: 0,
    appliesTo: { categoryIds: ['cat-muga'] },
    validFrom: '2026-06-01T00:00:00.000Z',
    validTill: '2027-01-01T00:00:00.000Z',
    isActive: true,
  },
  {
    id: 'cpn-004',
    code: 'GUILDSHARE',
    description: '5% off the Wangkhei Weavers guild — goes directly to the makers.',
    type: 'PERCENT',
    value: 5,
    appliesTo: { guildIds: ['guild-wangkhei'] },
    validFrom: '2026-01-01T00:00:00.000Z',
    validTill: '2026-12-31T00:00:00.000Z',
    isActive: true,
  },
];

export function findCoupon(code: string): Coupon | undefined {
  const upper = code.trim().toUpperCase();
  return COUPONS.find((c) => c.code === upper && c.isActive);
}
