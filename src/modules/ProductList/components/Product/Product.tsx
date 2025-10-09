import { Product as ProductT } from "../../store/product/productTypes";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";

import { CartBtn } from "./components/CartBtn/CartBtn";
import { LikeBtn } from "./components/LikeBtn/LikeBtn";
import { ProductCard } from "./components/ProductCard/ProductCard";

type ProductProps = {
  product: ProductT;
}

export const Product = ({ product }: ProductProps) => {
  const { data: user } = useGetUserQuery();
  if(!user?.id) return

  return (
    <div className="relative w-[312px] flex flex-col bg-[#F2F2F2] overflow-hidden transition-transform duration-200 hover:-translate-y-[5px]">
      <ProductCard product = {product}/>
      <CartBtn userId = {user.id} productId = {product.id}/>
      <LikeBtn userId = {user.id} productId = {product.id}/>
    </div>
  );
};

