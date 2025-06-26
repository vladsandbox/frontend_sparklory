import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts, getProductById } from "../../store/thunks/productsThunk";
import { RootState, AppDispatch } from "../../store";

import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import ProductDetails from "./Details";
import CatalogSearchBar from "../../components/CatalogSearchBar";
import RecommendedProducts from "./RecommendedProducts";

export default function Product() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const product = useSelector((state: RootState) => state.products.singleProduct);
  const allProducts = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = getLocalStorage<string[]>("favoriteProducts", []);
    setFavoriteIds(new Set(stored));
  }, []);

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!allProducts.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  const toggleFavorite = (productId: string, isFavorite: boolean) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);
      if (isFavorite) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      setLocalStorage("favoriteProducts", Array.from(newSet));
      return newSet;
    });
  };

  const isFavorite = product ? favoriteIds.has(product._id) : false;

  const relatedProducts = useMemo(() => {
    if (!product || !Array.isArray(allProducts)) return [];
    return allProducts.filter(
      (p) => p.category === product.category && p._id !== product._id
    );
  }, [product, allProducts]);

  if (loading) return <p className="wrapper">Loading...</p>;
  if (!product) return <p className="wrapper">Product not found.</p>;

  return (
    <div>
      <CatalogSearchBar />
      <ProductDetails product={product} isFavorite={isFavorite} onToggleFavorite={() => toggleFavorite(product._id, !isFavorite)} />
      <RecommendedProducts
        products={relatedProducts}
        loading={loading}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
