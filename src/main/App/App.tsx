import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { clearLikedOnLogout } from '../../entity/liked/slice';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import BottomMenu from './BottomMenu/BottomMenu';
import './_app.scss';
import { useGetUserQuery } from '@/entity/users/api';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {data: user} = useGetUserQuery()

  useEffect(()=>{
    console.log(user)
  },[user])

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