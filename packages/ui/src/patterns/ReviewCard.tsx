import { Star } from 'lucide-react';
import type { Review } from '@ik/types';
import { formatDate } from '@ik/utils';
import { Avatar } from '../primitives/Avatar';
import { Badge } from '../primitives/Badge';
import { cn } from '@ik/utils';

export interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <article className={cn('flex flex-col gap-3 py-6 border-t border-mono-line', className)}>
      <header className="flex items-start gap-3">
        <Avatar name={review.authorName} src={review.authorAvatar?.src} shape="circle" size={40} />
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="uppercase tracking-[0.02em] text-[0.9375rem] font-medium text-mono-ink">
              {review.authorName}
            </h4>
            {review.isVerifiedPurchase ? <Badge tone="green">Verified</Badge> : null}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-0.5 text-brand-red" aria-label={review.rating + ' of 5'}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  strokeWidth={1.5}
                  className={i < review.rating ? 'fill-brand-red' : 'text-mono-line'}
                />
              ))}
            </div>
            <time className="text-[0.72rem] uppercase tracking-[0.1em] text-mono-muted">
              {formatDate(review.createdAt)}
            </time>
          </div>
        </div>
      </header>
      {review.title ? (
        <h5 className="uppercase tracking-[0.02em] text-[1.0625rem] font-semibold text-mono-ink">
          {review.title}
        </h5>
      ) : null}
      <p className="text-[0.9375rem] text-mono-ink leading-[1.6]">{review.body}</p>
    </article>
  );
}
