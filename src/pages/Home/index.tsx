import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProductActions } from "@/store/thunks/productsThunk.ts";
import { fetchCategories } from "@/store/thunks/categoriesThunk.ts";
import type { RootState, AppDispatch } from "@/store";

import { HomeSlider } from "./Slider";
import CategoriesList from "./CategoriesList";
import TrendingNow from "./TrendingNow";
import Reviews from "./Reviews";
import SpringSale from "./SpringSale";
import SubscribeSection from "@/components/SubscribeSection";
import CatalogSearchBar from "@/components/CatalogSearchBar";

import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';

export default function Home() {
  const dispatch: AppDispatch = useDispatch();

  const {actionProducts, actionLoading} = useSelector((state: RootState) => state.products);

  const categories = useSelector((state: RootState) => state.categories.categories.slice(0, 6));
  const categoriesLoading = useSelector((state: RootState) => state.categories.loading);

  useEffect(() => {
    dispatch(fetchProductActions({ action: "Trending now" }));
    dispatch(fetchProductActions({ action: "Spring sale" }));
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <CatalogSearchBar />
      <HomeSlider />
      <CategoriesList categories={categories} loading={categoriesLoading} />
      <TrendingNow products={actionProducts["Trending now"] || []} loading={actionLoading["Trending now"]} />
      <Reviews />
      <SpringSale products={actionProducts["Spring sale"] || []} loading={actionLoading["Spring sale"]} />
      <SubscribeSection />
    </div>
  );
}
