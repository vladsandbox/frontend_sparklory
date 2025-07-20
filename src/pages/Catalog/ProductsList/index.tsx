import type { Product } from "@/types/Products";
import CatalogProductCard from "@/pages/Catalog/ProductCard";

import "./index.scss";

type Props = {
    products: Product[];
};

export default function CatalogProductsList({ products }: Props) {
    return (
            <div className="catalog-wrapper wrapper">
                {products.map((product) => (
                    <CatalogProductCard product={product} key={product._id}/>
                ))}
            </div>
    );
}