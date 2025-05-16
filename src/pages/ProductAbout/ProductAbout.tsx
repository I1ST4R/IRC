import { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/main/store";
import { addItemToCart, fetchCart } from "@/entity/products/cartSlice";
import { addItemToLiked, fetchLiked } from "@/entity/products/likedSlice";
import { fetchProducts } from "@/entity/products/products.slice";

export const ProductAbout = ({ onRemoveFromLiked }: { onRemoveFromLiked?: () => void }) => {
  const { id } = useParams();
  const products = useSelector((state: RootState) => state.products.items);
  const product = products.find((p) => p.id === id);
  console.log('Product ID:', id);
  console.log('All products:', products);
  console.log('Found product:', product);
  console.log('Image path:', product?.img);
  console.log('Full image URL:', product?.img ? new URL(product.img, window.location.origin).href : null);
  const categories = useSelector((state: RootState) => state.categories?.categories || []);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const likedItems = useSelector((state: RootState) => state.liked.items);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      if (user?.id) {
        try {
          await dispatch(fetchProducts({ page: 1 }));
          await dispatch(fetchCart(user.id.toString()));
        } catch (error) {
          console.error('Failed to load data:', error);
        }
      }
    };
    loadData();
  }, [dispatch, user?.id]);

  if (!product) return <div>Товар не найден</div>;

  const isInCart = cartItems.some(item => item.productId === product.id);
  const isLiked = likedItems.some(item => item.productId === product.id);

  const handleLike = async () => {
    if (!user?.id) return;
    
    if (onRemoveFromLiked) {
      onRemoveFromLiked();
    } else {
      await dispatch(addItemToLiked({ userId: user.id.toString(), productId: product.id }));
      await dispatch(fetchLiked(user.id.toString()));
    }
  };

  const handleCartClick = async () => {
    if (!user?.id) return;
    
    if (isInCart) {
      navigate('/cart');
    } else {
      try {
        await dispatch(addItemToCart({ userId: user.id.toString(), productId: product.id }));
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
    <div className="product product-about">
      <div className="product__link">
        <img 
          src={`/${product.img}`} 
          alt={product.name} 
          className="product__image"
          onError={(e) => {
            console.error('Failed to load image:', e);
            console.log('Failed image src:', product.img);
            const target = e.target as HTMLImageElement;
            console.log('Image element:', target);
          }}
        />
      </div>
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
          <h3 className="product__technology">{product.article}</h3>
          <h3 className="product__technology">{product.description}</h3>
          <h3 className="product__technology">{product.formula}</h3>
          <h3 className="product__technology">{product.for_what}</h3>
          <h3 className="product__technology">{product.skin_type}</h3>
          <div className="product__prices">
            <span>{product.price} ₽</span>
            <span className="product__prev-price">{product.prevPrice} ₽</span>
          </div>
        </div>
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
          <g clip-path="url(#clip0_219_4352)">
            <path
              id="heart-main"
              d="M14.5835 1.59766C13.6451 1.61225 12.7272 1.8742 11.9224 2.35705C11.1177 2.8399 10.4546 3.52655 10.0001 4.34766C9.54566 3.52655 8.88257 2.8399 8.07783 2.35705C7.27308 1.8742 6.35517 1.61225 5.41679 1.59766C3.92091 1.66265 2.51155 2.31703 1.49661 3.41785C0.481678 4.51867 -0.0563308 5.97643 0.000128002 7.47266C0.000128002 11.2618 3.98846 15.4002 7.33346 18.206C8.08031 18.8336 9.02459 19.1777 10.0001 19.1777C10.9757 19.1777 11.9199 18.8336 12.6668 18.206C16.0118 15.4002 20.0001 11.2618 20.0001 7.47266C20.0566 5.97643 19.5186 4.51867 18.5036 3.41785C17.4887 2.31703 16.0793 1.66265 14.5835 1.59766Z"
              fill="#CA354F"
            />

            <path
              id="heart-inner"
              d="M11.596 16.931C11.1493 17.3071 10.5841 17.5134 10.0001 17.5134C9.41617 17.5134 8.85098 17.3071 8.40429 16.931C4.12263 13.3385 1.66679 9.89182 1.66679 7.47266C1.60983 6.41825 1.9721 5.3841 2.6746 4.59574C3.37709 3.80738 4.36282 3.32878 5.41679 3.26432C6.47077 3.32878 7.45649 3.80738 8.15899 4.59574C8.86149 5.3841 9.22376 6.41825 9.16679 7.47266C9.16679 7.69367 9.25459 7.90563 9.41087 8.06191C9.56715 8.21819 9.77911 8.30599 10.0001 8.30599C10.2211 8.30599 10.4331 8.21819 10.5894 8.06191C10.7457 7.90563 10.8335 7.69367 10.8335 7.47266C10.7765 6.41825 11.1388 5.3841 11.8413 4.59574C12.5438 3.80738 13.5295 3.32878 14.5835 3.26432C15.6374 3.32878 16.6232 3.80738 17.3257 4.59574C18.0282 5.3841 18.3904 6.41825 18.3335 7.47266C18.3335 9.89182 15.8776 13.3385 11.596 16.9277V16.931Z"
              fill="#F2F2F2"
            />
          </g>
          <defs>
            <clipPath id="clip0_219_4352">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};
