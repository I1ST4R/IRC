import { useForm } from "react-hook-form"
import { RecipientFormData, recipientSchema } from "../helpers/recepientSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultRecipient } from "../store/recipientSlice";

export const UseRecipientForm = () => {
  return useForm<RecipientFormData>({
    resolver: zodResolver(recipientSchema),
    defaultValues: defaultRecipient,
    mode: "onBlur",
  })
}