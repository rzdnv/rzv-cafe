interface MenuItem {
  category: string;
  description: string;
  id: string;
  image_url: string;
  is_available: boolean;
  name: string;
  price: number;
}

interface DetailItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available: boolean;
}

export type { MenuItem, DetailItem };
