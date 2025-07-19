import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/store/thunks/productsThunk.ts";
import type { RootState, AppDispatch } from "@/store";

import { HomeSlider } from "./Slider";
import CategoryHome from "./Category";
import TrendingNow from "./TrendingNow";
import Reviews from "./Reviews";
import SpringSale from "./SpringSale";
import SubscribeSection from "@/components/SubscribeSection";
import CatalogSearchBar from "@/components/CatalogSearchBar";

import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <CatalogSearchBar />
      <HomeSlider />
      <CategoryHome />
      <TrendingNow products={products} loading={loading}/>
      <Reviews products={products} loading={loading} />
      <SpringSale products={products} loading={loading} />
      <SubscribeSection />
    </div>
  );
}
