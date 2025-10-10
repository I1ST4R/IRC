import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CartTotals,
  CartTotalsState,
  DELIVERY_METHODS,
  DeliveryMethodName,
  Order,
  Recipient,
} from "./cartTotalsTypes.ts";

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
import { addOrder } from "./api/orderApi.ts";


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
  name: "cartTotals",
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

export const selectCartTotals = (state: RootState) => state.cartTotals.item;
export const selectPromocode = (state: RootState) => state.cartTotals.item.promo;
export const selectCertificate = (state: RootState) => state.cartTotals.item.certificate;

export const { 
  changeCartTotals, 
  changeDeliveryMethod 
} = cartTotalsSlice.actions;
export default cartTotalsSlice.reducer;
