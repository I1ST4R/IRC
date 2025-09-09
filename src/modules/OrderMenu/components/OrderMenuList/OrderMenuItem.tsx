import { CartItem } from "@/modules/CartList/store/cart/cartTypes";
import { Card, CardDescription, CardHeader, CardTitle, CardAction } from "@/shared/ui/kit/card";

type OrderMenuItemProps = {
  item: CartItem;
};

export const OrderMenuItem = (props: OrderMenuItemProps) => {
  return (
    <Card>
      <img
        src={props.item.product.img}
        alt={props.item.product.name}
        className="w-12 h-12 object-cover rounded-xl" 
      />
      <CardHeader>
        <CardTitle className="text-sm text-[#333] font-medium">{props.item.product.name}</CardTitle>
        <CardDescription className="text-[12px] text-[#666]">
          <span>
            {props.item.product.technology}
          </span>
          <span>
            x{props.item.quantity}
          </span>
        </CardDescription>
        <CardAction className="text-sm text-[#333] font-medium">
          {props.item.product.price * props.item.quantity} ₽
        </CardAction>
      </CardHeader>
    </Card>
  );
};
