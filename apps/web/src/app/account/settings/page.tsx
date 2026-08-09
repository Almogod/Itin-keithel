import { Stack } from '@ik/ui';
import { Switch } from '@ik/ui';
import { Select } from '@ik/ui';
import { Button } from '@ik/ui';
import { Hairline } from '@ik/ui';

export const metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="font-display text-[1.75rem] text-ink mb-6">Notifications</h2>
        <Stack gap={4}>
          <Switch label="Monthly letter" defaultChecked />
          <Switch label="Order updates by email" defaultChecked />
          <Switch label="Order updates by SMS" />
          <Switch label="New collection announcements" defaultChecked />
        </Stack>
      </section>

      <Hairline />

      <section>
        <h2 className="font-display text-[1.75rem] text-ink mb-6">Preferences</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Select
            label="Currency"
            options={[{ label: 'INR (₹)', value: 'INR' }, { label: 'USD ($)', value: 'USD' }]}
            defaultValue="INR"
          />
          <Select
            label="Region"
            options={[{ label: 'India', value: 'IN' }, { label: 'Worldwide', value: 'WW' }]}
            defaultValue="IN"
          />
        </div>
      </section>

      <Hairline />

      <section>
        <h2 className="font-display text-[1.5rem] text-danger mb-4">Danger zone</h2>
        <p className="text-[0.9375rem] text-ink-700 max-w-prose mb-4">
          Deleting your account removes your orders, wishlist, and saved addresses. This cannot be undone.
        </p>
        <Button variant="ghost">Delete account</Button>
      </section>
    </div>
  );
}
