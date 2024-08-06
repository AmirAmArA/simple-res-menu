"use client";

import React, { useEffect, useState } from "react";
import OrdersTable from "@/components/ui/admin/orders/OrdersTable";
import { Order } from "@/types";

const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch("/api/orders/getOrders");
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await response.json();
  console.log("====================================");
  console.log("data", data);
  console.log("====================================");
  return data;
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage message={error} />;

  return (
    <div className="container mx-auto p-4">
      <OrdersTable orders={orders} />
    </div>
  );
};

export default OrdersPage;

const LoadingPage = () => {
  return <div>Loading...</div>;
};

type ErrorPageProps = {
  message: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return <div>Error: {message}</div>;
};
