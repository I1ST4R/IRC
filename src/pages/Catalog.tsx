
import { ProductList } from "@/modules/ProductList";
import { BreadCrumb } from "@/shared/ui/components/BreadCrumb";
import { Menu } from "lucide-react";

const Catalog = () => {

  return (
    <div className="catalog container">
      <BreadCrumb/>
      <div className="catalog__content">
        <Menu />
        <ProductList/>
      </div>
    </div>
  );
}; 

export default Catalog