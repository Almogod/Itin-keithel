export const ORDER_STATUS = [
  'PLACED',
  'CONFIRMED',
  'PACKED',
  'HANDED_TO_COURIER',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'CANCELLED',
  'RETURNED',
] as const;

export const PAYMENT_METHOD = ['CARD', 'UPI', 'NETBANKING', 'WALLET', 'COD'] as const;
export const PAYMENT_STATUS = ['PENDING', 'PAID', 'FAILED', 'REFUNDED'] as const;

export const USER_ROLE = ['CONSUMER', 'VENDOR', 'DELIVERY', 'ADMIN'] as const;

export const PRODUCT_STATUS = ['DRAFT', 'ACTIVE', 'OUT_OF_STOCK', 'ARCHIVED'] as const;
