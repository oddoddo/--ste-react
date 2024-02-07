import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMcaData, SocketAuth, SocketStatus } from "../../types/SocketTypes";
import { RUNTIME_TR_ID } from "../../types/InterfaceTypes";

export type McaState = IMcaData & {
  runtimeOrderBook: SubScribeInfo;
  runtimeStockExecution: SubScribeInfo;
  runtimeMyExecution: SubScribeInfo;
};

export type SubScribeInfo = {
  currentTrKey?: string;
  trKey?: string;
  subscribeTrId?: RUNTIME_TR_ID;
};

const initialMcaState: McaState = {
  connectionStatus: SocketStatus.DISCONNECT,
  connectionTimestamp: 0,
  mcaToken: undefined,
  authStatus: SocketAuth.LOGOUT,
  runtimeOrderBook: {
    subscribeTrId: RUNTIME_TR_ID.ORDER_BOOK,
    currentTrKey: undefined,
    trKey: undefined,
  },
  runtimeStockExecution: {
    subscribeTrId: RUNTIME_TR_ID.STOCK_EXECUTION,
    currentTrKey: undefined,
    trKey: undefined,
  },
  runtimeMyExecution: {
    subscribeTrId: RUNTIME_TR_ID.MY_EXECUTION,
    currentTrKey: undefined,
    trKey: undefined,
  },
};

export interface McaToken {
  token: string | undefined;
  timestamp: number;
}

export const mcaSlice = createSlice({
  name: "mca",
  initialState: initialMcaState,
  reducers: {
    connect: (state, action: PayloadAction<McaToken>) => {
      state.connectionStatus = SocketStatus.CONNECT;
      state.mcaToken = action.payload.token;
      state.authStatus = action.payload.token
        ? SocketAuth.LOGIN
        : SocketAuth.LOGOUT;
    },
    disconnect: (state) => {
      state.connectionStatus = SocketStatus.DISCONNECT;
      state.mcaToken = undefined;
      state.authStatus = SocketAuth.LOGOUT;
      state.runtimeOrderBook = {
        subscribeTrId: RUNTIME_TR_ID.ORDER_BOOK,
        currentTrKey: undefined,
        trKey: undefined,
      };
      state.runtimeStockExecution = {
        subscribeTrId: RUNTIME_TR_ID.STOCK_EXECUTION,
        currentTrKey: undefined,
        trKey: undefined,
      };
      state.runtimeMyExecution = {
        subscribeTrId: RUNTIME_TR_ID.MY_EXECUTION,
        currentTrKey: undefined,
        trKey: undefined,
      };
    },
    saveRuntimeState: (state, action: PayloadAction<SubScribeInfo>) => {
      if (action.payload.subscribeTrId === RUNTIME_TR_ID.ORDER_BOOK) {
        state.runtimeOrderBook = { ...action.payload };
      } else if (
        action.payload.subscribeTrId === RUNTIME_TR_ID.STOCK_EXECUTION
      ) {
        state.runtimeStockExecution = { ...action.payload };
      } else if (action.payload.subscribeTrId === RUNTIME_TR_ID.MY_EXECUTION) {
        state.runtimeMyExecution = { ...action.payload };
      }
    },
    deleteRuntimeState: (state, action: PayloadAction<SubScribeInfo>) => {
      if (action.payload.subscribeTrId === RUNTIME_TR_ID.ORDER_BOOK) {
        state.runtimeOrderBook = {
          subscribeTrId: RUNTIME_TR_ID.ORDER_BOOK,
          currentTrKey: undefined,
          trKey: undefined,
        };
      } else if (
        action.payload.subscribeTrId === RUNTIME_TR_ID.STOCK_EXECUTION
      ) {
        state.runtimeStockExecution = {
          subscribeTrId: RUNTIME_TR_ID.STOCK_EXECUTION,
          currentTrKey: undefined,
          trKey: undefined,
        };
      } else if (action.payload.subscribeTrId === RUNTIME_TR_ID.MY_EXECUTION) {
        state.runtimeMyExecution = {
          subscribeTrId: RUNTIME_TR_ID.MY_EXECUTION,
          currentTrKey: undefined,
          trKey: undefined,
        };
      }
    },
  },
});
export const { connect, disconnect, saveRuntimeState, deleteRuntimeState } =
  mcaSlice.actions;

export default mcaSlice.reducer;
