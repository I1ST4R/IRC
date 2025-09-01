import React from 'react';
import hardTasks from './hard-tasks.svg';
import skinFriendly from './skin-friendly.svg';
import ingredients from './ingredients.svg';
import worldResearch from './world-research.svg';
import components from './components.svg';
import noTesting from './no-testing.svg';
import advantages__img from './advantages__img.png';

const Advantages: React.FC = () => {
  return (
    <div className="information-block advantages">


		<div className="information-block__rectangle"></div>


		<div className="container--big">

			<div className="information-block__img">
				<img src={advantages__img} alt="" />
			</div>

			<div className="information-block__info">

				<p className="information-block__title">
					преимущества
					<span className="bold">IRC 247</span>
				</p>
				<div className="advantages__points">

					<div className="advantages__point">
						<img src={hardTasks} alt="hard-tasks" className='advantages__point-img'/>
						<p className="advantages__point-title">
							решение сложных задач за 30 дней
						</p>
						<p className="advantages__point-desc">
							акне, черные точки, жирность, сухость, старение, пигментация, постакне, купероз
						</p>
					</div>

					<div className="advantages__point">
						<img src={skinFriendly} alt="skin-friendly" className='advantages__point-img'/>
						<p className="advantages__point-title">
							skin friendly
						</p>
						<p className="advantages__point-desc">
							питающие и увлажняющие <span className="violet">текстуры</span> подстраиваются под особенности кожи <span
								className="violet">без жирного блеска, тяжести и пленки</span>
						</p>
					</div>

					<div className="advantages__point">
						<img src={ingredients} alt="ingredients" className='advantages__point-img'/>
						<p className="advantages__point-title">
							ингредиенты последнего поколения
						</p>
						<p className="advantages__point-desc">
							акне, черные точки, жирность, сухость, старение, пигментация, постакне, купероз
						</p>
					</div>

					<div className="advantages__point">
						<img src={components} alt="components" className='advantages__point-img'/>
						<p className="advantages__point-title">
							отсутствие вредных для кожи компонентов
						</p>
					</div>

					<div className="advantages__point">
						<img src={worldResearch} alt="world-research" className='advantages__point-img'/>
						<p className="advantages__point-title">
							подтвержденный мировыми научными исследованиями результат
						</p>
					</div>

					<div className="advantages__point">
						<img src={noTesting} alt="no-testing" className='advantages__point-img'/>
						<p className="advantages__point-title">
							не тестируется на животных и подходит <span className="violet">беременным</span>
						</p>
					</div>

				</div>

			</div>

		</div>


	</div>
  );
};

export default Advantages; 