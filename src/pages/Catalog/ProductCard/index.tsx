import { useState } from "react";

import FavoriteButton from "@/components/FavoriteButton";
import DiscountLabel from "@/components/DiscountLabel";
import ActionLabel from "@/components/ActionLabel";
import ComparisonButton from "@/components/ComparisonButton";
import MaterialSelector from "@/components/MaterialSelector/MaterialSelector";
import { MATERIALS } from "@/components/MaterialSelector/materials.ts";
import type { Product, ProductVariant } from "@/types/Products";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import { useProductNavigation } from "@/utils/hooks/useProductNavigation";
import { noImg } from "@/assets";

import "./index.scss";

type Props = {
    product: Product;
    noHoverExpand?: boolean;
    alwaysClosed?: boolean;
};

export default function CatalogProductCard({ product, noHoverExpand = false, alwaysClosed = false }: Props) {
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

    const { goToProduct } = useProductNavigation()

    return (
        <div className={`product-card ${noHoverExpand ? "no-hover-expand" : ""} ${alwaysClosed ? "always-closed" : ""}`}>
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
                        {product.action && <ActionLabel action={product.action[0]} />}
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
                                <AddToCartButton productId={product._id} variant={currentVariant} />
                                <button onClick={() => goToProduct(product._id)} className="view-btn">View</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}