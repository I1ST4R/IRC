import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import BottomMenu from './components/BottomMenu/BottomMenu';
import './_app.scss';

const App: React.FC = () => {

  return (
    <div className="app">
      <Header />
      <Navbar />
      <main className="app__content">
        <Outlet />
      </main>
      <Footer />
      <BottomMenu />
    </div>
  );
};

export default App;