import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../main/store";
// import {
//   clearError,
//   closeAccount
// } from "../../../entity/users/slice";
import { useGetUserQuery, useLoginMutation, useRegisterMutation } from "../../../entity/users/api";
import "./_personal-account.scss";
import { closeAccount } from "@/entity/account/slice";


interface FormData {
  login: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  email?: string;
}

const PersonalAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data: user, error} = useGetUserQuery();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
    name: "",
    email: "",
    confirmPassword: "",
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // RTK Query мутации
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(clearError());

    if (isLogin) {
      login({ login: formData.login, password: formData.password })
      dispatch(closeAccount());
    } else {
      if (formData.password !== formData.confirmPassword || !formData.email) return;
      try {
        await register({
          login: formData.login,
          password: formData.password,
          email: formData.email,
          type: "client",
        }).unwrap();
        dispatch(closeAccount());
      } catch (error) {
        console.error('Register failed:', error);
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTabChange = (isLoginTab: boolean) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(isLoginTab);
      setFormData({
        login: "",
        password: "",
        name: "",
        email: "",
        confirmPassword: "",
      });
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="personal-account">
      <div className="personal-account__content">
        <button
          className="personal-account__close"
          onClick={() => dispatch(closeAccount())}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <>
          <h2 className="personal-account__title">
            {isLogin ? "Вход в личный кабинет" : "Регистрация"}
          </h2>

          <div className="personal-account__tabs">
            <button
              className={`personal-account__tab ${
                isLogin ? "personal-account__tab--active" : ""
              }`}
              onClick={() => handleTabChange(true)}
            >
              Вход
            </button>
            <button
              className={`personal-account__tab ${
                !isLogin ? "personal-account__tab--active" : ""
              }`}
              onClick={() => handleTabChange(false)}
            >
              Регистрация
            </button>
          </div>

          {error && (
            <div className="personal-account__error">ошибка</div>
          )}

          <form
            className={`personal-account__form ${
              isTransitioning ? "personal-account__form--transitioning" : ""
            }`}
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
                />
              </div>
            )}
            {!isLogin && (
              <div className="personal-account__input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Введите ваш email"
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
              disabled={isLoginLoading || isRegisterLoading}
            >
              {isLoginLoading || isRegisterLoading
                ? "Загрузка..."
                : isLogin
                ? "Войти"
                : "Зарегистрироваться"}
            </button>
          </form>
        </>
      </div>
    </div>
  );
};

export default PersonalAccount