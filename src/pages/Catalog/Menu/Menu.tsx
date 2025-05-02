import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, toggleLine, toggleCategory } from "../../../store/slices/filterSlice";
import { RootState } from "../../../store";
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

const LINES = ["Basic", "Moist + Tonus", "Sebo+", "Anti-age"];
const CATEGORIES = ["Гель для умывания", "Пиллинг", "Активные концентраты", "Крем", "Маска"];
const SKIN_TYPES = ["Сухая", "Жирная", "Комбинированная", "Чувствительная"];
const FACE_SETS = ["Базовый уход", "Антивозрастной", "Проблемная кожа"];
const HAIR_CARE = ["Шампунь", "Маска", "Сыворотка"];

export const Menu = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [localPriceRange, setLocalPriceRange] = useState(filter?.priceRange || { min: 500, max: 10000 });
  const debounceTimer = useRef<NodeJS.Timeout>();

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

  const handleLineToggle = (line: string) => {
    dispatch(toggleLine(line));
  };

  const handleCategoryToggle = (category: string) => {
    dispatch(toggleCategory(category));
  };

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

      <AccordionItem title="Линейки">
        <div className="menu__checkboxes">
          {LINES.map((line) => (
            <label key={line} className="menu__checkbox">
              <input 
                type="checkbox"
                checked={filter.selectedLines.includes(line)}
                onChange={() => handleLineToggle(line)}
              />
              <span>{line}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Уход за лицом">
        <div className="menu__checkboxes">
          {CATEGORIES.map((category) => (
            <label key={category} className="menu__checkbox">
              <input 
                type="checkbox"
                checked={filter.selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Тип кожи">
        <div className="menu__checkboxes">
          {SKIN_TYPES.map((type) => (
            <label key={type} className="menu__checkbox">
              <input 
                type="checkbox"
                checked={filter.selectedCategories.includes(type)}
                onChange={() => handleCategoryToggle(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Наборы для лица">
        <div className="menu__checkboxes">
          {FACE_SETS.map((set) => (
            <label key={set} className="menu__checkbox">
              <input 
                type="checkbox"
                checked={filter.selectedCategories.includes(set)}
                onChange={() => handleCategoryToggle(set)}
              />
              <span>{set}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Уход за волосами">
        <div className="menu__checkboxes">
          {HAIR_CARE.map((item) => (
            <label key={item} className="menu__checkbox">
              <input 
                type="checkbox"
                checked={filter.selectedCategories.includes(item)}
                onChange={() => handleCategoryToggle(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
}; 