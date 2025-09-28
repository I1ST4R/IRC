import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DELIVERY_METHODS, DeliveryMethodName, Order, OrderState, recipientInterface } from "./orderTypes.ts";
import { calculateCartTotals } from "./helpers/calculateCarttotals.ts";
import {AppDispatch, RootState} from "../orderMenuStore.ts"
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "./orderApi.ts";
import { useNavigate } from "react-router-dom";

export const createOrder = createAsyncThunk(
  'orders/createOrder', 
  async () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    try {
      const curOrder = useSelector(selectCurrentOrder);
      await addOrder(curOrder);
      navigate("/payment");
    } catch (error) {
      dispatch(addErrorOnOrderCreate());
      throw new Error("Error when creating an order");
    }
  }
);

export const defaultRecipient: recipientInterface = {
  deliveryMethod: "courier",
  paymentMethod: "SBP",
  fullName: "",
  phone: "",
  address: "",
  email: "",
  deliveryDate: "",
  comment: "",
};

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
  recipient: defaultRecipient,
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
    changeOrderInfo(
      state,
      action: PayloadAction<(Partial<Order> & { userId: string }) | undefined>
    ) {
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

      Object.assign(state.item, cartTotals);
    },
    addErrorOnOrderCreate(
      state
    ) {
      state.error = "Ошибка при создании заказа"
    },
    changeDeliveryMethod(
      state,
      action:PayloadAction<DeliveryMethodName> 
    ){
      const deliveryMethod = DELIVERY_METHODS.find((el) => {
        el.name === action.payload
      })
      if(deliveryMethod){
        state.item.deliveryCost = deliveryMethod.cost
        state.item.recipient.deliveryMethod = action.payload
        state.item.totalWithDiscount += deliveryMethod.cost
      } 
    }
  },
});

export const selectCurrentOrder = (state: RootState) => state.order.item

export const { changeOrderInfo, addErrorOnOrderCreate, changeDeliveryMethod  } = orderSlice.actions;
export default orderSlice.reducer;
