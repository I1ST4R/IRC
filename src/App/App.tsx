import React from "react";
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import BottomMenu from './components/BottomMenu/BottomMenu';
import "./app.css";
import { AuthForm } from "@/modules/AuthForm/AuthForm";

const App: React.FC = () => {

  return (
    <div className="app">
      <Header />
      <main className="app__content">
        <Outlet />
        <AuthForm/>
      </main>
      <Footer />
      <BottomMenu />
    </div>
  );
};

export default App;
