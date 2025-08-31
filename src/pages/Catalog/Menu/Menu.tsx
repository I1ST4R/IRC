import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, toggleTag, resetFilters } from "../../../entity/productFilter/slice";
import { AppDispatch, RootState } from "../../../main/store";
import reset from "./reset.svg";
import { PriceRange } from "@/entity/productFilter/types"
import { Category } from "@/entity/productCategory/types"
import { useGetCategoriesQuery } from "@/entity/productCategory/api";
import { useGetTagsByIdQuery } from "@/entity/tag/api";

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
  const tagIds = categories && Array.isArray(categories) ? categories.flatMap(category => category.tags) : [];
  const {data: tags = []} = useGetTagsByIdQuery(tagIds ?? [], { skip: !tagIds.length });

  const sliderRef = useRef<HTMLDivElement>(null);
  const [localPriceRange, setLocalPriceRange] = useState<PriceRange>(filter.filterParams.priceRange || { min: 500, max: 10000 });
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const updateRangeHighlight = useCallback(() => {
    if (sliderRef.current && localPriceRange) {
      const minPercent = ((localPriceRange.min - 500) / (10000 - 500)) * 100;
      const maxPercent = ((localPriceRange.max - 500) / (10000 - 500)) * 100;
      
      sliderRef.current.style.setProperty('--range-left', `${minPercent}%`);
      sliderRef.current.style.setProperty('--range-width', `${maxPercent - minPercent}%`);
    }
  }, [localPriceRange]);
  
  useEffect(() => {
    updateRangeHighlight();
  }, [localPriceRange, updateRangeHighlight]);

  const debouncedPriceChange = useCallback((type: 'min' | 'max', value: number) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    setLocalPriceRange(prev => ({
      ...prev,
      [type]: value
    }));

    debounceTimer.current = setTimeout(() => {
      dispatch(setPriceRange({
        ...localPriceRange,
        [type]: value
      }));
    }, 300);
  }, [dispatch, localPriceRange]);

  const handlePriceChange = useCallback((type: 'min' | 'max', value: number) => {
    if (!filter) return;
    debouncedPriceChange(type, value);
  }, [filter, debouncedPriceChange]);

  const handleTagToggle = useCallback((tagId: string) => {
    dispatch(toggleTag(tagId));
  }, [dispatch]);

  const isTagSelected = useCallback((tagId: string) => {
    return filter.filterParams.tagsId.some((t: string) => t === tagId) || false;
  }, [filter]);

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
    setLocalPriceRange({ min: 500, max: 10000 });
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
        <div className="menu__price-range">
          <div className="menu__price-inputs">
            <input 
              type="number" 
              min="500" 
              max="10000" 
              value={localPriceRange.min}
              onChange={(e) => handlePriceChange('min', Number(e.target.value))}
            />
            <span className="menu__price-separator">-</span>
            <input 
              type="number" 
              min="500" 
              max="10000" 
              value={localPriceRange.max}
              onChange={(e) => handlePriceChange('max', Number(e.target.value))}
            />
          </div>
          <div className="menu__price-slider" ref={sliderRef}>
            <input
              type="range"
              min="500"
              max="10000"
              value={localPriceRange.min}
              onChange={(e) => handlePriceChange('min', Number(e.target.value))}
              className="menu__range menu__range--min"
            />
            <input
              type="range"
              min="500"
              max="10000"
              value={localPriceRange.max}
              onChange={(e) => handlePriceChange('max', Number(e.target.value))}
              className="menu__range menu__range--max"
            />
          </div>
        </div>
      </AccordionItem>

      {categories && Array.isArray(categories) && categories.map((category: Category) => (
        <AccordionItem key={category.id} title={category.name}>
          <div className="menu__checkboxes">
            {category.tags && Array.isArray(category.tags) && category.tags.map((tag) => {
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
        aria-label="Очистить все фильтры"
      >
        <img src={reset} alt="Сбросить фильтры" />
        очистить
      </button>
    </div>
  );
}; 