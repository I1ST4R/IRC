import { ProductT } from "@/modules/ProductList";
import { Card, CardContent, CardDescription, CardTitle } from "@/shared/ui/kit/card";
import { Link } from "react-router-dom";
import { ProductTags } from "./ProductTags";

export const ProductCard = ({product}: {product: ProductT}) => {
  return (
    <Link to={`/product/${product.id}`} className="product__link">
      <Card>
        <img src={product.img} alt={product.name} className="w-full h-[270px] object-contain object-center" />
        <ProductTags productTags = {product.tags}/>
        <CardTitle className="font-manrope font-semibold text-xs uppercase tracking-wide m-0">
          {product.name}
        </CardTitle>
        <CardDescription className="font-europe-ext font-medium text-xl uppercase tracking-wide pb-2.5 m-0">
          {product.technology}
        </CardDescription>
        <CardContent className="absolute bottom-[50px] left-[30px] flex items-center gap-2.5 font-manrope text-xl font-bold">
          <span>{product.price} ₽</span>
          <span className="font-manrope font-medium text-lg line-through text-black/50">{product.prevPrice} ₽</span>
        </CardContent>
      </Card>
    </Link>
  );
};
