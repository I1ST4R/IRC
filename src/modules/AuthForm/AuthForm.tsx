import { useState } from 'react';
import { closeAccount, selectIsFormOpen } from './store/authFormSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './store/authFormStore';
import { loginForm, registerForm } from './formConfig';
;
import { RegisterForm } from './components/RegisterForm';
import { Button } from '@/shared/ui/kit/button';
import { LoginForm } from './components/LoginForm';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false) 
  const isAccountOpen = useSelector(selectIsFormOpen)
  const dispatch = useAppDispatch()

  const toggleMode = () => {
    setIsLogin(!isLogin);
    loginForm.reset();
    registerForm.reset();
  };

  if (isAccountOpen) return (
    <div className="relative">
      {/* Крестик для закрытия */}
      <Button
        type="button"
        onClick={() => dispatch(closeAccount())}
        className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>

      {
        isLogin ? ( <LoginForm form={loginForm}/>) 
        : ( <RegisterForm form={registerForm}/>)
      }
    </div>
  );
};