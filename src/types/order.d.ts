interface MenuItem {
  category: string;
  description: string;
  id: string;
  image_url: string;
  is_available: boolean;
  name: string;
  price: number;
}

interface ReviewItem {
  id: string;
  menu_item_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
}

interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  customer_name: string;
  table_number: number;
  status: string;
  total: number;
  cart: CartItem[];
}

export type { MenuItem, ReviewItem, CartItem, Order };
