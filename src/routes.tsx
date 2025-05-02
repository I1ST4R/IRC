import { createBrowserRouter } from 'react-router-dom';
import { AuthForm } from './pages/Auth/AuthForm';
import Home from './pages/Home';
import { Catalog } from "./pages/Catalog/Catalog";
import { Product } from "./pages/Catalog/Product/Product";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'auth',
    element: <AuthForm />,
  },
  {
    path: 'catalog',
    element: <Catalog />,
  },
  
]); 