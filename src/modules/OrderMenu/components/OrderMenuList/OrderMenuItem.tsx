import { CartItem } from "@/modules/CartBody/store/cartTypes";
import { 
  Card, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardAction 
} from "@/shared/ui/kit/card";

export const OrderMenuItem = ({item}: {item: CartItem}) => {
  return (
    <Card>
      <img
        src={item.product.img}
        alt={item.product.name}
        className="w-12 h-12 object-cover rounded-xl" 
      />
      <CardHeader>
        <CardTitle className="text-sm text-[#333] font-medium">{item.product.name}</CardTitle>
        <CardDescription className="text-[12px] text-[#666]">
          <span>
            {item.product.technology}
          </span>
          <span>
            x{item.quantity}
          </span>
        </CardDescription>
        <CardAction className="text-sm text-[#333] font-medium">
          {item.product.price * item.quantity} ₽
        </CardAction>
      </CardHeader>
    </Card>
  );
};
