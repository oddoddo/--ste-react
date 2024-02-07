import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { SDT0003M_Output, SDT0003M_Output_List } from "../../types/SDTTypes";
import fetch_SDT0003M from "../apis/sdt/SDT0003M";

export type SymbolState = {
  symbols: SDT0003M_Output | undefined; // 종목
  symbolList: SDT0003M_Output_List[]; // 종목 리스트
  symbolListLoading: boolean;
};

const initialState: SymbolState = {
  symbols: undefined,
  symbolList: [],
  symbolListLoading: false,
};

export const symbolSlice = createSlice({
  name: "symbols",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<SymbolState>) => {
    builder.addCase(fetch_SDT0003M.fulfilled, (state, action) => {
      state.symbolListLoading = false;
      state.symbols = { ...action.payload };
      state.symbolList = action.payload?.Array_List
        ? removeYValue(action.payload?.Array_List)
        : [];
    });
    builder.addCase(fetch_SDT0003M.pending, (state) => {
      state.symbolListLoading = true;
    });
    builder.addCase(fetch_SDT0003M.rejected, (state) => {
      state.symbolListLoading = false;
    });
  },
});

export default symbolSlice.reducer;

export const stateSymbols = (state: RootState) => state.symbol.symbols;
export const stateSymbolList = (state: RootState) => state.symbol.symbolList;
export const stateSymbolLoading = (state: RootState) =>
  state.symbol.symbolListLoading;

const removeYValue = (arr: SDT0003M_Output_List[]): SDT0003M_Output_List[] => {
  return arr.filter((obj) => obj.da_dl_spsn_f !== "Y");
};
