import { formatFacetLabel } from "@/utils/facet.ts";
import {
    capitalizeFirstLetter,
    lowEachFirstLetter,
    spaceBetweenWords
} from "@/utils/wordsFormatting.ts";
import type { ProductsFilterCounts } from "@/types/Products.ts";

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

export function productsCountsToSections(
    productsCounts: ProductsFilterCounts
): FilterSectionData[] {
    const ignoreSections = ["total", "category", "executionTime", "cacheHit", "price"];

    return Object.entries(productsCounts)
        .filter(([key]) => !ignoreSections.includes(key))
        .map(([key, value]) => {
            let options: FilterSectionData["options"] = [];

            if (typeof value === "object" && value !== null) {
                options = Object.entries(value as Record<string, number>)
                    .filter(([, count]) => count > 0)
                    .map(([label, count]) => ({
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
