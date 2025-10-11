import { RootState } from "@/_old-version/services/store";
import PersonalAccount from "@/App/components/PersonalAccount/PersonalAccount";
import { ProductList } from "@/modules/ProductList";
import BreadCrumb from "@/shared/BreadCrumb/BreadCrumb";

import { Menu } from "lucide-react";
import { useSelector } from "react-redux";


const Catalog = () => {
  const { isAccountOpen } = useSelector((state: RootState) => state.account);

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

      {isAccountOpen && (
        <PersonalAccount/>
      )}
    </div>
  );
}; 

export default Catalog