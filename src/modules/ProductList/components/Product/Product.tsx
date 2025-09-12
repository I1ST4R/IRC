import { Product as ProductType } from "../../store/product/productTypes";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "@/shared/store/user/userApiSlice";
import { Tag } from "../../store/tag/tagTypes";
import { useCart } from "./useCart";
import { useLiked } from "./useLiked";

type ProductProps = {
  product: ProductType;
}

export const Product = ({ product }: ProductProps) => {
  const { data: user } = useGetUserQuery();
  if(!user?.id) return
  const {isInCart, cartClick} = useCart(user?.id, product.id)
  const {isLiked, likeClick} = useLiked(user?.id, product.id)

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
      <button
        className={`product__btn ${isInCart() ? "product__btn--in-cart" : ""}`}
        onClick={cartClick}
      >
        {isInCart() ? "В корзине" : "Добавить в корзину"}
      </button>
      <button
        className={`product__like${isLiked() ? " product__like--active" : ""}`}
        onClick={likeClick}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
  );
};

