import { CartItem } from "@/modules/CartBody";
import { OrderMenuItem } from "./OrderMenuItem";

type OrderMenuProps = {
  isOrderPage: boolean,
  checkedCartItems: CartItem[]
}

export const OrderMenuList = (props: OrderMenuProps) => {
  console.log(props.isOrderPage)
  if(!props.isOrderPage || props.checkedCartItems.length === 0) return <></>

  return (
    <div>
      {props.checkedCartItems.map((item) => (
        <OrderMenuItem key={item.product.id} item = {item} />
      ))} 
    </div>
  );
}
