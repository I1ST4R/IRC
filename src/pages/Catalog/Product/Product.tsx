import { useEffect, useCallback } from "react";
import { Product as ProductType } from "../../../entity/products/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../main/store";
import { addItemToCart, fetchCart } from "../../../entity/products/cartSlice";
import { useNavigate } from "react-router-dom";
import { toggleLike } from '../../../entity/users/users.slice';

const USER_ID_KEY = 'currentUserId';

interface ProductProps {
  product: ProductType;
}

export const Product = ({ product }: ProductProps) => {
  const categories = useSelector((state: RootState) => state.categories?.categories || []);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const likedIds = useSelector((state: RootState) => state.user.likedIds);
  const userId = localStorage.getItem(USER_ID_KEY) || 'anpri65';
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      try {
        await dispatch(fetchCart(userId));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };
    loadCart();
  }, [dispatch, userId]);

  const isInCart = cartItems.some(item => item.productId === product.id);
  const isLiked = likedIds.includes(product.id);

  const handleLike = () => {
    dispatch(toggleLike({ userId, productId: product.id, likedIds }));
  };

  const handleCartClick = async () => {
    if (isInCart) {
      navigate('/cart');
    } else {
      try {
        await dispatch(addItemToCart({ userId, productId: product.id }));
      } catch (error) {
        console.error('Failed to add item to cart:', error);
      }
    }
  };

  const getTagName = (tagString: string) => {
    const [categoryId, tagId] = tagString.split(',');
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return '';
    const tag = category.tags.find(tag => tag.id === tagId);
    return tag ? tag.name : '';
  };

  return (
    <div className="product">
      <img 
        src={product.img} 
        alt={product.name} 
        className="product__image"
      />
      <div className="product__info">
        <h3 className="product__name">{product.name}</h3>
        <div className="product__price">{product.price} ₽</div>
        <div className="product__tags">
          {product.tags.map((tagString) => (
            <span key={`${product.id}-${tagString}`} className="product__tag">
              {getTagName(tagString)}
            </span>
          ))}
        </div>
        <button 
          className={`product__btn ${isInCart ? 'product__btn--in-cart' : ''}`}
          onClick={handleCartClick}
        >
          {isInCart ? 'В корзине' : 'Добавить в корзину'}
        </button>
      </div>
      <button 
        className={`product__like${isLiked ? ' product__like--active' : ''}`}
        onClick={handleLike}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
  );
};
