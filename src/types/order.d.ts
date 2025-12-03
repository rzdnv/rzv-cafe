interface OrderType {
  id: string;
  customer_name: string;
  table_number: number;
  status: string;
  total: number;
  cart: CartItem[];
}

export type { OrderType };
