import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../main/store';
import { validatePromoCode, clearPromo } from '../../../entity/promo/slice';
import { validateCertificateCode, clearCertificate } from '../../../entity/certificate/slice';

import promo from '../../../pages/Cart/promo.svg';
import certificate from '../../../pages/Cart/certificate.svg';
import './_order-menu.scss';
import { CartItem, CartState } from '@/entity/cart/types';

export const OrderMenu = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = useSelector((state: RootState) => state.user);
//   const { totals, loading, error, items } = useSelector((state: RootState) => state.cart as CartState);

//   useEffect(() => {
//     if (user.id) dispatch(fetchOrderTotals({
//       userId : user.id, 
//       promoCode : promoCode, 
//       certificateCode : certificateCode }));
//   }, [dispatch, userId, promoCode, certificateCode]);

//   const handlePromoSubmit = async () => {
//     if (!promoCode) {
//       return;
//     }
//     dispatch(validatePromoCode(promoCode));
//   };

//   const handleCertificateSubmit = async () => {
//     if (!certificateCode) {
//       return;
//     }
//     dispatch(validateCertificateCode(certificateCode));
//   };

//   const handleCheckout = () => {
//     navigate('/order');
//   };

//   if (!user.id) {
//     return (
//       <div className="order-menu">
//         <div className="order-menu__error">Пожалуйста, войдите в систему</div>
//       </div>
//     );
//   }

//   // if (loading) {
//   //   return (
//   //     <div className="order-menu">
//   //       <div className="order-menu__loading">Загрузка...</div>
//   //     </div>
//   //   );
//   // }

//   if (error) {
//     return (
//       <div className="order-menu">
//         <div className="order-menu__error">{error}</div>
//       </div>
//     );
//   }

//   if (!totals) {
//     return (
//       <div className="order-menu">
//         <div className="order-menu__error">Нет данных для отображения</div>
//       </div>
//     );
//   }

//   const isOrderPage = location.pathname === '/order';

//   return (
//     <div className="order-menu">
//       <p className="order-menu__item">Ваш заказ</p>

//       {isOrderPage && items.length > 0 && (
//         <div className="order-menu__items">
//           {items.map((item) => {
            
//             return (
//               <div key={item.product.id} className="order-menu__item-details">
//                 <div className="order-menu__item-info">
//                   <img 
//                     src={item.product.img} 
//                     alt={item.product.name} 
//                     className="order-menu__item-image"
//                   />
//                   <div className="order-menu__item-text">
//                     <span className="order-menu__item-name">{item.product.name}</span>
//                     <span className="order-menu__item-technology">{item.product.technology}</span>
//                     <span className="order-menu__item-quantity">x{item.quantity}</span>
//                   </div>
//                 </div>
//                 <span className="order-menu__item-price">{item.product.price * item.quantity} ₽</span>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       <div className="order-menu__item">
//         <div className="order-menu__text">
//           <span className="order-menu__label">Товары на сумму:</span>
//           <span className="order-menu__value">
//             {totals.totalWithoutDiscount} ₽
//           </span>
//         </div>
//         <div className="order-menu__text">
//           <span className="order-menu__label">Скидка:</span>
//           <span className="order-menu__value order-menu__value--discount">
//             {totals.totalDiscount} ₽
//           </span>
//         </div>
//         {totals.promoDiscount > 0 && (
//           <div className="order-menu__text">
//             <span className="order-menu__label">Скидка по промокоду:</span>
//             <span className="order-menu__value order-menu__value--discount">
//               {totals.promoDiscount} ₽
//             </span>
//           </div>
//         )}
//         {totals.certificateDiscount > 0 && (
//           <div className="order-menu__text">
//             <span className="order-menu__label">Скидка по сертификату:</span>
//             <span className="order-menu__value order-menu__value--discount">
//               {totals.certificateDiscount} ₽
//             </span>
//           </div>
//         )}
//         <div className="order-menu__text">
//           <span className="order-menu__label">Доставка:</span>
//           <span className="order-menu__value">0 ₽</span>
//         </div>
//         <div className="order-menu__text">
//           <span className="order-menu__label">Всего к оплате:</span>
//           <span className="order-menu__value">{totals.finalTotal} ₽</span>
//         </div>
//       </div>

//       <div className="order-menu__item">
//         <div
//           className="order-menu__field"
//           onClick={handlePromoSubmit}
//         >
//           <div className="order-menu__item-name">
//             <img src={promo} alt="promo" />
//             <span>Промокод</span>
//           </div>
//         </div>
//       </div>

//       <div className="order-menu__item">
//         <div
//           className="order-menu__field"
//           onClick={handleCertificateSubmit}
//         >
//           <div className="order-menu__item-name">
//             <img src={certificate} alt="certificate" />
//             <span>Сертификат</span>
//           </div>
//         </div>
//       </div>

//       <button className="order-menu__button" onClick={handleCheckout}>
//         Оформить заказ
//       </button>
//     </div>
//   );
// };


return (
  <>  OrderMenu</>
)

}

export default OrderMenu; 