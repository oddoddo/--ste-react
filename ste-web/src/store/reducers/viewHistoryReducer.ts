import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export type StockInfo = {
  code: string;
  name_kr: string;
  name_en: string;
};

export type ViewHistoryState = {
  historyList: StockInfo[];
};

const initialState: ViewHistoryState = {
  historyList: [],
};

export const viewHistoryReducer = createSlice({
  name: "viewHistory",
  initialState,
  reducers: {
    saveViewHistory: (state, action: PayloadAction<StockInfo>) => {
      const existingIndex = state.historyList.findIndex(
        (item) => item.code === action.payload.code
      );
      if (existingIndex > -1) state.historyList.splice(existingIndex, 1);
      state.historyList.unshift({ ...action.payload });
      if (state.historyList.length > 10) state.historyList.pop();
    },
    removeViewHistory: (state, action: PayloadAction<string>) => {
      state.historyList = state.historyList.filter(
        (i: StockInfo) => i.code !== action.payload
      );
    },
  },
});
export const { saveViewHistory, removeViewHistory } =
  viewHistoryReducer.actions;
export default viewHistoryReducer.reducer;

export const useViewHistoryList = (code: string) => {
  const list = useSelector((state: RootState) => state.viewHistory.historyList);
  return useMemo(() => {
    return list.filter((item) => item.code !== code);
  }, [code, list]);
};
