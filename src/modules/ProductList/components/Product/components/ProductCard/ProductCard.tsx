import { Product } from "@/modules/ProductList/store/product/productTypes";
import { Tag } from "@/modules/ProductList/store/tag/tagTypes";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({product}: ProductCardProps) => {
  return (
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
  );
};
