import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom'; // Измените здесь
import './index.css';
import { router } from '../routes';
import { store } from '../store';

const initApp = async () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} /> {/* Используйте RouterProvider */}
      </Provider>
    </React.StrictMode>,
  );
};

initApp();