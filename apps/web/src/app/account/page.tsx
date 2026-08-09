import Link from 'next/link';
import { Grid } from '@ik/ui';
import { Frame } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { OrderRow } from '@ik/ui';
import { getCurrentUser, getOrdersForUser } from '@ik/services';
import { ROUTES } from '@ik/config';

export default async function AccountPage() {
  const user = await getCurrentUser();
  const { items: orders } = await getOrdersForUser(user.id, { pageSize: 3 });

  return (
    <div className="flex flex-col gap-12">
      <Grid cols={3} gap={6}>
        <Frame tone="frame" padding="sm" radius="md">
          <Eyebrow tone="muted">Orders</Eyebrow>
          <p className="mt-2 font-display text-[2rem] text-ink tabular-nums">{orders.length}</p>
          <Link href={ROUTES.ORDERS} className="text-[0.8125rem] underline underline-offset-4 text-muted hover:text-vermilion">
            View all
          </Link>
        </Frame>
        <Frame tone="frame" padding="sm" radius="md">
          <Eyebrow tone="muted">Wishlist</Eyebrow>
          <p className="mt-2 font-display text-[2rem] text-ink tabular-nums">4</p>
          <Link href={ROUTES.WISHLIST} className="text-[0.8125rem] underline underline-offset-4 text-muted hover:text-vermilion">
            View
          </Link>
        </Frame>
        <Frame tone="frame" padding="sm" radius="md">
          <Eyebrow tone="muted">Addresses</Eyebrow>
          <p className="mt-2 font-display text-[2rem] text-ink tabular-nums">{user.addresses.length}</p>
          <Link href={ROUTES.PROFILE} className="text-[0.8125rem] underline underline-offset-4 text-muted hover:text-vermilion">
            Edit
          </Link>
        </Frame>
      </Grid>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-[1.5rem] text-ink">Recent orders</h2>
          <Link href={ROUTES.ORDERS} className="text-[0.875rem] text-muted underline underline-offset-4 hover:text-vermilion">
            All orders
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
