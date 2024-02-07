import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./todoReducer";
import authReducer from "./authReducer";
import mcaReducer from "./mcaReducer";
import dashboardReducer from "./dashboardReducer";
import stockReducer from "./stockReducer";
import accountReducer from "./assetReducer";
import symbolReducer from "./symbolReducer";
import extraReducer from "./extraReducer";
import favoriteReducer from "./favoriteReducer";
import viewHistoryReducer from "./viewHistoryReducer";

const rootReducer = combineReducers({
  todo: todoReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  mca: mcaReducer,
  stock: stockReducer,
  asset: accountReducer,
  symbol: symbolReducer,
  extra: extraReducer,
  favorite: favoriteReducer,
  viewHistory: viewHistoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
