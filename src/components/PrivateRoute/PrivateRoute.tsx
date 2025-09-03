import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store";

type Props = {
    children: React.ReactNode;
};

export default function PrivateRoute({ children }: Props) {
    const { isAuth, loading } = useSelector((state: RootState) => state.user);

    if (loading) return null;

    return isAuth ? children : <Navigate to="/login" replace />;
}
