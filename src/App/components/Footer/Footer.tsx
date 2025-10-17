import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#E1E7F0] py-12">
      <div className="grid grid-cols-4 px-5">
        
        <div className="flex flex-col gap-4 text-left items-start font-manrope font-extrabold text-sm text-black">
          <img src={'./logo.svg'} alt="" className="mb-14" />
          <a href="#" className="flex gap-2 items-center">Соглашение с политикой конфиденциальности</a>
          <a href="#" className="flex gap-2 items-center">Пользовательское соглашение</a>
          <a href="#" className="flex gap-2 items-center">Карта сайта</a>
          <a href="#" className="flex gap-2 items-center">Правила акций при техническом сбое</a>
        </div>

        <div className="flex flex-col gap-4 text-left items-start font-manrope font-extrabold text-sm text-black md:gap-6 sm:gap-4">
          <p className="uppercase text-xs tracking-wider">информация</p>
          <a href="#" className="flex gap-2 items-center">Контакты</a>
          <a href="#" className="flex gap-2 items-center">О бренде</a>
          <a href="#" className="flex gap-2 items-center">Программа лояльности</a>
          <a href="#" className="flex gap-2 items-center">Акции</a>
          <a href="#" className="flex gap-2 items-center">Доставка и оплата</a>
          <a href="#" className="flex gap-2 items-center">Приемка и возврат</a>
        </div>

        <div className="flex flex-col gap-4 text-left items-start font-manrope font-extrabold text-sm text-black">
          <p className="uppercase text-xs tracking-wider">Каталог</p>
          <a href="#" className="flex gap-2 items-center">Уход за кожей</a>
          <a href="#" className="flex gap-2 items-center">Уход за волосами</a>
          <a href="#" className="flex gap-2 items-center">Подобрать уход</a>
        </div>

        <div className="flex flex-col gap-4 text-left items-start font-manrope font-extrabold text-sm text-black">
          <a href="#" className="flex gap-2 items-center">
            <img src={'../../../pages/Home/_general/img/phone.svg'} alt="" />
            +7 (495) 646 66 26
          </a>
          <a href="#" className="flex gap-2 items-center">
            <img src={'../../../pages/Home/_general/img/whatsapp.svg'} alt="" />
            +7 (926) 513 55 91
          </a>
          <a href="#" className="flex gap-2 items-center">
            <img src={'./mail.svg'} alt="" />
            info@irc247.ru
          </a>
          <a href="#" className="flex gap-2 items-center">
            <img src={'./clock.svg'} alt="" />
            с 10:00 до 19:00
          </a>
          <div className="flex gap-5">
            <a href="#" className="flex gap-2 items-center">
              <img src={'../../../pages/Home/_general/img/vk.svg'} alt="" />
            </a>
            <a href="#" className="flex gap-2 items-center">
              <img src={'../../../pages/Home/_general/img/youtube.svg'} alt="" />
            </a>
            <a href="#" className="flex gap-2 items-center">
              <img src={'../../../pages/Home/_general/img/instagram.svg'} alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;