import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Catalog } from '../pages/Catalog/Catalog';
import { AuthForm } from '../pages/Auth/AuthForm';

export const router = createBrowserRouter([
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
]); 