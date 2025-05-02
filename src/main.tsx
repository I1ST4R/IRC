import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/main.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
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
