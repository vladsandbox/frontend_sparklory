import { capitalizeFirstLetter } from "@/components/wordsFormatting.ts";
import type { Subcategory } from "@/types/Categories.ts";
import { useSearchParams } from "react-router-dom";
import { noImg } from "@/assets";

import "./index.scss";

type Props = {
    subcategory: Subcategory;
};

export default function CatalogSubcategoryCard({ subcategory }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleClick = () => {
        const newSearchParams = new URLSearchParams(searchParams);

        newSearchParams.delete('subcategory');
        newSearchParams.set('subcategory', subcategory.name);

        setSearchParams(newSearchParams);
    }


    return (
        <div className="subcategory-card" onClick={handleClick}>
            <div>
                {subcategory.image ? (
                    <img
                        src={subcategory.image}
                        alt={subcategory.name}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = noImg;
                            e.currentTarget.classList.add("is-fallback");
                        }}
                    />
                ) : (
                    <img src={noImg} alt="No photo" className="is-fallback" />
                )}
            </div>
            <p className="h3">{capitalizeFirstLetter(subcategory.name)}</p>
        </div>
    );
}