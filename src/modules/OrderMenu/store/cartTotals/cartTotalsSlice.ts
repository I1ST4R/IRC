import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CartTotals,
  CartTotalsState,
} from "./cartTotalsTypes.ts";
import { 
  DELIVERY_METHODS,
  DeliveryMethodName
} from "@/modules/OrderForm"
import { calculateCartTotals } from "./helpers/calculateCarttotals.ts";
import { RootState } from "../orderMenuStore.ts";
import {
  getPromo as getPromoApi,
  validatePromo as validatePromocodeApi,
  makePromocodeUsed as makePromocodeUsedApi,
  INITIAL_PROMO,
} from "./api/promoApi.ts";
import {
  getCertificate as getCertificateApi,
  validateCertificate as validateCertificateApi,
  makeCertificateUsed as  makeCertificateUsedApi,
  INITIAL_CERTIFICATE,
} from "./api/certificateApi.ts";

export const getPromocode = createAsyncThunk(
  "cartTotals/getPromocode",
  async (_, { dispatch }) => {
    const promo = await getPromoApi();
    dispatch(changeCartTotals({ promo: promo }))
  }
);

export const validatePromocode = createAsyncThunk(
  "cartTotals/validatePromocode",
  async (code: string, { dispatch }) => {
    const promo = await validatePromocodeApi(code);
    dispatch(changeCartTotals({ promo: promo }))
  }
);

export const makePromocodeUsed = createAsyncThunk(
  "cartTotals/makePromocodeUsed",
  async (id: string, { dispatch }) => {
    await makePromocodeUsedApi(id);
    dispatch(changeCartTotals({ promo:  INITIAL_PROMO}))
  }
)

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

export const makeCertificateUsed = createAsyncThunk(
  "cartTotals/makeCertificateUsed",
  async (id: string, { dispatch }) => {
    await  makeCertificateUsedApi(id);
    dispatch(changeCartTotals({ certificate:  INITIAL_CERTIFICATE}))
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
