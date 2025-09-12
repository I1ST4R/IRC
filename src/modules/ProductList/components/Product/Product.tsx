import { Product as ProductType } from "../../store/product/productTypes";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { Tag } from "../../store/tag/tagTypes";

import { CartBtn } from "./components/CartBtn/CartBtn";
import { LikeBtn } from "./components/LikeBtn/LikeBtn";

type ProductProps = {
  product: ProductType;
}

export const Product = ({ product }: ProductProps) => {
  const { data: user } = useGetUserQuery();
  if(!user?.id) return

  return (
    <div className="product">
      <Link to={`/product/${product.id}`} className="product__link">
        <img src={product.img} alt={product.name} className="product__image" />
        <div className="product__info">
          <div className="product__tags">
            {product.tags.map((tag: Tag) => (
              <span key={`${product.id}-${tag.id}`} className="product__tag">
                {tag.name}
              </span>
            ))}
          </div>
          <h3 className="product__name">{product.name}</h3>
          <h3 className="product__technology">{product.technology}</h3>
          <div className="product__prices">
            <span>{product.price} ₽</span>
            <span className="product__prev-price">{product.prevPrice} ₽</span>
          </div>
        </div>
      </Link>
      <CartBtn userId = {user.id} productId = {product.id}/>
      <LikeBtn userId = {user.id} productId = {product.id}/>
    </div>
  );
};

