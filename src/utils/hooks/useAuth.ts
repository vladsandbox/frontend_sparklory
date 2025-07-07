import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export const useAuth = (): boolean  => {
    return useSelector((state: RootState) => state.user.isAuth);
}