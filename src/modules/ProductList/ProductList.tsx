import { useState } from "react";
import { useSelector } from "react-redux";
import { Product as ProductComponent } from "./components/Product/Product";
import { ProductT } from "@/modules/ProductList";
import { useGetProductsQuery } from "./store/product/productApiSlice";
import { ProductListError } from "./components/ProductListError";
import { NoProductsWithFilter } from "./components/NoProductsWithFilter";
import { Button } from "@/shared/ui/kit/button";
import { cn } from "@/shared/lib/css";
import { Loader } from "@/shared/ui/components/Loader";
import { selectFilter } from "@/modules/Menu";

export const ProductList = () => {
  const filter = useSelector(selectFilter);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetProductsQuery({
    page: page,
    filter: filter.filterParams,
  });

  const hasMore = data?.hasMore || false;

  const handleLoadMore = () => {
    if (!hasMore || isLoading) return;
    setPage((prev) => prev + 1);
  };

  if (isLoading && page === 1) return <Loader title="Каталог"/>;
  if (!data?.products && filter.isInitial) return <NoProductsWithFilter />;
  if (error || !data || !data.products) return <ProductListError />;

  return (
    <div>
      <div className="grid grid-cols-3 gap-5 p-5 w-[1200px] mx-auto min-h-[400px]">
        {data.products.map((product: ProductT) => (
          <ProductComponent key={`product-${product.id}`} product={product} />
        ))}
      </div>
      <Button
        className={cn(hasMore && "hidden")}
        variant="squareRemove"
        onClick={handleLoadMore}
        disabled={isLoading}
      >
        Загрузить ещё
      </Button>
    </div>
  );
};
