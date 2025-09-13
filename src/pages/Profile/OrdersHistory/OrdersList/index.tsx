import { useState, useMemo, useEffect } from "react";
import ReactPaginate from "react-paginate";

import OrdersItem from "../OrderItem";
import type { LoyaltyHistoryResponse } from "@/types/Loyalty";

import styles from "./index.module.scss";

import NextArrow from "@/assets/icons/arrow-right.svg?react";
import PrevArrow from "@/assets/icons/arrow-left.svg?react";
import DownArrow from "@/assets/icons/arrow-down.svg?react";

interface OrdersListProps {
    orders: LoyaltyHistoryResponse;
}



export default function OrdersList({ orders }: OrdersListProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [period, setPeriod] = useState<"all" | "week" | "month">("all");

    const PERIOD_LABELS: Record<typeof period, string> = {
        all: "All period",
        week: "Last week",
        month: "Last month",
    };

    const filteredOrders = useMemo(() => {
        const now = new Date();

        if (period === "week") {
            const weekAgo = new Date();
            weekAgo.setDate(now.getDate() - 7);
            return orders.filter((o) => new Date(o.createdAt) >= weekAgo);
        }

        if (period === "month") {
            const monthAgo = new Date();
            monthAgo.setMonth(now.getMonth() - 1);
            return orders.filter((o) => new Date(o.createdAt) >= monthAgo);
        }

        return orders;
    }, [orders, period]);

    useEffect(() => {
        setCurrentPage(0);
    }, [period, orders]);

    const itemsPerPage = 4;
    const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredOrders.slice(offset, offset + itemsPerPage);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
        scrollToTop();
    };

    const start = offset + 1;
    const end = Math.min(offset + itemsPerPage, filteredOrders.length);
    const total = filteredOrders.length;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className="title-m" style={{ marginBottom: 9 }}>Orders</h2>

                <div className={styles.filter}>
                    <button className={styles.filterBtn}>
                        {PERIOD_LABELS[period]}
                        <DownArrow />
                    </button>
                    <div className={styles.dropdown}>
                        <button onClick={() => { setPeriod("week"); setCurrentPage(0); scrollToTop(); }}>
                            Last week
                        </button>
                        <button onClick={() => { setPeriod("month"); setCurrentPage(0); scrollToTop(); }}>
                            Last month
                        </button>
                        <button onClick={() => { setPeriod("all"); setCurrentPage(0); scrollToTop(); }}>
                            All period
                        </button>
                    </div>
                </div>
            </div>

            {!filteredOrders.length ? (
                <p>No orders found.</p>
            ) : (
                <>
                    {currentItems.map((order) => (
                        <OrdersItem key={order._id} order={order} />
                    ))}

                    {pageCount > 1 && (
                        <div className={styles.paginationWrapper}>
                            <span className={styles.range}>
                                {start}-{end} <span className={styles.rangeSpan}>of {total} items</span>
                            </span>

                            <ReactPaginate
                                key={period}
                                breakLabel={null}
                                nextLabel={<NextArrow />}
                                previousLabel={<PrevArrow />}
                                onPageChange={handlePageClick}
                                pageCount={pageCount}
                                pageRangeDisplayed={0}
                                marginPagesDisplayed={0}
                                renderOnZeroPageCount={null}
                                containerClassName={styles.pagination}
                                previousClassName={styles.prev}
                                nextClassName={styles.next}
                                disabledClassName={styles.disabled}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
