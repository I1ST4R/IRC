import { useForm } from "react-hook-form";
import { RecipientFormData, recipientSchema } from "./recepientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AppDispatch,
  createOrder,
  DEFAULT_RECEPIENT,
} from "@/modules/OrderMenu";
import { NavigateFunction } from "react-router-dom";

export const form = useForm<RecipientFormData>({
  resolver: zodResolver(recipientSchema),
  defaultValues: DEFAULT_RECEPIENT,
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
