import React from 'react';
import { Link } from 'react-router-dom';
import { openAccount,  } from '@/modules/AuthForm';
import { useAppDispatch } from '@/App/store';
import catalog from './catalog.svg'
import liked from '../../../pages/Home/_general/img/liked.svg'
import home from '../../../pages/Home/_general/img/basket.svg'
import personalAcc from '../../../pages/Home/_general/img/personal-acc.svg'

const BottomMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="hidden fixed bottom-0 w-full justify-around bg-white z-50 py-3 px-1 rounded-t-2xl md:flex">
      <Link to="catalog" className="flex flex-col items-center gap-1 font-inter font-semibold text-xs uppercase text-center">
        <img alt="catalog" src={catalog}/>
        <p>Каталог</p>
      </Link>

      <Link to="liked" className="flex flex-col items-center gap-1 font-inter font-semibold text-xs uppercase text-center">
        <img alt="liked" src={liked}  />
        <p>Избранное</p>
      </Link>

      <Link to="cart" className="flex flex-col items-center gap-1 font-inter font-semibold text-xs uppercase text-center">
        <img alt="cart" src={home}/>
        <p>Корзина</p>
      </Link>

      <button className="flex flex-col items-center gap-1 font-inter font-semibold text-xs uppercase text-center cursor-pointer" onClick={() => dispatch(openAccount())}>
        <img alt="personal-acc" src={personalAcc}/>
        <p>Профиль</p>
      </button>
    </div>
  );
};

export default BottomMenu;