import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useCallback } from "react";
import subscribeImg from "@/assets/images/subscribe-img-2.png";

import { fetchProducts } from "@/store/thunks/productsThunk";
import type { AppDispatch, RootState } from "@/store";

import CatalogSubcategoriesSlider from "@/pages/Catalog/SubcategoriesSlider";
import CatalogSearchBar from "@/components/CatalogSearchBar";
import CatalogProductsList from "./ProductsList";
import "./index.scss";
import SubscribeSection from "@/components/SubscribeSection";

export default function Catalog() {
    const { category } = useParams<{ category?: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.products);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const capitalizedCategory = useMemo(() => {
        if (!category) return "";
        return category.charAt(0).toUpperCase() + category.slice(1);
    }, [category]);

    const pageTitle = category ? capitalizedCategory : "All Products";

    useEffect(() => {
        if (currentPage < 1) {
            return;
        }

        const params: { page: number; category?: string } = { page: currentPage };
        if (category) {
            params.category = category;
        }
        dispatch(fetchProducts(params));

    }, [category, currentPage, dispatch]);

    useEffect(() => {
        if (currentPage < 1) {
            setSearchParams(prev => {
                prev.set('page', '1');
                return prev;
            }, { replace: true });
        } else if (data.products.length === 0 && data.total > 0 && currentPage > 1) {
            setSearchParams(prev => {
                prev.set('page', String(data.pages));
                return prev;
            }, { replace: true });
        }
    }, [data, currentPage, setSearchParams]);

    const changePage = useCallback((page: number) => {
        setSearchParams(prev => {
            prev.set("page", String(page));
            return prev;
        });
    }, [setSearchParams]);

    if (error) return <p className="error"> Category "{capitalizedCategory}" is not found </p>;

    return (
            <>
                <CatalogSearchBar />
                <div className="wrapper">
                    <title>{pageTitle}</title>
                    <h1 className="catalog-title">{pageTitle}</h1>
                    {category && <CatalogSubcategoriesSlider category={category} />}
                    <hr />
                    <CatalogProductsList
                        data={data}
                        loading={loading}
                        changePage={changePage}
                        currentPage={currentPage}
                    />
                </div>
                <SubscribeSection imageSrc={subscribeImg}/>
            </>
    );
}