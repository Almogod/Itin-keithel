import Link from 'next/link';
import { OrderRow } from '@ik/ui';
import { getCurrentUser, getOrdersForUser } from '@ik/services';
import { ROUTES } from '@ik/config';

export default async function AccountPage() {
  const user = await getCurrentUser();
  const { items: orders } = await getOrdersForUser(user.id, { pageSize: 3 });

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Orders" value={orders.length} link={{ href: ROUTES.ORDERS, label: 'View all' }} />
        <StatCard label="Wishlist" value={4} link={{ href: ROUTES.WISHLIST, label: 'View' }} />
        <StatCard label="Addresses" value={user.addresses.length} link={{ href: ROUTES.PROFILE, label: 'Edit' }} />
      </div>

      <section>
        <div className="flex items-baseline justify-between border-b border-mono-ink pb-3 mb-6">
          <h2 className="uppercase tracking-[0.14em] text-[1rem] font-semibold text-mono-ink">
            Recent orders
          </h2>
          <Link
            href={ROUTES.ORDERS}
            className="uppercase tracking-[0.16em] text-[0.7rem] font-semibold text-mono-muted hover:text-brand-red"
          >
            All orders →
          </Link>
        </div>
        <div>
          {orders.map((o) => (
            <OrderRow key={o.id} order={o} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  link,
}: {
  label: string;
  value: number;
  link: { href: string; label: string };
}) {
  return (
    <div className="border border-mono-line p-6 flex flex-col gap-3">
      <p className="uppercase tracking-[0.16em] text-[0.68rem] font-semibold text-mono-muted">{label}</p>
      <p className="font-sans font-semibold text-[2rem] text-mono-ink tabular-nums leading-none">
        {value}
      </p>
      <Link
        href={link.href}
        className="uppercase tracking-[0.14em] text-[0.68rem] font-semibold text-mono-ink border-b border-mono-ink pb-0.5 hover:text-brand-red hover:border-brand-red self-start"
      >
        {link.label} →
      </Link>
    </div>
  );
}
