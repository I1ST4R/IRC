import React from "react";
// import { Outlet } from 'react-router-dom';
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
// import Navbar from './components/Navbar/Navbar';
// import BottomMenu from './components/BottomMenu/BottomMenu';
// import PersonalAccount from './components/PersonalAccount/PersonalAccount';
import "./app.css";
import { Button } from "@/shared/ui/kit/button";

const App: React.FC = () => {
  return (
    <div className="w-full h-[100vh]">
      <div className="bg-[#F2F2F2] w-73 pb-6">
        <p className="p-3 border-b border-gray-200">Ваш заказ</p>

        <div
          className="p-3 border-b border-gray-200 font-['Manrope'] font-bold 
          text-xs tracking-widest uppercase flex flex-col gap-2.5"
        >
          <div className="flex justify-between items-center">
            <span>Товары на сумму:</span>
            <span className="text-[var(--coral)]">{228} ₽</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Скидка:</span>
            <span className="text-[var(--coral)]">{69} ₽</span>
          </div>
          {true && (
            <div className="flex justify-between items-center">
              <span>Скидка по промокоду:</span>
              <span className="text-[var(--coral)]">{100} ₽</span>
            </div>
          )}
          {true && (
            <div className="flex justify-between items-center">
              <span>Скидка по сертификату:</span>
              <span className="text-[var(--coral)]">{200} ₽</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span>Доставка:</span>
            <span className="text-[var(--coral)]">{1488} ₽</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Всего к оплате:</span>
            <span className="text-[var(--coral)]">{2564} ₽</span>
          </div>
        </div>

        <div
          className="p-3 border-b border-gray-200 font-['Manrope'] 
          font-bold text-xs tracking-widest uppercase flex flex-col gap-2.5"
        >
          {true && (
            <div className="flex flex-col cursor-pointer">
              <input
                type="text"
                placeholder="Промокод"
                className="flex-1 p-6 border border-[#e0e0e0] rounded-4xl text-sm 
                ml-0 mb-2.5 min-w-30 block bg-[rgba(0,0,0,0.05)] font-normal 
                uppercase text-black outline-0 focus:border-[var(--coral)]
                focus:outline-none transition-colors"
              />
            </div>
          )}
          {true && (
            <div className="flex flex-col cursor-pointer">
              <input
                type="text"
                placeholder="Сертификат"
                className="flex-1 p-6 border border-[#e0e0e0] rounded-4xl text-sm 
                ml-0 mb-2.5 min-w-30 block bg-[rgba(0,0,0,0.05)] font-normal uppercase
              text-black outline-0 focus:border-[var(--coral)] focus:outline-none transition-colors"
              />
            </div>
          )}
        </div>
        <Button>
          Оформить заказ
        </Button>
      </div>
    </div>
  );

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
