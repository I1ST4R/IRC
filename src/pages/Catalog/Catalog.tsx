import { Link } from "react-router-dom";
import { ProductList } from "./ProductList/ProductList";
import { Menu } from "./Menu/Menu";
import "./_catalog.scss";
import { useState } from "react";
import PersonalAccount from "../../main/App/PersonalAccount/PersonalAccount";
import BreadCrumb from "@/main/components/BreadCrumb/BreadCrumb";

export const Catalog = () => {
  const [isPersonalAccountOpen, setIsPersonalAccountOpen] = useState(false);

  return (
    <div className="catalog container">
      <div className="catalog__header">
      <BreadCrumb 
      pageLinks={[
        {name: "Главная", link: "/"},
        {name: "Каталог", link: "/"},
      ]}
      />
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