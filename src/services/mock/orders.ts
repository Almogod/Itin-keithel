import type { Order, OrderStatus } from '@/types';
import { img } from './_media';
import { USERS } from './users';

const AMRITA = USERS[0]!;
const ANANYA = USERS[1]!;
const MIRA = USERS[2]!;
const KABIR = USERS[3]!;
const PRIYA = USERS[4]!;
const TARA = USERS[5]!;

interface Seed {
  id: string;
  code: string;
  user: (typeof USERS)[number];
  status: OrderStatus;
  placedAt: string;
  expectedDeliveryAt: string;
  deliveredAt?: string;
  items: Array<{
    id: string;
    productId: string;
    variantId: string;
    quantity: number;
    title: string;
    guildName: string;
    slug: string;
    unitPrice: number;
    optionLabel?: string;
  }>;
  payment: Order['payment'];
  courier?: string;
  courierTracking?: string;
  timeline: Order['timeline'];
}

const SEEDS: Seed[] = [
  {
    id: 'ord-001',
    code: 'IK-2026-0472',
    user: AMRITA,
    status: 'DELIVERED',
    placedAt: '2026-07-14T09:12:00.000Z',
    expectedDeliveryAt: '2026-07-20T00:00:00.000Z',
    deliveredAt: '2026-07-19T13:44:00.000Z',
    items: [
      {
        id: 'ci-1',
        productId: 'prod-001',
        variantId: 'var-meitei-phanek-ochre-a',
        quantity: 1,
        title: 'Meitei Phanek in Ochre',
        guildName: 'Wangkhei Weavers',
        slug: 'meitei-phanek-ochre',
        unitPrice: 780000,
      },
    ],
    payment: { method: 'UPI', status: 'PAID', transactionId: 'TXN-84321' },
    courier: 'Delhivery',
    courierTracking: 'DLV-4432198',
    timeline: [
      { status: 'PLACED', at: '2026-07-14T09:12:00.000Z' },
      { status: 'CONFIRMED', at: '2026-07-14T10:04:00.000Z' },
      { status: 'PACKED', at: '2026-07-15T08:00:00.000Z' },
      { status: 'HANDED_TO_COURIER', at: '2026-07-15T14:30:00.000Z', note: 'Delhivery' },
      { status: 'OUT_FOR_DELIVERY', at: '2026-07-19T08:12:00.000Z' },
      { status: 'DELIVERED', at: '2026-07-19T13:44:00.000Z' },
    ],
  },
  {
    id: 'ord-002',
    code: 'IK-2026-0491',
    user: AMRITA,
    status: 'OUT_FOR_DELIVERY',
    placedAt: '2026-08-01T09:14:00.000Z',
    expectedDeliveryAt: '2026-08-07T18:00:00.000Z',
    items: [
      {
        id: 'ci-2',
        productId: 'prod-005',
        variantId: 'var-longpi-serving-pot-a',
        quantity: 1,
        title: 'Longpi Serving Pot',
        guildName: 'Longpi Potters',
        slug: 'longpi-serving-pot',
        unitPrice: 340000,
      },
      {
        id: 'ci-3',
        productId: 'prod-013',
        variantId: 'var-muga-stole-natural-a',
        quantity: 1,
        title: 'Muga Stole, Natural Gold',
        guildName: 'Imphal Silk House',
        slug: 'muga-stole-natural',
        unitPrice: 640000,
      },
    ],
    payment: { method: 'CARD', status: 'PAID', transactionId: 'TXN-84990' },
    courier: 'Delhivery',
    courierTracking: 'DLV-4432240',
    timeline: [
      { status: 'PLACED', at: '2026-08-01T09:14:00.000Z' },
      { status: 'CONFIRMED', at: '2026-08-01T10:00:00.000Z' },
      { status: 'PACKED', at: '2026-08-02T08:00:00.000Z' },
      { status: 'HANDED_TO_COURIER', at: '2026-08-02T15:00:00.000Z', note: 'Delhivery' },
      { status: 'OUT_FOR_DELIVERY', at: '2026-08-07T08:00:00.000Z' },
    ],
  },
  {
    id: 'ord-003',
    code: 'IK-2026-0505',
    user: ANANYA,
    status: 'PLACED',
    placedAt: '2026-08-07T18:45:00.000Z',
    expectedDeliveryAt: '2026-08-14T18:00:00.000Z',
    items: [
      {
        id: 'ci-4',
        productId: 'prod-014',
        variantId: 'var-muga-scarf-madder-a',
        quantity: 1,
        title: 'Muga Scarf in Madder',
        guildName: 'Imphal Silk House',
        slug: 'muga-scarf-madder',
        unitPrice: 720000,
      },
    ],
    payment: { method: 'UPI', status: 'PAID', transactionId: 'TXN-85002' },
    timeline: [{ status: 'PLACED', at: '2026-08-07T18:45:00.000Z' }],
  },
  {
    id: 'ord-004',
    code: 'IK-2026-0498',
    user: MIRA,
    status: 'CONFIRMED',
    placedAt: '2026-08-05T11:22:00.000Z',
    expectedDeliveryAt: '2026-08-12T18:00:00.000Z',
    items: [
      {
        id: 'ci-5',
        productId: 'prod-009',
        variantId: 'var-kauna-round-basket-a',
        quantity: 2,
        title: 'Kauna Round Basket',
        guildName: 'Thanga Reed Weavers',
        slug: 'kauna-round-basket',
        unitPrice: 145000,
      },
    ],
    payment: { method: 'CARD', status: 'PAID', transactionId: 'TXN-84999' },
    timeline: [
      { status: 'PLACED', at: '2026-08-05T11:22:00.000Z' },
      { status: 'CONFIRMED', at: '2026-08-05T12:00:00.000Z' },
    ],
  },
  {
    id: 'ord-005',
    code: 'IK-2026-0500',
    user: KABIR,
    status: 'PACKED',
    placedAt: '2026-08-06T09:00:00.000Z',
    expectedDeliveryAt: '2026-08-13T18:00:00.000Z',
    items: [
      {
        id: 'ci-6',
        productId: 'prod-016',
        variantId: 'var-muga-shawl-plain-a',
        quantity: 1,
        title: 'Muga Shawl, Plain Weave',
        guildName: 'Imphal Silk House',
        slug: 'muga-shawl-plain',
        unitPrice: 980000,
      },
    ],
    payment: { method: 'NETBANKING', status: 'PAID', transactionId: 'TXN-85010' },
    timeline: [
      { status: 'PLACED', at: '2026-08-06T09:00:00.000Z' },
      { status: 'CONFIRMED', at: '2026-08-06T09:30:00.000Z' },
      { status: 'PACKED', at: '2026-08-07T10:00:00.000Z' },
    ],
  },
  {
    id: 'ord-006',
    code: 'IK-2026-0503',
    user: PRIYA,
    status: 'HANDED_TO_COURIER',
    placedAt: '2026-08-04T14:00:00.000Z',
    expectedDeliveryAt: '2026-08-11T18:00:00.000Z',
    items: [
      {
        id: 'ci-7',
        productId: 'prod-021',
        variantId: 'var-wood-champak-bowl-a',
        quantity: 1,
        title: 'Champak Wood Bowl',
        guildName: 'Longpi Potters of Nunggbi',
        slug: 'wood-champak-bowl',
        unitPrice: 175000,
      },
    ],
    payment: { method: 'CARD', status: 'PAID', transactionId: 'TXN-85021' },
    courier: 'Bluedart',
    courierTracking: 'BD-3391772',
    timeline: [
      { status: 'PLACED', at: '2026-08-04T14:00:00.000Z' },
      { status: 'CONFIRMED', at: '2026-08-04T14:20:00.000Z' },
      { status: 'PACKED', at: '2026-08-05T09:00:00.000Z' },
      { status: 'HANDED_TO_COURIER', at: '2026-08-05T16:00:00.000Z', note: 'Bluedart' },
    ],
  },
  {
    id: 'ord-007',
    code: 'IK-2026-0455',
    user: TARA,
    status: 'DELIVERED',
    placedAt: '2026-07-02T09:00:00.000Z',
    expectedDeliveryAt: '2026-07-09T18:00:00.000Z',
    deliveredAt: '2026-07-08T12:30:00.000Z',
    items: [
      {
        id: 'ci-8',
        productId: 'prod-017',
        variantId: 'var-cane-lamp-tall-a',
        quantity: 1,
        title: 'Cane Lamp, Tall',
        guildName: 'Thanga Reed Weavers',
        slug: 'cane-lamp-tall',
        unitPrice: 320000,
      },
    ],
    payment: { method: 'UPI', status: 'PAID', transactionId: 'TXN-84200' },
    courier: 'Delhivery',
    courierTracking: 'DLV-4431701',
    timeline: [
      { status: 'PLACED', at: '2026-07-02T09:00:00.000Z' },
      { status: 'CONFIRMED', at: '2026-07-02T09:20:00.000Z' },
      { status: 'PACKED', at: '2026-07-03T10:00:00.000Z' },
      { status: 'HANDED_TO_COURIER', at: '2026-07-03T16:00:00.000Z', note: 'Delhivery' },
      { status: 'OUT_FOR_DELIVERY', at: '2026-07-08T08:00:00.000Z' },
      { status: 'DELIVERED', at: '2026-07-08T12:30:00.000Z' },
    ],
  },
  {
    id: 'ord-008',
    code: 'IK-2026-0399',
    user: ANANYA,
    status: 'CANCELLED',
    placedAt: '2026-06-18T20:00:00.000Z',
    expectedDeliveryAt: '2026-06-25T18:00:00.000Z',
    items: [
      {
        id: 'ci-9',
        productId: 'prod-023',
        variantId: 'var-wood-hair-comb-a',
        quantity: 1,
        title: 'Hand-Carved Hair Comb',
        guildName: 'Longpi Potters of Nunggbi',
        slug: 'wood-hair-comb',
        unitPrice: 45000,
      },
    ],
    payment: { method: 'UPI', status: 'REFUNDED', transactionId: 'TXN-83100' },
    timeline: [
      { status: 'PLACED', at: '2026-06-18T20:00:00.000Z' },
      { status: 'CONFIRMED', at: '2026-06-18T20:30:00.000Z' },
      { status: 'CANCELLED', at: '2026-06-19T09:00:00.000Z', note: 'Customer request' },
    ],
  },
  {
    id: 'ord-009',
    code: 'IK-2026-0421',
    user: MIRA,
    status: 'RETURNED',
    placedAt: '2026-06-30T12:00:00.000Z',
    expectedDeliveryAt: '2026-07-07T18:00:00.000Z',
    deliveredAt: '2026-07-06T14:00:00.000Z',
    items: [
      {
        id: 'ci-10',
        productId: 'prod-018',
        variantId: 'var-cane-tray-oval-a',
        quantity: 1,
        title: 'Cane Tray, Oval',
        guildName: 'Thanga Reed Weavers',
        slug: 'cane-tray-oval',
        unitPrice: 115000,
      },
    ],
    payment: { method: 'CARD', status: 'REFUNDED', transactionId: 'TXN-83800' },
    courier: 'Delhivery',
    courierTracking: 'DLV-4431490',
    timeline: [
      { status: 'PLACED', at: '2026-06-30T12:00:00.000Z' },
      { status: 'CONFIRMED', at: '2026-06-30T12:20:00.000Z' },
      { status: 'PACKED', at: '2026-07-01T10:00:00.000Z' },
      { status: 'HANDED_TO_COURIER', at: '2026-07-01T15:00:00.000Z', note: 'Delhivery' },
      { status: 'OUT_FOR_DELIVERY', at: '2026-07-06T09:00:00.000Z' },
      { status: 'DELIVERED', at: '2026-07-06T14:00:00.000Z' },
      { status: 'RETURNED', at: '2026-07-14T11:00:00.000Z', note: 'Slight damage' },
    ],
  },
  {
    id: 'ord-010',
    code: 'IK-2026-0508',
    user: PRIYA,
    status: 'PLACED',
    placedAt: '2026-08-07T22:15:00.000Z',
    expectedDeliveryAt: '2026-08-14T18:00:00.000Z',
    items: [
      {
        id: 'ci-11',
        productId: 'prod-012',
        variantId: 'var-kauna-bread-tray-a',
        quantity: 2,
        title: 'Kauna Bread Tray',
        guildName: 'Thanga Reed Weavers',
        slug: 'kauna-bread-tray',
        unitPrice: 78000,
      },
      {
        id: 'ci-12',
        productId: 'prod-022',
        variantId: 'var-wood-serving-spoons-a',
        quantity: 1,
        title: 'Serving Spoons (Pair)',
        guildName: 'Longpi Potters of Nunggbi',
        slug: 'wood-serving-spoons',
        unitPrice: 95000,
      },
    ],
    payment: { method: 'UPI', status: 'PAID', transactionId: 'TXN-85088' },
    timeline: [{ status: 'PLACED', at: '2026-08-07T22:15:00.000Z' }],
  },
];

function toOrder(seed: Seed): Order {
  const items = seed.items.map((it) => ({
    id: it.id,
    productId: it.productId,
    variantId: it.variantId,
    quantity: it.quantity,
    addedAt: seed.placedAt,
    snapshot: {
      title: it.title,
      optionLabel: it.optionLabel ?? 'One size',
      unitPrice: it.unitPrice,
      image: img('prod-' + it.slug + '-1', 400, 500, it.title),
      guildName: it.guildName,
      slug: it.slug,
    },
  }));
  const subtotal = items.reduce((s, it) => s + it.snapshot.unitPrice * it.quantity, 0);
  const totals = { subtotal, discount: 0, shipping: 0, tax: 0, total: subtotal };
  const address = seed.user.addresses[0]!;
  const order: Order = {
    id: seed.id,
    code: seed.code,
    userId: seed.user.id,
    items,
    totals,
    status: seed.status,
    timeline: seed.timeline,
    shippingAddress: address,
    billingAddress: address,
    payment: seed.payment,
    placedAt: seed.placedAt,
    expectedDeliveryAt: seed.expectedDeliveryAt,
  };
  if (seed.deliveredAt) order.deliveredAt = seed.deliveredAt;
  if (seed.courier || seed.courierTracking) {
    order.courier = {
      provider: seed.courier ?? 'Delhivery',
      trackingNumber: seed.courierTracking ?? 'DLV-0000000',
    };
  }
  return order;
}

export const ORDERS: Order[] = SEEDS.map(toOrder);

export function findOrder(code: string): Order | undefined {
  return ORDERS.find((o) => o.code === code);
}
