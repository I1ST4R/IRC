import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import logo from './logo.svg';
import arrowDown from './arrow-down-coral.svg';
import search from './search.svg';
import personalAcc from '../../../pages/Home/_general/img/personal-acc.svg';
import liked from '../../../pages/Home/_general/img/liked.svg';
import basket from '../../../pages/Home/_general/img/basket.svg';
import { usePersonalAccount } from '../../../context/PersonalAccountContext';

const Header: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const previousScrollPosition = useRef(0);
  const counter = useRef(0);
  const { toggleAccount } = usePersonalAccount();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const likedItems = useSelector((state: RootState) => state.liked.items);
  const totalLikedItems = likedItems.length;


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

  return (
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

          <button 
            className="header__button" 
            onClick={toggleAccount}
          >
            <img src={personalAcc} alt="personal-acc" />
          </button>

          <Link to="/liked" className="header__button" id="liked__container1">
            <img src={liked} alt="liked" />
            <div className="counter" id="liked__counter">
            {totalLikedItems}
            </div>
          </Link>

          <Link to="/cart" className="header__button" id="basket__container1">
            <img src={basket} alt="basket" />
            {totalCartItems > 0 && (
              <div className="counter" id="basket-counter">
                {totalCartItems}
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
