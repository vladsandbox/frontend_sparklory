import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts, getProductById } from "../../store/thunks/productsThunk";
import type { RootState, AppDispatch } from "../../store";

import ProductDetails from "./Details";
import CatalogSearchBar from "../../components/CatalogSearchBar";
import RecommendedProducts from "./RecommendedProducts";

export default function Product() {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const product = useSelector((state: RootState) => state.products.singleProduct);
  const allProducts = useSelector((state: RootState) => state.products.data.products);
  const loading = useSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!allProducts.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  const relatedProducts = allProducts.filter(
    (p) => product && p.category === product.category && p._id !== product._id
  );

  if (loading) return <p className="wrapper">Loading...</p>;
  if (!product) return <p className="wrapper">Product not found.</p>;

  return (
    <div>
      <CatalogSearchBar />
      <ProductDetails product={product} />
      <RecommendedProducts products={relatedProducts} loading={loading} />
    </div>
  );
}
