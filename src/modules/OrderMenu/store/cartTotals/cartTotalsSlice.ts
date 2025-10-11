import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CartTotals,
  CartTotalsState,
  Order,
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
import { DELIVERY_METHODS, DeliveryMethodName, Recipient } from "@/modules/OrderForm";


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

export const createOrder = createAsyncThunk(
  'cartTotals/createOrder', 
  async ({ recipient, navigate, userId }: { recipient: Recipient; navigate: any; userId: string }, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const cartTotals = selectCartTotals(state);

      const cartItemsDb = cartTotals.cartItems.map((el) => {
        return {
          ...el,
          productId: el.product.id
        }
      })

      const order : Order = {
        cartTotals: {
          ...cartTotals,
          cartItems: cartItemsDb
        },
        recipient: recipient,
      }
      
      await addOrder(order, userId);

      const promoId = cartTotals.promo.id;
      if(promoId){
        await makePromocodeUsedApi(promoId);
        dispatch(changeCartTotals({ promo: INITIAL_PROMO }));
      } 

      const certificateId = cartTotals.certificate.id;
      if(certificateId){
        await makeCertificateUsedApi(certificateId);
        dispatch(changeCartTotals({ certificate: INITIAL_CERTIFICATE }));
      } 

      navigate("/payment");
      
    } catch (error) {
      throw new Error("Error when creating an order");
    }
  }
);





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
