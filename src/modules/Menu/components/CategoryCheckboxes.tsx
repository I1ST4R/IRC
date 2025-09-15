
import { Category } from "../store/category/categoryTypes";
import { MenuTag } from "./Menutag";
import { useGetTagsByIdQuery } from "@/modules/ProductList/store/tag/tagApiSlice";

type CategoryCheckboxes = {
  category: Category;
};

export const CategoryCheckboxes = ({ category }: CategoryCheckboxes) => {
  const { data: tagsRecord } = useGetTagsByIdQuery(category.tags);
  if (!tagsRecord) return;

  return (
    <div className="menu__checkboxes">
      {category.tags.map((tagId) => {
        return <MenuTag tagId = {tagId} tagName={tagsRecord[tagId].name}/>
      })}
    </div>
  );
};
