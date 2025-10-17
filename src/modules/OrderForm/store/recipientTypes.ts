export type DeliveryMethodName = "Курьером" | "Самовывоз" 
export type DeliveryMethodCost = 500 | 0

export type DeliveyMethod = {
  name: DeliveryMethodName,
  cost: DeliveryMethodCost
}

export const DELIVERY_METHOD_NAMES = [
  "Курьером", 
  "Самовывоз"
] as const

export const DELIVERY_METHODS = [
  {
    name: "Курьером",
    cost: 500
  },
  {
    name: "Самовывоз",
    cost: 0
  }
] as const;


export type PaymentMethod = "СБП" | "Банковская карта"
export const PAYMENT_METHODS = [
  "СБП",
  "Банковская карта",
] as const;

export type Recipient = {
  deliveryMethod: DeliveryMethodName
  paymentMethod: PaymentMethod
  paymentPhone?: string
  cardNumber?: string
  fullName: string
  phone: string
  address: string
  email: string
  deliveryDate: string
  comment?: string
}

export type RecipientState = {
  item: Recipient
  formClick: boolean
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}





