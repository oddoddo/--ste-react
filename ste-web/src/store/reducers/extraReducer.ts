import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export type ExtraState = QuickState & {
  isWhiteMenuColor: boolean;
  prevCode: string | undefined;
};

export type QuickState = {
  isEnabledQuickBuy: boolean;
  isEnabledQuickSell: boolean;
};

const initialState: ExtraState = {
  isWhiteMenuColor: true,
  prevCode: undefined,
  isEnabledQuickBuy: true,
  isEnabledQuickSell: true,
};

export const extraSlice = createSlice({
  name: "extra",
  initialState,
  reducers: {
    changeMenuColor: (state, action: PayloadAction<boolean>) => {
      state.isWhiteMenuColor = action.payload;
    },
    setPrevCode: (state, action: PayloadAction<string>) => {
      state.prevCode = action.payload;
    },
    toggleQuickBuy: (state) => {
      state.isEnabledQuickBuy = !state.isEnabledQuickBuy;
    },
    toggleQuickSell: (state) => {
      state.isEnabledQuickSell = !state.isEnabledQuickSell;
    },
  },
});

export const { changeMenuColor, setPrevCode, toggleQuickBuy, toggleQuickSell } =
  extraSlice.actions;

export default extraSlice.reducer;

export const stateMenuColor = (state: RootState) =>
  state.extra.isWhiteMenuColor;

export const statePrevCode = (state: RootState) => state.extra.prevCode;
export const isQuickBuyState = (state: RootState) =>
  state.extra.isEnabledQuickBuy;
export const isQuickSellState = (state: RootState) =>
  state.extra.isEnabledQuickSell;
