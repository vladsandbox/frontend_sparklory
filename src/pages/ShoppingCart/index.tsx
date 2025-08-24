import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CatalogSearchBar from "@/components/CatalogSearchBar";
import CartList from "./CartList/CartList";
import { fetchCartProducts, updateCartQuantity, removeCartItem } from "@/store/thunks/cartThunk";
import { useAuth } from "@/utils/hooks/useAuth";
import type { RootState, AppDispatch } from "@/store";
import type { CartItem as CartItemType } from "@/types/Cart";
import CartTotals from "./CartTotals/CartTotals";

export default function ShopCart() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isAuth = useAuth();
  const { items: cart, finalAmount, firstAmount, totalDiscount, loading, appliedCoupon } = useSelector((state: RootState) => state.cart);


  useEffect(() => {
    dispatch(fetchCartProducts({ guest: !isAuth }));
  }, [dispatch, isAuth]);

  const handleRemove = (item: CartItemType) => {
    dispatch(removeCartItem({
      productId: item.product,
      size: item.size,
      material: item.material,
      insert: item.insert,
      guest: !isAuth,
    }));
  };

  const handleQuantityChange = (
    productId: string,
    quantity: number,
    size: string,
    material: string,
    insert: string | null
  ) => {
    dispatch(updateCartQuantity({
      productId,
      quantity,
      size,
      material,
      insert: insert ?? "",
      guest: !isAuth,
    }));
  };

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
            <CartTotals finalAmount={finalAmount} discount={totalDiscount} firstAmount={firstAmount} appliedCoupon={appliedCoupon} />
          </>
        )}
      </div>
    </>
  );
}

