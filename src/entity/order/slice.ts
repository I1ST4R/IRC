import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrdersState } from "./types";

const defaultOrder: Order = {
  id: 0,
  userId: "",
  cartItems: [],
  total: 0,
  totalWithDiscount: 0,
  discount: 0,
  promocodeDiscount: null,
  promocodePercent: null,
  promocodeId: null,
  certificateDiscount: null,
  deliveryCost: 500,
  certificateId: null,
  recipient: {
    deliveryMethod: "courier",
    paymentMethod: "SBP",
    fullName: "",
    phone: "",
    address: "",
    email: "",
    deliveryDate: "",
    comment: "",
  },
};

const initialState: OrdersState = {
  items: [],
  current: { ...defaultOrder },
  loading: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeOrderInfo(state, action: PayloadAction<Partial<Order> & { userId: string } | undefined>) {
      if (state.current === null) state.current = { ...defaultOrder };

      if (action.payload) {
        state.current.userId = action.payload.userId;
        const { userId, ...rest } = action.payload;
        Object.assign(state.current, rest);
      }

      // Пересчёт totals
      const cartItems = state.current.cartItems || [];
      const total = cartItems.reduce(
        (sum, item) => sum + item.product.prevPrice * item.quantity,
        0
      );
      let totalWithDiscount = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const discount = total - totalWithDiscount;

      // Промокод — процент
      let promoDiscount = 0;
      if (
        typeof state.current.promocodePercent === 'number' && state.current.promocodePercent > 0) {
        promoDiscount = totalWithDiscount * state.current.promocodePercent
        totalWithDiscount -= promoDiscount;
        state.current.promocodeDiscount = promoDiscount;
      }

      // Сертификат — сумма
      if (typeof state.current.certificateDiscount === 'number' && state.current.certificateDiscount > 0) {
        totalWithDiscount -= state.current.certificateDiscount;
      }

      state.current.total = total;
      state.current.totalWithDiscount = totalWithDiscount + state.current.deliveryCost;
      state.current.discount = discount;
    }
  },
});

export const { changeOrderInfo } = ordersSlice.actions;
export default ordersSlice.reducer; 
