export interface Order {
  id: string;
  customer: Customer;
  orderDate: string;
  amountPaid: number;
  status: string;
  meals: OrderMeal[];
}