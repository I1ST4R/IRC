import React from 'react';
import founderImg from './founder__img.jpg';

interface Point {
  id: number;
  text: string;
}

const Founder: React.FC = () => {
  const points: Point[] = [
    {
      id: 1,
      text: '5 лет моя работа связана с косметологией и косметикой. И вот уже более 10 лет мои знания подтверждаются главным - вашим доверием и результатом от средств IRC.'
    },
    {
      id: 2,
      text: 'В далеком 2012 году мы сделали крупную ставку на качестве и максимальной доступности средств с профессиональным составом.'
    },
    {
      id: 3,
      text: 'Результат сложных по формулам средств IRC подтверждается международными клиническими исследованиями эффективности. И это говорит о стандартах бренда лучше любых слов.'
    }
  ];

  return (
    <div className="information-block founder">
      <div className="information-block__rectangle" aria-hidden="true" />

      <div className="container--big">
        <div className="information-block__img">
          <img 
            src={founderImg} 
            alt="Ирина Николаева - эксперт-косметолог, основатель IRC 24|7" 
          />
        </div>

        <div className="information-block__info">
          <p className="information-block__title">
            <span className="bold">Ирина Николаева</span>
            эксперт-косметолог,
            основатель IRC 24|7
          </p>

          <ul className="founder__points">
            {points.map((point) => (
              <li key={point.id}>{point.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Founder; 