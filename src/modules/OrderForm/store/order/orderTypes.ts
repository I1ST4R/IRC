export type PaymentMethodName = "SBP" | "bank card"
type PaymentMethodLabel = "СБП" | "Банковская карта"

export type PaymentMethod = {
  name: PaymentMethodName,
  label: PaymentMethodLabel,
}

export type DeliveryMethodName = "courier" | "pickup" 
export type DeliveryMethodCost = 500 | 0

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    name: "SBP",
    label: "СБП",
  },
  {
    name: "bank card",
    label: "Банковская карта",
  }
] as const;

type DeliveryMethodLabel = "Курьером" | "Самовывоз"

export type DeliveyMethod = {
  name: DeliveryMethodName,
  label: DeliveryMethodLabel,
  cost: DeliveryMethodCost
}

export const DELIVERY_METHODS: DeliveyMethod[] = [
  {
    name: "courier",
    label: "Курьером",
    cost: 500
  },
  {
    name: "pickup",
    label: "Самовывоз",
    cost: 0
  }
] as const;

export type Recepient = {
  deliveryMethod: DeliveryMethodName;
  paymentMethod: PaymentMethodName;
  fullName: string;
  phone: string;
  address: string;
  email: string;
  deliveryDate: string;
  comment?: string;
}