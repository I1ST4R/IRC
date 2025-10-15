import React from 'react';
import { Link } from 'react-router-dom';
import { openAccount,  } from '@/modules/AuthForm';
import { useAppDispatch } from '@/App/store';

const BottomMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="hidden fixed bottom-0 w-full justify-around bg-white z-50 py-3 px-1 rounded-t-2xl md:flex">
      <Link to="catalog" className="flex flex-col items-center gap-1 font-inter font-semibold text-xs uppercase text-center">
        <img alt="catalog" src={'./catalog.svg'}/>
        <p>Каталог</p>
      </Link>

      <Link to="liked" className="flex flex-col items-center gap-1 font-inter font-semibold text-xs uppercase text-center">
        <img alt="liked" src={'../../../pages/Home/_general/img/liked.svg'}  />
        <p>Избранное</p>
      </Link>

      <Link to="cart" className="flex flex-col items-center gap-1 font-inter font-semibold text-xs uppercase text-center">
        <img alt="cart" src={'../../../pages/Home/_general/img/basket.svg'}/>
        <p>Корзина</p>
      </Link>

      <button className="flex flex-col items-center gap-1 font-inter font-semibold text-xs uppercase text-center" onClick={() => dispatch(openAccount())}>
        <img alt="personal-acc" src={'../../../pages/Home/_general/img/personal-acc.svg'}/>
        <p>Профиль</p>
      </button>
    </div>
  );
};

export default BottomMenu;