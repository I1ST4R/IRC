import { Product as ProductT } from "../../store/product/productTypes";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { CartBtn } from "./components/CartBtn/CartBtn";
import { LikeBtn } from "./components/LikeBtn/LikeBtn";
import { ProductCard } from "./components/ProductCard/ProductCard";

export const Product = ({ product }: {product: ProductT}) => {
  const { data: user } = useGetUserQuery();
  if(!user?.id) return

  return (
    <div className="pb-3 relative w-[312px] bg-[#F2F2F2] overflow-hidden transition-transform duration-200 hover:-translate-y-[5px]">
      <ProductCard product = {product}/>
      <CartBtn userId = {user.id} productId = {product.id}/>
      <LikeBtn userId = {user.id} productId = {product.id}/>
    </div>
  );
};

