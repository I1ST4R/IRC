import React from 'react';
import arrowRight from '../_general/img/arrow-right-white.svg';
import sasderma from './sasderma.svg';
import iff from './iff.svg';

const Efficiency: React.FC = () => {
  return (
    <div className="efficiency container--big">
      <div className="container">
        <p className="block-title block-title--bold">
          Эффективность составов IRC
        </p>
        <p className="block-title">
          подтверждена мировыми исследованиями ведущих научных центров
        </p>

        <div className="efficiency__logos">
          <img src={sasderma} alt="sasderma" />
          <img src={iff} alt="iff" />
        </div>

        <a href="#" className="btn btn--active btn--flex efficiency__btn">
          <span>Подобрать уход</span>
          <img src={arrowRight} alt="Arrow right" />
        </a>
      </div>
    </div>
  );
};

export default Efficiency;