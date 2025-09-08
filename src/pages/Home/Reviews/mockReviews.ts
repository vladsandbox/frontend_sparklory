import { reviews1, reviews2, reviews3 } from "@/assets";
import type { Review } from "@/types/Products";

export const mockReviews: Review[] = [
    {
        name: "Eve Clifford",
        rating: 5,
        text: "Very satisfied with my purchase! The quality exceeded expectations and delivery was fast.",
        avatar: reviews1,
        createdAt: "",
        image: [],
    },
    {
        name: "Julia Cooper",
        rating: 4,
        text: "Great service and friendly staff. The product matches the description, but the packaging could be better.",
        avatar: reviews2,
        createdAt: "",
        image: [],
    },
    {
        name: "Tess Farmer",
        rating: 5,
        text: "This is already my third purchase here. Always fast, high quality, and with nice bonuses!",
        avatar: reviews3,
        createdAt: "",
        image: [],
    },
];