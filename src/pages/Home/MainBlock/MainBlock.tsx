import React, { useEffect, useRef } from 'react';
import { Swiper } from 'swiper';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import ovals from './ovals.svg';
import arrowRight from '../_general/img/arrow-right-white.svg';

const MainBlock: React.FC = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperContainerRef.current) {
      swiperRef.current = new Swiper(swiperContainerRef.current, {
        modules: [EffectFade, Autoplay],
        allowTouchMove: false,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        speed: 3000,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true,
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
    <div className="main-block container--big">
      <div className="container">
        <img src={ovals} className="main-block__bg-svg" alt="" />

        <div 
          ref={swiperContainerRef}
          className="swiper main-block__swiper"
        >
          <div className="swiper-wrapper">
            <div className="swiper-slide main-block__slide1 swiper-lazy"></div>
            <div className="swiper-slide main-block__slide2 swiper-lazy"></div>
            <div className="swiper-slide main-block__slide3 swiper-lazy"></div>
          </div>
        </div>

        <div className="main-block__information">
          <p className="main-block__title">
            Эстетика кожи — твое лицо.
          </p>

          <div className="main-block__description">
            <p>
              биосовместимая косметика, которая решает, а не маскирует проблемы.
            </p>
            <div>
              эффективность подтверждена исследованиями
            </div>
          </div>

          <a href="#" className="btn btn--active btn--flex main-block__btn">
            <span>Подобрать уход</span>
            <img src={arrowRight} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainBlock;