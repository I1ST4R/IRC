import { useForm } from "react-hook-form";
import { RecipientFormData, recipientSchema } from "./recepientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultRecipient } from "@/modules/OrderMenu/index";

export const form = useForm<RecipientFormData>({
  resolver: zodResolver(recipientSchema),
  defaultValues: defaultRecipient,
  mode: "onBlur",
});

export const formControl = form.control

