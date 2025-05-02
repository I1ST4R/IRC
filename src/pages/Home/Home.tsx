import Header from './Header/Header';
import Footer from './Footer/Footer';
import MainBlock from './MainBlock/MainBlock';
import Categories from './Categories/Categories';
import Advantages from './Advantages/Advantages';
import Efficiency from './Efficiency/Efficiency';
import Ingredients from './Ingredients/Ingredients';
import Selection from './Selection/Selection';
import SkinType from './SkinType/SkinType';
import Founder from './Founder/Founder';
import Press from './Press/Press';
import NewsLetter from './NewsLetter/Newsletter';
import Blog from './Blog/Blog';

export const Home = () => {
  return (
    <>
      <Header />
      <main>
        <MainBlock />
        <Categories />
        <Advantages />
        <Efficiency />
        <Ingredients />
        <Selection />
        <SkinType />
        <Founder />
        <Press />
        <NewsLetter />
        <Blog />
      </main>
      <Footer />
    </>
  );
}; 