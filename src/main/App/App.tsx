import React, { useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { fetchCart } from '../../entity/products/cartSlice';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import BottomMenu from './BottomMenu/BottomMenu';
import './_app.scss';

const USER_ID_KEY = 'currentUserId';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const getUserId = useCallback(() => {
    const storedUserId = localStorage.getItem(USER_ID_KEY);
    if (storedUserId) {
      return storedUserId;
    }
    const defaultUserId = 'anpri65';
    localStorage.setItem(USER_ID_KEY, defaultUserId);
    return defaultUserId;
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const userId = getUserId();
        await dispatch(fetchCart(userId)).unwrap();
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };
    loadCart();
  }, [dispatch, getUserId]);

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