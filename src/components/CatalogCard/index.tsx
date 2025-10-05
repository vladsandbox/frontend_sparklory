import type { Category, Subcategory } from "@/types/Categories.ts";
import { capitalizeFirstLetter } from "@/components/wordsFormatting.ts";
import { noImg } from "@/assets";

import "./index.scss";

type Props = {
    cardData: Category | Subcategory;
    handleClick: () => void;
    withBorder?: boolean;
};

export default function CatalogCard({ cardData, handleClick, withBorder = true }: Props) {
    return (
        <div className="catalog-card" onClick={handleClick}>
            <div>
                {cardData.image ? (
                    <img
                        src={cardData.image}
                        alt={cardData.name}
                        className={`${withBorder ? "has-border" : ""}`}
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
            <p className="h3">{capitalizeFirstLetter(cardData.name)}</p>
        </div>
    );
}