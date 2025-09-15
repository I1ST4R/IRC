import { Accordion, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { useGetCategoriesQuery } from "../store/category/categoryApiSlice";
import { CategoryCheckboxes } from "./CategoryCheckboxes";

export const MenuCategories = () => {
  const { data: categories = []} = useGetCategoriesQuery();

  return (
    <Accordion type="multiple">
      {categories.map((category) => (
      <AccordionItem value={category.id}>
        <AccordionTrigger>{category.name}</AccordionTrigger>
        <CategoryCheckboxes category={category}/>
      </AccordionItem>
    ))}
    </Accordion>
  )
}