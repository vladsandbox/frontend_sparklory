import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

import { fetchProducts, fetchProductsByCategory } from "@/store/thunks/productsThunk";
import type { AppDispatch, RootState } from "@/store";

import CatalogProductsList from "./ProductsList";
import "./index.scss";

export default function Catalog() {
    const { category } = useParams<{ category: string | undefined }>();
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.products);

    const capitalizedCategory = useMemo(() => {
        if (!category) return "";
        return category.charAt(0).toUpperCase() + category.slice(1);
    }, [category]);

    const pageTitle = category ? capitalizedCategory : "All Products";

    useEffect(() => {
        if (category) {
            dispatch(fetchProductsByCategory(category));
        } else {
            dispatch(fetchProducts());
        }
    }, [category, dispatch]);

    return (
        error ? <p className="error"> Category "{capitalizedCategory}" is not found </p> :
        <div className="wrapper">
            <title>{pageTitle}</title>
            <h1 className="catalog-title">{pageTitle}</h1>
            <CatalogProductsList products={products} loading={loading} />
        </div>
    );
}
