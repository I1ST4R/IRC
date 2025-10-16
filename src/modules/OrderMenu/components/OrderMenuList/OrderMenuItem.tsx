import { CartItem } from "@/modules/CartBody/store/cartTypes";
import { CardDescription, CardTitle } from "@/shared/ui/kit/card";

export const OrderMenuItem = ({ item }: { item: CartItem }) => {
  return (
    <div className="flex mb-1 pb-1 border-b-1">
      <img
        src={`../${item.product.img}`}
        alt={item.product.name}
        className="w-20 h-20 rounded-xl object-contain"
      />
      <div className="p-2 flex items-center gap-3">
        <div>
          <CardTitle className="tracking-wider text-sm text-[#333] font-manrope font-semibold leading-tight">
            {item.product.name}
          </CardTitle>
          <CardDescription className="text-[12px] text-[#666]">
            <p className="text-[11px]">{item.product.technology}</p>
            <p>x{item.quantity}</p>
          </CardDescription>
        </div>
        <div className="text-sm text-[#333] font-bold">
          {item.product.price * item.quantity} 
          <span>₽</span>
        </div>
      </div>
    </div>
  );
};
