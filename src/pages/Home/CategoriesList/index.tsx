import { useNavigate } from "react-router-dom";

import SkeletonCatalogCard from "@/components/CatalogCard/SkeletonCatalogCard.tsx";
import { allToLowerCase } from "@/utils/wordsFormatting.ts";
import CatalogCard from "@/components/CatalogCard";
import type { Category } from "@/types/Categories.ts";

import "./index.scss"

interface Props {
    categories: Category[];
    loading: boolean;
}

export default function CategoriesList({categories, loading}: Props) {
    const navigate = useNavigate();

    const handleClick = (category: string) => {
        navigate(`/catalog/${allToLowerCase(category)}`);
    }

    if (loading) return (
        <div className="wrapper">
                <div className="categories-wrapper">
                {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCatalogCard key={i} />
                ))}
            </div>
        </div>

    );

    if (!categories) return null;

    return (
        <div className="wrapper">
            <div className="categories-wrapper">
                {categories.map((category) =>
                    <CatalogCard
                        key={category._id}
                        cardData={category}
                        handleClick={() => handleClick(category.name)}
                        withBorder={false}
                    />
                )}
            </div>
        </div>
    );
}
