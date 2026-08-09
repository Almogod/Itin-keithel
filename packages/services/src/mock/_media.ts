import type { Media } from '@ik/types';

export function img(seed: string, w: number, h: number, alt: string): Media {
  return {
    id: seed,
    src: 'https://picsum.photos/seed/' + encodeURIComponent(seed) + '/' + w + '/' + h,
    alt,
    width: w,
    height: h,
  };
}
