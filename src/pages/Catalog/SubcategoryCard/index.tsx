import type { Subcategory } from "@/types/Categories.ts";
import { noImg } from "@/assets";

import "./index.scss";

type Props = {
    subcategory: Subcategory;
};

export default function CatalogSubcategoryCard({ subcategory }: Props) {
    return (
        <div className="subcategory-card">
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

            <p className="name">{subcategory.name}</p>
        </div>
    );
}