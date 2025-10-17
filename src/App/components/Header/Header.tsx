import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { closeAccount, openAccount } from "@/modules/AuthForm";
import {
  useGetUserQuery,
  useLogoutMutation,
} from "@/shared/store/user/userApiSlice";
import { initialCart, useGetCartQuery } from "@/modules/CartBody";
// import { useGetLikedQuery } from "@/modules/LikedBody";
import { useAppDispatch } from "@/App/store";
import search from "./search.svg";
import personalAcc from "../../../pages/Home/_general/img/personal-acc.svg";
import arrow from "./arrow.svg";
import liked from "../../../pages/Home/_general/img/liked.svg";
import basket from "../../../pages/Home/_general/img/basket.svg";
import { useGetLikedQuery } from "@/modules/LikedBody";

const Header = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const previousScrollPosition = useRef(0);
  const counter = useRef(0);
  const dispatch = useAppDispatch();
  const { data: user } = useGetUserQuery();

  const { data: cart = initialCart } = useGetCartQuery(user?.id ?? "", {
    skip: !user?.id,
  });
  const { data: likedItems = [] } = useGetLikedQuery(user?.id ?? "", {
    skip: !user?.id,
  });
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      counter.current += currentScrollPosition - previousScrollPosition.current;

      if (counter.current >= 300 && counter.current !== 0) {
        counter.current = 0;
        setIsHeaderVisible(false);
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

  const stub = 5;

  const handleLogout = () => {
    logout();
    dispatch(closeAccount())
  };

  return (
    <header
      className={`w-full bg-white/75 z-50 transition-transform duration-500 ease-in-out ${
        isHeaderVisible ? "scale-y-100" : "scale-y-0"
      }`}
      ref={headerRef}
    >
      <div className="container mx-auto h-25 flex justify-between items-center">
        <div className="w-140 flex justify-between items-center">
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
        </div>

        <div className="flex items-center gap-7.5">
          <button className="header__button relative bg-none border-none cursor-pointer p-0 flex items-center justify-center transition-all duration-300 ease-in-out hover:[&_svg_path]:fill-none hover:[&_svg_path]:stroke-coral">
            <img src={search} alt="search" />
          </button>

          {user?.id ? (
            <button
              onClick={handleLogout}
              className="header__button relative bg-none border-none cursor-pointer p-0 flex items-center justify-center transition-all duration-300 ease-in-out"
              title="Выйти"
            >
              <img src={arrow} alt="" />
            </button>
          ) : (
            <button
              className="header__button relative bg-none border-none cursor-pointer p-0 flex items-center justify-center transition-all duration-300 ease-in-out"
              onClick={() => dispatch(openAccount())}
            >
              <img src={personalAcc} alt="personal-acc" />
            </button>
          )}

          <Link
            to="/liked"
            className="header__button relative bg-none border-none cursor-pointer p-0 flex items-center justify-center transition-all duration-300 ease-in-out"
            id="liked__container1"
          >
            <img src={liked} alt="liked" />
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
            <img src={basket} alt="basket" />
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
