import { useForm } from "react-hook-form";
import { RecipientFormData, recipientSchema } from "./recepientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultRecipient } from "../store/recipientSlice";
import { NavigateFunction } from "react-router-dom";

export const form = useForm<RecipientFormData>({
  resolver: zodResolver(recipientSchema),
  defaultValues: defaultRecipient,
  mode: "onBlur",
});

export const formControl = form.control;

export const onSubmit = (
  navigate: NavigateFunction,
) => {
  form.handleSubmit(() => {navigate("/payment")})()
};
