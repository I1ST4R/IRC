import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { clearLikedOnLogout } from '../../entity/liked/slice';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import BottomMenu from './BottomMenu/BottomMenu';
import './_app.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user.id) {
      console.log('[App.tsx] User is null or has no ID, clearing liked.');
      dispatch(clearLikedOnLogout());
    }
  }, [user.id, dispatch]);

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