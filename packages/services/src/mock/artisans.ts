import type { Artisan } from '@ik/types';
import { img } from './_media';

export const ARTISANS: Artisan[] = [
  {
    id: 'art-001',
    slug: 'rimjhim-konjengbam',
    name: 'Rimjhim Konjengbam',
    guildId: 'guild-wangkhei',
    role: 'Master weaver',
    yearsOfCraft: 32,
    bio:
      'Inherited her mother’s loom in 1998; runs the Wangkhei Weavers indigo vats and trains eleven apprentices.',
    portrait: img('art-rimjhim', 900, 1200, 'Rimjhim at her loom'),
    location: 'Wangkhei, Imphal East',
  },
  {
    id: 'art-002',
    slug: 'sanahal-devi',
    name: 'Sanahal Devi',
    guildId: 'guild-wangkhei',
    role: 'Weaver · dyer',
    yearsOfCraft: 21,
    bio:
      'A specialist in natural indigo, Sanahal dyes for the winter phanek edit and teaches the Wangkhei apprentices.',
    portrait: img('art-sanahal', 900, 1200, 'Sanahal beside an indigo vat'),
    location: 'Wangkhei, Imphal East',
  },
  {
    id: 'art-003',
    slug: 'ashem-chumthing',
    name: 'Ashem Chumthing',
    guildId: 'guild-longpi',
    role: 'Master potter',
    yearsOfCraft: 40,
    bio:
      'Fourth-generation Nunggbi potter. Ashem’s kiln has been continuously in use since 1985.',
    portrait: img('art-ashem', 900, 1200, 'Ashem shaping a Longpi pot'),
    location: 'Nunggbi, Ukhrul',
  },
  {
    id: 'art-004',
    slug: 'ibetombi-devi',
    name: 'Ibetombi Devi',
    guildId: 'guild-thanga',
    role: 'Reed weaver',
    yearsOfCraft: 18,
    bio:
      'Cuts and cures her own Kauna from Loktak phumdis; a founding member of the Thanga collective.',
    portrait: img('art-ibetombi', 900, 1200, 'Ibetombi weaving a basket'),
    location: 'Thanga, Bishnupur',
  },
  {
    id: 'art-005',
    slug: 'yumnam-ibetombi',
    name: 'Yumnam Ibetombi',
    guildId: 'guild-imphal-silk',
    role: 'Muga silk weaver',
    yearsOfCraft: 26,
    bio:
      'Weaves the guild’s signature undyed muga stoles; supervises the plant-dye kitchen.',
    portrait: img('art-yumnam', 900, 1200, 'Yumnam checking muga silk yarn'),
    location: 'Kongba, Imphal East',
  },
  {
    id: 'art-006',
    slug: 'priyokumar-singh',
    name: 'Priyokumar Singh',
    guildId: 'guild-longpi',
    role: 'Wood turner',
    yearsOfCraft: 14,
    bio:
      'Turns champak and teak on a foot-powered lathe; a specialist in nested bowl sets.',
    portrait: img('art-priyokumar', 900, 1200, 'Priyokumar at his lathe'),
    location: 'Andro, Imphal East',
  },
];

export function findArtisan(slug: string): Artisan | undefined {
  return ARTISANS.find((a) => a.slug === slug);
}

export function artisansInGuild(guildId: string): Artisan[] {
  return ARTISANS.filter((a) => a.guildId === guildId);
}
