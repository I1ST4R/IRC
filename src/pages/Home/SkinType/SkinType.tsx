import React from 'react';
import number1 from './number1.svg';
import number2 from './number2.svg';
import number3 from './number3.svg';

interface Point {
  id: number;
  number: string;
  text: string;
}

const SkinType: React.FC = () => {
  const points: Point[] = [
    {
      id: 1,
      number: number3,
      text: 'Пройди тест'
    },
    {
      id: 2,
      number: number1,
      text: 'Узнай свой тип кожи'
    },
    {
      id: 3,
      number: number2,
      text: 'Получи персональную систему IRC, скидки и подарки'
    }
  ];

  return (
    <div className="skin-type container--big">
      <div className="skin-type__title">
        <p>не знаешь</p>
        <p className="bold">свой тип кожи?</p>
      </div>

      <div className="skin-type__points">
        {points.map((point) => (
          <div key={point.id} className="skin-type__point">
            <img src={point.number} alt={`Шаг ${point.id}`} />
            <p className="skin-type__text">{point.text}</p>
          </div>
        ))}
      </div>

      <svg 
        className="skin-type__bg-svg" 
        width="871" 
        height="445" 
        viewBox="0 0 871 445" 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M300.94 871C245.883 871 194.815 859.83 151.408 837.171C77.2006 798.395 28.2081 727.066 9.69621 630.525C-10.0924 526.803 0.599842 412.869 40.0174 309.466C81.0309 201.755 151.089 113.192 237.265 60.0549C314.824 12.1826 411.692 -8.08304 509.996 2.92743C607.822 13.9379 697.988 54.789 763.578 118.299C878.479 229.201 902.098 371.699 830.125 519.463C771.397 640.418 652.666 754.672 520.37 817.703C446.322 853.128 370.519 871 300.94 871ZM457.812 21.4378C381.69 21.4378 308.759 41.0651 248.117 78.4056C165.771 129.15 98.7448 214.042 59.4868 317.285C21.6651 416.858 11.2921 526.644 30.2827 626.376C47.6775 717.492 91.5635 781.959 160.824 818.022C251.947 865.575 386.318 857.915 511.433 798.235C639.58 737.119 754.481 626.536 811.453 509.729C859.169 411.752 887.256 266.86 749.215 133.777C686.817 73.6185 600.96 34.6823 507.603 24.1505C491.165 22.3952 474.409 21.4378 457.812 21.4378Z"
          fill="white"
          fillOpacity="0.15"
        />
      </svg>

      <img 
        className="skin-type__img1" 
        src="src/images/skin-type__img1.png" 
        alt="Декоративное изображение 1" 
      />
      <img 
        className="skin-type__img2" 
        src="src/images/skin-type__img2.png" 
        alt="Декоративное изображение 2" 
      />

      <a 
        href="#" 
        className="btn btn--active btn--flex skin-type__btn"
        aria-label="Пройти тест на определение типа кожи"
      >
        пройти тест
      </a>
    </div>
  );
};

export default SkinType;