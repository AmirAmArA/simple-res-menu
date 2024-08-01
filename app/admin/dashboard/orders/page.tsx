import OrdersTable from "@/components/ui/admin/orders/OrdersTable";
import { Order } from "@/types";

const OrdersPage = async () => {
  let orders: Order[] = [];

  // orders = await fetchOrders();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <OrdersTable orders={orders} />
    </div>
  );
};

export default OrdersPage;
