import { useJWT } from "../store/reducers/authReducer";
import { useMemo } from "react";

export const useAuthState = () => {
  const jwt = useJWT();

  return useMemo(() => {
    return !!jwt?.token;
  }, [jwt]);
};
