export type Category = {
    _id: string;
    name: string;
    image: string;
    subcategories: Subcategory[];
}

export type Subcategory = {
    _id: string;
    name: string;
    image: string;
}