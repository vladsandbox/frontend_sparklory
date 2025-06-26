import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchProductReviews, fetchAllProductReviews } from "../../../store/thunks/productsThunk";
import { RootState, AppDispatch } from "../../../store";
import ReviewForm from "../ReviewForm";
import ReviewCard from "../../../components/ReviewCard";
import CustomersExperience from "../CustomersExperience";
import { Review } from "../../../types/Products";

import styles from "./index.module.scss";

type Props = {
    details: string;
    shipping: string;
};

export default function ProductTabs({ details, shipping }: Props) {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState<"details" | "shipping" | "reviews">("details");

    const { reviews, reviewsTotal, reviewsLoading, allReviews } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        if (activeTab === "reviews" && id) {
            dispatch(fetchProductReviews({ productId: id, page }));
            dispatch(fetchAllProductReviews(id));
        }
    }, [activeTab, page, id, dispatch]);

    function calculateRatingStats(reviews: Review[]) {
        const total = reviews.length;
        return [5, 4, 3, 2, 1].map((stars) => {
            const count = reviews.filter((r) => r.rating === stars).length;
            const percent = total > 0 ? Math.round((count / total) * 100) : 0;
            return { stars, percent };
        });
    }

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabButtons}>
                <button
                    onClick={() => setActiveTab("details")}
                    className={`title-m ${activeTab === "details" ? styles.active : ""}`}
                >
                    Details
                </button>
                <button
                    onClick={() => setActiveTab("shipping")}
                    className={`title-m ${activeTab === "shipping" ? styles.active : ""}`}
                >
                    Shipping & Returns
                </button>
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`title-m ${activeTab === "reviews" ? styles.active : ""}`}
                >
                    Reviews
                </button>
            </div>

            <div className={styles.tabContent}>
                {activeTab === "details" && (
                    <ul className={styles.bulletList}>
                        {details.split("\n").map((item, index) => (
                            <li key={index} className="body">{item}</li>
                        ))}
                    </ul>
                )}

                {activeTab === "shipping" && (
                    <ul className={styles.bulletList}>
                        {shipping.split("\n").map((item, index) => (
                            <li key={index} className="body">{item}</li>
                        ))}
                    </ul>
                )}

                {activeTab === "reviews" && (
                    <div>
                        <ReviewForm productId={id} />
                        <CustomersExperience ratings={calculateRatingStats(allReviews)} totalReviews={reviewsTotal} />
                        <div>
                            <ul className={styles.reviews}>
                                {reviewsLoading ? (
                                    <p>Loading...</p>
                                ) : reviews.length ? (
                                    reviews.map((r, i) => (
                                        <li key={i} className={styles.reviewItem}>
                                            <ReviewCard review={r} showExtraInfo />
                                        </li>
                                    ))
                                ) : (
                                    <p>No reviews yet.</p>
                                )}
                            </ul>

                            {!reviewsLoading && reviewsTotal > 3 && (
                                <div className={styles.pagination}>
                                    <button
                                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={page === 1}
                                        className={`button-text ${styles.navButton}`}
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15.8335 10.0001H4.16683M4.16683 10.0001L10.0002 4.16675M4.16683 10.0001L10.0002 15.8334"
                                                stroke={page === 1 ? "#B3B3B3" : "#1E1E1E"}
                                                strokeWidth="1.67"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Previous
                                    </button>

                                    <div className={styles.paginationBtn}>
                                        {Array.from({ length: Math.ceil(reviewsTotal / 3) }).map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                className={`button-text ${i + 1 === page ? styles.activePage : ""}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(reviewsTotal / 3)))}
                                        disabled={page === Math.ceil(reviewsTotal / 3)}
                                        className={`button-text ${styles.navButton}`}
                                    >
                                        Next
                                        <svg
                                            width="21"
                                            height="20"
                                            viewBox="0 0 21 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.6665 9.99984H16.3332M16.3332 9.99984L10.4998 4.1665M16.3332 9.99984L10.4998 15.8332"
                                                stroke={page === Math.ceil(reviewsTotal / 3) ? "#B3B3B3" : "#1E1E1E"}
                                                strokeWidth="1.67"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
