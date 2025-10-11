type ProductPricesProps = {
  price: number;
  prevPrice: number;
};

export const ProductPrices = ({ price, prevPrice }: ProductPricesProps) => {
  return (
    <div className="product__prices product-about__prices">
      <span>{price} ₽</span>
      <span className="product__prev-price product-about__prev-price">
        {prevPrice} ₽
      </span>
    </div>
  );
};
