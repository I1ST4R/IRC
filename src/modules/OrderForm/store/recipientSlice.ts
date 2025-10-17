import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipient, RecipientState } from "./recipientTypes";

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
  formClick: false,
  loading: "idle",
  error: null,
};

export const recipientSlice = createSlice({
  name: "recipient",
  initialState,
  selectors:{
    selectRecipient: (state) => state.item,
    selectPaymentMethod : (state) => state.item.paymentMethod,
    selectFormClick: (state) => state.formClick
  },
  reducers: {
    changeRecipientInfo(state, action: PayloadAction<Partial<Recipient>>) {
      Object.assign(state.item, action.payload);
    },
    setFormClick(state, action: PayloadAction<boolean>) {
      state.formClick = action.payload
    }
  }
})

export const { changeRecipientInfo, setFormClick } = recipientSlice.actions;
export const { selectRecipient, selectPaymentMethod, selectFormClick } = recipientSlice.selectors;
