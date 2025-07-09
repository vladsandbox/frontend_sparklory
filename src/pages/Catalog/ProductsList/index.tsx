import type { Product } from "@/types/Products";
import CatalogProductCard from "@/pages/Catalog/ProductCard";

import "./index.scss";

type Props = {
    products: Product[];
    loading: boolean;
};

export default function CatalogProductsList({ products, loading }: Props) {
    if (loading) return <p className="loading">Loading...</p>;

    return (
            <div className="catalog-wrapper">
                {products.map((product) => (
                    <CatalogProductCard product={product} key={product._id}/>
                ))}
            </div>
    );
}