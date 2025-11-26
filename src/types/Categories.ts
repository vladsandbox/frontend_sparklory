export type Subcategory = {
    _id: string;
    name: string;
    image: string;
}

export type Category = Subcategory & {
    subcategories?: Subcategory[];
}
