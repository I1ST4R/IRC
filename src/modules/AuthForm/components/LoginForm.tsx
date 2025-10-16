import { useLoginMutation } from "@/shared/store/user/userApiSlice";
import { ControllerRenderProps } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { LoginData } from "@/shared/store/user/userTypes";

export const LoginForm = () => {
  const [login] = useLoginMutation();

  const loginSchema = z.object({
    login: z.string().min(6, 'Логин должен содержать минимум 6 символов'),
    password: z.string().min(6, 'Пароль должен содержать минимум 8 символов')
  })
  
  

  type LoginFormData = z.infer<typeof loginSchema>;
  
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: ""
    },
    mode: "onBlur",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const typeLoginCheck: LoginData = {} as LoginFormData;

  const {
    handleSubmit,
    control,
  } = loginForm

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Вход</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...loginForm}>
          <form onSubmit={handleSubmit((data) => login(data))} className="space-y-6">
            {/* Поле логина */}
            <FormField
              control={control}
              name="login"
              render={({ field }: { field: ControllerRenderProps<LoginFormData, "login"> }) => (
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
              render={({ field }: { field: ControllerRenderProps<LoginFormData, "password"> }) => (
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

            <Button
              type="submit"
              className="w-full"
            >
              Войти
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};