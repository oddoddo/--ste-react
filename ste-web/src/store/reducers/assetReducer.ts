import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SDL11001_Output, SDL11003_Output } from "../../types/SDLTypes";
import fetch_SDL11003 from "../apis/sdl/SDL11003";
import fetch_SDL11001 from "../apis/sdl/SDL11001";

export interface AccountState {
  my_asset: SDL11001_Output | undefined;
  my_assets: SDL11003_Output | undefined;
}

const initialState: AccountState = {
  my_asset: {
    da_tl_tfnd: "0",
    da_tl_val_amt: "0",
    da_tl_val_pl: "0",
    da_tl_val_pl_r: "0",
  },
  my_assets: undefined,
};

export const assetReducer = createSlice({
  name: "asset",
  initialState,
  reducers: {
    removeMyAsset: (state) => {
      state.my_asset = undefined;
    },
    saveMyAsset: (state, action: PayloadAction<SDL11001_Output>) => {
      state.my_asset = { ...action.payload };
    },
    removeMyAssets: (state) => {
      state.my_assets = undefined;
    },
    saveMyAssets: (state, action: PayloadAction<SDL11003_Output>) => {
      state.my_assets = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetch_SDL11003.fulfilled, (state, action) => {
      state.my_assets = { ...action.payload };
    });
    builder.addCase(fetch_SDL11001.fulfilled, (state, action) => {
      state.my_asset = { ...action.payload };
    });
  },
});
export const { removeMyAsset, saveMyAsset, removeMyAssets, saveMyAssets } =
  assetReducer.actions;
export default assetReducer.reducer;
