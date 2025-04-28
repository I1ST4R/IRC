import { createBrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import { App } from './App';
import { AuthForm } from './users/AuthForm';
import { ProductList } from './products/ProductList';

const LoginPage = () => {
  const navigate = useNavigate();
  return <AuthForm onSuccess={() => navigate('/products')} />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'products',
        element: <ProductList />
      },
    ]
  }
]); 