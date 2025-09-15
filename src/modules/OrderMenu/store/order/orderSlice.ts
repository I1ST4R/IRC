import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderState } from "./orderTypes.ts";
import { calculateCartTotals } from "./calculateCarttotals.ts";

const defaultOrder: Order = {
  id: 0,
  userId: "",
  cartItems: [],
  total: 0,
  totalWithDiscount: 0,
  discount: 0,
  promocodeDiscount: 0,
  promocodePercent: 0,
  promocodeId: null,
  certificateDiscount: 0,
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

const initialState: OrderState = {
  item: { ...defaultOrder },
  loading: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    changeOrderInfo(state, action: PayloadAction<Partial<Order> & { userId: string } | undefined>) {

      if (action.payload) {
        state.item.userId = action.payload.userId;
        const { userId, ...rest } = action.payload;
        Object.assign(state.item, rest);
      }

      const cartTotals = calculateCartTotals(
        state.item.cartItems || [],
        state.item.promocodePercent,
        state.item.certificateDiscount
      );

      Object.assign(state.item, cartTotals, {
        totalWithDiscount: cartTotals.totalWithDiscount + state.item.deliveryCost
      });
    }
  },
});

export const { changeOrderInfo } = orderSlice.actions;
export default orderSlice.reducer; 
