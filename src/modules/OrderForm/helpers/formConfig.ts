import { useForm } from "react-hook-form";
import { RecipientFormData, recipientSchema } from "./recepientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, createOrder, DEFAULT_RECEPIENT } from "@/modules/OrderMenu";

export const form = useForm<RecipientFormData>({
  resolver: zodResolver(recipientSchema),
  defaultValues: DEFAULT_RECEPIENT,
  mode: "onBlur",
});

export const formControl = form.control

export const onSubmit = (
  data: RecipientFormData, 
  dispatch : AppDispatch, 
  navigate: any,
  userId: string,
  ) => {
  dispatch(createOrder({ recipient: data, navigate, userId }))
};