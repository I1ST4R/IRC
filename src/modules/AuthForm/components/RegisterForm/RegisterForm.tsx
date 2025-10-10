import { useRegisterMutation } from "@/shared/store/user/userApiSlice";
import { registerForm } from "./registerFormConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/kit/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/kit/form";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";

export const RegisterForm = () => {

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
};