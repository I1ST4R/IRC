import {
  setPriceRange,
  resetFilters,
  PRICE_RANGE_MIN,
  PRICE_RANGE_MAX,
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
import reset from "./reset.svg";
import { useState } from "react";

export const Menu = () => {
  const dispatch = useAppDispatch();
  const [priceRangeMin, setPriceRangeMin] = useState(PRICE_RANGE_MIN)

  return (
    <div className="w-[300px] min-w-[300px]">
      <Accordion type="single" collapsible>
        <AccordionItem value="0" className="px-5 border-1">
          <AccordionTrigger>Цена {priceRangeMin}</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between">
              <p>{PRICE_RANGE_MIN}</p>
              <Slider
                className="w-40"
                min={PRICE_RANGE_MIN}
                value={[priceRangeMin, PRICE_RANGE_MAX]}
                onValueChange={(value) => setPriceRangeMin(value[0])}
                onValueCommit={() => dispatch(setPriceRange(priceRangeMin))}
                max={PRICE_RANGE_MAX}
                step={100}
              />
              <p>{PRICE_RANGE_MAX}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <MenuCategories />
      <Button
        asChild
        onClick={() => dispatch(resetFilters())}
        variant="squareRemove"
        className="w-full hover:bg-gray-300"
      >
        <div className="flex justify-center gap-2 items-center">
          <img src={reset} alt="reset" className="w-4 h-4" />
          очистить
        </div>
      </Button>
    </div>
  );
};
