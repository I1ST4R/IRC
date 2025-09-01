import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Catalog } from '../pages/Catalog/Catalog';
import { AuthForm } from '../pages/Auth/AuthForm';
import { Cart } from '../pages/Cart/Cart';
import { Liked } from '../pages/Liked/Liked';
import App from '../main/App/App';  
import { ProductAbout } from '../pages/ProductAbout/ProductAbout';
import { Order } from '../pages/Order/Order';
import Admin from '../pages/Admin/Admin';
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