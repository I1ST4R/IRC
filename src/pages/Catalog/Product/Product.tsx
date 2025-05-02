import { useState } from "react";
import { Product as ProductType } from "../../../types";

interface ProductProps {
  product: ProductType;
}

export const Product = ({ product }: ProductProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="product">
      <img 
        src={`/images/${product.img}`} 
        alt={product.name} 
        className="product__image"
      />
      <div className="product__info">
        <h3 className="product__name">{product.name}</h3>
        <div className="product__price">{product.price} ₽</div>
        <div className="product__tags">
          {product.tags.map((tag: string) => (
            <span key={tag} className="product__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <button 
        className={`product__like ${isLiked ? 'product__like--active' : ''}`}
        onClick={handleLike}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
  );
};
