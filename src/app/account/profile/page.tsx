import { Input } from '@/components/primitives/Input';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/primitives/Button';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Badge } from '@/components/primitives/Badge';
import { getCurrentUser } from '@/services';

export const metadata = { title: 'Profile' };

export default async function ProfilePage() {
  const user = await getCurrentUser();
  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="font-display text-[1.75rem] text-ink mb-6">Personal details</h2>
        <form className="flex flex-col gap-4">
          <Grid cols={2} gap={4}>
            <Input label="Full name" defaultValue={user.fullName} />
            <Input label="Phone" defaultValue={user.phone} />
          </Grid>
          <Input label="Email" defaultValue={user.email} type="email" />
          <div className="flex justify-end">
            <Button type="button">Save changes</Button>
          </div>
        </form>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-[1.75rem] text-ink">Addresses</h2>
          <Button variant="ghost" size="sm">+ Add address</Button>
        </div>
        <Grid cols={2} gap={6}>
          {user.addresses.map((a) => (
            <Stack key={a.id} gap={2} className="p-6 border border-ink-100 rounded-lg">
              <div className="flex items-center gap-2">
                <Eyebrow tone="muted">{a.label}</Eyebrow>
                {a.isDefault ? <Badge tone="green">Default</Badge> : null}
              </div>
              <p className="font-sans text-[0.9375rem] text-ink">{a.fullName}</p>
              <p className="text-[0.875rem] text-ink-700 leading-[1.5]">
                {a.line1}
                {a.line2 ? <><br />{a.line2}</> : null}<br />
                {a.city}, {a.state} {a.pincode}
              </p>
              <p className="text-[0.75rem] text-muted mt-1">{a.phone}</p>
            </Stack>
          ))}
        </Grid>
      </section>
    </div>
  );
}
