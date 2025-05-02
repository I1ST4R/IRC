import { Link } from "react-router-dom";
import { ProductList } from "./ProductList/ProductList";
import { Menu } from "./Menu/Menu";

export const Catalog = () => {
  return (
    <div className="catalog container">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb__link">Главная</Link>
        <span className="breadcrumb__separator">/</span>
        <span className="breadcrumb__current">Каталог</span>
      </div>

      <div className="catalog__content">
        <Menu />
        <ProductList />
      </div>
    </div>
  );
}; 