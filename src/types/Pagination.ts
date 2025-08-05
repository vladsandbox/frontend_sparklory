import type { Product } from "./Products.ts";

type PaginatedResponse<T, K extends string> = {
    total: number;
    page: number;
    limit: number;
    pages: number;
} & {
    [key in K]: T[];
};

export type PaginatedProductsResponse = PaginatedResponse<Product, 'products'>;