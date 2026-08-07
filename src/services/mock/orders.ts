import type { Order } from '@/types';
import { img } from './_media';
import { CURRENT_USER } from './users';

export const ORDERS: Order[] = [
  {
    id: 'ord-001',
    code: 'IK-2026-0472',
    userId: CURRENT_USER.id,
    items: [
      {
        id: 'ci-1',
        productId: 'prod-001',
        variantId: 'var-meitei-phanek-ochre-a',
        quantity: 1,
        addedAt: '2026-07-14T09:12:00.000Z',
        snapshot: {
          title: 'Meitei Phanek in Ochre',
          optionLabel: 'One size',
          unitPrice: 780000,
          image: img('prod-meitei-phanek-ochre-1', 400, 500, 'Phanek'),
          guildName: 'Wangkhei Weavers',
          slug: 'meitei-phanek-ochre',
        },
      },
    ],
    totals: { subtotal: 780000, discount: 0, shipping: 0, tax: 0, total: 780000 },
    status: 'DELIVERED',
    timeline: [
      { status: 'PLACED', at: '2026-07-14T09:12:00.000Z' },
      { status: 'CONFIRMED', at: '2026-07-14T10:04:00.000Z' },
      { status: 'PACKED', at: '2026-07-15T08:00:00.000Z' },
      { status: 'HANDED_TO_COURIER', at: '2026-07-15T14:30:00.000Z', note: 'Delhivery' },
      { status: 'OUT_FOR_DELIVERY', at: '2026-07-19T08:12:00.000Z' },
      { status: 'DELIVERED', at: '2026-07-19T13:44:00.000Z' },
    ],
    shippingAddress: CURRENT_USER.addresses[0]!,
    billingAddress: CURRENT_USER.addresses[0]!,
    payment: { method: 'UPI', status: 'PAID', transactionId: 'TXN-84321' },
    placedAt: '2026-07-14T09:12:00.000Z',
    expectedDeliveryAt: '2026-07-20T00:00:00.000Z',
    deliveredAt: '2026-07-19T13:44:00.000Z',
  },
  {
    id: 'ord-002',
    code: 'IK-2026-0491',
    userId: CURRENT_USER.id,
    items: [
      {
        id: 'ci-2',
        productId: 'prod-005',
        variantId: 'var-longpi-serving-pot-a',
        quantity: 1,
        addedAt: '2026-08-01T09:12:00.000Z',
        snapshot: {
          title: 'Longpi Serving Pot',
          optionLabel: 'One size',
          unitPrice: 340000,
          image: img('prod-longpi-serving-pot-1', 400, 500, 'Longpi pot'),
          guildName: 'Longpi Potters',
          slug: 'longpi-serving-pot',
        },
      },
      {
        id: 'ci-3',
        productId: 'prod-013',
        variantId: 'var-muga-stole-natural-a',
        quantity: 1,
        addedAt: '2026-08-01T09:14:00.000Z',
        snapshot: {
          title: 'Muga Stole, Natural Gold',
          optionLabel: 'One size',
          unitPrice: 640000,
          image: img('prod-muga-stole-natural-1', 400, 500, 'Muga stole'),
          guildName: 'Imphal Silk House',
          slug: 'muga-stole-natural',
        },
      },
    ],
    totals: { subtotal: 980000, discount: 0, shipping: 0, tax: 0, total: 980000 },
    status: 'OUT_FOR_DELIVERY',
    timeline: [
      { status: 'PLACED', at: '2026-08-01T09:14:00.000Z' },
      { status: 'CONFIRMED', at: '2026-08-01T10:00:00.000Z' },
      { status: 'PACKED', at: '2026-08-02T08:00:00.000Z' },
      { status: 'HANDED_TO_COURIER', at: '2026-08-02T15:00:00.000Z', note: 'Delhivery' },
      { status: 'OUT_FOR_DELIVERY', at: '2026-08-07T08:00:00.000Z' },
    ],
    shippingAddress: CURRENT_USER.addresses[0]!,
    billingAddress: CURRENT_USER.addresses[0]!,
    payment: { method: 'CARD', status: 'PAID', transactionId: 'TXN-84990' },
    placedAt: '2026-08-01T09:14:00.000Z',
    expectedDeliveryAt: '2026-08-07T18:00:00.000Z',
  },
];

export function findOrder(code: string): Order | undefined {
  return ORDERS.find((o) => o.code === code);
}
