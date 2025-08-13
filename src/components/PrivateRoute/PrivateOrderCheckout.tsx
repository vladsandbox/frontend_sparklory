import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store";

type Props = {
  children: React.ReactNode;
};

export default function PrivateOrderCheckout({ children }: Props) {
  const finalAmount = useSelector((state: RootState) => state.cart.finalAmount);

  return finalAmount > 0 ? children : <Navigate to="/cart" replace />;
}