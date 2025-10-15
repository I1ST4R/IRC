import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { openAccount } from "@/modules/AuthForm";
import {
  useGetUserQuery,
  useLogoutMutation,
} from "@/shared/store/user/userApiSlice";
// import { initialCart, useGetCartQuery } from "@/modules/CartBody";
// import { useGetLikedQuery } from "@/modules/LikedBody";
import { useAppDispatch } from "@/App/store";
import logo from './logo.svg';
import arrowDown from './arrow-down-coral.svg';
import search from './search.svg';
import personalAcc from '../../../pages/Home/_general/img/personal-acc.svg';
import liked from '../../../pages/Home/_general/img/liked.svg';
import basket from '../../../pages/Home/_general/img/basket.svg';

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const previousScrollPosition = useRef(0);
  const counter = useRef(0);

  const dispatch = useAppDispatch();
  const { data: user } = useGetUserQuery();

  // RTK Query хуки
  // const { data: cart = initialCart } = useGetCartQuery(user?.id ?? "", {
  //   skip: !user?.id,
  // });
  // const { data: likedItems = [] } = useGetLikedQuery(user?.id ?? "", {
  //   skip: !user?.id,
  // });
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      counter.current += currentScrollPosition - previousScrollPosition.current;

      if (counter.current >= 300 && counter.current !== 0) {
        counter.current = 0;
        setIsHeaderVisible(false);
        setIsMenuActive(false);
      }
      if (counter.current < -300 && counter.current !== 0) {
        counter.current = 0;
        setIsHeaderVisible(true);
      }

      previousScrollPosition.current = currentScrollPosition;
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const stub = 5

  const handleMenuClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className={`fixed w-full bg-white/75 z-50 transition-transform duration-500 ease-in-out ${
        isHeaderVisible ? "scale-y-100" : "scale-y-0"
      }`}
      ref={headerRef}
    >
      <div className="container mx-auto h-25 flex justify-between items-center">
        {/* Меню для мобильных устройств */}
        <button className="hidden md:flex items-center gap-2.5 h-auto">
          <img className="w-25 h-auto" src={logo}  alt="logo" />
          <p className="font-manrope text-13 font-800 uppercase tracking-wider">
            МЕНЮ
          </p>
        </button>

        {/* Основные ссылки */}
        <div className="w-30 flex justify-between items-center">
          <Link
            to="/catalog"
            className="font-manrope text-13 font-800 uppercase tracking-wider px-0.4 border-b-2 border-transparent hover:border-black transition-colors duration-700 ease-in-out user-select-none"
          >
            Каталог
          </Link>
          <a
            href="#"
            className="font-manrope text-13 font-800 uppercase tracking-wider px-0.4 border-b-2 border-transparent hover:border-black transition-colors duration-700 ease-in-out user-select-none"
          >
            Подобрать уход
          </a>
          <a
            href="#"
            className="font-manrope text-13 font-800 uppercase tracking-wider px-0.4 border-b-2 border-transparent hover:border-black transition-colors duration-700 ease-in-out user-select-none"
          >
            Акции
          </a>
          <a
            href="#"
            className="font-manrope text-13 font-800 uppercase tracking-wider px-0.4 border-b-2 border-transparent hover:border-black transition-colors duration-700 ease-in-out user-select-none"
          >
            Блог
          </a>

          {/* Выпадающее меню "О бренде" */}
          <button
            className={`font-manrope text-13 font-800 uppercase tracking-wider px-0.4 border-b-2 border-transparent hover:border-black transition-colors duration-700 ease-in-out user-select-none flex items-center gap-2.5 cursor-pointer relative ${
              isMenuActive ? "hover:border-transparent" : ""
            }`}
            ref={btnRef}
            onClick={handleMenuClick}
          >
            <p>О бренде</p>
            <img
              src={arrowDown}
              alt="arrow"
              className={`transition-transform duration-700 ease-in-out ${
                isMenuActive ? "rotate-180" : ""
              }`}
            />

            {/* Выпадающий список */}
            <ul
              className={`absolute top-17 left-1/2 -translate-x-1/2 w-62.5 list-none flex flex-col items-start bg-white border-t-2 border-coral shadow-lg opacity-0 invisible -translate-y-2.5 transition-all duration-300 ease-in-out ${
                isMenuActive ? "opacity-100 visible translate-y-0" : ""
              }`}
            >
              <li className="p-5 border-b border-black/10 text-left transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-coral">
                <a href="#">Доставки и оплата</a>
              </li>
              <li className="p-5 border-b border-black/10 text-left transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-coral">
                <a href="#">Где купить</a>
              </li>
              <li className="p-5 border-b border-black/10 text-left transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-coral">
                <a href="#">Программа лояльности</a>
              </li>
              <li className="p-5 text-left transition-all duration-300 ease-in-out hover:bg-gray-100 hover:text-coral">
                <a href="#">Контакты</a>
              </li>
            </ul>
          </button>
        </div>

        {/* Кнопки действий */}
        <div className="flex items-center gap-7.5">
          <button className="header__button relative bg-none border-none cursor-pointer p-0 flex items-center justify-center transition-all duration-300 ease-in-out hover:[&_svg_path]:fill-none hover:[&_svg_path]:stroke-coral">
            <img src={search} alt="search" />
          </button>

          {user?.id ? (
            <div className="header__user-info">
              <button
                onClick={handleLogout}
                className="header__button relative bg-none border-none cursor-pointer p-0 flex items-center justify-center transition-all duration-300 ease-in-out"
                title="Выйти"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 4L12.59 5.41L18.17 11H2V13H18.17L12.59 18.59L14 20L22 12L14 4Z"
                    fill="#333"
                  />
                  <path
                    d="M7 2H17V0H7V2Z"
                    fill="#333"
                    transform="rotate(90 17 2)"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <button
              className="header__button relative bg-none border-none cursor-pointer p-0 flex items-center justify-center transition-all duration-300 ease-in-out"
              onClick={() => dispatch(openAccount())}
            >
              <img
                src={personalAcc}
                alt="personal-acc"
              />
            </button>
          )}

          <Link
            to="/liked"
            className="header__button relative bg-none border-none cursor-pointer p-0 flex items-center justify-center transition-all duration-300 ease-in-out"
            id="liked__container1"
          >
            <img
              src={liked}
              alt="liked"
            />
            {stub > 0 && (
              <div
                className="counter absolute -top-2 -right-2 bg-coral text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                id="liked__counter"
              >
                {stub}
              </div>
            )}
          </Link>

          <Link
            to="/cart"
            className="header__button relative bg-none border-none cursor-pointer p-0 flex items-center justify-center transition-all duration-300 ease-in-out"
            id="basket__container1"
          >
            <img
              src={basket}
              alt="basket"
            />
            {stub > 0 && (
              <div
                className="counter absolute -top-2 -right-2 bg-coral text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                id="basket-counter"
              >
                {stub}
              </div>
            )}
          </Link>

          {user?.type === "admin" && (
            <Link
              to="/admin"
              className="header__button relative bg-none border-none cursor-pointer p-0 flex items-center justify-center transition-all duration-300 ease-in-out"
              id="admin__container1"
              title="Админка"
            >
              <span
                role="img"
                aria-label="admin"
                className="text-22 text-coral font-700"
              >
                ⚙️
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};


export default Header;
