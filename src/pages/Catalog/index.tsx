import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

import { fetchProductsByCategory } from "@/store/thunks/productsThunk";
import type { AppDispatch, RootState } from "@/store";

import CatalogSubcategoriesSlider from "@/pages/Catalog/SubcategoriesSlider";
import CatalogSearchBar from "@/components/CatalogSearchBar";
import CatalogProductsList from "./ProductsList";
import "./index.scss";

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
        <div>
            <CatalogSearchBar />

            {loading ? <p className="loading">Loading...</p> :
                <>
                    <title>{capitalizedCategory}</title>
                    <h1 className="catalog-title wrapper">{capitalizedCategory}</h1>
                    {category && <CatalogSubcategoriesSlider category={category}/>}
                    <hr />
                    <CatalogProductsList products={products} />
                </>
            }
        </div>
    );
}
