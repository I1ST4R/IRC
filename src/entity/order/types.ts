export interface recipientInterface {
  fullName: string;
  phone: string;
  address: string;
  email: string;
  deliveryDate: string;
  comment?: string;
}

interface Order {
  id: number,
  userId: string,
  recipient: recipientInterface,
}

export interface OrdersState {
  items: Order[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

