import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { chooseFileBackground, galleryAdd } from "../../../assets";
import type { AppDispatch } from "../../../store";
import { postProductReview } from "../../../store/thunks/productsThunk";

import styles from "./index.module.scss";

const stars = [1, 2, 3, 4, 5];

type Props = {
    productId: string | undefined;
};

export default function ReviewForm({ productId }: Props) {
    const dispatch = useDispatch<AppDispatch>();

    const uploadReviewImage = async (productId: string, reviewId: string, file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            await fetch(
                `${import.meta.env.VITE_PRODUCTS_GET_URL}/${productId}/reviews/${reviewId}/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
        } catch (error) {
            console.error("Image upload failed", error);
        }
    };

    const formik = useFormik({
        initialValues: {
            rating: 0,
            name: "",
            text: "",
            image: null as File | null,
        },
        validationSchema: Yup.object({
            rating: Yup.number().min(1, "Please provide a rating").required("Required"),
            name: Yup.string().required("Name is required"),
            text: Yup.string().required("Review content is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const formattedDate = new Date().toLocaleDateString("uk-UA");

            const reviewPayload = {
                name: values.name,
                avatar: "default.png",
                text: values.text,
                rating: values.rating,
                createdAt: formattedDate,
                image: [],
            };

            if (productId) {
                try {
                    const resultAction = await dispatch(
                        postProductReview({ productId, review: reviewPayload })
                    ).unwrap();
                    
                    const reviewId = resultAction._id;

                    if (values.image) {
                        await uploadReviewImage(productId, reviewId as string, values.image);
                    }

                    resetForm();
                } catch (error) {
                    console.error("Failed to post review:", error);
                }
            }
        },
    });

    return (
        <div className={styles.reviewForm}>
            <form onSubmit={formik.handleSubmit} className={styles.reviewForm__form}>
                <div>
                    <p className="h2" style={{ marginBottom: 24 }}>Write a Review</p>

                    <div className={styles.reviewForm__fields}>
                        <div className={styles.reviewForm__fieldGroup}>
                            <p className="text-filters" style={{ marginBottom: 4 }}>What is it like to Product?</p>
                            <div className={styles.reviewForm__stars}>
                                {stars.map((star) => (
                                    <span
                                        key={star}
                                        className={
                                            star <= formik.values.rating
                                                ? styles.reviewForm__starActive
                                                : styles.reviewForm__star
                                        }
                                        onClick={() => formik.setFieldValue("rating", star)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                formik.setFieldValue("rating", star);
                                            }
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`${star} star`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            {formik.touched.rating && formik.errors.rating && (
                                <div className={styles.reviewForm__error}>{formik.errors.rating}</div>
                            )}
                        </div>

                        <label htmlFor="name" className={styles.reviewForm__label}>First Name</label>
                        {formik.touched.name && formik.errors.name && (
                            <div className={styles.reviewForm__error}>{formik.errors.name}</div>
                        )}
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your Name"
                            className="primary-input input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            style={{ marginBottom: 17 }}
                        />

                        <label htmlFor="text" className={styles.reviewForm__label}>Review Content</label>
                        {formik.touched.text && formik.errors.text && (
                            <div className={styles.reviewForm__error}>{formik.errors.text}</div>
                        )}
                        <textarea
                            id="text"
                            name="text"
                            placeholder="Write your review"
                            className="primary-input input"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.text}
                            style={{ marginBottom: 32, height: 139 }}
                        />

                        <button type="submit" className="primary-btn button-text" style={{ width: 223 }}>
                            Send
                        </button>
                    </div>
                </div>
            </form>

            <div className={styles.reviewForm__uploadContainer}>
                <img
                    src={chooseFileBackground}
                    alt="chooseFileBackground"
                    className={styles.chooseFileBackground}
                />

                <div className={styles.fileUploadOverlay}>
                    <label htmlFor="fileInput" className={styles.fileCard}>
                        <img src={galleryAdd} alt="galleryAdd" />
                        <div className={styles.fileCard__description}>
                            <p className="text-xs">Choose a file or drag & drop here</p>
                            <p className="subtitle">JPEG, PNG format, up to 60MB</p>
                        </div>
                        <label htmlFor="fileInput" className="secondary-btn button-text">
                            Select file
                        </label>

                        {formik.values.image && (
                            <p className="text-filters" style={{marginTop: 20}}>
                                Selected file: <strong>{formik.values.image.name}</strong>
                            </p>
                        )}
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/png, image/jpeg"
                        className={styles.fileCard__input}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                formik.setFieldValue("image", file);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
