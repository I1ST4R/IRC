import { Tag } from "@/modules/ProductList";

export const ProductTags = ({ productTags }: {productTags: Tag[]}) => {
  return (
    <div className="flex flex-wrap gap-1 px-8">
      {productTags.map((tag: Tag) => {
        return (
          <span key={`${tag.id}`} className=" font-manrope tracking-tight px-1 py-0.5 bg-[rgb(187,187,187)] rounded text-xs text-white">
            {tag.name}
          </span>
        );
      })}
    </div>
  );
};
