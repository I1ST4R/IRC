import { Product } from "@/modules/ProductList/store/product/productTypes";
import { ProductCartBtn } from "./ProductCartBtn";
import { ProductPrices } from "./ProductPrices";
import { ProductLikeBtn } from "./ProductLikeBtn";
import { ProductFormula } from "./ProductFormula";

type ProductInfoProps = {
  userId: string,
  product: Product
}

export const ProductInfo = ({ userId, product }: ProductInfoProps) => {
  return (
    <div className="product-about__info">
      <h3 className="product-about__name">{product.name}</h3>
      <h3 className="product-about__technology">{product.technology}</h3>
      <h3 className="product-about__article">{product.article}</h3>
      <h3 className="product-about__description">{product.description}</h3>

      <div className="product-about__prices-cart-liked">
        <ProductPrices price={product.price} prevPrice={product.prevPrice} />
        <ProductCartBtn userId={userId} productId={product.id} />
        <ProductLikeBtn userId={userId} productId={product.id} />
      </div>

      <ProductFormula formula={product.formula} />

      <div className="product-about__point">
        <h3 className="product-about__point-title">Для чего</h3>
        <p>{product.for_what}</p>
      </div>

      <div className="product-about__point">
        <h3 className="product-about__point-title">Тип кожи</h3>
        <p>{product.skin_type}</p>
      </div>
    </div>
  );
};
