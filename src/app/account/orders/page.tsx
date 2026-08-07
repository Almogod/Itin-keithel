import { OrderRow } from '@/components/patterns/OrderRow';
import { ordersApi, usersApi } from '@/services';

export const metadata = { title: 'Orders' };

export default function OrdersPage() {
  const user = usersApi.current();
  const orders = ordersApi.byUser(user.id);
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
