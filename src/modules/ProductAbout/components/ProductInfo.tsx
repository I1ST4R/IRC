import { CartBtn, LikeBtn, ProductT } from "@/modules/ProductList";
import { ProductPrices } from "./ProductPrices";
import { ProductFormula } from "./ProductFormula";
import { initialCart, useGetCartQuery } from "@/modules/CartBody";
import { useGetLikedQuery } from "@/modules/LikedBody";

type ProductInfoProps = {
  userId: string,
  product: ProductT
}

export const ProductInfo = ({ userId, product }: ProductInfoProps) => {
  const { data: cart = initialCart} = useGetCartQuery(
    userId ?? "",
    { skip: !userId }
  );
  const { data: likedItems = {} } = useGetLikedQuery(
    userId ?? "",
    { skip: !userId }
  );
  return (
    <div className="font-manrope font-medium">
      <h3 className="font-semibold text-xs tracking-widest uppercase">
        {product.name}
      </h3>
      <h3 className="font-europe-ext font-bold text-4xl tracking-wider uppercase my-2">
        {product.technology}
      </h3>
      <h3 className="text-sm text-black/65">
        {product.article}
      </h3>
      <h3 className="text-base leading-relaxed py-8 border-b border-black/7">
        {product.description}
      </h3>

      <div className="flex gap-5 py-8 md:flex-row flex-col md:items-start items-center">
        <ProductPrices price={product.price} prevPrice={product.prevPrice} />
        <CartBtn userId={userId} productId={product.id} isInCart={cart.items[product.id]?.product?.id === product.id}/>
        <LikeBtn userId={userId} productId={product.id} isLiked={likedItems[product.id]?.id === product.id}/>
      </div>

      <ProductFormula formula={product.formula} />

      <div className="py-8 border-b border-black/7 border-t border-black/7">
        <h3 className="font-extrabold text-lg tracking-wider uppercase">Для чего</h3>
        <p className="mt-2">{product.for_what}</p>
      </div>

      <div className="py-8 border-b border-black/7">
        <h3 className="font-extrabold text-lg tracking-wider uppercase">Тип кожи</h3>
        <p className="mt-2">{product.skin_type}</p>
      </div>
    </div>
  );
};