import { changeCheckCart, fetchCart, fetchCartTotals, removeFromCart, updateCartItem } from "@/entity/cart/slice";
import { CartItem as ICartItem } from "@/entity/cart/types";
import { addItemToLiked, removeItemFromLiked } from "@/entity/liked/slice";
import { AppDispatch } from "@/main/store";
import { useDispatch } from "react-redux";

interface CartItemProps {
  cartItem: ICartItem;
  userId: string | null;
  isLiked: boolean;
}

export const CartItem = ({ cartItem, userId, isLiked}: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleQuantityChange = (productId: string, type: "increase" | "decrease") => {
    if ( userId ) {
      console.log(cartItem)
      if (type === "decrease" && cartItem.quantity === 1) return
      const changes = type === "increase" ? 1 : -1
      dispatch(
        updateCartItem({
          userId:  userId,
          productId: productId,
          quantity: cartItem.quantity + changes,
        })
      ).then(() => {
        dispatch(fetchCartTotals(userId));
      });
    }
  };

  const handleRemoveItem = (productId: string) => {
    if (userId) {
      dispatch(removeFromCart({ userId: userId, productId: productId })).then(() => {
        dispatch(fetchCartTotals(userId));
      });
    }
  };

  const handleChangeCheckCart = () => {
    if(userId) {
      dispatch(changeCheckCart({userId: userId, productId: cartItem.product.id}))
    }
  }

  return (
    <div key={cartItem.product.id} className="cart__item">
      <div className="cart__item-checkbox">
        <input type="checkbox" onChange= {handleChangeCheckCart} checked = {cartItem.isChecked}/>
      </div>

      <div className="cart__item-img-block">
        <img
          src={cartItem.product.img}
          alt={cartItem.product.name}
          className="cart__item-image"
        />
        <button
          className={`product__like${
            isLiked
              ? " product__like--active"
              : ""
          }`}
          onClick={() => {
            if (userId) {
              if (isLiked) {
                dispatch(
                  removeItemFromLiked({
                    userId: userId,
                    productId: cartItem.product.id,
                  })
                );
              } else {
                dispatch(
                  addItemToLiked({
                    userId: userId,
                    productId: cartItem.product.id,
                  })
                );
              }
            }
          }}
          title={
            isLiked
              ? "Убрать из избранного"
              : "В избранное"
          }
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      <div className="cart__item-text">
        <div className="cart__item-name-block">
          <p className="cart__item-name">{cartItem.product.name}</p>
          <p className="cart__item-technology">{cartItem.product.technology}</p>
        </div>

        <div className="cart__item-quantity">
          <button
            className="cart__item-quantity-btn"
            onClick={() => {
              console.log(11);
              handleQuantityChange(
                cartItem.product.id,
                'decrease'
              );
            }}
          >
            -
          </button>
          <span className="cart__item-quantity-value">{cartItem.quantity}</span>
          <button
            className="cart__item-quantity-btn"
            onClick={() =>
              handleQuantityChange(cartItem.product.id, 'increase')
            }
          >
            +
          </button>
        </div>

        <div className="cart__item-price-block">
          {cartItem.product.prevPrice ? (
            <>
              <p className="cart__item-price cart__item-price--new">
                {cartItem.product.price * cartItem.quantity} ₽
              </p>
              <p className="cart__item-price cart__item-price--old">
                {cartItem.product.prevPrice * cartItem.quantity} ₽
              </p>
            </>
          ) : (
            <div className="cart__item-price">
              {cartItem.product.price * cartItem.quantity} ₽
            </div>
          )}
        </div>
      </div>

      <button
        className="cart__item-remove"
        onClick={() => handleRemoveItem(cartItem.product.id)}
        title="Удалить из корзины"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 5L15 15"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
