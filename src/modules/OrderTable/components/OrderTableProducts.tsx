import { CartItem } from "@/modules/CartBody";

export const OrderTableProducts = ({cartItems} : {cartItems: CartItem[]}) => {
  return (
    <>
      <div className="mt-1.5 mb-1">
        <b>Товары:</b>
      </div>
      <div className="space-y-2">
        {cartItems.map((item: any) => {
          return (
            <div key={item.product.id} className="flex justify-between items-start">
              <div className="flex items-start space-x-2">
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="flex flex-col">
                  <span>
                    {item.product.name}
                  </span>
                  <span>
                    {item.product.technology}
                  </span>
                  <span>
                    x{item.quantity}
                  </span>
                </div>
              </div>
              <span className="font-medium">
                {item.product.price * item.quantity} ₽
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};