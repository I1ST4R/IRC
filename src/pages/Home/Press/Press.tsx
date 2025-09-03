import React from 'react';
import sliderImg1 from './slide-img1.svg';
import sliderImg2 from './slide-img2.svg';
import sliderImg3 from './slide-img3.svg';
import sliderImg4 from './slide-img4.svg';
import sliderImg5 from './slide-img5.svg';
import sliderImg6 from './slide-img6.svg';
import sliderImg7 from './slide-img7.svg';

interface PressLogo {
  id: number;
  src: string;
  alt: string;
}

const Press: React.FC = () => {
  const logos: PressLogo[] = [
    {
      id: 1,
      src: sliderImg1,
      alt: 'Логотип прессы 1'
    },
    {
      id: 2,
      src: sliderImg2,
      alt: 'Логотип прессы 2'
    },
    {
      id: 3,
      src: sliderImg3,
      alt: 'Логотип прессы 3'
    },
    {
      id: 4,
      src: sliderImg4,
      alt: 'Логотип прессы 4'
    },
    {
      id: 5,
      src: sliderImg5,
      alt: 'Логотип прессы 5'
    },
    {
      id: 6,
      src: sliderImg6,
      alt: 'Логотип прессы 6'
    },
    {
      id: 7,
      src: sliderImg7,
      alt: 'Логотип прессы 7'
    },
    {
      id: 8,
      src: sliderImg1,
      alt: 'Логотип прессы 1'
    },
    {
      id: 9,
      src: sliderImg2,
      alt: 'Логотип прессы 2'
    },
    {
      id: 10,
      src: sliderImg3,
      alt: 'Логотип прессы 3'
    },
    {
      id: 11,
      src: sliderImg4,
      alt: 'Логотип прессы 4'
    },
    {
      id: 12,
      src: sliderImg5,
      alt: 'Логотип прессы 5'
    },
    {
      id: 13,
      src: sliderImg6,
      alt: 'Логотип прессы 6'
    },
    {
      id: 14,
      src: sliderImg7,
      alt: 'Логотип прессы 7'
    }
    
  ];

  return (
    <div className="press container--big">
      <h2 className="press__title">пресса о нас</h2>

      <div className="press__block">
        <div className="press__slider">
          {logos.map((logo) => (
            <img 
              key={logo.id}
              src={logo.src}
              alt={logo.alt}
              className="press__logo"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Press; 