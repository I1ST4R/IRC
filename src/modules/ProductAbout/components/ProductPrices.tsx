type ProductPricesProps = {
  price: number;
  prevPrice: number;
};

export const ProductPrices = ({ price, prevPrice }: ProductPricesProps) => {
  return (
    <div className="text-2xl whitespace-nowrap">
      <span>{price} ₽</span>
      <span className="text-2xl line-through text-gray-500 ml-2">
        {prevPrice} ₽
      </span>
    </div>
  );
};