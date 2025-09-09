import { CartItem } from "@/shared/store/cart/cartTypes";

type OrderMenuItemProps = {
  item: CartItem
}

export const OrderMenuItem = (props: OrderMenuItemProps) => {

  return (
    <div key={props.item.product.id} className="order-menu__item-details">
      <div className="order-menu__item-info">
        <img
          src={props.item.product.img}
          alt={props.item.product.name}
          className="order-menu__item-image"
        />
        <div className="order-menu__item-text">
          <span className="order-menu__item-name">{props.item.product.name}</span>
          <span className="order-menu__item-technology">
            {props.item.product.technology}
          </span>
          <span className="order-menu__item-quantity">x{props.item.quantity}</span>
        </div>
      </div>
      <span className="order-menu__item-price">
        {props.item.product.price * props.item.quantity} ₽
      </span>
    </div>
  );
};
