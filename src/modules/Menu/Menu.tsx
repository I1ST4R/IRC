import { useSelector } from "react-redux";
import {
  setPriceRange,
  resetFilters,
  selectPriceRangeMax,
  selectPriceRangeMin,
} from "./store/filter/filterSlice";
import { Slider } from "@/shared/ui/kit/slider";
import { MenuCategories } from "./components/MenuCategories";
import { Button } from "@/shared/ui/kit/button";
import { useAppDispatch } from "@/App/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/kit/accordion";

export const Menu = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-[300px] min-w-[300px] bg-white rounded shadow-sm">
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
      <MenuCategories />
      <Button
        asChild
        onClick={() => dispatch(resetFilters())}
        variant="squareRemove"
      >
        <div className="flex items-center gap-2">
          <img src="reset.svg" alt="reset" />
          <span>очистить</span>
        </div>
      </Button>
    </div>
  );
};
