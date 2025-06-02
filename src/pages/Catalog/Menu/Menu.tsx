import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, toggleTag, resetFilters } from "../../../entity/product/filterSlice";
import { RootState } from "../../../main/store";
import { getCategories } from '@/services/api';
import { setCategories, setLoading, setError } from "../../../entity/productCategory/slice";
import reset from "./reset.svg";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

interface PriceRange {
  min: number;
  max: number;
}

interface Category {
  id: string;
  name: string;
  tags: Array<{
    id: string;
    name: string;
  }>;
}

interface FilterState {
  priceRange: PriceRange;
  selectedTags: string[];
}

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
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
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter) as unknown as FilterState;
  const categories = useSelector((state: RootState) => state.categories.items);
  const isLoading = useSelector((state: RootState) => state.categories.loading);
  const error = useSelector((state: RootState) => state.categories.error);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [localPriceRange, setLocalPriceRange] = useState<PriceRange>(filter?.priceRange || { min: 500, max: 10000 });
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        dispatch(setLoading(true));
        const data = await getCategories();
        dispatch(setCategories(data));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to load categories'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadCategories();
  }, [dispatch]);

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

  const handleTagToggle = useCallback((tagString: string) => {
    dispatch(toggleTag(tagString));
  }, [dispatch]);

  const isTagSelected = useCallback((tagString: string) => {
    return filter?.selectedTags.some((t: string) => t === tagString) || false;
  }, [filter]);

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
    setLocalPriceRange({ min: 500, max: 10000 });
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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

      {categories.map((category: Category) => (
        <AccordionItem key={category.id} title={category.name}>
          <div className="menu__checkboxes">
            {category.tags.map((tag) => {
              const tagString = `${category.id},${tag.id}`;
              return (
                <label key={tagString} className="menu__checkbox">
                  <input 
                    type="checkbox"
                    checked={isTagSelected(tagString)}
                    onChange={() => handleTagToggle(tagString)}
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