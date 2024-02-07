import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { useSelector } from "react-redux";
import fetch_signin from "../apis/users/API_SignIn";
import { RES_CD } from "../../types/InterfaceTypes";
import fetch_my from "../apis/users/API_My";

export const TOKEN_NAME = "authToken";

const emptyUserInfo = {
  id: "",
  name: "",
  account: "",
  accountNumberPassword: "0000",
};

export type UserToken = {
  token: string;
  issuedAt?: number;
  expirationTime?: number;
  refresh?: string;
};

export type AuthState = {
  jwt: UserToken | undefined;
  mca: UserToken | undefined;
  status: "idle" | "loading" | "failed";
  userInfo: UserInfo;
  isSignInFetching: boolean;
};

export type UserInfo = {
  id: string | undefined;
  name: string | undefined;
  account: string | undefined;
  accountNumberPassword: string | undefined;
};

const initialState: AuthState = {
  jwt: undefined,
  mca: undefined,
  status: "idle",
  userInfo: emptyUserInfo,
  isSignInFetching: false,
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveJWT: (state, action: PayloadAction<string>) => {
      //TODO : payload 에 따라 jwt/mca 분리 저장
      state.jwt = { token: action.payload };
      localStorage.setItem(TOKEN_NAME, action.payload);
    },
    removeJWT: (state) => {
      localStorage.removeItem(TOKEN_NAME);
      return initialState;
    },
    saveMCA: (state, action: PayloadAction<UserToken>) => {
      state.mca = { ...action.payload };
    },
    removeMCA: (state) => {
      state.mca = undefined;
    },
    saveUserInfo: (
      state,
      action: PayloadAction<{ account: string; accountNumberPassword: string }>
    ) => {
      state.userInfo = Object.assign({}, state.userInfo, action.payload);
    },
    logout: (state) => {
      localStorage.removeItem(TOKEN_NAME);
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetch_signin.fulfilled, (state, action) => {
      state.isSignInFetching = false;
      if (action.payload.code === RES_CD.R0000) {
        state.jwt = { token: action.payload.data };
        localStorage.setItem(TOKEN_NAME, action.payload.data);
      }
    });
    builder.addCase(fetch_signin.pending, (state, action) => {
      state.isSignInFetching = true;
    });
    builder.addCase(fetch_signin.rejected, (state, action) => {
      state.isSignInFetching = false;
    });
    builder.addCase(fetch_my.fulfilled, (state, action) => {
      state.userInfo.id = action.payload.data.id;
      state.userInfo.name = action.payload.data.name;
      state.userInfo.account = action.payload.data.acctNo;
    });
    builder.addCase(fetch_my.rejected, (state, action) => {
      // My 데이터 조회 에러
    });
  },
});
export const { saveJWT, removeJWT, saveMCA, removeMCA, saveUserInfo, logout } =
  authReducer.actions;
export default authReducer.reducer;

export const getJWTAuth = (state: RootState): UserToken | undefined => {
  return state?.auth?.jwt ?? undefined;
};

export const useJWT = () => {
  return useSelector((state: RootState) => state.auth.jwt);
};

export const useMCAAuth = () => {
  return useSelector((state: RootState) => state.auth.mca);
};

export const useUserInfo = () => {
  return useSelector((state: RootState) => state.auth.userInfo);
};

export const stateSignInFetching = (state: RootState) =>
  state.auth.isSignInFetching;
