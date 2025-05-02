import React from 'react';
import { Outlet } from 'react-router-dom';
import { PersonalAccountProvider } from './context/PersonalAccountContext';
import PersonalAccount from './pages/Home/PersonalAccount/PersonalAccount';

const App: React.FC = () => {
  return (
    <PersonalAccountProvider>
      <Outlet />
      <PersonalAccount />
    </PersonalAccountProvider>
  );
};

export default App;