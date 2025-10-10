import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { RegisterData } from "@/shared/store/user/userTypes";

const registerSchema = z.object({
  login: z.string().min(6, 'Логин должен содержать минимум 6 символов'),
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов')
})

export type RegisterFormData = z.infer<typeof registerSchema>;

export const registerForm = useForm<RegisterFormData>({
  resolver: zodResolver(registerSchema),
  defaultValues: {
    login: "",
    email: "",
    password: ""
  },
  mode: "onBlur",
});

const typeRegisterCheck: RegisterData<"form"> = {} as RegisterFormData;

