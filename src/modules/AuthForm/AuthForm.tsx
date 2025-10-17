import { useState } from "react";
import { closeAccount, selectIsFormOpen } from "./authFormSlice";
import { useSelector } from "react-redux";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";
import { useAppDispatch } from "@/App/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { LoginButton } from "./components/LoginButton";
import { RegisterButton } from "./components/RegisterButton";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const isAccountOpen = useSelector(selectIsFormOpen);
  const { data: user } = useGetUserQuery(); 
  const dispatch = useAppDispatch();

  if(user?.id) return <></>
  console.log(isAccountOpen)

  return (
    <Dialog
      open={isAccountOpen}
      onOpenChange={(open) => {
        if (!open) dispatch(closeAccount())
      }}
    >
      <DialogContent className="sm:max-w-[425px]">

        <DialogHeader>
          <DialogTitle className="font-europeext text-2xl uppercase tracking-wide text-center">
            Вход в личный кабинет
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4">
          <LoginButton state={isLogin} setState={setIsLogin}/>
          <RegisterButton state={isLogin} setState={setIsLogin}/>
        </div>

        <div>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
