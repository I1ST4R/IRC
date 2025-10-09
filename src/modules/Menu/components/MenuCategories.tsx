import { Accordion, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { useGetCategoriesQuery } from "../store/category/categoryApiSlice";
import { CategoryCheckboxes } from "./CategoryCheckboxes";
import { Loader } from "@/shared/ui/components/Loader";

export const MenuCategories = () => {
  const { data: categories = [], isLoading: isCategoryLoading} = useGetCategoriesQuery();
  if(isCategoryLoading) return <Loader title="Категории"/>

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