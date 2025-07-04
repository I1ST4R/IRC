import React from 'react';
import ReactDOM from 'react-dom/client';
import './main/styles/main.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './main/store';
import { router } from './services/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
