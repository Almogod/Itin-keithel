import { Switch, Select } from '@ik/ui';

export const metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="uppercase tracking-[0.14em] text-[1.125rem] font-semibold text-mono-ink border-b border-mono-ink pb-3 mb-6">
          Notifications
        </h2>
        <div className="flex flex-col gap-4">
          <Switch label="Monthly letter" defaultChecked />
          <Switch label="Order updates by email" defaultChecked />
          <Switch label="Order updates by SMS" />
          <Switch label="New collection announcements" defaultChecked />
        </div>
      </section>

      <section>
        <h2 className="uppercase tracking-[0.14em] text-[1.125rem] font-semibold text-mono-ink border-b border-mono-ink pb-3 mb-6">
          Preferences
        </h2>
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

      <section className="border border-brand-red p-6 flex flex-col gap-3">
        <h2 className="uppercase tracking-[0.14em] text-[1rem] font-semibold text-brand-red">
          Danger zone
        </h2>
        <p className="text-[0.9375rem] text-mono-ink max-w-prose">
          Deleting your account removes your orders, wishlist, and saved addresses. This cannot be undone.
        </p>
        <button
          type="button"
          className="self-start inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[0.72rem] font-semibold px-5 py-3 border border-brand-red text-brand-red hover:bg-brand-red hover:text-mono-surface transition-colors"
        >
          Delete account
        </button>
      </section>
    </div>
  );
}
