import React from 'react';

interface SelectionCard {
  id: number;
  title: string;
  link: string;
  className: string;
}

const Selection: React.FC = () => {
  const cards: SelectionCard[] = [
    {
      id: 1,
      title: 'Жирная и комбинированная кожа',
      link: '#',
      className: 'selection__card1'
    },
    {
      id: 2,
      title: 'Anti-age и омоложение',
      link: '#',
      className: 'selection__card2'
    },
    {
      id: 3,
      title: 'Сухая и чувствительная кожа',
      link: '#',
      className: 'selection__card3'
    },
    {
      id: 4,
      title: 'Тусклая и усталая кожа',
      link: '#',
      className: 'selection__card4'
    },
    {
      id: 5,
      title: 'Пигментация и постакне',
      link: '#',
      className: 'selection__card5'
    },
    {
      id: 6,
      title: 'Отечность',
      link: '#',
      className: 'selection__card6'
    }
  ];

  return (
    <div className="selection container">
      <h2 className="selection__title">Подобрать уход</h2>

      <div className="selection__cards">
        {cards.map((card) => (
          <a
            key={card.id}
            href={card.link}
            className={`selection__card ${card.className}`}
            aria-label={card.title}
          >
            <p>{card.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Selection; 