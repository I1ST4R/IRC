import { useForm } from "react-hook-form";
import { RecipientFormData, recipientSchema } from "./recepientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AppDispatch,
  createOrder,
} from "@/modules/OrderMenu";
import { NavigateFunction } from "react-router-dom";
import { defaultRecipient } from "../store/recipientSlice";

export const form = useForm<RecipientFormData>({
  resolver: zodResolver(recipientSchema),
  defaultValues: defaultRecipient,
  mode: "onBlur",
});

export const formControl = form.control;

export const onSubmit = (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  userId: string
) => {
  form.handleSubmit((validData) => {
    dispatch(createOrder({ recipient: validData, navigate, userId }));
  })()
};
