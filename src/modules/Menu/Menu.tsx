import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, toggleTag, resetFilters } from "./store/filter/filterSlice";
import { AppDispatch, RootState } from "./store/menuStore";
import reset from "./reset.svg";
import { useGetCategoriesQuery } from "@/modules/Menu/store/category/categoryApiSlice";
import { useGetTagsByIdQuery } from "@/modules/ProductList/store/tag/tagApiSlice";
import { Slider } from "@/shared/ui/kit/slider";
import { selectPriceRangeMax, selectPriceRangeMin } from "./store/filter/filterSlice";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="menu__item">
      <button 
        className={`menu__header ${isOpen ? 'menu__header--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`menu__arrow ${isOpen ? 'menu__arrow--open' : ''}`}
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {isOpen && (
        <div className="menu__content">
          {children}
        </div>
      )}
    </div>
  );
};

export const Menu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector((state: RootState) => state.filter);

  const {data: categories = [], isLoading, error} = useGetCategoriesQuery();
  const tagIds = categories.flatMap(category => category.tags);
  const {data: tags = []} = useGetTagsByIdQuery(tagIds ?? [], { skip: !tagIds.length });

  const handleTagToggle = useCallback((tagId: string) => {
    dispatch(toggleTag(tagId));
  }, [dispatch]);

  const isTagSelected = useCallback((tagId: string) => {
    return filter.filterParams.tagsId.some((t: string) => t === tagId) || false;
  }, [filter]);

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const getTagName = (tagId: string) => {
    if (!tagId) return "";
    const tag = tags.find(t => t.id === tagId);
    return tag?.name || "";
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке категорий</div>;
  if (!filter || !categories) return null;

  return (
    <div className="menu">
      <AccordionItem title="Цена">
        <Slider
          className="menu__price-range"
          min={useSelector(selectPriceRangeMin)}
          onValueChange={(value) => dispatch(setPriceRange(value[0]))}
          max={useSelector(selectPriceRangeMax)}
          step={1}
        />
      </AccordionItem>

      {categories.map((category) => (
        <AccordionItem key={category.id} title={category.name}>
          <div className="menu__checkboxes">
            {category.tags.map((tag) => {
              return (
                <label key={tag} className="menu__checkbox">
                  <input 
                    type="checkbox"
                    checked={isTagSelected(tag)}
                    onChange={() => handleTagToggle(tag)}
                  />
                  <span>{getTagName(tag)}</span>
                </label>
              );
            })}
          </div>
        </AccordionItem>
      ))}

      <button 
        className="menu__reset-btn"
        onClick={handleResetFilters}
      >
        <img src={reset} alt="reset" />
        очистить
      </button>
    </div>
  );
}; 