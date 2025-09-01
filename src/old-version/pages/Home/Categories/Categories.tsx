import React, { useEffect, useRef } from 'react';
import { Swiper } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import slide1 from './categories__slide1.png';
import slide2 from './categories__slide2.png';
import slide3 from './categories__slide3.png';
import slide4 from './categories__slide4.png';
import slide5 from './categories__slide5.png';
import slide6 from './categories__slide6.png';
import slide7 from './categories__slide7.png';
import slide8 from './categories__slide8.png';
import arrowLeft from '../_general/img/arrow-left-black.svg';
import arrowRight from '../_general/img/arrow-right-black.svg';

const Categories: React.FC = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperContainerRef.current) {
      swiperRef.current = new Swiper(swiperContainerRef.current, {
        modules: [Navigation, Autoplay],
        slidesPerView: 2,
        navigation: {
          nextEl: '.categories__slider-r',
          prevEl: '.categories__slider-l',
        },
        loop: true,
        simulateTouch: false,
        speed: 700,
        autoplay: {
          delay: 3000,
        },
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

  return (
    <div className="categories container--big">
      <div 
        ref={swiperContainerRef}
        className="swiper categories__swiper"
      >
        <div className="swiper-wrapper">
          <div className="swiper-slide swiper-lazy">
            <div className="categories__slide1">
              <img src={slide1} alt="" />
            </div>
          </div>
          <div className="swiper-slide swiper-lazy">
            <div className="categories__slide2">
              <img src={slide2} alt="" />
            </div>
          </div>
          <div className="swiper-slide swiper-lazy">
            <div className="categories__slide3">
              <img src={slide3} alt="" />
            </div>
          </div>
          <div className="swiper-slide swiper-lazy">
            <div className="categories__slide4">
              <img src={slide4} alt="" />
            </div>
          </div>
          <div className="swiper-slide swiper-lazy">
            <div className="categories__slide5">
              <img src={slide5} alt="" />
            </div>
          </div>
          <div className="swiper-slide swiper-lazy">
            <div className="categories__slide6">
              <img src={slide6} alt="" />
            </div>
          </div>
          <div className="swiper-slide swiper-lazy">
            <div className="categories__slide7">
              <img src={slide7} alt="" />
            </div>
          </div>
          <div className="swiper-slide swiper-lazy">
            <div className="categories__slide8">
              <img src={slide8} alt="" />
            </div>
          </div>
        </div>

        <div className="categories__slider-navigation">
          <img src={arrowLeft} className="categories__slider-l" alt="" />
          <img src={arrowRight} className="categories__slider-r" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Categories;