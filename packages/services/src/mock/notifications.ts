import type { Notification } from '@ik/types';

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'ntf-001',
    userId: 'usr-current',
    type: 'ORDER_UPDATE',
    title: 'Your order is out for delivery',
    body: 'IK-2026-0491 is with the courier and expected today.',
    href: '/account/orders/IK-2026-0491',
    isRead: false,
    createdAt: '2026-08-07T08:00:00.000Z',
  },
  {
    id: 'ntf-002',
    userId: 'usr-current',
    type: 'GUILD_STORY',
    title: 'A new essay from Wangkhei',
    body: 'The Indigo Vat of Wangkhei — six-minute read.',
    href: '/journal/the-indigo-vat-of-wangkhei',
    isRead: true,
    createdAt: '2026-07-19T09:00:00.000Z',
  },
  {
    id: 'ntf-003',
    userId: 'usr-current',
    type: 'BACK_IN_STOCK',
    title: 'Longpi Water Kettle is back',
    body: 'The kettle you saved is available again.',
    href: '/shop/longpi-kettle',
    isRead: false,
    createdAt: '2026-08-05T10:00:00.000Z',
  },
];

export function notificationsFor(userId: string): Notification[] {
  return NOTIFICATIONS.filter((n) => n.userId === userId);
}
