import { recipientInterface} from "../../services/types"

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

