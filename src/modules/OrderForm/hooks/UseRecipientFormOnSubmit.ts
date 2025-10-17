import { UseFormReturn } from "react-hook-form";
import { RecipientFormData } from "../helpers/recepientSchema";
import { AppDispatch } from "@/App/store";
import { NavigateFunction } from "react-router-dom";
import { changeRecipientInfo } from "../store/recipientSlice";

export const UseRecipientFormOnSubmit = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  form: UseFormReturn<RecipientFormData>
) => {

  return () => {
    form.handleSubmit((validData) => {
      dispatch(changeRecipientInfo(validData))
    })()
  };
}