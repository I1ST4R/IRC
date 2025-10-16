
import { Menu } from "@/modules/Menu";
import { ProductList } from "@/modules/ProductList";
import { BreadCrumb } from "@/shared/ui/components/BreadCrumb";

const Catalog = () => {

  return (
    <div className="container m-auto ">
      <BreadCrumb/>
      <div className="flex justify-between">
        <Menu />
        <ProductList/>
      </div>
    </div>
  );
}; 

export default Catalog