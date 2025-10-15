import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/kit/accordion"
import { useGetCategoriesQuery } from "../store/category/categoryApiSlice"
import { CategoryCheckboxes } from "./CategoryCheckboxes"
import { Loader } from "@/shared/ui/components/Loader"

export const MenuCategories = () => {
  const { data: categories = [], isLoading: isCategoryLoading} = useGetCategoriesQuery()
  if(isCategoryLoading) return <Loader title="Категории"/>

  return (
    <Accordion type="multiple">
      {categories.map((category) => (
      <AccordionItem value={category.id} className="px-5 border-1 border-t-0">
        <AccordionTrigger>{category.name}</AccordionTrigger>
        <AccordionContent>
          <CategoryCheckboxes category={category}/>
        </AccordionContent>
      </AccordionItem>
    ))}
    </Accordion>
  )
}