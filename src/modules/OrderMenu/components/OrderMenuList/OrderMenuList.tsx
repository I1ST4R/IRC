import { CartItem } from "@/modules/CartBody/store/cartTypes";
import { OrderMenuItem } from "./OrderMenuItem";

type OrderMenuProps = {
  isOrderPage: boolean,
  checkedCartItems: CartItem[]
}

export const OrderMenuList = (props: OrderMenuProps) => {
  if(!props.isOrderPage || props.checkedCartItems.length === 0) return <></>

  return (
    <div>
      {props.checkedCartItems.map((item) => (
        <OrderMenuItem key={item.product.id} item = {item} />
      ))} 
    </div>
  );
}
