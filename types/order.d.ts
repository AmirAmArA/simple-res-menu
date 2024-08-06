export interface Order {
  id: string;
  customer: Customer;
  delivery: boolean;
  orderDate: string;
  amountPaid: number;
  status: 'new' | 'done';
  meals: OrderMeal[];
  notes: string;
}