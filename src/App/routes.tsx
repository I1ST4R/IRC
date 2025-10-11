import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from './App';

const Home = lazy(() => import('../pages/Home/Home'));
const Catalog = lazy(() => import('../pages/Catalog'));
const Cart = lazy(() => import('../pages/Cart'));
const Liked = lazy(() => import('../pages/Liked'));
const ProductAbout = lazy(() => import('../pages/ProductAbout/ProductAbout'));
const Order = lazy(() => import('../pages/Order'));
const Admin = lazy(() => import('../pages/Admin'));
const Payment = lazy(() => import('@/pages/Payment'));


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'catalog',
        element: <Catalog />,
        children : [
          {
            path: 'product/:id',
            element: <ProductAbout />
          }
        ]
      },
      {
        path: 'cart',
        element: <Cart />,
        children: [
          {
            path: "order",
            element: <Order/>,
            children: [
              {
                path: 'payment',
                element: <Payment/>
              }
            ]
          }
        ]
      },
      {
        path: 'liked',
        element: <Liked />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },
    ],
  },
]); 