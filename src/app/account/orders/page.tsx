import { OrderRow } from '@/components/patterns/OrderRow';
import { getCurrentUser, getOrdersForUser } from '@/services';

export const metadata = { title: 'Orders' };

export default async function OrdersPage() {
  const user = await getCurrentUser();
  const { items: orders } = await getOrdersForUser(user.id, { pageSize: 100 });
  return (
    <div>
      <h2 className="font-display text-[1.75rem] text-ink mb-8">All orders</h2>
      <div>
        {orders.map((o) => (
          <OrderRow key={o.id} order={o} />
        ))}
      </div>
    </div>
  );
}
