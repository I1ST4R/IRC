import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
// import Navbar from './components/Navbar/Navbar';
// import BottomMenu from './components/BottomMenu/BottomMenu';
// import PersonalAccount from './components/PersonalAccount/PersonalAccount';
import './_app.scss';

const App: React.FC = () => {

  return (
    <div className="bg-[#F2F2F2] w-73">
      <p className="p-3 border-b border-gray-200">Ваш заказ</p>

      <div className="order-menu__item">
        <div className="order-menu__text">
          <span className="order-menu__label">Товары на сумму:</span>
          <span className="order-menu__value">{228} ₽</span>
        </div>
        <div className="order-menu__text">
          <span className="order-menu__label">Скидка:</span>
          <span className="order-menu__value order-menu__value--discount">
            {69} ₽
          </span>
        </div>
        {true && (
          <div className="order-menu__text">
            <span className="order-menu__label">Скидка по промокоду:</span>
            <span className="order-menu__value order-menu__value--discount">
              {100} ₽
            </span>
          </div>
        )}
        {true && (
          <div className="order-menu__text">
            <span className="order-menu__label">Скидка по сертификату:</span>
            <span className="order-menu__value order-menu__value--discount">
              {200} ₽
            </span>
          </div>
        )}
        <div className="order-menu__text">
          <span className="order-menu__label">Доставка:</span>
          <span className="order-menu__value">{1488} ₽</span>
        </div>
        <div className="order-menu__text">
          <span className="order-menu__label">Всего к оплате:</span>
          <span className="order-menu__value">{2564} ₽</span>
        </div>
      </div>

      <div className="order-menu__item">
        {true && (
          <div className="order-menu__field">
            <input
              type="text"
              placeholder="Промокод"
              className={`order-menu__input`}
            />
          </div>
        )}
        {true && (
          <div className="order-menu__field">
            <input
              type="text"
              placeholder="Сертификат"
              className={`order-menu__input`}
            />
          </div>
        )}
      </div>

      <button className="order-menu__button" onClick={() => alert("Заебись")}>
        Оформить заказ
      </button>
    </div>
  )

  // return (
  //   <div className="app">
  //     <Header />
  //     <Navbar />
  //     <main className="app__content">
  //       <Outlet />
  //       <PersonalAccount />
  //     </main>
  //     <Footer />
  //     <BottomMenu />
  //   </div>
  // );
};

export default App;