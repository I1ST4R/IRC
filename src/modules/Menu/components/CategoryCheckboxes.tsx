import { useGetTagsByIdQuery } from "@/modules/ProductList"
import { Category } from "../store/category/categoryTypes"
import { MenuTag } from "./MenuTag"

export const CategoryCheckboxes = ({ category }: {category: Category}) => {
  const { data: tags } = useGetTagsByIdQuery(category.tags)
  if (!tags) return

  return (
    <div className="flex flex-col gap-3">
      {tags.map((tag) => {
        return <MenuTag tagId = {tag.id} tagName = {tag.name} />
      })}
    </div>
  );
};
