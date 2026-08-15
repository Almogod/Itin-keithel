import { Input, Badge } from '@ik/ui';
import { getCurrentUser } from '@ik/services';

export const metadata = { title: 'Profile' };

export default async function ProfilePage() {
  const user = await getCurrentUser();
  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="uppercase tracking-[0.14em] text-[1.125rem] font-semibold text-mono-ink border-b border-mono-ink pb-3 mb-6">
          Personal details
        </h2>
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full name" defaultValue={user.fullName} />
            <Input label="Phone" defaultValue={user.phone} />
          </div>
          <Input label="Email" defaultValue={user.email} type="email" />
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-3 uppercase tracking-[0.2em] text-[0.75rem] font-semibold px-6 py-3.5 bg-mono-ink text-mono-surface hover:bg-brand-red transition-colors"
            >
              Save changes
            </button>
          </div>
        </form>
      </section>

      <section>
        <div className="flex items-baseline justify-between border-b border-mono-ink pb-3 mb-6">
          <h2 className="uppercase tracking-[0.14em] text-[1.125rem] font-semibold text-mono-ink">
            Addresses
          </h2>
          <button
            type="button"
            className="uppercase tracking-[0.16em] text-[0.7rem] font-semibold px-3 py-1.5 border border-mono-ink text-mono-ink hover:bg-mono-ink hover:text-mono-surface transition-colors"
          >
            + Add address
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.addresses.map((a) => (
            <div key={a.id} className="p-6 border border-mono-line flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="uppercase tracking-[0.18em] text-[0.68rem] font-semibold text-mono-muted">
                  {a.label}
                </p>
                {a.isDefault ? <Badge tone="green">Default</Badge> : null}
              </div>
              <p className="uppercase tracking-[0.02em] text-[0.9375rem] font-medium text-mono-ink">
                {a.fullName}
              </p>
              <p className="text-[0.875rem] text-mono-ink leading-[1.5]">
                {a.line1}
                {a.line2 ? <><br />{a.line2}</> : null}<br />
                {a.city}, {a.state} {a.pincode}
              </p>
              <p className="text-[0.72rem] text-mono-muted mt-1 uppercase tracking-[0.08em]">{a.phone}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
