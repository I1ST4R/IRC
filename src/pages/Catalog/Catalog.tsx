import { Link } from "react-router-dom";
import { ProductList } from "./ProductList/ProductList";
import { Menu } from "./Menu/Menu";
import "./_catalog.scss";
import { useState } from "react";
import PersonalAccount from "../../main/App/PersonalAccount/PersonalAccount";

export const Catalog = () => {
  const [isPersonalAccountOpen, setIsPersonalAccountOpen] = useState(false);

  return (
    <div className="catalog container">
      <div className="catalog__header">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb__link">Главная</Link>
          <span className="breadcrumb__separator">/</span>
          <span className="breadcrumb__current">Каталог</span>
        </div>
      </div>

      <div className="catalog__content">
        <Menu />
        <ProductList onAuthRequired={() => setIsPersonalAccountOpen(true)} />
      </div>

      {isPersonalAccountOpen && (
        <PersonalAccount onClose={() => setIsPersonalAccountOpen(false)} />
      )}
    </div>
  );
}; 