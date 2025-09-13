import { useOutletContext } from "react-router-dom";

import OrdersList from "./OrdersList";
import type { LoyaltyHistoryResponse } from "@/types/Loyalty";

interface OutletContextType {
    historyOrders: LoyaltyHistoryResponse;
}

export default function OrdersHistory() {
    const { historyOrders } = useOutletContext<OutletContextType>();
    return (
        <div>
            <OrdersList orders={historyOrders} />
        </div>
    );
}