import { Tag } from "@/modules/ProductList";
import { ProductT } from "@/modules/ProductList";

export const ProductTags = ({product} : {product: ProductT}) => {
  return (
    <div className="absolute flex gap-1 top-10 right-7 md:flex-nowrap flex-wrap md:justify-start justify-end">
      {product.tags.map((tag: Tag) => (
        <span key={`${tag.name}-${product.id}`} className="text-white rounded-[4px] px-2 py-1 text-xs bg-[rgb(190,190,190)]">
          {tag.name}
        </span>
      ))}
    </div>
  );
};