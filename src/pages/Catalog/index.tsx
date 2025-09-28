import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useCallback, useState } from "react";
import subscribeImg from "@/assets/images/subscribe-img-2.png";

import { fetchProducts } from "@/store/thunks/productsThunk";
import type { AppDispatch, RootState } from "@/store";

import CatalogSubcategoriesSlider from "@/pages/Catalog/SubcategoriesSlider";
import CatalogSearchBar from "@/components/CatalogSearchBar";
import SubscribeSection from "@/components/SubscribeSection";
import CatalogProductsList from "./ProductsList";
import Filter from "./Filter";

import "./index.scss";
import { capitalizeFirstLetter, spaceBetweenWords } from "@/components/wordsFormatting.ts";

export default function Catalog() {
    const { category } = useParams<{ category?: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.products);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const currentPage = Number(searchParams.get("page")) || 1;

    const capitalizedCategory = useMemo(() => {
        if (!category) return "";
        return spaceBetweenWords(capitalizeFirstLetter(category));
    }, [category]);

    const pageTitle = category ? capitalizedCategory : "All Products";

    const closeFilter = () => setIsFilterOpen(false);
    const openFilter = () => setIsFilterOpen(true);

    useEffect(() => {
        if (isFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isFilterOpen]);

    useEffect(() => {
        const params: Record<string, string | string[]> = {};

        for (const key of searchParams.keys()) {
            const values = searchParams.getAll(key);

            if (values.length > 1) {
                params[key] = values;
            } else {
                params[key] = values[0];
            }
        }

        if (category) {
            params.category = category;
        }

        if (!params.page) {
            params.page = '1';
        }

        dispatch(fetchProducts(params));

    }, [category, dispatch, searchParams]);

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
                <Filter isOpen={isFilterOpen} onClose={closeFilter} category={category} />
                <CatalogSearchBar />
                <div className="wrapper">
                    <title>{pageTitle}</title>
                    <h1 className="catalog-title">{pageTitle}</h1>
                    {category && <CatalogSubcategoriesSlider category={category} />}
                    <CatalogProductsList
                        data={data}
                        loading={loading}
                        changePage={changePage}
                        currentPage={currentPage}
                        onFilterOpen={openFilter}
                    />
                </div>
                <SubscribeSection imageSrc={subscribeImg}/>
            </>
    );
}