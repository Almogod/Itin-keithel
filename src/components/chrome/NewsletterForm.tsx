'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/primitives/Button';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'submitted'>('idle');

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState('submitted');
    setEmail('');
  }

  if (state === 'submitted') {
    return (
      <p className="text-[0.875rem] text-muted italic">
        Thank you — a note is on its way to your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 max-w-sm">
      <label htmlFor="newsletter-email" className="small-caps text-[0.7rem] text-muted">
        A quiet letter, once a month
      </label>
      <div className="flex items-center gap-2 border-b border-ink pb-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email"
          className="flex-1 bg-transparent outline-none text-ink placeholder:text-ink-300"
        />
        <Button type="submit" variant="text" size="sm">
          Subscribe
        </Button>
      </div>
    </form>
  );
}
