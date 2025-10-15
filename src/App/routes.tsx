import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from './App';
import React from "react"
import { Loader } from '@/shared/ui/components/Loader';

const Home = lazy(() => import('../pages/Home/Home'));
const Catalog = lazy(() => import('../pages/Catalog'));
const Cart = lazy(() => import('../pages/Cart'));
const Liked = lazy(() => import('../pages/Liked'));
const ProductAbout = lazy(() => import('../pages/ProductAbout'));
const Order = lazy(() => import('../pages/Order'));
const Admin = lazy(() => import('../pages/Admin'));
const Payment = lazy(() => import('@/pages/Payment'));

const withSuspense = (Component: React.ComponentType, pageTitle?: string) => (
  <Suspense fallback={<Loader title={pageTitle || "Загрузка страницы"} />}>
    <Component />
  </Suspense>
);


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: withSuspense(Home, "Главная страница"),
      },
      {
        path: 'catalog',
        element: withSuspense(Catalog, "Каталог"),
      },
      {
        path: 'catalog/product/:id',
        element: withSuspense(ProductAbout, "О продукте"),
      },
      {
        path: 'cart',
        element: withSuspense(Cart, "Корзина"),
      },
      {
        path: 'cart/order',
        element: withSuspense(Order, "Заказ"),
      },
      {
        path: 'cart/order/payment',
        element: withSuspense(Payment, "Оплата"),
      },
      {
        path: 'liked',
        element: withSuspense(Liked, "Избранное"),
      },
      {
        path: 'admin',
        element: withSuspense(Admin, "Админка"),
      },
    ],
  },
]);