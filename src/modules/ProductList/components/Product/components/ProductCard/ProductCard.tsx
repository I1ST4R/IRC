import { ProductT } from "@/modules/ProductList";
import { Card, CardContent, CardDescription, CardTitle } from "@/shared/ui/kit/card";
import { Link } from "react-router-dom";
import { ProductTags } from "./ProductTags";

export const ProductCard = ({product}: {product: ProductT}) => {
  return (
    <Link to={`product/${product.id}`} className="h-full block">
      <Card className="shadow-none border-b-0 flex-col rounded-none bg-[rgb(242,242,242)] ">
        <img src={product.img} alt={product.name} className="w-full h-[270px] object-contain object-center" />
        <ProductTags productTags = {product.tags}/>
        <CardTitle className="font-manrope font-semibold text-xs uppercase tracking-wide px-8 my-2">
          {product.name}
        </CardTitle>
        <CardDescription className=" px-8 font-europe-ext text-xl uppercase pb-2.5 m-0 text-black">
          {product.technology}
        </CardDescription>
        <CardContent className=" px-8 flex items-center gap-2.5 font-manrope text-xl font-bold">
          <span>{product.price} ₽</span>
          <span className="font-manrope font-medium text-lg line-through text-black/50">{product.prevPrice} ₽</span>
        </CardContent>
      </Card>
    </Link>
  );
};
