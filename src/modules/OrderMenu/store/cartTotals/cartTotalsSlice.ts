import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartTotals, CartTotalsState, Order } from "./cartTotalsTypes.ts";

import { calculateCartTotals } from "./helpers/calculateCarttotals.ts";
import {
  getPromo as getPromoApi,
  validatePromo as validatePromocodeApi,
  makePromocodeUsed as makePromocodeUsedApi,
  INITIAL_PROMO,
} from "./api/promoApi.ts";
import {
  getCertificate as getCertificateApi,
  validateCertificate as validateCertificateApi,
  makeCertificateUsed as makeCertificateUsedApi,
  INITIAL_CERTIFICATE,
} from "./api/certificateApi.ts";
import { addOrder } from "./api/orderApi.ts";
import {
  DELIVERY_METHODS,
  DeliveryMethodName,
  Recipient,
} from "@/modules/OrderForm";
import { removeFromCart } from "@/modules/CartBody";

export const getPromocode = createAsyncThunk(
  "cartTotals/getPromocode",
  async (_, { dispatch }) => {
    const promo = await getPromoApi();
    dispatch(changeCartTotals({promo: promo}))
  }
);

export const validatePromocode = createAsyncThunk(
  "cartTotals/validatePromocode",
  async (code: string, { dispatch }) => {
    const promo = await validatePromocodeApi(code);
    dispatch(changeCartTotals({ promo: promo }));
  }
);

export const getCertificate = createAsyncThunk(
  "cartTotals/getCertificate",
  async (_, { dispatch }) => {
    const certificate = await getCertificateApi();
    dispatch(changeCartTotals({ certificate: certificate }));
  }
);

export const validateCertificate = createAsyncThunk(
  "cartTotals/validateCertificate",
  async (code: string, { dispatch }) => {
    const certificate = await validateCertificateApi(code);
    console.log(certificate)
    dispatch(changeCartTotals({ certificate: certificate }));
  }
);

export const makeCertificateUsed = createAsyncThunk(
  "cartTotals/makeCertificateUsed",
  async (id: string, { dispatch }) => {
    await makeCertificateUsedApi(id);
    dispatch(changeCartTotals({ certificate: INITIAL_CERTIFICATE }));
  }
);

export const createOrder = createAsyncThunk(
  "cartTotals/createOrder",
  async (
    {
      recipient,
      navigate,
      userId,
    }: { recipient: Recipient; navigate: any; userId: string },
    { dispatch, getState }
  ) => {
    const state = getState() as any;
    
    const cartTotals = selectCartTotals(state.cartTotals);

    const cartItemsDb = cartTotals.cartItems.map((el) => {
      return {
        isChecked: el.isChecked,
        quantity: el.quantity,
        productId: el.product.id,
      };
    });

    const order: Order<"DB"> = {
      cartTotals: {
        ...cartTotals,
        cartItems: cartItemsDb,
      },
      recipient: recipient,
    };

    await addOrder(order, userId);

    const promoId = cartTotals.promo.id;
    if (promoId) {
      await makePromocodeUsedApi(promoId);
      dispatch(changeCartTotals({ promo: INITIAL_PROMO }));
    }

    const certificateId = cartTotals.certificate.id;
    if (certificateId) {
      await makeCertificateUsedApi(certificateId);
      dispatch(changeCartTotals({ certificate: INITIAL_CERTIFICATE }));
    }

    await Promise.all(
      cartItemsDb.map((el) => {
        return removeFromCart(userId, el.productId);
      })
    );

    navigate("/payment");
  }
);

export const defaultCartTotals: CartTotals = {
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

export const cartTotalsSlice = createSlice({
  name: "cartTotals",
  initialState,
  selectors:{
    selectCartTotals : (state) => state.item,
    selectPromocode : (state) => state.item.promo,
    selectCertificate : (state) => state.item.certificate
  },
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
    },
    removePromo(state) {
      state.item.promo = INITIAL_PROMO
      localStorage.removeItem("promoId")
    },
    removeCertificate(state) {
      state.item.certificate = INITIAL_CERTIFICATE
      localStorage.removeItem("certificateId")
    }
  },
})


export const { 
  changeCartTotals, 
  changeDeliveryMethod,
  removeCertificate,
  removePromo
} = cartTotalsSlice.actions;
export const { 
  selectCartTotals,
  selectPromocode,
  selectCertificate
} = cartTotalsSlice.selectors;
