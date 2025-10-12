import React, { useState, useRef, useEffect } from 'react';

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
      icon: '../../../pages/Home/_general/img/phone.svg',
      text: '+7 (495) 646 66 26',
      alt: 'Телефон'
    },
    {
      icon: '../../../pages/Home/_general/img/whatsapp.svg',
      text: '+7 (926) 513 55 91',
      alt: 'WhatsApp'
    }
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: '../../../pages/Home/_general/img/vk.svg',
      alt: 'ВКонтакте',
      href: '#'
    },
    {
      icon: '../../../pages/Home/_general/img/instagram.svg',
      alt: 'Instagram',
      href: '#'
    },
    {
      icon: '../../../pages/Home/_general/img/youtube.svg',
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
      className={`fixed transform scale-y-0 w-72 h-full flex-col items-center justify-center bg-white font-manrope tracking-wider uppercase font-extrabold text-sm transition-transform duration-500 z-50
        ${isOpen ? 'scale-y-100 flex' : ''}
        sm:w-full sm:px-9 sm:items-start`}
      role="navigation"
      aria-label="Основное меню"
    >
      <button 
        className="hidden absolute top-5 right-5 scale-125 sm:block"
        onClick={handleClose}
        aria-label="Закрыть меню"
      >
        <img src={'../../../pages/Home/_general/img/close.svg'} alt="" aria-hidden="true" />
      </button>

      <button 
        className="hidden w-full items-center justify-start gap-2 py-5 font-manrope tracking-wider uppercase font-extrabold text-sm sm:flex"
        aria-label="Открыть личный кабинет"
      >
        <img src={'../../../pages/Home/_general/img/personal-acc.svg'} alt="" aria-hidden="true" />
        <span>Профиль</span>
      </button>

      <div className="grid grid-rows-6 h-1/2 w-full">
        <a href="#" className="w-full flex justify-center items-center transition-colors duration-500 hover:bg-gray-300 sm:justify-start sm:border-t sm:border-black/10">Подобрать уход</a>
        <a href="#" className="w-full flex justify-center items-center transition-colors duration-500 hover:bg-gray-300 sm:justify-start sm:border-t sm:border-black/10">Акции</a>
        <a href="#" className="w-full flex justify-center items-center transition-colors duration-500 hover:bg-gray-300 sm:justify-start sm:border-t sm:border-black/10">Блог</a>
        <a href="#" className="w-full flex justify-center items-center transition-colors duration-500 hover:bg-gray-300 sm:justify-start sm:border-t sm:border-black/10">Где купить</a>
        <a href="#" className="w-full flex justify-center items-center transition-colors duration-500 hover:bg-gray-300 sm:justify-start sm:border-t sm:border-black/10">Программа лояльности</a>
        <a href="#" className="w-full flex justify-center items-center transition-colors duration-500 hover:bg-gray-300 sm:justify-start sm:border-t sm:border-black/10">Контакты</a>
      </div>

      <div className="hidden text-base mt-20 gap-2 flex-col sm:flex">
        {contacts.map((contact, index) => (
          <div key={index} className="flex gap-2">
            <img src={contact.icon} alt={contact.alt} aria-hidden="true" />
            <span>{contact.text}</span>
          </div>
        ))}

        <div className="flex gap-5 mt-2">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              className="flex gap-2 items-center"
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