import React from 'react';
import ReactDOM from 'react-dom/client';
import './main/styles/main.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './main/store/store';
import { router } from './services/routes';
import { PersonalAccountProvider } from './context/PersonalAccountContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersonalAccountProvider>
        <RouterProvider router={router} />
      </PersonalAccountProvider>
    </Provider>
  </React.StrictMode>,
);
