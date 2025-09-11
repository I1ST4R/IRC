import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import BottomMenu from './BottomMenu/BottomMenu';
import './_app.scss';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="app">
      <Header key={location.pathname} />
      <Navbar />
      <main className="app__content" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <BottomMenu />
    </div>
  );
};

export default App;