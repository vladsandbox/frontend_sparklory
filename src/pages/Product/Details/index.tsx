import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";

import MaterialSelector from "../../../components/MaterialSelector/MaterialSelector";
import { Product } from "../../../types/Products";
import ProductTabs from "./ProductTabs";

import { silver, whiteGold, gold } from "../../../assets";

import styles from "./index.module.scss";

const materials = [
    { id: "silver", label: "Silver", img: silver },
    { id: "white-gold", label: "White Gold", img: whiteGold },
    { id: "gold", label: "Gold", img: gold },
];

const sizes = ["16.5", "17", "18"];

type Props = {
    product: Product
    isFavorite: boolean;
    onToggleFavorite: () => void;
};

export default function ProductDetails({ product, isFavorite, onToggleFavorite }: Props) {
    const [selectedMaterials, setSelectedMaterials] = useState<Record<string, string>>({});
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState("16.5");
    const [quantity, setQuantity] = useState(1);

    const selected = selectedMaterials[product._id] || "silver";

    const handleMaterialChange = (productId: string, materialId: string) => {
        setSelectedMaterials((prev) => ({
            ...prev,
            [productId]: materialId,
        }));
    };

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slides: { perView: 1 },
        slideChanged(slider) {
            setCurrentImageIndex(slider.track.details.rel);
        },
    });

    const images =
        product.image.length >= 3
            ? product.image
            : [...product.image, ...Array(3 - product.image.length).fill(product.image[0])];

    const handlePrev = () => instanceRef.current?.prev();
    const handleNext = () => instanceRef.current?.next();

    return (
        <div className="wrapper">
            <div className={styles["product-container"]}>
                <div className={styles.imageSection}>
                    <div className={`keen-slider ${styles.slider}`} ref={sliderRef}>
                        {images.map((src, i) => (
                            <div className={`keen-slider__slide ${styles.slide}`} key={i}>
                                <img src={src} alt={`${product.name} ${i}`} className={styles.mainImage} />
                            </div>
                        ))}
                    </div>

                    <div className={`nav-buttons ${styles.containerButtons}`}>
                        <button onClick={handlePrev} className="arrow left" disabled={currentImageIndex === 0} />
                        <button
                            onClick={handleNext}
                            className="arrow right"
                            disabled={currentImageIndex === images.length - 1}
                        />
                    </div>

                    <div className={styles.thumbnails}>
                        {images.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`Thumbnail ${idx}`}
                                className={`${styles.thumbnail} ${currentImageIndex === idx ? styles.active : ""}`}
                                onClick={() => instanceRef.current?.moveToIdx(idx)}
                            />
                        ))}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 536 }}>
                    <div>
                        <h2 className="h2">{product.name}</h2>
                        <p className="text-xxl" style={{ marginBottom: 52, marginTop: 32 }}>
                            {product.price}₴
                        </p>
                        <p className={`body ${styles.description}`}>{product.description}</p>
                    </div>

                    <div className={styles["product-option"]}>
                        <div>
                            <p className="h3">Color</p>
                            <MaterialSelector
                                productId={product._id}
                                selectedMaterial={selected}
                                onChange={(id) => handleMaterialChange(product._id, id)}
                                materials={materials}
                            />
                        </div>
                        <div>
                            <p className="h3">Size</p>
                            <div className={styles.sizeWrapper}>
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`text-s ${styles.sizeBtn} ${selectedSize === size ? styles.active : ""}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="h3">Quantity</p>
                            <div className={styles.quantityWrapper}>
                                <button className={styles.quantityBtn} onClick={decreaseQuantity}>-</button>
                                <p className={`${styles.quantityText} text-s`}>{quantity}</p>
                                <button className={styles.quantityBtn} onClick={increaseQuantity}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles["button-container"]}>
                        <button className="primary-btn big button-text">Add to Cart</button>

                        <button className="secondary-btn big button-text" onClick={onToggleFavorite}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ marginRight: 8, verticalAlign: "middle" }}
                            >
                                <path
                                    d="M16.827 27.7466C16.3737 27.9066 15.627 27.9066 15.1737 27.7466C11.307 26.4266 2.66699 20.92 2.66699 11.5866C2.66699 7.46663 5.98699 4.1333 10.0803 4.1333C12.507 4.1333 14.6537 5.30663 16.0003 7.11997C17.347 5.30663 19.507 4.1333 21.9203 4.1333C26.0137 4.1333 29.3337 7.46663 29.3337 11.5866C29.3337 20.92 20.6937 26.4266 16.827 27.7466Z"
                                    stroke="rgba(94, 75, 75, 1)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill={isFavorite ? "rgba(94, 75, 75, 1)" : "none"}
                                />
                            </svg>
                            {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                        </button>
                    </div>
                </div>
            </div>
            <ProductTabs
                details={product.description}
                shipping={`Standard Shipping: 3–5 business days (Free over $100)
Express Shipping: 1–2 business days (calculated at checkout)
Returns: Free 14-day return policy on unworn items
Packaging: Shipped in eco-friendly gift box`}
            />
        </div>
    );
}
