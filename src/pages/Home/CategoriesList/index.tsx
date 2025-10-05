import { useNavigate } from "react-router-dom";

import { allToLowerCase } from "@/components/wordsFormatting.ts";
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

    if (loading) return <div className="loading">Loading categories…</div>;
    if (!categories) return;

    return (
        <div className="wrapper">
            <div className="categories-wrapper">
                {categories.map((category) =>
                    <CatalogCard
                        cardData={category}
                        handleClick={() => handleClick(category.name)}
                        withBorder={false}
                    />
                )}
            </div>
        </div>
    );
}
