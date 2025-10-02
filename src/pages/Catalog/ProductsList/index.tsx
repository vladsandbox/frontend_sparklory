import type { PaginatedProductsResponse } from "@/types/Pagination.ts";

import CatalogProductCard from "../ProductCard";
import CatalogPagination from "../Pagination";
import ProductsListFilterSection from "./ProductsListFilterSection";

import "./index.scss";

type Props = {
    data: PaginatedProductsResponse;
    loading: boolean;
    changePage: (page: number) => void;
    currentPage: number;
    onFilterOpen: () => void;
};

export default function CatalogProductsList({ data, loading, changePage, currentPage, onFilterOpen }: Props) {
    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (!data) {
        return <p className="error">Failed to load products</p>;
    }

    const { products, pages, total } = data;

    return (
        <>
            { products.length === 0
                ? <p className="error">No products found</p>
                : <>
                    <ProductsListFilterSection total={total} loading={loading} onFilterOpen={onFilterOpen}/>
                    <div className="catalog-products-wrapper">
                        {products.map((product) => (
                            <CatalogProductCard product={product} key={product._id} />
                        ))}
                    </div>
                    { pages > 1 &&
                        <CatalogPagination
                            currentPage={currentPage}
                            totalPages={pages}
                            onPageChange={changePage}
                        /> }
                </> }
        </>
    );
}
