import { useRegisterMutation } from "@/shared/store/user/userApiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { RegisterData } from "@/shared/store/user/userTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";

export const RegisterForm = () => {

  const registerSchema = z.object({
    login: z.string().min(6, 'Логин должен содержать минимум 6 символов'),
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль должен содержать минимум 8 символов')
  })
  
  type RegisterFormData = z.infer<typeof registerSchema>;
  
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      login: "",
      email: "",
      password: ""
    },
    mode: "onBlur",
  });
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const typeRegisterCheck: RegisterData<"form"> = {} as RegisterFormData;

  const {
    handleSubmit,
    control
  } = registerForm

  const [register] = useRegisterMutation()

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Регистрация</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...registerForm}>
          <form onSubmit={handleSubmit((data) => register({...data, type: "client"}))} className="space-y-4">
            
            {/* Поле логина */}
            <FormField
              control={control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите ваш логин"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Поле пароля */}
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Введите ваш пароль"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Поле почты */}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Введите вашу почту"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
            >
              Зарегистрироваться
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}