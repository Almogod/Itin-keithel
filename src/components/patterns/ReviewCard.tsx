import { Star } from 'lucide-react';
import type { Review } from '@/types';
import { formatDate } from '@/lib/format';
import { Avatar } from '@/components/primitives/Avatar';
import { Badge } from '@/components/primitives/Badge';
import { cn } from '@/lib/cn';

export interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <article className={cn('flex flex-col gap-3 py-6 border-t border-ink-100', className)}>
      <header className="flex items-start gap-3">
        <Avatar name={review.authorName} src={review.authorAvatar?.src} shape="circle" size={40} />
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="font-sans text-[0.9375rem] font-medium text-ink">{review.authorName}</h4>
            {review.isVerifiedPurchase ? <Badge tone="green">Verified</Badge> : null}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-0.5 text-vermilion" aria-label={review.rating + ' of 5'}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  strokeWidth={1.25}
                  className={i < review.rating ? 'fill-vermilion' : 'text-ink-300'}
                />
              ))}
            </div>
            <time className="text-[0.75rem] text-muted">{formatDate(review.createdAt)}</time>
          </div>
        </div>
      </header>
      {review.title ? <h5 className="font-display text-[1.125rem] text-ink">{review.title}</h5> : null}
      <p className="text-[0.9375rem] text-ink-700 leading-[1.6]">{review.body}</p>
    </article>
  );
}
