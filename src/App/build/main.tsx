import React from 'react';
import ReactDOM from 'react-dom/client';
// import './main/styles/main.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
// import { store } from './main/store';
import { router } from '../routes';
import './index.css'
import App from '../App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Provider store={store}>
      <RouterProvider router={router} />
    </Provider> */}
    <App/>
  </React.StrictMode>,
);
