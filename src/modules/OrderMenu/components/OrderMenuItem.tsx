import { CartItem } from "@/shared/store/cart/cartTypes";

export const OrderMenuItem = (
  item: CartItem
) => {


  return (
    <div key={item.product.id} className="order-menu__item-details">
      <div className="order-menu__item-info">
        <img
          src={item.product.img}
          alt={item.product.name}
          className="order-menu__item-image"
        />
        <div className="order-menu__item-text">
          <span className="order-menu__item-name">{item.product.name}</span>
          <span className="order-menu__item-technology">
            {item.product.technology}
          </span>
          <span className="order-menu__item-quantity">x{item.quantity}</span>
        </div>
      </div>
      <span className="order-menu__item-price">
        {item.product.price * item.quantity} ₽
      </span>
    </div>
  );
};
