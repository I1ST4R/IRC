import React, { useEffect, useRef, useState } from 'react';
import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import sliderImg1 from './slider-img1.svg';
import sliderImg2 from './slider-img2.svg';
import sliderImg3 from './slider-img3.svg';
import sliderImg4 from './slider-img4.svg';
import sliderImg5 from './slider-img5.svg';
import sliderImg6 from './slider-img6.svg';
import sliderImg7 from './slider-img7.svg';
import sliderImg8 from './slider-img8.svg';
import sliderImg9 from './slider-img9.svg';
import sliderImg10 from './slider-img10.svg';
import sliderImg11 from './slider-img11.svg';
import sliderImg12 from './slider-img12.svg';
import sliderImg13 from './slider-img13.svg';
import arrowLeft from '../_general/img/arrow-left-black.svg';
import arrowRight from '../_general/img/arrow-right-black.svg';
import ingredientsImg from './ingredients__img.jpg';

const descText = [
  'Несульфированный гликозаминогликан, входящий в состав соединительной, эпителиальной и нервной тканей. Является одним из основных компонентов внеклеточного матрикса, содержится во многих биологических жидкостях!',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae saepe nam aut voluptate perferendis dignissimos?',
  'Lorem ipsum dolor  facere a quaerat tempore magnam adipisicing elit. Repudiandae saepe nam aut voluptate perferendis facere a quaerat tempore magnam dignissimos?',
  'Lorem ipsum sit amet consectetur consectetur adipisicing elit. Repudiandae saepe nam aut voluptate perferendis nam aut facere a quaerat tempore magnam dignissimos?',
  'Lorem ipsum dolor amet consectetur sit amet consectetur adipisicing elit. Repudiandae saepe nam aut voluptate perferendis facere a quaerat tempore magnam dignissimos?',
  'Lorem ipsum dolor sit amet consectetur aut voluptate perferendis facere adipisicing elit. Repudiandae saepe nam aut voluptate perferendis facere a quaerat tempore magnam dignissimos?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ipsum dolor quaerat tempore saepe nam aut voluptate quaerat tempore magnam dignissimos?',
  'Lorem ipsum  adipisicing dolor sit elit. Repudiandae saepe nam aut voluptate perferendis facere a quaerat tempore magnam dignissimos perferendis facere?',
  'Lorem ipsum perferendis facere a dolor adipisicing elit. Repudiandae saepe nam aut voluptate perferendis facere a sit amet consectetur quaerat tempore magnam dignissimos?',
  'Lorem ipsum dolor sit voluptate perferendis facere amet consectetur adipisicing elit. Repudiandae consectetur a quaerat perferendis facere a quaerat tempore magnam dignissimos?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae saepe nam aut  sit amet consectetur a quaerat saepe nam aut voluptate tempore magnam dignissimos?',
  'Lorem ipsum dolor perferendis facere a quaerat tempore sit amet consectetur. Repudiandae saepe nam aut voluptate perferendis voluptate perferendis?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae saepe nam aut voluptate perferendis saepe nam aut voluptate perferendis tempore magnam dignissimos adipisicing elit?',
];

const Ingredients: React.FC = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const [activeDescription, setActiveDescription] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const [trianglePosition, setTrianglePosition] = useState(0);

  useEffect(() => {
    if (swiperContainerRef.current) {
      swiperRef.current = new Swiper(swiperContainerRef.current, {
        modules: [Navigation],
        slidesPerView: 2,
        navigation: {
          prevEl: '.ingredients__btn-left',
          nextEl: '.ingredients__btn-right',
        },
        speed: 700,
        breakpoints: {
          650: {
            slidesPerView: 4,
          },
          950: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 8,
          },
        },
        on: {
          slideChange: () => {
            setActiveDescription(false);
            setTrianglePosition(0);
          }
        }
      });

      return () => {
        if (swiperRef.current) {
          swiperRef.current.destroy();
          swiperRef.current = null;
        }
      };
    }
  }, []);

  const handleSlideInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    const slide = e.currentTarget;
    if (!activeDescription) {
      setActiveDescription(true);
    }
    updateDescription(slide);
  };

  const updateDescription = (slide: HTMLDivElement) => {
    const slideIndex = parseInt(slide.id.replace('ingredients__slide', ''));
    setDescriptionText(descText[slideIndex]);

    if (swiperRef.current) {
      const activeIndex = swiperRef.current.activeIndex;
      const width = slide.clientWidth;
      setTrianglePosition((slideIndex - activeIndex + 0.5) * width);
    }
  };

  return (
    <div className="ingredients container--big">
      <div className="ingredients__information">
        <img src={ingredientsImg} className="ingredients__img" alt="Ingredients" />
        <div className="ingredients__text-container">
          <div className="ingredients__text">
            <p className="block-title">В основе IRC - концепция «умных формул»</p>
            <p className="block-title block-title--bold">
              усиливающие друг друга ингредиенты в максимальной концентрации
            </p>
            <p className="ingredients__desc">
              Такой подход биосовместимости создаёт максимально безопасные составы, результат от которых виден сразу.
              Главные ингредиенты:
            </p>
          </div>
        </div>
      </div>

      <div className="swiper__container">
        <div 
          ref={swiperContainerRef}
          className="swiper categories__swiper"
        >
          <div className="swiper-wrapper">
            {[
              { img: sliderImg1, title: '4D гиалуроновая кислота' },
              { img: sliderImg2, title: 'Hyafactor NAG' },
              { img: sliderImg3, title: 'Витамин C' },
              { img: sliderImg4, title: 'Феруловая кислота' },
              { img: sliderImg5, title: '7 AHA BHA PHA кислот' },
              { img: sliderImg6, title: 'Адаптивный растительный пребиотик' },
              { img: sliderImg7, title: 'Пептиды' },
              { img: sliderImg8, title: 'Ретинол' },
              { img: sliderImg9, title: '4D гиалуроновая кислота' },
              { img: sliderImg10, title: 'GABA' },
              { img: sliderImg11, title: 'Карбоксигидратный комплекс' },
              { img: sliderImg12, title: '4D гиалуроновая кислота' },
              { img: sliderImg13, title: 'Ниацинамид' },
            ].map((item, index) => (
              <div
                key={index}
                className="swiper-slide swiper-lazy"
                id={`ingredients__slide${index}`}
                onMouseOver={handleSlideInteraction}
                onClick={handleSlideInteraction}
              >
                <img src={item.img} alt={item.title} />
                <p className="ingredients__slide-title">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <img className="ingredients__btn-left" src={arrowLeft} alt="Previous" />
        <img src={arrowRight} className="ingredients__btn-right" alt="Next" />
      </div>

      <div 
        ref={descriptionRef}
        className={`ingredients__slider-desc ${activeDescription ? 'ingredients__slider-desc--active' : ''}`}
      >
        <p>{descriptionText}</p>
        <div 
          ref={triangleRef}
          className="ingredients__triangle"
          style={{ left: `${trianglePosition}px` }}
        />
      </div>
    </div>
  );
};

export default Ingredients; 