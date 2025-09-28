import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Layout from "./components/Layout";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/thunks/userThunk.ts";
import type { AppDispatch } from "./store";

import Home from "./pages/Home";
import BestSellers from "./pages/BestSellers";
import Gifts from "./pages/Gifts";
import Community from "./pages/Community";
import Company from "./pages/Company";
import Product from "./pages/Product";
import WishList from "./pages/Wishlist";
import Catalog from "./pages/Catalog";
import Login from "./pages/Auth/Login";
import Registration from "./pages/Auth/Registration";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import Profile from "@/pages/Profile";
import ShopCart from "./pages/ShoppingCart/index.tsx";
import OAuthCallback from "./pages/Auth/OAuth/OAuthCallback.tsx";
import OrderCheckout from "./pages/OrderCheckout/index.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.tsx";
import PrivateOrderCheckout from "./components/PrivateRoute/PrivateOrderCheckout.tsx";
import OrderConfirmation from "./pages/OrderCheckout/OrderConfirmation/index.tsx";
import ContactInformation from "./pages/Profile/ContactInformation/index.tsx";
import AccountSecurity from "./pages/Profile/AccountSecurity/index.tsx";
import OrdersHistory from "./pages/Profile/OrdersHistory/index.tsx";
import OrderDetails from "./pages/Profile/OrdersHistory/OrderDetails/index.tsx";
import LayoutWithSearchBar from "@/components/Layout/LayoutWithSearchBar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Something went wrong!</div>,
    children: [
      { index: true, element: <Home /> },
      { path: "best-sellers", element: <BestSellers /> },
      { path: "gifts", element: <Gifts /> },
      { path: "community", element: <Community /> },
      { path: "company", element: <Company /> },
      { path: "login", element: <Login /> },
      { path: "registration", element: <Registration /> },
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "oauth-callback", element: <OAuthCallback /> },
      {
        path: "order-confirm", element: (
          <OrderConfirmation />
        )
      },

      /* Layout with the search bar routes */
      {
        element: <LayoutWithSearchBar />,
        children: [
          { path: "catalog/:category?", element: <Catalog /> },
          { path: "product/:id", element: <Product /> },
          { path: "wishlist", element: <WishList /> },

          /* Profile routes */
          {
            path: "profile",
            element: (
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
            ),
            children: [
              { index: true, element: <Navigate to="contact" replace /> },
              { path: "contact", element: <ContactInformation /> },
              { path: "security", element: <AccountSecurity /> },
              {
                path: "orders",
                children: [
                  { index: true, element: <OrdersHistory /> },
                  { path: ":id", element: <OrderDetails /> },
                ],
              },
            ]
          },

          { path: "cart", element: <ShopCart /> },
          {
            path: "order-checkout", element: (
                <PrivateOrderCheckout>
                  <OrderCheckout />
                </PrivateOrderCheckout>
            )
          },

        ]
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
