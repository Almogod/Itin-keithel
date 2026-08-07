'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { AuthShell } from '@/components/chrome/AuthShell';
import { Input } from '@/components/primitives/Input';
import { Button } from '@/components/primitives/Button';
import { ROUTES } from '@/config/routes';

export default function ForgotPage() {
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <AuthShell
      eyebrow="Reset"
      title="Forgot password"
      subtitle="Enter your email and we'll send a reset link."
      altText="Remembered?"
      altLabel="Sign in"
      altHref={ROUTES.LOGIN}
    >
      {sent ? (
        <p className="text-[1rem] text-ink-700">
          If an account exists for that email, a reset link is on its way.
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Input label="Email" type="email" name="email" required autoComplete="email" />
          <Button type="submit" fullWidth>Send reset link</Button>
        </form>
      )}
    </AuthShell>
  );
}
