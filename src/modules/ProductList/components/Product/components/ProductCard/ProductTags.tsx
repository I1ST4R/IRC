import { Tag } from "@/modules/ProductList";

export const ProductTags = ({ productTags }: {productTags: Tag[]}) => {
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
