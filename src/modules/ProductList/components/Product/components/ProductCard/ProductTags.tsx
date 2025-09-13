import { Tag } from "@/modules/ProductList/store/tag/tagTypes";

type ProductTagsProps = {
  productTags: Tag[];
};
export const ProductTags = ({ productTags }: ProductTagsProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      {productTags.map((tag: Tag) => {
        return (
          <span key={`${tag.id}`} className="px-1 py-0.5 bg-gray-400 rounded text-xs text-white">
            {tag.name}
          </span>
        );
      })}
    </div>
  );
};
