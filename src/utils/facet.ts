import { capitalizeFirstLetter } from "@/utils/wordsFormatting.ts";

export const FACET_VALUE_LABELS: Record<string, Record<string, string>> = {
    engraving: {
        true: "With engraving",
        false: "Without engraving",
    },
    gender: {
        female: "Women’s",
        male: "Men’s",
        kids: "Children’s",
    },
    subcategory: {
        "": "No subcategory",
    },
};

export function formatFacetLabel(facet: string, raw: string): string {
    const dict = FACET_VALUE_LABELS[facet];
    if (dict && raw in dict) {
        return dict[raw];
    }
    return capitalizeFirstLetter(raw) || "Other";
}
