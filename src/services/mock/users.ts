import type { User, Address } from '@/types';

export const CURRENT_USER: User = {
  id: 'usr-current',
  fullName: 'Amrita Devi',
  email: 'amrita@example.com',
  phone: '+91 98765 43210',
  role: 'CONSUMER',
  addresses: [
    {
      id: 'addr-1',
      label: 'HOME',
      fullName: 'Amrita Devi',
      phone: '+91 98765 43210',
      line1: 'B-14, Second Floor',
      line2: 'Nongthombam Leikai',
      city: 'Imphal',
      state: 'Manipur',
      pincode: '795001',
      landmark: 'Near Ima Keithel',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'WORK',
      fullName: 'Amrita Devi',
      phone: '+91 98765 43210',
      line1: 'Loktak Studio',
      line2: 'Sector 4',
      city: 'Imphal',
      state: 'Manipur',
      pincode: '795002',
      isDefault: false,
    },
  ] satisfies Address[],
  createdAt: '2025-01-14T00:00:00.000Z',
};
