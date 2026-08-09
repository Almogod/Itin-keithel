'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { AuthShell } from '@/components/chrome/AuthShell';
import { Input } from '@ik/ui';
import { Button } from '@ik/ui';
import { Checkbox } from '@ik/ui';
import { ROUTES } from '@ik/config';

export default function SignupPage() {
  const router = useRouter();

  function submit(e: FormEvent) {
    e.preventDefault();
    router.push(ROUTES.ACCOUNT);
  }

  return (
    <AuthShell
      eyebrow="Join the house"
      title="Create your account"
      subtitle="Named, small, and quiet — for the pieces you love."
      altText="Already registered?"
      altLabel="Sign in"
      altHref={ROUTES.LOGIN}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Input label="Full name" name="fullName" required />
        <Input label="Email" type="email" name="email" required autoComplete="email" />
        <Input label="Password" type="password" name="password" required autoComplete="new-password" hint="Minimum 8 characters." />
        <Checkbox label="I would like the monthly letter." />
        <Button type="submit" fullWidth>Create account</Button>
      </form>
    </AuthShell>
  );
}
