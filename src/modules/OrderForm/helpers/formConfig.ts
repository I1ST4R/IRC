import { useForm } from "react-hook-form";
import { RecipientFormData, recipientSchema } from "./recepientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeRecipientInfo, defaultRecipient } from "../store/recipientSlice";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../store/OrderFormStore";

export const form = useForm<RecipientFormData>({
  resolver: zodResolver(recipientSchema),
  defaultValues: defaultRecipient,
  mode: "onBlur",
});

export const formControl = form.control;

export const onSubmit = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) => {
  form.handleSubmit((validData) => {
    dispatch(changeRecipientInfo(validData))
    navigate("/payment")
  })()
};
