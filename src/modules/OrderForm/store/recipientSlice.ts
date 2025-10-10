import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipient, RecipientState } from "./recipientTypes";
import { RootState } from "./OrderFormStore";



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
  reducers: {
    changeRecipientInfo(state, action: PayloadAction<Partial<Recipient>>) {
      Object.assign(state.item, action.payload);
    }
  }
});

export const selectRecipient = (state: RootState) => state.recipient.item

export const { changeRecipientInfo } = recipientSlice.actions;
export default recipientSlice.reducer;
