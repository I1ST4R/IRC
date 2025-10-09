import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery, useLoginMutation } from '@/shared/store/user/userApiSlice';
import { closeAccount, selectIsFormOpen } from './store/authFormSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './store/authFormStore';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false) 
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    email: '',
  });
  const [login] = useLoginMutation();
  const {data: user} = useGetUserQuery()
  const isAccountOpen = useSelector(selectIsFormOpen)
  const dispatch = useAppDispatch()
  if(user) setIsLogin(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isAccountOpen) return (
    <div className="relative">
      {/* Крестик для закрытия */}
      <button
        type="button"
        onClick={() => dispatch(closeAccount())}
        className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <form onSubmit={() => login(formData)} >
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        
        <div >
          <label htmlFor="login">Логин</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
          />
        </div>

        {!isLogin && (
          <div >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" >
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
        </button>
      </form>
    </div>
  );
};