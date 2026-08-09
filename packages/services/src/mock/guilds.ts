import type { Guild } from '@ik/types';
import { img } from './_media';

export const GUILDS: Guild[] = [
  {
    id: 'guild-wangkhei',
    slug: 'wangkhei-weavers',
    name: 'Wangkhei Weavers',
    region: 'Wangkhei, Imphal East',
    foundedYear: 1978,
    story:
      'A collective of forty-two women who inherited the phanek loom from their mothers. Rimjhim Konjengbam leads the guild; her indigo vats have run without break since 2003.',
    cover: img('guild-wangkhei-cover', 1600, 900, 'A row of looms in a wooden hut'),
    portrait: img('guild-wangkhei-portrait', 900, 1200, 'Rimjhim at her loom, side portrait'),
    memberCount: 42,
    specialisations: ['Meitei phanek', 'Natural indigo', 'Muga silk'],
  },
  {
    id: 'guild-longpi',
    slug: 'longpi-potters',
    name: 'Longpi Potters of Nunggbi',
    region: 'Nunggbi, Ukhrul',
    foundedYear: 1892,
    story:
      'A Tangkhul village where every household still fires the stone-pot without a wheel. Ashem Chumthing’s kiln has been continuous for four generations.',
    cover: img('guild-longpi-cover', 1600, 900, 'A hillside firing pit with smoke rising'),
    portrait: img('guild-longpi-portrait', 900, 1200, 'A potter shaping clay by hand'),
    memberCount: 28,
    specialisations: ['Wheel-less pottery', 'Open-fire firing', 'Serpentine stone'],
  },
  {
    id: 'guild-thanga',
    slug: 'thanga-reedweavers',
    name: 'Thanga Reed Weavers',
    region: 'Thanga, Loktak',
    foundedYear: 1961,
    story:
      'The women of Thanga harvest Kauna reed from the floating phumdis of Loktak lake. Every basket takes forty days from cut to finish.',
    cover: img('guild-thanga-cover', 1600, 900, 'Kauna reed drying in a courtyard'),
    portrait: img('guild-thanga-portrait', 900, 1200, 'A weaver braiding kauna'),
    memberCount: 34,
    specialisations: ['Kauna reed', 'Basketry', 'Cushions'],
  },
  {
    id: 'guild-imphal-silk',
    slug: 'imphal-silk-house',
    name: 'Imphal Silk House',
    region: 'Kongba, Imphal East',
    foundedYear: 1969,
    story:
      'A muga silk co-operative pairing wild-silk spinners of Cachar with weavers of Kongba. Their signature is the un-dyed golden stole.',
    cover: img('guild-silk-cover', 1600, 900, 'Silk cocoons on a reeling machine'),
    portrait: img('guild-silk-portrait', 900, 1200, 'A weaver examining muga silk'),
    memberCount: 19,
    specialisations: ['Muga silk', 'Wild silk spinning', 'Natural dyes'],
  },
];

export function findGuild(slug: string): Guild | undefined {
  return GUILDS.find((g) => g.slug === slug);
}

export function findGuildById(id: string): Guild | undefined {
  return GUILDS.find((g) => g.id === id);
}
