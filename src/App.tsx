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
import Profile from "@/pages/Profile";

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
      { path: "product/:id", element: <Product /> },
      { path: "wishlist", element: <WishList /> },
      { path: "catalog", element: <Catalog /> },
      { path: "login", element: <Login /> },
      { path: "registration", element: <Registration /> },
      { path: "profile", element: <Profile /> },
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
