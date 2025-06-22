import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../store/thunks/productsThunk";
import { RootState, AppDispatch } from "../../store";

import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import ProductDetails from "./Details";
import CatalogSearchBar from "../../components/CatalogSearchBar";

export default function Product() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const product = useSelector((state: RootState) => state.products.singleProduct);
  const loading = useSelector((state: RootState) => state.products.loading);

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = getLocalStorage<string[]>("favoriteProducts", []);
    setFavoriteIds(new Set(stored));
  }, []);

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [dispatch, id]);

  const toggleFavorite = () => {
    if (!product) return;

    setFavoriteIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(product._id)) {
        newSet.delete(product._id);
      } else {
        newSet.add(product._id);
      }
      setLocalStorage("favoriteProducts", Array.from(newSet));
      return newSet;
    });
  };

  const isFavorite = product ? favoriteIds.has(product._id) : false;

  if (loading) return <p className="wrapper">Loading...</p>;
  if (!product) return <p className="wrapper">Product not found.</p>;

  return (
    <div>
      <CatalogSearchBar />
      <ProductDetails product={product} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
    </div>
  );
}
