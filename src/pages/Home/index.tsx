import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import BottomMenu from './BottomMenu/BottomMenu';
import Navbar from './Navbar/Navbar';
import MainBlock from './MainBlock/MainBlock';
import Categories from './Categories/Categories';
import Advantages from './Advantages/Advantages';
import Efficiency from './Efficiency/Efficiency';
import Ingredients from './Ingredients/Ingredients';
import Selection from './Selection/Selection';
import SkinType from './SkinType/SkinType';
import Founder from './Founder/Founder';
import Press from './Press/Press';
import Newsletter from './NewsLetter/Newsletter';
import Blog from './Blog/Blog';
import './style.css';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <BottomMenu />
      <Navbar />
      <MainBlock />
      <Categories />
      <Advantages />
      <Efficiency />
      <Ingredients />
      <Selection />
      <SkinType />
      <Founder />
      <Press />
      <Newsletter />

      <Blog />

      <Footer />
    </div>
  );
};

export default Home; 