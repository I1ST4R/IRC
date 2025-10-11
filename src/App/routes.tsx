import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Catalog } from '../pages/Catalog';
import { Cart } from '../pages/Cart';
import { Liked } from '../pages/Liked';
import App from './App';  
import { ProductAbout } from '../pages/ProductAbout/ProductAbout';
import { Order } from '../pages/Order';
import Admin from '../pages/Admin';
import { Payment } from '@/pages/Payment/Payment';

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