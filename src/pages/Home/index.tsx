import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductActions } from "@/store/thunks/productsThunk.ts";
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
  const actionProducts = useSelector((state: RootState) => state.products.actionProducts);
  const actionLoading = useSelector((state: RootState) => state.products.actionLoading);


  useEffect(() => {
    dispatch(fetchProductActions({ action: "Trending now" }));
    dispatch(fetchProductActions({ action: "Spring sale" }));
  }, [dispatch]);

  return (
    <div>
      <CatalogSearchBar />
      <HomeSlider />
      <CategoryHome />
      <TrendingNow products={actionProducts["Trending now"] || []} loading={actionLoading["Trending now"]} />
      <Reviews />
      <SpringSale products={actionProducts["Spring sale"] || []} loading={actionLoading["Spring sale"]} />
      <SubscribeSection />
    </div>
  );
}
