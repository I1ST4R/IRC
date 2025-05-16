import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchCart, clearCartOnLogout } from '../../entity/products/cartSlice';
import { fetchLiked, clearLikedOnLogout } from '../../entity/products/likedSlice';
import { checkAuth } from '../../entity/users/users.slice';
import { fetchProducts } from '../../entity/products/products.slice';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import BottomMenu from './BottomMenu/BottomMenu';
import './_app.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchProducts({ page: 1 })).unwrap().catch((error: any) => console.error('Failed to load initial products:', error));
  }, [dispatch]);

  useEffect(() => {
    if (user && user.id) {
      const userId = user.id.toString();
      console.log(`[App.tsx] User detected (ID: ${userId}), fetching cart and liked...`);
      dispatch(fetchCart(userId)).unwrap().catch((error: any) => console.error('Failed to load cart:', error));
      dispatch(fetchLiked(userId)).unwrap().catch((error: any) => console.error('Failed to load liked:', error));
    } else {
      console.log('[App.tsx] User is null or has no ID, clearing cart and liked.');
      dispatch(clearCartOnLogout());
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