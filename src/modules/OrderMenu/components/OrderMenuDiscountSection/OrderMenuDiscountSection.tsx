import { OrderMenuCertificate } from "./OrderMenuCertificate"
import { OrderMenuPromo } from "./OrderMenuPromo"

export const OrderMenuDiscountSection = () => {
  return (
    <div className="order-menu__item">
      <OrderMenuPromo/>
      <OrderMenuCertificate/>
    </div>
  )
}
