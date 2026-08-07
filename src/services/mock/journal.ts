import type { JournalArticle } from '@/types';
import { img } from './_media';

export const JOURNAL: JournalArticle[] = [
  {
    id: 'jrn-001',
    slug: 'the-indigo-vat-of-wangkhei',
    title: 'The Indigo Vat of Wangkhei',
    eyebrow: 'The Craft',
    excerpt:
      'A single copper vat, three generations, and the slow chemistry of blue that turns cotton into a garment worn for a lifetime.',
    body: 'Full essay body — placeholder for markdown-rendered content in a future phase.',
    cover: img('journal-indigo', 1600, 1067, 'Copper vat with indigo dye'),
    author: 'Priyokumar Devi',
    publishedAt: '2026-07-18T00:00:00.000Z',
    readMinutes: 6,
  },
  {
    id: 'jrn-002',
    slug: 'nunggbi-fire',
    title: 'Nunggbi Fire',
    eyebrow: 'The Village',
    excerpt:
      'How the potters of Nunggbi have fired their black stone-pots without a wheel and without a kiln for four generations.',
    body: 'Full essay body — placeholder for markdown-rendered content in a future phase.',
    cover: img('journal-nunggbi', 1600, 1067, 'Hillside firing of Longpi pots'),
    author: 'Chinglemba Singh',
    publishedAt: '2026-07-02T00:00:00.000Z',
    readMinutes: 8,
  },
];
