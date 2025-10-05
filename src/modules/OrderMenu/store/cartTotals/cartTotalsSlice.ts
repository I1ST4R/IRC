import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CartTotals,
  CartTotalsState,
  DELIVERY_METHODS,
  DeliveryMethodName,
} from "./cartTotalsTypes.ts";
import { calculateCartTotals } from "./helpers/calculateCarttotals.ts";
import { RootState } from "../orderMenuStore.ts";
import {
  getPromo as getPromoApi,
  INITIAL_PROMO,
  validatePromo as validatePromocodeApi,
} from "./api/promoApi.ts";
import {
  getCertificate as getCertificateApi,
  validateCertificate as validateCertificateApi,
  INITIAL_CERTIFICATE,
} from "./api/certificateApi.ts";

// export const defaultRecipient: recipientInterface = {
//   deliveryMethod: "courier",
//   paymentMethod: "SBP",
//   fullName: "",
//   phone: "",
//   address: "",
//   email: "",
//   deliveryDate: "",
//   comment: "",
// };

export const validatePromocode = createAsyncThunk(
  "cartTotals/validatePromocode",
  async (code: string, { dispatch }) => {
    const promo = await validatePromocodeApi(code);
    dispatch(changeCartTotals({ promo: promo }))
  }
);

export const getPromocode = createAsyncThunk(
  "cartTotals/getPromocode",
  async (_, { dispatch }) => {
    const promo = await getPromoApi();
    dispatch(changeCartTotals({ promo: promo }))
  }
);

export const getCertificate = createAsyncThunk(
  "cartTotals/getCertificate",
  async (_, {dispatch}) => {
    const certificate = await getCertificateApi()
    dispatch(changeCartTotals({ certificate: certificate }))
  }
)

export const validateCertificate = createAsyncThunk(
  "cartTotals/validateCertificate",
  async (code: string, {dispatch}) => {
    const certificate = await validateCertificateApi(code)
    dispatch(changeCartTotals({ certificate: certificate }))
  }
)

const defaultCartTotals: CartTotals = {
  cartItems: [],
  total: 0,
  totalWithDiscount: 0,
  discount: 0,
  promo: INITIAL_PROMO,
  certificate: INITIAL_CERTIFICATE,
  deliveryCost: 0,
};

const initialState: CartTotalsState = {
  item: { ...defaultCartTotals },
  loading: "idle",
  error: null,
};

const cartTotalsSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    changeCartTotals(state, action: PayloadAction<Partial<CartTotals>>) {
      Object.assign(state.item, action.payload);

      const cartTotals = calculateCartTotals(
        state.item.cartItems || [],
        state.item.promo.percent,
        state.item.certificate.discount
      );

      state.item.total = cartTotals.total;
      state.item.totalWithDiscount = cartTotals.totalWithDiscount;
      state.item.discount = cartTotals.discount;
      state.item.promo.discount = cartTotals.promoDiscount;
      state.item.certificate.discount = cartTotals.certificateDiscount;
    },
    changeDeliveryMethod(state, action: PayloadAction<DeliveryMethodName>) {
      const deliveryMethod = DELIVERY_METHODS.find((el) => {
        el.name === action.payload;
      });
      if (deliveryMethod) {
        state.item.deliveryCost = deliveryMethod.cost;
        state.item.totalWithDiscount += deliveryMethod.cost;
      }
    }
  }
});

export const selectCartTotals = (state: RootState) => state.cartTotals;

export const { 
  changeCartTotals, 
  changeDeliveryMethod 
} = cartTotalsSlice.actions;
export default cartTotalsSlice.reducer;
