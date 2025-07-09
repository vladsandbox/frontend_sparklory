import type { Product } from "@/types/Products";
import { noImg } from "@/assets";

import FavoriteButton from "@/components/FavoriteButton";
import DiscountLabel from "@/components/DiscountLabel";
import ActionLabel from "@/components/ActionLabel";
import ComparisonButton from "@/components/ComparisonButton";

import "./index.scss";

type Props = {
    product: Product;
};

export default function CatalogProductCard({ product }: Props) {
    return (
        <div className="product-card">
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
                        onError={e => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = noImg;
                            e.currentTarget.classList.add('is-fallback');
                        }}
                    />
                ) : (
                    <img src={noImg} alt="No photo" className="is-fallback"/>
                )}
            </div>
            <div className="information">
                <p className="name">{product.name}</p>
                <p className="price">{product.price}$</p>
            </div>
        </div>
    );
}