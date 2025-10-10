import { Form, UseFormReturn } from "react-hook-form";
import { useLoginMutation } from "@/shared/store/user/userApiSlice";
import { ControllerRenderProps } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import { LoginFormData } from "../config/loginFormConfig";

type LoginFormProps = {
  form: UseFormReturn<LoginFormData>;
}

export const LoginForm = ({ form }: LoginFormProps) => {
  const [login, { isLoading }] = useLoginMutation();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Вход</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => login(data))} className="space-y-6">
            {/* Поле логина */}
            <FormField
              control={form.control}
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
              control={form.control}
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
              disabled={isLoading}
            >
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};