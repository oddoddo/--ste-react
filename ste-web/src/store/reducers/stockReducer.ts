import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SDMSKXS3_Output,
  SDRSKXH1_Output,
  SDT0001H_Output,
  SDT0001H_Output_List,
  SDT0001M_Output,
  SDT0001T_Output,
  SDT0001T_Output_List,
  SDT0002M_Output,
} from "../../types/SDTTypes";
import {
  SDL11002_Output,
  SDL11006_Output,
  SDL11006_Output_List,
  SDL11007_Output,
  SDL11008_Output,
} from "../../types/SDLTypes";
import { ClickOrderBook, ConclusionItem, OrderBookItemData } from "../../types";
import { OrderBookItemValue } from "../../components/exchange/orderbook/OrderBookItem";
import fetch_SDL11007 from "../apis/sdl/SDL11007";
import fetch_SDL11002 from "../apis/sdl/SDL11002";
import fetch_SDT0002M from "../apis/sdt/SDT0002M";
import fetch_SDT0001T from "../apis/sdt/SDT0001T";
import fetch_SDT0001M from "../apis/sdt/SDT0001M";
import fetch_SDL11008 from "../apis/sdl/SDL11008";
import fetch_SDL11006 from "../apis/sdl/SDL11006";
import fetch_SDT0001H from "../apis/sdt/SDT0001H";
import { RootState } from "./index";
import produce from "immer";

export interface StockState {
  code: string;
  tr_key: string | undefined;
  stock: SDT0001M_Output | undefined; //종목 조회값
  stockName: string; //종목 한글명
  stockEngName: string; //종목 영문명
  stockNowPrice: string; //종목 현재가
  stockPreviousDayPrice: string; //종목 전일종가
  bid_ask_price: SDT0002M_Output | undefined; //실시간 호가
  bid_ask_price_runtime: SDRSKXH1_Output | undefined;
  totalBuyPriceRemaining: number;
  totalSellPriceRemaining: number;
  clickPrice: ClickOrderBook;
  orderDetail: SDL11008_Output | undefined;
  transactionDetail: SDL11006_Output | undefined; //거래내역
  transactionDetailList: SDL11006_Output_List[]; //거래내역 리스트
  conclusion: SDT0001T_Output | undefined;
  conclusionList: ConclusionItem[];
  history_day: SDT0001H_Output | undefined;
  history_day_List: SDT0001H_Output_List[];
  history_day_loading: boolean;
  availableBalance: SDL11002_Output;
  availableForSell: SDL11007_Output;
  orderBookList: OrderBookItemValue[] | undefined;
  orderBookData: OrderBookItemData;
}

const initialState: StockState = {
  code: "",
  tr_key: undefined,
  stock: undefined,
  stockName: "",
  stockEngName: "",
  stockNowPrice: "0",
  stockPreviousDayPrice: "0",
  bid_ask_price: undefined,
  bid_ask_price_runtime: undefined,
  totalBuyPriceRemaining: 0,
  totalSellPriceRemaining: 0,
  clickPrice: { value: "0" },
  orderDetail: undefined,
  transactionDetail: undefined,
  transactionDetailList: [],
  conclusion: undefined,
  conclusionList: [],
  history_day: undefined,
  history_day_List: [],
  history_day_loading: false,
  availableBalance: {
    da_tfnd: "0", //예수금
    da_tl_hld_amt: "0", //총보유금액
    da_ordr_psbl_amt: "0", //주문가능금액
    da_o_amt_psbl_amt: "0", //출금가능금액
  },
  availableForSell: {
    da_tl_hld_blnc: "0", //총보유잔고
    da_ordr_psbl_blnc: "0", //주문가능잔고
    da_o_amt_psbl_blnc: "0", //출금가능잔고
  },
  orderBookList: undefined,
  orderBookData: {
    maxVolume: 0,
    sellPrice_10: 0,
    sellPrice_9: 0,
    sellPrice_8: 0,
    sellPrice_7: 0,
    sellPrice_6: 0,
    sellPrice_5: 0,
    sellPrice_4: 0,
    sellPrice_3: 0,
    sellPrice_2: 0,
    sellPrice_1: 0,
    buyPrice_1: 0,
    buyPrice_2: 0,
    buyPrice_3: 0,
    buyPrice_4: 0,
    buyPrice_5: 0,
    buyPrice_6: 0,
    buyPrice_7: 0,
    buyPrice_8: 0,
    buyPrice_9: 0,
    buyPrice_10: 0,
    sellVolume_10: 0,
    sellVolume_9: 0,
    sellVolume_8: 0,
    sellVolume_7: 0,
    sellVolume_6: 0,
    sellVolume_5: 0,
    sellVolume_4: 0,
    sellVolume_3: 0,
    sellVolume_2: 0,
    sellVolume_1: 0,
    buyVolume_1: 0,
    buyVolume_2: 0,
    buyVolume_3: 0,
    buyVolume_4: 0,
    buyVolume_5: 0,
    buyVolume_6: 0,
    buyVolume_7: 0,
    buyVolume_8: 0,
    buyVolume_9: 0,
    buyVolume_10: 0,
  },
};

export const stockReducer = createSlice({
  name: "stock",
  initialState,
  reducers: {
    clearStock: (state) => {
      return initialState;
    },
    saveCode: (state, action: PayloadAction<string>) => {
      return produce(state, (draftState) => {
        if (draftState.code !== action.payload) {
          draftState.code = action.payload;
          draftState.tr_key = action.payload.substring(1);
        }
      });
    },
    removeStock: (state) => {
      state.code = "";
    },
    removeTransactionDetail: (state) => {
      state.transactionDetail = undefined;
      state.transactionDetailList = [];
    },
    removeHistoryDay: (state) => {
      state.history_day = undefined;
      state.history_day_List = [];
    },
    saveStock: (state, action: PayloadAction<SDT0001M_Output>) => {
      if (state.stock) {
        for (const key in state.stock) {
          if (Object.prototype.hasOwnProperty.call(action.payload, key)) {
            if (state.stock[key] !== action.payload[key])
              state.stock[key] = action.payload[key];
          }
        }
      } else {
        state.stock = { ...action.payload };
      }

      if (state.stockName !== action.payload?.da_hngl_is_nm)
        state.stockName = action.payload.da_hngl_is_nm;
      if (state.stockEngName !== action.payload?.da_eng_is_nm)
        state.stockEngName = action.payload.da_eng_is_nm;
      if (state.stockNowPrice !== action.payload?.da_now_prc)
        state.stockNowPrice = action.payload.da_now_prc;
      if (state.stockPreviousDayPrice !== action.payload?.da_bdy_cls_prc)
        state.stockPreviousDayPrice = action.payload.da_bdy_cls_prc;
    },
    saveBidAskPriceRt: (state, action: PayloadAction<SDRSKXH1_Output>) => {
      state.bid_ask_price_runtime = action.payload;
      const p = action.payload;
      let findMax: number = 0;
      for (let i = 1; i <= 10; i++) {
        const priceSell = parseInt(p[`S_ASKPRC${i}` as keyof SDRSKXH1_Output]);
        const volumeSell = parseInt(
          p[`S_ASKPRC_RV${i}` as keyof SDRSKXH1_Output]
        );
        const priceBuy = parseInt(p[`B_ASKPRC${i}` as keyof SDRSKXH1_Output]);
        const volumeBuy = parseInt(
          p[`B_ASKPRC_RV${i}` as keyof SDRSKXH1_Output]
        );
        if (
          state.orderBookData[`sellPrice_${i}` as keyof OrderBookItemData] !==
          priceSell
        )
          state.orderBookData[`sellPrice_${i}` as keyof OrderBookItemData] =
            priceSell;
        if (
          state.orderBookData[`buyPrice_${i}` as keyof OrderBookItemData] !==
          priceBuy
        )
          state.orderBookData[`buyPrice_${i}` as keyof OrderBookItemData] =
            priceBuy;
        if (
          state.orderBookData[`sellVolume_${i}` as keyof OrderBookItemData] !==
          volumeSell
        )
          state.orderBookData[`sellVolume_${i}` as keyof OrderBookItemData] =
            volumeSell;
        if (
          state.orderBookData[`buyVolume_${i}` as keyof OrderBookItemData] !==
          volumeBuy
        )
          state.orderBookData[`buyVolume_${i}` as keyof OrderBookItemData] =
            volumeBuy;

        findMax = Math.max(volumeBuy, volumeSell, findMax);
      }
      if (state.orderBookData.maxVolume !== findMax)
        state.orderBookData.maxVolume = findMax;
      if (
        state.totalBuyPriceRemaining !== parseInt(action.payload.B_ASKPRC_TL_Q)
      )
        state.totalBuyPriceRemaining = parseInt(action.payload.B_ASKPRC_TL_Q);
      if (
        state.totalSellPriceRemaining !== parseInt(action.payload.S_ASKPRC_TL_Q)
      )
        state.totalSellPriceRemaining = parseInt(action.payload.S_ASKPRC_TL_Q);
    },
    setClickPrice: (state, action: PayloadAction<ClickOrderBook>) => {
      state.clickPrice = { ...action.payload };
    },
    saveOrderDetail: (state, action: PayloadAction<SDL11008_Output>) => {
      state.orderDetail = { ...action.payload };
    },
    saveTransactionDetail: (state, action: PayloadAction<SDL11006_Output>) => {
      state.transactionDetail = { ...action.payload };
      state.transactionDetailList.push(...action.payload.array);
    },
    saveConclusion: (state, action: PayloadAction<SDT0001T_Output>) => {
      state.conclusion = { ...action.payload };
      state.conclusionList =
        action.payload.Array_List?.map((i: SDT0001T_Output_List) => {
          return {
            time: i.da_fnl_ccls_tm,
            price: i.da_ccls_prc,
            volume: i.da_ccls_vlm,
            rate: i.da_bdy_cmpr_r,
            da_opn_prc: i.da_opn_prc,
            da_ccls_ccd: i.da_ccls_ccd,
            key: i.da_fnl_ccls_tm + i.da_same_tm_sq,
          };
        }) ?? [];
    },
    addConclusion: (state, action: PayloadAction<SDMSKXS3_Output>) => {
      // 체결내역 그리드 체결 데이터 추가
      if (state.conclusionList.length > 200) state.conclusionList.pop();
      state.conclusionList.unshift({
        time: action.payload.CCLS_TM,
        price: action.payload.NOW_PRC_P2,
        volume: action.payload.CCLS_Q,
        rate: action.payload.UP_DWN_R_P2,
        da_opn_prc: action.payload.OPN_PRC,
        da_ccls_ccd: action.payload.CCLS_CLSF,
        key: action.payload.CCLS_TM + action.payload.SAME_TM_SQ,
      });

      // 현재가 정보 갱신
      if (state.stockNowPrice !== action.payload?.NOW_PRC_P2 && state.stock) {
        state.stock.da_now_prc = action.payload.NOW_PRC_P2;
        state.stockNowPrice = action.payload.NOW_PRC_P2;
      }

      if (state.stock && state.stock.da_opn_prc !== action.payload?.OPN_PRC)
        state.stock.da_opn_prc = action.payload.OPN_PRC;

      if (
        state.stock &&
        state.stock.da_bdy_cmpr_smbl !== action.payload?.BDY_CMPR_CCD
      ) {
        state.stock.da_bdy_cmpr_smbl = action.payload.BDY_CMPR_CCD;
      }
      if (
        state.stock &&
        state.stock.da_bdy_cmpr !== action.payload?.BDY_CMPR_P2
      ) {
        state.stock.da_bdy_cmpr = action.payload.BDY_CMPR_P2;
      }
      if (
        state.stock &&
        state.stock.da_bdy_cmpr_r !== action.payload?.UP_DWN_R_P2
      ) {
        state.stock.da_bdy_cmpr_r = action.payload.UP_DWN_R_P2;
      }

      if (state.stock && state.stock.da_acml_vlm !== action.payload?.ACML_VLM) {
        state.stock.da_acml_vlm = action.payload.ACML_VLM;
      }
      if (
        state.stock &&
        state.stock.da_acml_dl_amt !== action.payload?.ACML_DL_TW_AMT
      ) {
        state.stock.da_acml_dl_amt = action.payload.ACML_DL_TW_AMT;
      }

      if (state.stock && state.stock.da_hgh_prc !== action.payload?.HGH_PRC) {
        state.stock.da_hgh_prc = action.payload.HGH_PRC;
      }
      if (state.stock && state.stock.da_lw_prc !== action.payload?.LW_PRC) {
        state.stock.da_lw_prc = action.payload.LW_PRC;
      }
    },
    removeConclusion: (state) => {
      state.conclusionList = [];
    },
    saveHistory_Day: (state, action: PayloadAction<SDT0001H_Output>) => {
      state.history_day = { ...action.payload };
      state.history_day_List = { ...action.payload.Array_List };
    },
    saveOrderBookList: (state, action: PayloadAction<OrderBookItemValue[]>) => {
      state.orderBookList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetch_SDL11002.fulfilled, (state, action) => {
      state.availableBalance = { ...action.payload };
    });
    builder.addCase(fetch_SDT0002M.fulfilled, (state, action) => {
      state.bid_ask_price = action.payload;
      const p = action.payload;
      let findMax: number = 0;
      for (let i = 1; i <= 10; i++) {
        const priceSell = parseInt(
          p[`da_s${i}_askprc` as keyof SDT0002M_Output]
        );
        const volumeSell = parseInt(
          p[`da_s${i}_askprc_rv` as keyof SDT0002M_Output]
        );
        const priceBuy = parseInt(
          p[`da_b${i}_askprc` as keyof SDT0002M_Output]
        );
        const volumeBuy = parseInt(
          p[`da_b${i}_askprc_rv` as keyof SDT0002M_Output]
        );
        if (
          state.orderBookData[`sellPrice_${i}` as keyof OrderBookItemData] !==
          priceSell
        ) {
          state.orderBookData[`sellPrice_${i}` as keyof OrderBookItemData] =
            priceSell;
        }
        if (
          state.orderBookData[`buyPrice_${i}` as keyof OrderBookItemData] !==
          priceBuy
        ) {
          state.orderBookData[`buyPrice_${i}` as keyof OrderBookItemData] =
            priceBuy;
        }
        if (
          state.orderBookData[`sellVolume_${i}` as keyof OrderBookItemData] !==
          volumeSell
        ) {
          state.orderBookData[`sellVolume_${i}` as keyof OrderBookItemData] =
            volumeSell;
        }
        if (
          state.orderBookData[`buyVolume_${i}` as keyof OrderBookItemData] !==
          volumeBuy
        ) {
          state.orderBookData[`buyVolume_${i}` as keyof OrderBookItemData] =
            volumeBuy;
        }
        findMax = Math.max(volumeBuy, volumeSell, findMax);
      }

      if (state.orderBookData.maxVolume !== findMax)
        state.orderBookData.maxVolume = findMax;
      if (
        state.totalBuyPriceRemaining !==
        parseInt(action.payload.da_tl_b_askprc_rv)
      )
        state.totalBuyPriceRemaining = parseInt(
          action.payload.da_tl_b_askprc_rv
        );
      if (
        state.totalSellPriceRemaining !==
        parseInt(action.payload.da_tl_s_askprc_rv)
      )
        state.totalSellPriceRemaining = parseInt(
          action.payload.da_tl_s_askprc_rv
        );
    });
    builder.addCase(fetch_SDL11007.fulfilled, (state, action) => {
      state.availableForSell = { ...action.payload };
    });
    builder.addCase(fetch_SDL11007.rejected, (state, action) => {
      state.availableForSell = {
        da_tl_hld_blnc: "0", //총보유잔고
        da_ordr_psbl_blnc: "0", //주문가능잔고
        da_o_amt_psbl_blnc: "0", //출금가능잔고
      };
    });
    builder.addCase(fetch_SDT0001M.fulfilled, (state, action) => {
      if (state.stock) {
        for (const key in state.stock) {
          if (Object.prototype.hasOwnProperty.call(action.payload, key)) {
            if (state.stock[key] !== action.payload[key])
              state.stock[key] = action.payload[key];
          }
        }
      } else {
        state.stock = { ...action.payload };
      }

      if (state.stockName !== action.payload?.da_hngl_is_nm)
        state.stockName = action.payload.da_hngl_is_nm;
      if (state.stockEngName !== action.payload?.da_eng_is_nm)
        state.stockEngName = action.payload.da_eng_is_nm;
      if (state.stockNowPrice !== action.payload?.da_now_prc)
        state.stockNowPrice = action.payload.da_now_prc;
      if (state.stockPreviousDayPrice !== action.payload?.da_bdy_cls_prc)
        state.stockPreviousDayPrice = action.payload.da_bdy_cls_prc;
    });
    builder.addCase(fetch_SDT0001T.fulfilled, (state, action) => {
      state.conclusion = { ...action.payload };
      state.conclusionList =
        action.payload?.Array_List?.map((i: SDT0001T_Output_List) => {
          return {
            time: i.da_fnl_ccls_tm,
            price: i.da_ccls_prc,
            volume: i.da_ccls_vlm,
            rate: i.da_bdy_cmpr_r,
            da_opn_prc: i.da_opn_prc,
            da_ccls_ccd: i.da_ccls_ccd,
            key: i.da_fnl_ccls_tm + i.da_same_tm_sq,
          };
        }) ?? [];
    });
    builder.addCase(fetch_SDT0001T.rejected, (state, action) => {
      state.conclusionList = [];
    });
    builder.addCase(fetch_SDL11008.fulfilled, (state, action) => {
      state.orderDetail = { ...action.payload };
    });
    builder.addCase(fetch_SDL11006.fulfilled, (state, action) => {
      state.transactionDetail = { ...action.payload };
      if (action.payload?.array) {
        state.transactionDetailList.push(...action.payload.array);
      }
    });
    builder.addCase(fetch_SDT0001H.fulfilled, (state, action) => {
      state.history_day_loading = false;
      state.history_day = { ...action.payload };
      if (action.payload?.Array_List) {
        state.history_day_List.push(...action.payload.Array_List);
      }
    });
    builder.addCase(fetch_SDT0001H.pending, (state) => {
      state.history_day_loading = true;
    });
    builder.addCase(fetch_SDT0001H.rejected, (state) => {
      state.history_day_loading = false;
    });
    builder.addCase(clearStockData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {
  clearStock,
  saveStock,
  removeStock,
  saveCode,
  saveBidAskPriceRt,
  setClickPrice,
  saveOrderDetail,
  saveTransactionDetail,
  saveConclusion,
  saveHistory_Day,
  addConclusion,
  removeConclusion,
  removeTransactionDetail,
  removeHistoryDay,
  saveOrderBookList,
} = stockReducer.actions;

export default stockReducer.reducer;

export const stateStockCode = (state: RootState) => state.stock.code;
export const stateStockName = (state: RootState) => state.stock.stockName;
export const stateStockEngName = (state: RootState) => state.stock.stockEngName;

export const stateStockNowPrice = (state: RootState) =>
  parseInt(state.stock.stockNowPrice);
export const stateStockPreviousDayPrice = (state: RootState) =>
  parseInt(state.stock.stockPreviousDayPrice);

export const stateTotalBuyPriceRemaining = (state: RootState) =>
  state.stock.totalBuyPriceRemaining;
export const stateTotalSellPriceRemaining = (state: RootState) =>
  state.stock.totalSellPriceRemaining;

export const clearStockData = createAsyncThunk("stock/clear", async () => {
  return initialState;
});
