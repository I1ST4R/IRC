import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Catalog } from '../pages/Catalog/Catalog';
import { AuthForm } from '../pages/Auth/AuthForm';
import { Cart } from '../pages/Cart/Cart';
import App from '../main/App/App';

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
    ],
  },
]); 