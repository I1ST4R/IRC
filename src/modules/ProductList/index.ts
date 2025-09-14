import { Tag } from "./store/tag/tagTypes";
import { CartBtn } from "./components/Product/components/CartBtn/CartBtn";
import { LikeBtn } from "./components/Product/components/LikeBtn/LikeBtn";
import { ProductList } from "./ProductList";
import { useGetProductByIdQuery } from "./store/product/productApiSlice";

export {
  ProductList, 
  CartBtn,
  LikeBtn,
  useGetProductByIdQuery,
  type Tag
}