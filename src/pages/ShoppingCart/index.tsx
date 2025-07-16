import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CatalogSearchBar from "@/components/CatalogSearchBar";
import CartList from "./CartList/CartList";
import { fetchCartProducts, updateCartQuantity, removeCartItem } from "@/store/thunks/cartThunk";
import { useAuth } from "@/utils/hooks/useAuth";
import type { RootState, AppDispatch } from "@/store";
import type { CartItem as CartItemType } from "@/types/Cart";

export default function ShopCart() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useAuth();
  const cart = useSelector((state: RootState) => state.cart.items);
  const loading = useSelector((state: RootState) => state.cart.loading);

  useEffect(() => {
    dispatch(fetchCartProducts({ guest: !isAuth }));
  }, [dispatch, isAuth]);

  function handleRemove(item: CartItemType) {
    dispatch(removeCartItem({
      productId: item.product,
      size: item.size,
      material: item.material,
      insert: item.insert,
      guest: !isAuth,
    }));
  }

  function handleQuantityChange(productId: string, quantity: number) {
    dispatch(updateCartQuantity({ productId, quantity, guest: !isAuth }));
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <CatalogSearchBar />
      <div className="wrapper" style={{ paddingBottom: 120 }}>
        <h1 className="h1" style={{ marginBottom: 60 }}>Shopping Cart</h1>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : cart.length === 0 ? (
          <div>
            <p className="body" style={{ color: "rgba(104, 104, 104, 1)", marginBottom: 38 }}>
              There’s nothing in your shopping cart. Go to shop and add some products you’d like to buy
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
          <>
            <CartList
              products={cart}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
            <div style={{ marginTop: 40, textAlign: "right" }}>
              <h2>Total: {total.toFixed(2)}₴</h2>
              <button
                className="primary-btn big button-text"
                style={{ marginTop: 20 }}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
