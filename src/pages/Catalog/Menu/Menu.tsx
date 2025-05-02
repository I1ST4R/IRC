import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, toggleTag } from "../../../main/store/slices/filterSlice";
import { RootState } from "../../../main/store/store";
import { getCategories } from "../../../services/api";
import { setCategories, setLoading, setError } from "../../../main/store/slices/categoriesSlice";
import "./_menu.scss";

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
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const isLoading = useSelector((state: RootState) => state.categories.isLoading);
  const error = useSelector((state: RootState) => state.categories.error);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [localPriceRange, setLocalPriceRange] = useState(filter?.priceRange || { min: 500, max: 10000 });
  const debounceTimer = useRef<number | undefined>(undefined);

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

  const updateRangeHighlight = () => {
    if (sliderRef.current && localPriceRange) {
      const minPercent = ((localPriceRange.min - 500) / (10000 - 500)) * 100;
      const maxPercent = ((localPriceRange.max - 500) / (10000 - 500)) * 100;
      
      sliderRef.current.style.setProperty('--range-left', `${minPercent}%`);
      sliderRef.current.style.setProperty('--range-width', `${maxPercent - minPercent}%`);
    }
  };

  useEffect(() => {
    updateRangeHighlight();
  }, [localPriceRange]);

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

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    if (!filter) return;
    debouncedPriceChange(type, value);
  };

  const handleTagToggle = (categoryId: string, tagId: string) => {
    dispatch(toggleTag({ categoryId, tagId }));
  };

  const isTagSelected = (categoryId: string, tagId: string) => {
    return filter?.selectedTags.some(
      tag => tag.categoryId === categoryId && tag.tagId === tagId
    ) || false;
  };

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

      {categories.map((category) => (
        <AccordionItem key={category.id} title={category.name}>
          <div className="menu__checkboxes">
            {category.tags.map((tag) => (
              <label key={tag.id} className="menu__checkbox">
                <input 
                  type="checkbox"
                  checked={isTagSelected(category.id, tag.id)}
                  onChange={() => handleTagToggle(category.id, tag.id)}
                />
                <span>{tag.name}</span>
              </label>
            ))}
          </div>
        </AccordionItem>
      ))}
    </div>
  );
}; 