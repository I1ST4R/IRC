import { useState } from 'react';
import { closeAccount, selectIsFormOpen } from './authFormSlice';
import { useSelector } from 'react-redux';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import { Button } from '@/shared/ui/kit/button';
import { useAppDispatch } from '@/App/store';


export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false) 
  const isAccountOpen = useSelector(selectIsFormOpen)
  const dispatch = useAppDispatch()

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // loginForm.reset();
    // registerForm.reset();
  };

  if (isAccountOpen) return (
    <div className="absolute top-100 left-100">
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

      <Button
        type="button"
        onClick={() => toggleMode()}
        className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
      >
        сменить тип
      </Button>

      {/* { isLogin ? ( <LoginForm/>) : ( <RegisterForm/>) } */}
      <LoginForm/>
    </div>
  );
};