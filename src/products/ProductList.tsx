import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchProducts } from "./products.slice";
import { ProductCard } from "./ProductCard";
import "./productList.css";

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const {
    items: products = [],
    loading,
    error,
    pagination: { hasMore } = { hasMore: false },
  } = useAppSelector((state) => state.product);

  useEffect(() => {
    // Загружаем первую страницу продуктов при монтировании
    dispatch(fetchProducts({ page: 1, limit: 10 }));
  }, [dispatch]);

  const loadMore = () => {
    if (hasMore && loading !== "pending") {
      dispatch(
        fetchProducts({
          page: Math.floor(products.length / 10) + 1,
          limit: 10,
        })
      );
    }
  };

  if (loading === "pending" && products.length === 0) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="product-list">
      <div className="product-list__container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
        ))}
      </div>  
      
      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading === "pending"}
          style={{ marginTop: "20px" }}
        >
          {loading === "pending" ? "Loading..." : "Load More"}
        </button>
      )}
      
    </div>
  );
};
