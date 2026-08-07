'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { AuthShell } from '@/components/chrome/AuthShell';
import { Input } from '@/components/primitives/Input';
import { Button } from '@/components/primitives/Button';
import { Checkbox } from '@/components/primitives/Checkbox';
import { ROUTES } from '@/config/routes';

export default function LoginPage() {
  const router = useRouter();

  function submit(e: FormEvent) {
    e.preventDefault();
    router.push(ROUTES.ACCOUNT);
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in"
      subtitle="A quiet corner for your orders, wishlist, and addresses."
      altText="No account yet?"
      altLabel="Create one"
      altHref={ROUTES.SIGNUP}
    >
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Input label="Email" type="email" name="email" required autoComplete="email" />
        <Input label="Password" type="password" name="password" required autoComplete="current-password" />
        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" />
          <Link href={ROUTES.FORGOT} className="text-[0.8125rem] text-muted underline underline-offset-4 hover:text-vermilion">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" fullWidth>Sign in</Button>
      </form>
    </AuthShell>
  );
}
