import React from 'react';
import { Link } from 'react-router-dom';
import catalog from './catalog.svg';
import liked from '../../../pages/Home/_general/img/liked.svg';
import basket from '../../../pages/Home/_general/img/basket.svg';
import personalAcc from '../../../pages/Home/_general/img/personal-acc.svg';
import { AppDispatch, RootState } from '@/main/store';
import { useDispatch, useSelector } from 'react-redux';
import { openAccount } from '@/entity/users/slice';

const BottomMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="bottom-menu">
      <Link to="/catalog" className="bottom-menu__button">
        <img src={catalog} alt="catalog" />
        <p>Каталог</p>
      </Link>

      <button className="bottom-menu__button">
        <img src={liked} alt="liked" />
        <p>Избранное</p>
      </button>

      <button className="bottom-menu__button">
        <img src={basket} alt="basket" />
        <p>Корзина</p>
      </button>

      <button className="bottom-menu__button" onClick={() => dispatch(openAccount())}>
        <img src={personalAcc} alt="personal-acc" />
        <p>Профиль</p>
      </button>
    </div>
  );
};

export default BottomMenu; 