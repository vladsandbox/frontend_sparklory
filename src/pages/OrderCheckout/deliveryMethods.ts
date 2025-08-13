export type DeliveryMethod = {
    id: string;
    title: string;
    price: string;
    desc: string;
};

export const deliveryMethods: DeliveryMethod[] = [
    {
        id: "standard",
        title: "Standard Delivery",
        price: "$ 10",
        desc: "Delivery takes 5–7 business days. This is an economical option for those who are not in a hurry. Your order will be securely packed and delivered to your address.",
    },
    {
        id: "express",
        title: "Express Delivery",
        price: "$ 18",
        desc: "Fast delivery within 1–2 business days. Suitable if you need your order urgently. The cost is higher than standard shipping, but the delivery is prioritized and tracked.",
    },
    {
        id: "pickup",
        title: "Pickup Point",
        price: "Free",
        desc: "You pick up your order yourself from a convenient pickup location. You will be notified when your order is ready. Saves time and delivery costs.",
    },
] as const;
