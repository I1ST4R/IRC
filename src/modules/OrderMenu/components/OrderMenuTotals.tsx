import { Order } from "@/_old-version/entity/order/types"

type OrderMenuTotalsProps = {
  order: Order
}

export const OrderMenuTotals = (props: OrderMenuTotalsProps) => {


  return (
    <div className="order-menu__item">
        <div className="order-menu__text">
          <span className="order-menu__label">Товары на сумму:</span>
          <span className="order-menu__value">{props.order.total} ₽</span>
        </div>
        <div className="order-menu__text">
          <span className="order-menu__label">Скидка:</span>
          <span className="order-menu__value order-menu__value--discount">
            {props.order.discount} ₽
          </span>
        </div>
        {props.order.promocodeDiscount && (
          <div className="order-menu__text">
            <span className="order-menu__label">Скидка по промокоду:</span>
            <span className="order-menu__value order-menu__value--discount">
              {props.order.promocodeDiscount} ₽
            </span>
          </div>
        )}
        {props.order.certificateDiscount && (
          <div className="order-menu__text">
            <span className="order-menu__label">Скидка по сертификату:</span>
            <span className="order-menu__value order-menu__value--discount">
              {props.order.certificateDiscount} ₽
            </span>
          </div>
        )}
        <div className="order-menu__text">
          <span className="order-menu__label">Доставка:</span>
          <span className="order-menu__value">{props.order.deliveryCost} ₽</span>
        </div>
        <div className="order-menu__text">
          <span className="order-menu__label">Всего к оплате:</span>
          <span className="order-menu__value">{props.order.totalWithDiscount} ₽</span>
        </div>
      </div>
  )
}