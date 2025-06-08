import { useState } from "react";
import { Product as ProductType } from "../../../entity/product/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../main/store";
import { addToCart, fetchCart } from "../../../entity/cart/slice";
import { useNavigate, Link } from "react-router-dom";
import { addItemToLiked, fetchLiked, removeItemFromLiked, } from "@/entity/liked/slice";
import PersonalAccount from "../../../main/App/PersonalAccount/PersonalAccount";

interface ProductProps {
  product: ProductType;
  onRemoveFromLiked?: () => void;
  onAuthRequired?: () => void;
}

export const Product = ({ product, onRemoveFromLiked, onAuthRequired }: ProductProps) => {
  const categories = useSelector(
    (state: RootState) => state.categories?.categories || []
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const likedItems = useSelector((state: RootState) => state.liked.items);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isPersonalAccountOpen, setIsPersonalAccountOpen] = useState(false);
  const tags = useSelector((state: RootState) => state.tags.tags);
  const isInCart = cartItems.some((item) => item.productId === product.id);
  const isLiked = likedItems.some((item) => item.productId === product.id);

  const handleLike = async () => {
    if (!user.id) {
      onAuthRequired?.();
      return;
    }
    
    if (onRemoveFromLiked) {
      onRemoveFromLiked();
    } else {
      if (isLiked) {
        await dispatch(removeItemFromLiked({ userId: user.id.toString(), productId: product.id }));
      } else {
        await dispatch(addItemToLiked({ userId: user.id.toString(), productId: product.id }));
      }
      await dispatch(fetchLiked(user.id));
    }
  };

  const handleCartClick = async () => {
    if (!user.id) {
      onAuthRequired?.();
      return;
    }
    
    if (isInCart) {
      navigate("/cart");
    } else {
      try {
        await dispatch(addToCart({ userId: user.id.toString(), productId: product.id }));
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    }
  };

  const getTagName = (tagId: string) => {
    if (!tagId) return "";
    const tag = tags.find(t => t.id === tagId);
    return tag?.name || "";
  };

  return (
    <div className="product">
      <Link to={`/product/${product.id}`} className="product__link">
        <img src={product.img} alt={product.name} className="product__image" />
        <div className="product__info">
          <div className="product__tags">
            {product.tags.map((tagString: string) => (
              <span key={`${product.id}-${tagString}`} className="product__tag">
                {getTagName(tagString)}
              </span>
            ))}
          </div>
          <h3 className="product__name">{product.name}</h3>
          <h3 className="product__technology">{product.technology}</h3>
          <div className="product__prices">
            <span>{product.price} ₽</span>
            <span className="product__prev-price">{product.prevPrice} ₽</span>
          </div>
        </div>
      </Link>
      <button
        className={`product__btn ${isInCart ? "product__btn--in-cart" : ""}`}
        onClick={handleCartClick}
      >
        {isInCart ? "В корзине" : "Добавить в корзину"}
      </button>
      <button
        className={`product__like${isLiked ? " product__like--active" : ""}`}
        onClick={handleLike}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
      {isPersonalAccountOpen && (
        <PersonalAccount onClose={() => setIsPersonalAccountOpen(false)} />
      )}
    </div>
  );
};
