import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import BestSellers from "./pages/BestSellers";
import Gifts from "./pages/Gifts";
import Community from "./pages/Community";
import Company from "./pages/Company";
import Product from "./pages/Product";
import WishList from "./pages/Wishlist";
import Catalog from "./pages/Catalog";

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
      { path: "catalog/:category", element: <Catalog /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
