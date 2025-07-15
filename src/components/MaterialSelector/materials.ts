import { silver, gold, whiteGold } from "@/assets";

export type Material = {
    id: string;
    label: string;
    img: string;
};

export const MATERIALS = [
    { id: 'silver', label: 'Silver', img: silver },
    { id: 'white gold', label: 'White Gold', img: whiteGold },
    { id: 'gold', label: 'Gold', img: gold },
] as const;