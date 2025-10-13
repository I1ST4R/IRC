import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipient, RecipientState } from "./recipientTypes";
import { rootReducer } from "@/App/store";

export const defaultRecipient: Recipient = {
  deliveryMethod: "Курьером",
  paymentMethod: "СБП",
  fullName: "",
  phone: "",
  address: "",
  email: "",
  deliveryDate: "",
  comment: ""
}

const initialState: RecipientState = {
  item: defaultRecipient,
  loading: "idle",
  error: null,
};

const recipientSlice = createSlice({
  name: "recipient",
  initialState,
  selectors:{
    selectRecipient: (state) => state.item,
    selectPaymentMethod : (state) => state.item.paymentMethod
  },
  reducers: {
    changeRecipientInfo(state, action: PayloadAction<Partial<Recipient>>) {
      Object.assign(state.item, action.payload);
    }
  }
}).injectInto(rootReducer)

export const { changeRecipientInfo } = recipientSlice.actions;
export const { selectRecipient, selectPaymentMethod } = recipientSlice.selectors;
