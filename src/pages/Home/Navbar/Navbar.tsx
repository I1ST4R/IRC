import React, { useState, useRef, useEffect } from 'react';
import close from '../_general/img/close.svg';
import personalAcc from '../_general/img/personal-acc.svg';
import phone from '../_general/img/phone.svg';
import whatsapp from '../_general/img/whatsapp.svg';
import vk from '../_general/img/vk.svg';
import instagram from '../_general/img/instagram.svg';
import youtube from '../_general/img/youtube.svg';

interface Contact {
  icon: string;
  text: string;
  alt: string;
}

interface SocialLink {
  icon: string;
  alt: string;
  href: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const contacts: Contact[] = [
    {
      icon: phone,
      text: '+7 (495) 646 66 26',
      alt: 'Телефон'
    },
    {
      icon: whatsapp,
      text: '+7 (926) 513 55 91',
      alt: 'WhatsApp'
    }
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: vk,
      alt: 'ВКонтакте',
      href: '#'
    },
    {
      icon: instagram,
      alt: 'Instagram',
      href: '#'
    },
    {
      icon: youtube,
      alt: 'YouTube',
      href: '#'
    }
  ];

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav 
      ref={navRef}
      className={`navbar ${isOpen ? 'navbar--active' : ''}`}
      role="navigation"
      aria-label="Основное меню"
    >
      <button 
        className="navbar__close"
        onClick={handleClose}
        aria-label="Закрыть меню"
      >
        <img src={close} alt="" aria-hidden="true" />
      </button>

      <button 
        className="registration-btn"
        aria-label="Открыть личный кабинет"
      >
        <img src={personalAcc} alt="" aria-hidden="true" />
        <span>Профиль</span>
      </button>

      <div className="navbar__list">
        <a href="#" className="navbar__link">Подобрать уход</a>
        <a href="#" className="navbar__link">Акции</a>
        <a href="#" className="navbar__link">Блог</a>
        <a href="#" className="navbar__link">Где купить</a>
        <a href="#" className="navbar__link">Программа лояльности</a>
        <a href="#" className="navbar__link">Контакты</a>
      </div>

      <div className="navbar__contacts">
        {contacts.map((contact, index) => (
          <div key={index} className="navbar__contact">
            <img src={contact.icon} alt={contact.alt} aria-hidden="true" />
            <span>{contact.text}</span>
          </div>
        ))}

        <div className="navbar__social">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              className="navbar__social-link"
              aria-label={link.alt}
            >
              <img src={link.icon} alt="" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 