import { OrderMenuCertificate } from "./OrderMenuCertificate"
import { OrderMenuPromo } from "./OrderMenuPromo"

export const OrderMenuDiscountSection = () => {
  return (
    <div className="pt-5 w-60 m-auto">
      <OrderMenuPromo/>
      <OrderMenuCertificate/>
    </div>
  )
}
