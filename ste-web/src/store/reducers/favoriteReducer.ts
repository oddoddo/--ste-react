import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "./index";
import { useMemo } from "react";
import { fetch_favorite } from "../apis/users/API_Favorite";

export type FavoriteState = {
  favoriteList: string[];
  isWorking: boolean;
};

const initialState: FavoriteState = {
  favoriteList: [],
  isWorking: true,
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch_favorite.fulfilled, (state, action) => {
      state.favoriteList = action.payload?.data?.symbols ?? [];
      state.isWorking = true;
    });
    builder.addCase(fetch_favorite.rejected, (state, action) => {
      state.favoriteList = [];
      state.isWorking = false;
    });
  },
});

export default favoriteSlice.reducer;

export const useFavorite = (symbol: string | undefined): boolean => {
  const favoriteList = useSelector(
    (state: RootState) => state.favorite.favoriteList
  );

  return useMemo(() => {
    if (!symbol) return false;
    const isHave = favoriteList?.indexOf(symbol.trim()) ?? -1;
    return isHave !== -1;
  }, [symbol, favoriteList]);
};
