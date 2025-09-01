import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { openAccount } from '../../../entity/account/slice';
import { cartApi, useGetCartQuery } from '../../../entity/cart/api';
import { likedApi, useGetLikedQuery } from '../../../entity/liked/api';
import logo from './logo.svg';
import arrowDown from './arrow-down-coral.svg';
import search from './search.svg';
import personalAcc from '../../../pages/Home/_general/img/personal-acc.svg';
import liked from '../../../pages/Home/_general/img/liked.svg';
import basket from '../../../pages/Home/_general/img/basket.svg';
import PersonalAccount from "../PersonalAccount/PersonalAccount";
import { useGetUserQuery, useLogoutMutation } from "@/entity/users/api";

const Header: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const previousScrollPosition = useRef(0);
  const counter = useRef(0);
  const {isAccountOpen} = useSelector((state: RootState) => state.account);

  const dispatch = useDispatch<AppDispatch>();
  const {data: user} = useGetUserQuery();

  // RTK Query хуки
  const { data: cartItems = [] } = useGetCartQuery(user?.id ?? '', { skip: !user?.id });
  const { data: likedItems = [] } = useGetLikedQuery(user?.id ?? '', { skip: !user?.id });
  const [logout] = useLogoutMutation();

  const totalLikedItems = likedItems.length;
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

  const handleMenuClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleLogout = () => {
    logout()
  };

  return (
    <>
      <header
        className="header"
        ref={headerRef}
        style={{ transform: isHeaderVisible ? "scaleY(1)" : "scaleY(0)" }}
      >
        <div className="container">
          <button className="header__menu">
            <img className="header__logo" src={logo} alt="logo" />
            <p>МЕНЮ</p>
          </button>

          <div className="header__links">
            <Link to="/catalog" className="header__link">
              Каталог
            </Link>
            <a href="#" className="header__link">
              Подобрать уход
            </a>
            <a href="#" className="header__link">
              Акции
            </a>
            <a href="#" className="header__link">
              Блог
            </a>
            <button
              className={`header__link header__list-btn ${
                isMenuActive ? "header__list-btn--active" : ""
              }`}
              ref={btnRef}
              onClick={handleMenuClick}
            >
              <p>О бренде</p>
              <img src={arrowDown} alt="arrow" />

              <ul className="header__list" style={{ display: isMenuActive ? "flex" : "none" }}>
                <li>
                  <a href="#">Доставки и оплата</a>
                </li>
                <li>
                  <a href="#">Где купить</a>
                </li>
                <li>
                  <a href="#">Программа лояльности</a>
                </li>
                <li>
                  <a href="#">Контакты</a>
                </li>
              </ul>
            </button>
          </div>

          <div className="header__buttons">
            <button className="header__button header__search">
              <img src={search} alt="search" />
            </button>

            {user?.id ? (
              <div className="header__user-info">
                <button onClick={handleLogout} className="header__button header__logout" title="Выйти">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 4L12.59 5.41L18.17 11H2V13H18.17L12.59 18.59L14 20L22 12L14 4Z" fill="#333"/>
                    <path d="M7 2H17V0H7V2Z" fill="#333" transform="rotate(90 17 2)" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                className="header__button"
                onClick={() => dispatch(openAccount())}
              >
                <img src={personalAcc} alt="personal-acc" />
              </button>
            )}

            <Link to="/liked" className="header__button" id="liked__container1">
              <img src={liked} alt="liked" />
              {totalLikedItems > 0 && (
                <div className="counter" id="liked__counter">
                  {totalLikedItems}
                </div>
              )}
            </Link>

            <Link to="/cart" className="header__button" id="basket__container1">
              <img src={basket} alt="basket" />
              {totalCount > 0 && (
                <div className="counter" id="basket-counter">
                  {totalCount}
                </div>
              )}
            </Link>

            {user?.type === 'admin' && (
              <Link to="/admin" className="header__button" id="admin__container1" title="Админка">
                <span role="img" aria-label="admin" style={{fontSize: 22, color: '#CA354F', fontWeight: 700}}>⚙️</span>
              </Link>
            )}
          </div>
        </div>
      </header>
      {isAccountOpen && <PersonalAccount/>}
    </>
  );
};

export default Header;
