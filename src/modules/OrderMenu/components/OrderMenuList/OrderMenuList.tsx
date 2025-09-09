import { CartItem } from "@/shared/store/cart/cartTypes";
import { OrderMenuItem } from "./OrderMenuItem";

type OrderMenuProps = {
  isOrderPage: boolean,
  checkedCartItems: CartItem[]
}

export const OrderMenuList = (props: OrderMenuProps) => {
  return (
    <div className="order-menu__items">
      {props.isOrderPage && props.checkedCartItems.length > 0 && 
        props.checkedCartItems.map((item) => (
          <OrderMenuItem key={item.product.id} item = {item} />
        ))
      } 
    </div>
  );
}
