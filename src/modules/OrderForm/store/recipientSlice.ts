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
  loading: "idle",
  error: null,
};

const recipientSlice = createSlice({
  name: "cartTotals",
  initialState,
  reducers: {
    changeRecipientInfo(state, action: PayloadAction<Partial<Recipient>>) {
      Object.assign(state.item, action.payload);
    }
  }
});

export const { changeRecipientInfo } = recipientSlice.actions;
export default recipientSlice.reducer;
