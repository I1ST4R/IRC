import { Outlet } from 'react-router-dom';
import { Header } from '../../main/App/Header/Header';
import { Footer } from '../../main/App/Footer/Footer';
import { Navbar } from '../../main/App/Navbar/Navbar';
import { BottomMenu } from '../../main/App/BottomMenu/BottomMenu';
import './_mainLayout.scss';

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <Navbar />
      <main className="main-layout__content">
        <Outlet />
      </main>
      <Footer />
      <BottomMenu />
    </div>
  );
}; 