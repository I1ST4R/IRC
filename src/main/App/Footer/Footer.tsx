import React from 'react';
import { usePersonalAccount } from '../../../context/PersonalAccountContext';
import logo from './logo.svg';
import phone from '../../../pages/Home/_general/img/phone.svg';
import whatsapp from '../../../pages/Home/_general/img/whatsapp.svg';
import vk from '../../../pages/Home/_general/img/vk.svg';
import instagram from '../../../pages/Home/_general/img/instagram.svg';
import youtube from '../../../pages/Home/_general/img/youtube.svg';
import mail from './mail.svg';
import clock from './clock.svg';

const Footer: React.FC = () => {
  const { toggleAccount } = usePersonalAccount();

  return (
    <footer className="footer">
      <div className="container">

        <div className="footer__info-block"> 
          <img src={logo} alt="" />
          <a href="#" className="footer__point">Соглашение с политикой конфиденциальности</a>
          <a href="#" className="footer__point">Пользовательское соглашение</a>
          <a href="#" className="footer__point">Карта сайта</a>
          <a href="#" className="footer__point">Правила акций при техническом сбое</a>
        </div>

        <div className="footer__info-block footer__info-block--2">
          <p className="footer__info-block-title">информация</p>
          <a href="#" className="footer__point">Контакты</a>
          <a href="#" className="footer__point">О бренде</a>
          <a href="#" className="footer__point">Программа лояльности</a>
          <a href="#" className="footer__point">Акции</a>
          <a href="#" className="footer__point">Доставка и оплата</a>
          <a href="#" className="footer__point">Приемка и возврат</a>
        </div>

        <div className="footer__info-block">
          <p className="footer__info-block-title">Каталог</p>
          <a href="#" className="footer__point">Уход за кожей</a>
          <a href="#" className="footer__point">Уход за волосами</a>
          <a href="#" className="footer__point">Подобрать уход</a>
        </div>

        <div className="footer__info-block">
          <a href="#" className="footer__point">
            <img src={phone} alt="" />
            +7 (495) 646 66 26
          </a>
          <a href="#" className="footer__point">
            <img src={whatsapp} alt="" />
            +7 (926) 513 55 91
          </a>
          <a href="#" className="footer__point">
            <img src={mail} alt="" />
            info@irc247.ru
          </a>
          <a href="#" className="footer__point">
            <img src={clock} alt="" />
            с 10:00 до 19:00
          </a>
          <div className="footer__social-links">
            <a href="#" className="footer__social-link">
              <img src={vk} alt="" />
            </a>
            <a href="#" className="footer__social-link">
              <img src={youtube} alt="" />
            </a>
            <a href="#" className="footer__social-link">
              <img src={instagram} alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;