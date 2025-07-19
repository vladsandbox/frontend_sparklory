import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import subscribeImg from "@/assets/images/subscribe-img-2.png";

import { fetchProductsByCategory } from "@/store/thunks/productsThunk";
import type { AppDispatch, RootState } from "@/store";

import CatalogProductsList from "./ProductsList";
import "./index.scss";
import SubscribeSection from "@/components/SubscribeSection";

export default function Catalog() {
    const { category } = useParams<{ category: string }>();
    const dispatch: AppDispatch = useDispatch();
    const { products, loading, error } = useSelector((state: RootState) => state.products);

    const capitalizedCategory = useMemo(() => {
        if (!category) return "";
        return category.charAt(0).toUpperCase() + category.slice(1);
    }, [category]);

    useEffect(() => {
        if (category)
            dispatch(fetchProductsByCategory(category));
    }, [category, dispatch]);

    return (
        error ? <p className="error"> Category "{capitalizedCategory}" is not found </p> :
       <>
           <div className="wrapper">
                <title>{capitalizedCategory}</title>
                <h1 className="catalog-title">{capitalizedCategory}</h1>
                <CatalogProductsList products={products} loading={loading} />
            </div>
           <SubscribeSection imageSrc={subscribeImg}/>
        </>
    );
}
