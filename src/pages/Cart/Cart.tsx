import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../main/store/store';
import { fetchCart, updateItemQuantity, removeItemFromCart } from '../../main/store/slices/cartSlice';
import { fetchProducts } from '../../entity/products/products.slice';
import { toggleLike } from '../../entity/users/users.slice';
import { Product } from '../Catalog/Product/Product';


const USER_ID_KEY = 'currentUserId';

const getUserId = () => {
  const userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    const newUserId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(USER_ID_KEY, newUserId);
    return newUserId;
  }
  return userId;
};

export const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading: cartLoading, error: cartError } = useSelector((state: RootState) => state.cart);
  const { items: products, loading: productsLoading, error: productsError } = useSelector((state: RootState) => state.products);
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});
  const likedIds = useSelector((state: RootState) => state.user.likedIds);
  const userId = getUserId();

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          dispatch(fetchCart(userId)),
          dispatch(fetchProducts({}))
        ]);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, [dispatch, userId]);

  useEffect(() => {
    // Инициализируем локальные количества при загрузке корзины
    const initialQuantities = items.reduce((acc, item) => ({
      ...acc,
      [item.productId]: item.quantity
    }), {});
    setLocalQuantities(initialQuantities);
  }, [items]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setLocalQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const handleQuantityBlur = async (productId: string) => {
    const newQuantity = localQuantities[productId];
    if (newQuantity !== items.find(item => item.productId === productId)?.quantity) {
      try {
        await dispatch(updateItemQuantity({ userId, productId, quantity: newQuantity }));
      } catch (error) {
        console.error('Error updating quantity:', error);
        // Восстанавливаем предыдущее значение при ошибке
        setLocalQuantities(prev => ({
          ...prev,
          [productId]: items.find(item => item.productId === productId)?.quantity || 0
        }));
      }
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await dispatch(removeItemFromCart({ userId, productId }));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const getItemTotal = (product: any, quantity: number) => product.price * quantity;
  const getCartTotal = () => items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return sum;
    return sum + getItemTotal(product, localQuantities[item.productId] || 1);
  }, 0);

  const loading = cartLoading === 'pending' || productsLoading === 'pending';
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
      <h2 className="cart__title">Your Cart</h2>
      <div className="cart__items">
        {items.map(item => {
          const product = products.find(p => p.id === item.productId);
          if (!product) return null;
          const itemTotal = getItemTotal(product, localQuantities[item.productId] || 1);
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
                <div className="cart__item-price">{itemTotal} ₽</div>
              </div>
              <div className="cart__item-quantity">
                <button className="cart__item-quantity-btn" onClick={() => handleQuantityChange(item.productId, Math.max(1, (localQuantities[item.productId] || 1) - 1))}>-</button>
                <input
                  type="number"
                  min="1"
                  value={localQuantities[item.productId] || 1}
                  onChange={(e) => handleQuantityChange(item.productId, Math.max(1, parseInt(e.target.value) || 1))}
                  onBlur={() => handleQuantityBlur(item.productId)}
                  className="cart__item-quantity-input"
                />
                <button className="cart__item-quantity-btn" onClick={() => handleQuantityChange(item.productId, (localQuantities[item.productId] || 1) + 1)}>+</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart__summary-row">
        <span className="cart__summary-label">Итого</span>
        <span className="cart__summary-sum">{getCartTotal()} ₽</span>
        <button className="cart__checkout" disabled>Заказать</button>
      </div>
    </div>
  );
}; 