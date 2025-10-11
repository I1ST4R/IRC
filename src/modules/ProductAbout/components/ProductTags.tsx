import { Tag } from "@/modules/ProductList";
import { Product } from "@/modules/ProductList/store/product/productTypes";

export const ProductTags = ({product} : {product: Product}) => {
  return (
    <div className="product-about__tags">
      {product.tags.map((tag: Tag) => (
        <span key={`${tag.name}-${product.id}`} className="product__tag">
          {tag.name}
        </span>
      ))}
    </div>
  );
};
