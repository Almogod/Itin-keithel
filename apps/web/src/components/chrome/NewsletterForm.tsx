'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

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
      <p className="text-[0.8125rem] text-mono-muted">
        Thank you — a note is on its way to your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <label htmlFor="newsletter-email" className="uppercase tracking-[0.18em] text-[0.68rem] font-medium text-mono-muted">
        A quiet letter, once a month
      </label>
      <div className="flex items-stretch gap-0">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email"
          className="flex-1 min-w-0 bg-transparent border border-mono-ink border-r-0 px-3 py-2.5 text-[0.875rem] text-mono-ink placeholder:text-mono-muted focus:outline-none focus:border-mono-ink"
        />
        <button
          type="submit"
          className="uppercase tracking-[0.18em] text-[0.7rem] font-semibold px-4 py-2.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
        >
          Subscribe
        </button>
      </div>
      <p className="text-[0.68rem] text-mono-muted">
        By subscribing you agree to our privacy policy.
      </p>
    </form>
  );
}
