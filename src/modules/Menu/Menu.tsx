import { useDispatch, useSelector } from "react-redux";
import {
  setPriceRange,
  resetFilters,
} from "./store/filter/filterSlice";
import { AppDispatch} from "./store/menuStore";
import { Slider } from "@/shared/ui/kit/slider";
import {
  selectPriceRangeMax,
  selectPriceRangeMin,
} from "./store/filter/filterSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { MenuCategories } from "./components/MenuCategories";
import { Button } from "@/shared/ui/kit/button";

export const Menu = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="menu">
      <Accordion type="single">
        <AccordionItem value="0">
          <AccordionTrigger>Цена</AccordionTrigger>
          <AccordionContent>
            <Slider
              className="menu__price-range"
              min={useSelector(selectPriceRangeMin)}
              onValueChange={(value) => dispatch(setPriceRange(value[0]))}
              max={useSelector(selectPriceRangeMax)}
              step={1}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <MenuCategories/>
      <Button asChild onClick={() => dispatch(resetFilters())} variant="squareRemove">
        <img src="reset.svg" alt="reset" />
        очистить
      </Button>
    </div>
  );
};
