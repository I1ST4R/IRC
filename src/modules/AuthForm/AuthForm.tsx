import { useState } from "react";
import { closeAccount, selectIsFormOpen } from "./authFormSlice";
import { useSelector } from "react-redux";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";
import { Button } from "@/shared/ui/kit/button";
import { useAppDispatch } from "@/App/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { LoginButton } from "./components/LoginButton";
import { RegisterButton } from "./components/RegisterButton";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const isAccountOpen = useSelector(selectIsFormOpen);
  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isAccountOpen}
      onOpenChange={(open) => {
        if (!open) dispatch(closeAccount());
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        {/* Крестик для закрытия */}
        <Button
          type="button"
          onClick={() => dispatch(closeAccount())}
          className="absolute top-4 right-12 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
          variant="ghost"
          size="icon"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>

        <DialogHeader>
          <DialogTitle className="font-europeext text-2xl uppercase tracking-wide text-center">
            Вход в личный кабинет
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4">
          <LoginButton state={isLogin} setState={setIsLogin}/>
          <RegisterButton state={isLogin} setState={setIsLogin}/>
        </div>

        <div className="grid gap-4 py-4">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
