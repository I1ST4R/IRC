import { UseFormReturn } from "react-hook-form";
import { LoginFormData } from "../helpers/formConfig";
import { useLoginMutation } from "@/shared/store/user/userApiSlice";

type LoginFormProps = {
  form: UseFormReturn<LoginFormData>,
}

export const LoginForm = ({form} : LoginFormProps) => {
  const [login] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form

  return (
    <form onSubmit={handleSubmit((data) => login(data))} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-900">Вход</h2>

      <div>
        <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-1">
          Логин
        </label>
        <input
          type="text"
          id="login"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          placeholder="логин"
          {...register('login')}
        />
        {errors.login && (
          <p className="text-red-500 text-sm mt-1">{errors.login.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-1">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          placeholder="пароль"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Войти
      </button>
    </form>
  );
};