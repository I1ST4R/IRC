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