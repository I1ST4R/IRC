import { ProductList } from "./ProductList/ProductList";
import { Menu } from "./Menu/Menu";
import "./_catalog.scss";
import { useState } from "react";
import PersonalAccount from "../../main/App/PersonalAccount/PersonalAccount";
import BreadCrumb from "@/main/components/BreadCrumb/BreadCrumb";
import { useSelector } from "react-redux";
import { RootState } from "@/main/store";

export const Catalog = () => {
  const user = useSelector((state: RootState) => state.user)

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
        <ProductList/>
      </div>

      {user.isAccountOpen && (
        <PersonalAccount/>
      )}
    </div>
  );
}; 