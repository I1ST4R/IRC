import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../main/store';
import { fetchCart, removeItemFromCart, updateItemQuantity, clearCart } from '../../entity/products/cartSlice.ts';
import { toggleLike } from '../../entity/users/users.slice';
import { fetchProducts } from '../../entity/products/products.slice';

const USER_ID_KEY = 'currentUserId';

export const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorage.getItem(USER_ID_KEY) || '';
  const { items, loading: cartLoading, error: cartError } = useSelector((state: RootState) => state.cart);
  const { items: products, loading: productsLoading, error: productsError } = useSelector((state: RootState) => state.products);
  const { likedIds } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
      dispatch(fetchProducts({}));
    }
  }, [dispatch, userId]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (userId && newQuantity > 0) {
      dispatch(updateItemQuantity({ userId, productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId: string) => {
    if (userId) {
      dispatch(removeItemFromCart({ userId, productId }));
    }
  };

  const handleClearCart = () => {
    if (userId) {
      dispatch(clearCart(userId));
    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemTotal = (product: any, quantity: number, withDiscount: boolean = true) => {
    const price = withDiscount ? product.price : (product.prevPrice || product.price);
    return price * quantity;
  };

  const getCartTotal = (withDiscount: boolean = true) => items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return sum;
    return sum + getItemTotal(product, item.quantity, withDiscount);
  }, 0);

  const getTotalDiscount = () => {
    return items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      if (!product || !product.prevPrice) return sum;
      return sum + ((product.prevPrice - product.price) * item.quantity);
    }, 0);
  };

  const loading = cartLoading || productsLoading === 'pending';
  const error = cartError || productsError;

  if (loading) {
    return <div className="cart__loading">Loading cart...</div>;
  }

  if (error) {
    return <div className="cart__error">{error}</div>;
  }

  if (items.length === 0) {
    return <div className="cart__empty">Your cart is empty</div>;
  }

  return (
    <div className="cart">
      <div className="cart__header">
        <h2 className="cart__title">Корзина</h2>
        <div className="cart__info">
          <span className="cart__items-count">В корзине {getTotalItems()} товаров</span>
          {items.length > 0 && (
            <button 
              className="cart__clear-button" 
              onClick={handleClearCart}
              title="Очистить корзину"
            >
              Очистить корзину
            </button>
          )}
        </div>
      </div>
      <div className="cart__items">
        {items.map(item => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return null;
          const itemTotal = getItemTotal(product, item.quantity);

          return (
            <div key={item.productId} className="cart__item">
              <div className="cart__item-like">
              </div>
              <img src={product.img} alt={product.name} className="cart__item-image" />
              <div className="cart__item-info">
                <div className="cart__item-name">{product.name}</div>
                <div className="cart__item-actions">
                  <button className="cart__item-remove" onClick={() => handleRemoveItem(item.productId)} title="Удалить из корзины">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 6H15M8.333 9.333V14M11.667 9.333V14M3.333 6.667L4.167 16.167C4.236 16.963 4.929 17.6 5.729 17.6H14.271C15.071 17.6 15.764 16.963 15.833 16.167L16.667 6.667M7.5 6V4.667C7.5 4.298 7.798 4 8.167 4H11.833C12.202 4 12.5 4.298 12.5 4.667V6" stroke="#b0b0b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className={`product__like${likedIds.includes(product.id) ? ' product__like--active' : ''}`}
                    onClick={() => dispatch(toggleLike({ userId, productId: product.id, likedIds }))}
                    title={likedIds.includes(product.id) ? 'Убрать из избранного' : 'В избранное'}
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="cart__item-price-block">
                {product.prevPrice ? (
                  <>
                    <div className="cart__item-price cart__item-price--old">{product.prevPrice * item.quantity} ₽</div>
                    <div className="cart__item-price cart__item-price--new">{itemTotal} ₽</div>
                  </>
                ) : (
                  <div className="cart__item-price">{itemTotal} ₽</div>
                )}
              </div>
              <div className="cart__item-quantity">
                <button className="cart__item-quantity-btn" onClick={() => handleQuantityChange(item.productId, Math.max(1, item.quantity - 1))}>-</button>
                <span className="cart__item-quantity-value">{item.quantity}</span>
                <button className="cart__item-quantity-btn" onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>+</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart__summary-row">
        <div className="cart__summary-info">
          <div className="cart__summary-item">
            <span className="cart__summary-label">Товары на сумму:</span>
            <span className="cart__summary-value">{getCartTotal(false)} ₽</span>
          </div>
          <div className="cart__summary-item">
            <span className="cart__summary-label">Скидка:</span>
            <span className="cart__summary-value cart__summary-value--discount">
              -{getTotalDiscount()} ₽
            </span>
          </div>
          <div className="cart__summary-item">
            <span className="cart__summary-label">Доставка:</span>
            <span className="cart__summary-value">0 ₽</span>
          </div>
        </div>
        <div className="cart__summary-total">
          <span className="cart__summary-label">Всего к оплате:</span>
          <span className="cart__summary-sum">{getCartTotal(true)} ₽</span>
        </div>
        <button className="cart__checkout" disabled>Заказать</button>
      </div>
    </div>
  );
};

export default Cart; 