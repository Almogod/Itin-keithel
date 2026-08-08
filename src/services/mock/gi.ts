import type { GICertificate } from '@/types';

export const GI_CERTIFICATES: GICertificate[] = [
  {
    id: 'gi-283',
    code: 'GI-283',
    productName: 'Meitei Phanek (Manipur)',
    issuedTo: 'Wangkhei Weavers Cooperative',
    issuedOn: '2010-03-14T00:00:00.000Z',
    status: 'ACTIVE',
  },
  {
    id: 'gi-118',
    code: 'GI-118',
    productName: 'Longpi Hamlei Pottery (Manipur)',
    issuedTo: 'Longpi Potters of Nunggbi',
    issuedOn: '2010-06-22T00:00:00.000Z',
    status: 'ACTIVE',
  },
  {
    id: 'gi-092',
    code: 'GI-092',
    productName: 'Kauna Reed Craft (Manipur)',
    issuedTo: 'Thanga Reed Weavers',
    issuedOn: '2012-11-04T00:00:00.000Z',
    status: 'ACTIVE',
  },
  {
    id: 'gi-005',
    code: 'GI-005',
    productName: 'Muga Silk (Assam & North East)',
    issuedTo: 'Imphal Silk House',
    issuedOn: '2006-08-30T00:00:00.000Z',
    status: 'ACTIVE',
  },
  {
    id: 'gi-410',
    code: 'GI-410',
    productName: 'Meitei Shaphee Lanphee (Manipur)',
    issuedTo: 'Manipur Handloom Cooperative',
    issuedOn: '2014-02-18T00:00:00.000Z',
    status: 'ACTIVE',
  },
  {
    id: 'gi-500',
    code: 'GI-500',
    productName: 'Chak-Hao (Manipur black rice)',
    issuedTo: 'Chak-Hao Growers Association',
    issuedOn: '2020-09-11T00:00:00.000Z',
    status: 'ACTIVE',
  },
];

export function findGICertificate(code: string): GICertificate | undefined {
  return GI_CERTIFICATES.find((c) => c.code === code.toUpperCase());
}
