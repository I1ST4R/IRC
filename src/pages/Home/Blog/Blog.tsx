import React, { useEffect, useRef } from 'react';
import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import arrowLeft from '../_general/img/arrow-left-black.svg';
import arrowRight from '../_general/img/arrow-right-black.svg';
import blogSlide1 from './blog__slide1.png';
import blogSlide2 from './blog__slide2.png';
import blogSlide3 from './blog__slide3.png';
import blogSlide4 from './blog__slide4.png';
import blogSlide5 from './blog__slide5.webp';
import blogSlide6 from './blog__slide6.jpg';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const Blog: React.FC = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Маска для лица в домашних условиях',
      description: 'Часто ли вы делаете дома маски для лица? Если обычно вам лень или некогда, исправляйтесь – маски содержат высокую концентрацию активных ингредиентов и способны решить множество проблем кожи, от прыщей до ранних морщинок.',
      image: blogSlide1,
      alt: 'Маска для лица в домашних условиях'
    },
    {
      id: 2,
      title: 'Нужен ли специальный уход мужской коже?',
      description: 'Замечаете, что мужчина втихаря пользуется вашей умывалкой или кремом? Поощряйте его желание выглядеть свежим и ухоженным, а мы поможем вам в этом – расскажем обо всех особенностях кожи представителей сильного пола и подберем средства IRC 24|7',
      image: blogSlide2,
      alt: 'Нужен ли специальный уход мужской коже?'
    },
    {
      id: 3,
      title: 'Уход за комбинированной кожей',
      description: 'Комбинированная, она же смешанная, кожа ведет двойную игру. Где искать волшебное средство, которое поможет сразу и блестящему носу, и шелушащимся щекам?',
      image: blogSlide3,
      alt: 'Уход за комбинированной кожей'
    },
    {
      id: 4,
      title: 'Какие эффективные бьюти-процедуры можно делать',
      description: 'Вынужденный отказ от посещения салонов красоты – совсем не повод забросить уход за собой! Напротив, время самоизоляции и удаленной работы – отличная возможность уделить волосам, ногтям и, конечно, коже больше внимания.',
      image: blogSlide4,
      alt: 'Какие эффективные бьюти-процедуры можно делать'
    },
    {
      id: 5,
      title: 'Как правильно ухаживать за кожей после 30?',
      description: 'После 30 лет кожа требует особого внимания: замедляется выработка коллагена, появляются первые морщины, а тон становится менее ровным. Узнайте, какие компоненты в уходе помогут сохранить молодость и сияние кожи на долгие годы.',
      image: blogSlide5,
      alt: 'Как правильно ухаживать за кожей после 30?'
    },
    {
      id: 6,
      title: 'Секреты увлажнения сухой кожи',
      description: 'Сухая кожа часто вызывает дискомфорт: стянутость, шелушение и раздражение. Но правильный уход способен решить эти проблемы! Мы расскажем, как подобрать увлажняющие средства.',
      image: blogSlide6,
      alt: 'Секреты увлажнения сухой кожи'
    }
  ];

  useEffect(() => {
    if (swiperContainerRef.current) {
      swiperRef.current = new Swiper(swiperContainerRef.current, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 50,
        navigation: {
          nextEl: '.blog__slider-r',
          prevEl: '.blog__slider-l',
        },
        loop: true,
        simulateTouch: false,
        speed: 700,
        breakpoints: {
          650: {
            slidesPerView: 2,
          },
          950: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
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

  return (
    <div className="blog container--big">
      <h2 className="blog__title">Блог/новости/Акции</h2>

      <div 
        ref={swiperContainerRef}
        className="swiper blog__swiper"
      >
        <div className="swiper-wrapper">
          {blogPosts.map((post) => (
            <div key={post.id} className="swiper-slide">
              <a href="#" className="blog__slide">
                <img 
                  className="blog__slide-img" 
                  src={post.image} 
                  alt={post.alt} 
                />
                <div className="blog__slide-text">
                  <h3 className="blog__slide-title">{post.title}</h3>
                  <p className="blog__slide-info">{post.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="blog__slider-navigation">
          <button 
            className="blog__slider-l"
            aria-label="Предыдущий слайд"
          >
            <img src={arrowLeft} alt="" aria-hidden="true" />
          </button>
          <button 
            className="blog__slider-r"
            aria-label="Следующий слайд"
          >
            <img src={arrowRight} alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog; 