import React, { useState, useEffect } from 'react';
import { usePersonalAccount } from '../../../context/PersonalAccountContext';
import { useAuth } from '../../../hooks/useAuth';
import './_personal-account.scss';

interface FormData {
  login: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

const PersonalAccount: React.FC = () => {
  const { isAccountOpen, toggleAccount } = usePersonalAccount();
  const { login, register, error: authError, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    login: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [welcomeMessage, setWelcomeMessage] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (welcomeMessage) {
      const timer = setTimeout(() => {
        toggleAccount();
        setWelcomeMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [welcomeMessage, toggleAccount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const success = await login(formData.login, formData.password);
      success && setWelcomeMessage(`Добро пожаловать, ${formData.login}!`);
    } else {
      if (formData.password !== formData.confirmPassword) return;
      const success = await register(formData.login, formData.password, formData.name || '');
      success && setWelcomeMessage(`Добро пожаловать, ${formData.login}!`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTabChange = (isLoginTab: boolean) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(isLoginTab);
      setFormData({
        login: '',
        password: '',
        name: '',
        confirmPassword: ''
      });
      setIsTransitioning(false);
    }, 300);
  };

  if (!isAccountOpen) return null;

  return (
    <div className="personal-account">
      <div className="personal-account__content">
        <button className="personal-account__close" onClick={toggleAccount}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {welcomeMessage ? (
          <div className="personal-account__welcome">
            <h2 className="personal-account__title">{welcomeMessage}</h2>
          </div>
        ) : (
          <>
            <h2 className="personal-account__title">
              {isLogin ? 'Вход в личный кабинет' : 'Регистрация'}
            </h2>
            
            <div className="personal-account__tabs">
              <button 
                className={`personal-account__tab ${isLogin ? 'personal-account__tab--active' : ''}`}
                onClick={() => handleTabChange(true)}
              >
                Вход
              </button>
              <button 
                className={`personal-account__tab ${!isLogin ? 'personal-account__tab--active' : ''}`}
                onClick={() => handleTabChange(false)}
              >
                Регистрация
              </button>
            </div>

            {authError && <div className="personal-account__error">{authError}</div>}

            <form 
              className={`personal-account__form ${isTransitioning ? 'personal-account__form--transitioning' : ''}`} 
              onSubmit={handleSubmit}
            >
              {!isLogin && (
                <div className="personal-account__input-group">
                  <label htmlFor="name">Имя</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Введите ваше имя"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="personal-account__input-group">
                <label htmlFor="login">Логин</label>
                <input
                  type="text"
                  id="login"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  placeholder="Введите ваш логин"
                  required
                />
              </div>

              <div className="personal-account__input-group">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Введите ваш пароль"
                  required
                />
              </div>

              {!isLogin && (
                <div className="personal-account__input-group">
                  <label htmlFor="confirmPassword">Подтвердите пароль</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Подтвердите ваш пароль"
                    required={!isLogin}
                  />
                </div>
              )}

              <button 
                type="submit" 
                className="personal-account__submit"
                disabled={isLoading}
              >
                {isLoading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalAccount; 