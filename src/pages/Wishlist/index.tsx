import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { fetchProductById } from "@/utils/api";
import { useAuth } from "@/utils/hooks/useAuth";
import CatalogSearchBar from "@/components/CatalogSearchBar";
import WishlistList from "./WishlistList/WishlistList";
import type { Product } from "@/types/Products";
import type { RootState, AppDispatch } from "../../store";
import { deleteWishlistProduct } from "@/store/thunks/wishlistThunk";

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useAuth();

  const selectWishlistIds = useSelector((state: RootState) => state.wishlist.ids);

  useEffect(() => {
    let productIds: string[] = [];

    if (isAuth) {
      productIds = Array.isArray(selectWishlistIds) ? selectWishlistIds : [];
    } else {
      productIds = getLocalStorage<string[]>("wishlist", []);
    }

    if (productIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all(productIds.map(fetchProductById))
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuth, selectWishlistIds]);

  function handleRemove(id: string) {
    setProducts((prev) => prev.filter((p) => p._id !== id));

    if (isAuth) {
      dispatch(deleteWishlistProduct(id))
        .unwrap()
        .catch(() => {
          toast.error("Failed to remove from wishlist");
        });
    } else {
      const stored = getLocalStorage<string[]>("wishlist", []);
      const updated = stored.filter((pid) => pid !== id);
      setLocalStorage("wishlist", updated);
    }
  }

  return (
    <>
      <CatalogSearchBar />
      <div className="wrapper" style={{ paddingBottom: 120 }}>
        <h1 className="h1" style={{ marginBottom: 60 }}>Wishlist</h1>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : products.length === 0 ? (
          <div>
            <p className="body" style={{ color: "rgba(104, 104, 104, 1)", marginBottom: 38 }}>
              Unfortunately, there’s nothing in your wishlist. Go back to shop to add some product you’d like to buy.
            </p>
            <button
              className="primary-btn big button-text"
              style={{ width: 424 }}
              onClick={() => navigate("/catalog")}
            >
              Go to Shop
            </button>
          </div>
        ) : (
          <WishlistList products={products} onRemove={handleRemove} />
        )}
      </div>
    </>
  );
}
