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
import Login from "./pages/Auth/Login";
import Registration from "./pages/Auth/Registration";
import { getLocalStorage} from "./utils/localStorage";
import { useDispatch } from "react-redux";
import { AuthService } from "./services/auth.service";
import type { IResponseUser } from "./types/Auth";
import { login, logout } from "./store/slices/userSlice";
import { useEffect } from "react";
import axios from "axios";

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
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  const dispatch = useDispatch();

    useEffect(() => {
        checkAuth();
    }, []);
    const checkAuth = async () => {
        const token = getLocalStorage('token', '');

        if (token) {
            try {
                const data: IResponseUser | undefined = await AuthService.getProfile()
                if (data) {
                    dispatch(login(data));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                let errorMessage = "Unknown error";

                if (axios.isAxiosError(error) && error.response) {
                    errorMessage = error.response.data.message || error.message;
                } else if (error instanceof Error) {
                    errorMessage = error.message;
                }
                console.log("Error message: ", errorMessage);
            }
        }
    }


  return <RouterProvider router={router} />;
}
