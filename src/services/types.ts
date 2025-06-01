
export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface LikedItem {
  productId: string;
}

export interface recipientInterface {
  fullName: string;
  phone: string;
  address: string;
  email: string;
  deliveryDate: string;
  comment?: string;
}

