import OrdersTable from "@/components/ui/admin/orders/OrdersTable";
import { Order } from "@/types";

const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  return response.json();
};

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
