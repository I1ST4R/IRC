import { store } from '../../main/store';
import { recipientInterface} from "../../services/types"

export interface Order {
  id: number,
  userId: string,
  recipient: recipientInterface,
}

