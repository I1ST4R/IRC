import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, toggleTag, resetFilters } from "../../../entity/productFilter/slice";
import { AppDispatch, RootState } from "../../../main/store";
import reset from "./reset.svg";
import { PriceRange } from "@/entity/productFilter/types"
import { Category } from "@/entity/productCategory/types"
import { fetchCategoriesRequest } from "@/entity/productCategory/slice"; // Изменился импорт
import { fetchTagsRequest } from "@/entity/tag/slice"; // Изменился импорт

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

  const categories = useSelector((state: RootState) => state.categories.categories);
  const categoriesLoading = useSelector((state: RootState) => state.categories.loading);
  const categoriesError = useSelector((state: RootState) => state.categories.error);
  
  const tags = useSelector((state: RootState) => state.tags.tags);
  const tagsLoading = useSelector((state: RootState) => state.tags.loading);
  const tagsError = useSelector((state: RootState) => state.tags.error);

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

  // Загрузка категорий через Saga
  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  // Загрузка тегов через Saga (только когда категории загружены)
  useEffect(() => {
    if (categories.length > 0) {
      const allTagIds = categories.flatMap(category => category.tags);
      if (allTagIds.length > 0) {
        dispatch(fetchTagsRequest(allTagIds));
      }
    }
  }, [dispatch, categories]);

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

  // Показываем загрузку если грузятся либо категории, либо теги
  if (categoriesLoading || tagsLoading) return <div>Loading...</div>;
  
  // Показываем ошибку если есть ошибка либо в категориях, либо в тегах
  if (categoriesError || tagsError) return (
    <div>Error: {categoriesError || tagsError}</div>
  );
  
  if (!filter) return null;

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

      {categories.map((category: Category) => (
        <AccordionItem key={category.id} title={category.name}>
          <div className="menu__checkboxes">
            {category.tags.map((tagId) => {
              // Показываем тег только если он загружен
              const tag = tags.find(t => t.id === tagId);
              if (!tag) return null;
              
              return (
                <label key={tagId} className="menu__checkbox">
                  <input 
                    type="checkbox"
                    checked={isTagSelected(tagId)}
                    onChange={() => handleTagToggle(tagId)}
                  />
                  <span>{tag.name}</span>
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