import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchCart, clearCart } from '../../entity/cart/actions';
import { fetchLiked, clearLikedOnLogout } from '../../entity/liked/actions';
import { checkAuth } from '../../entity/users/actions';
import { fetchProducts } from '../../entity/product/actions';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import BottomMenu from './BottomMenu/BottomMenu';
import './_app.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchProducts(1))
  }, [dispatch]);

  useEffect(() => {
    if (user && user.id) {
      const userId = user.id.toString();
      console.log(`[App.tsx] User detected (ID: ${userId}), fetching cart and liked...`);
      dispatch(fetchCart(userId))
      dispatch(fetchLiked(userId))
    } else {
      console.log('[App.tsx] User is null or has no ID, clearing cart and liked.');
      dispatch(clearLikedOnLogout());
    }
  }, [user, dispatch]);

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