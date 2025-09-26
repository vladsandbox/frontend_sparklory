import type { ProductsFilterCounts } from "@/types/Products.ts";
import {
    capitalizeFirstLetter,
    lowEachFirstLetter,
    spaceBetweenWords
} from "@/components/wordsFormatting.ts";

export type FilterOption = {
    label: string;
    count: number;
    value: string;
};

export type FilterSection = {
    key: string;
    title: string;
    options: FilterOption[];
};

type FilterSectionData = {
    key: string;
    title: string;
    options: FilterOption[];
};

const FACET_VALUE_LABELS: Record<string, Record<string, string>> = {
    engraving: {
        true: "With engraving",
        false: "Without engraving",
    },
    gender: {
        female: "Women’s",
        male: "Men’s",
        kids: "Kids",
    },
    subcategory: {
        "": "No subcategory",
    },
};

function formatFacetLabel(facet: string, raw: string): string {
    const dict = FACET_VALUE_LABELS[facet];
    if (dict && raw in dict) {
        return dict[raw];
    }
    return capitalizeFirstLetter(raw) || "Other";
}

export function productsCountsToSections(
    productsCounts: ProductsFilterCounts
): FilterSectionData[] {
    const ignoreSections = ["total", "category", "executionTime", "cacheHit", "price"];

    return Object.entries(productsCounts)
        .filter(([key]) => !ignoreSections.includes(key))
        .map(([key, value]) => {
            let options: FilterSectionData["options"] = [];

            if (typeof value === "object" && value !== null) {
                options = Object.entries(value as Record<string, number>).map(
                    ([label, count]) => ({
                        label: formatFacetLabel(key, label),
                        count,
                        value: label === "" ? "null" : lowEachFirstLetter(label),
                    })
                );
            }

            return {
                key,
                title: spaceBetweenWords(capitalizeFirstLetter(key)),
                options,
            };
        });
}
