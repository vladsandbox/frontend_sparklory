import { useNavigate } from "react-router-dom";

export function useProductNavigation() {
  const navigate = useNavigate();

  function goToProduct(id: string) {
    navigate(`/product/${encodeURIComponent(id)}`);
  }

  return { goToProduct };
}
