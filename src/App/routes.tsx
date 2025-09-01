import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../_old-version/pages/Home/Home';
import { Catalog } from '../_old-version/pages/Catalog/Catalog';
import { AuthForm } from '../_old-version/pages/Auth/AuthForm';
import { Cart } from '../_old-version/pages/Cart/Cart';
import { Liked } from '../_old-version/pages/Liked/Liked';
import App from './App';  
import { ProductAbout } from '../_old-version/pages/ProductAbout/ProductAbout';
import { Order } from '../_old-version/pages/Order/Order';
import Admin from '../_old-version/pages/Admin/Admin';
import Payment from '@/pages/Payment/Payment';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/catalog',
        element: <Catalog />,
      },
      {
        path: '/auth',
        element: <AuthForm />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/liked',
        element: <Liked />,
      },
      {
        path: '/product/:id',
        element: <ProductAbout />,
      },
      {
        path: '/order',
        element: <Order />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
    ],
  },
]); 