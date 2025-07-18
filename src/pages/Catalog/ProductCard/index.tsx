import { useState } from "react";

import FavoriteButton from "@/components/FavoriteButton";
import DiscountLabel from "@/components/DiscountLabel";
import ActionLabel from "@/components/ActionLabel";
import ComparisonButton from "@/components/ComparisonButton";
import MaterialSelector from "@/components/MaterialSelector/MaterialSelector";
import { MATERIALS } from "@/components/MaterialSelector/materials.ts";
import type { Product, ProductVariant } from "@/types/Products";
import { noImg } from "@/assets";

import "./index.scss";

type Props = {
    product: Product;
};

export default function CatalogProductCard({ product }: Props) {
    const materials = product.variants.map((variant) => {
        const found = MATERIALS.find((m) => m.id === variant.material);
        return found ?? { id: variant.material, label: variant.material.replace(/\b\w/g, (c) => c.toUpperCase()), img: noImg };
    });

    const [selectedMaterial, setSelectedMaterial] = useState<string>(materials[0]?.id ?? "");
    const currentVariant: ProductVariant | null = product.variants.find((variant) => variant.material === selectedMaterial) || null;

    const handleMaterialChange = (id: string) => {
        setSelectedMaterial(id);
    };

    const originalPrice = currentVariant ? currentVariant.price : 0;

    const discountPercent = product.discount ?? 0;
    const discountedPrice = discountPercent > 0
        ? Math.round(originalPrice * (100 - discountPercent) / 100)
        : originalPrice;

    return (
        <div className="product-card">
            <div className="card-content">
                <div className="image">
                    <div className="buttons">
                        <FavoriteButton
                            productId={product._id}
                            initialFavorite={false}
                            onToggle={(id, fav) => console.log(id, fav)}
                        />
                        <ComparisonButton
                            productId={product._id}
                            initialComparison={false}
                            onToggle={(id, fav) => console.log(id, fav)}
                        />
                    </div>
                    <div className="labels">
                        {product.discount > 0 && <DiscountLabel percentage={product.discount} />}
                        {Array.isArray(product.action) && product.action.length > 0 && <ActionLabel action={product.action[0]} />}
                    </div>
                    {product.image.length ? (
                        <img
                            src={product.image[0]}
                            alt={product.name}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = noImg;
                                e.currentTarget.classList.add("is-fallback");
                            }}
                        />
                    ) : (
                        <img src={noImg} alt="No photo" className="is-fallback" />
                    )}
                </div>

                <div className="information">
                    <p className="name default-name">{product.name}</p>

                    <p className="price default-price">
                        {discountPercent > 0 ? (
                            <>
                              <span className="original-price">
                                {originalPrice}₴
                              </span>
                              <span className="discounted-price">
                                {discountedPrice}₴
                              </span>
                            </>
                        ) : (
                            `${originalPrice}₴`
                        )}
                    </p>

                    <div className="expanded-information">
                        <p className="name expanded-name">{product.name}</p>
                        {materials.length > 0 && (
                            <span className="materials">
                                <MaterialSelector
                                    productId={product._id}
                                    selectedMaterial={selectedMaterial}
                                    onChange={handleMaterialChange}
                                    materials={materials}
                                />
                            </span>
                        )}

                        <p className="price expanded-price">
                            {discountPercent > 0 ? (
                                <>
                                    <span className="original-price">{originalPrice}₴</span>
                                    <span className="discounted-price">{discountedPrice}₴</span>
                                </>
                            ) : (
                                `${originalPrice}₴`
                            )}
                        </p>

                        {
                            product.details.length > 0 &&
                            <p className="details">
                                {product.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </p>
                        }

                        {currentVariant && (
                            <div className="card-buttons">
                                <button
                                    className="add-to-cart-btn"
                                    disabled={currentVariant.inStock === 0}
                                >
                                    {currentVariant.inStock > 0 ? "Add to cart" : "Unavailable"}
                                </button>
                                <button className="view-btn">View</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}