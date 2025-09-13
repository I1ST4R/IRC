import { Product as ProductType } from "../../store/product/productTypes";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";

import { CartBtn } from "./components/CartBtn/CartBtn";
import { LikeBtn } from "./components/LikeBtn/LikeBtn";
import { ProductCard } from "./components/ProductCard/ProductCard";

type ProductProps = {
  product: ProductType;
}

export const Product = ({ product }: ProductProps) => {
  const { data: user } = useGetUserQuery();
  if(!user?.id) return

  return (
    <div className="product">
      <ProductCard product = {product}/>
      <CartBtn userId = {user.id} productId = {product.id}/>
      <LikeBtn userId = {user.id} productId = {product.id}/>
    </div>
  );
};

