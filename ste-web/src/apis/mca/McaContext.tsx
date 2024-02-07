import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { createWrapper } from "./LogicalWrapperFactory";
import {
  IMcaContextValue,
  SocketStatus,
  SubscribeInputItem,
} from "../../types/SocketTypes";
import {
  RQRS_CD_CODE,
  RUNTIME_TR_ID,
  TransferData,
  TransferHeader,
  TransferResponseSocketData,
} from "../../types/InterfaceTypes";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../../store/reducers/todoReducer";
import { getGUID } from "../../utils";
import { useMCAAuth } from "../../store/reducers/authReducer";
import {
  connect as connectDispatch,
  deleteRuntimeState,
  disconnect as disconnectDispatch,
  saveRuntimeState,
} from "../../store/reducers/mcaReducer";
import { RootState } from "../../store/reducers";
import {
  addConclusion,
  saveBidAskPriceRt,
} from "../../store/reducers/stockReducer";
import { SDMSKXS3_Output, SDRSKXH1_Output } from "../../types/SDTTypes";
import { useToastCallback } from "../../components/alert/ToastHelper";
import { SDAN8882_Output } from "../../types/SDLTypes";
import { PRGRS_ST_CCD_CODE, TRD_DL_CCD_CODE } from "../../types/CommonCodes";
import i18n from "../../i18n";
import { WrapperProps } from "../../types";

const McaContext = createContext<IMcaContextValue>({} as IMcaContextValue);

export const createLogicalWrapper = (
  consumer: (ctx: IMcaContextValue) => boolean
) => createWrapper(McaContext, consumer);

export function useMcaContext() {
  return useContext(McaContext);
}

export default function McaContextProvider({ children }: WrapperProps) {
  const socket = useRef<WebSocket | null>(null);

  const dispatch = useDispatch();
  const MCAAuthToken = useMCAAuth();
  const { showBuyToast, showSellToast, showErrorToast } = useToastCallback();
  const { mcaToken } = useMemo(() => {
    if (MCAAuthToken) {
      return { mcaToken: MCAAuthToken.token };
    }
    return {};
  }, [MCAAuthToken]);

  const connectionStatus = useSelector(
    (state: RootState) => state.mca.connectionStatus
  );

  const { trKey: myExecutionAccount } = useSelector(
    (state: RootState) => state.mca.runtimeMyExecution
  );

  const account = useSelector(
    (state: RootState) => state.auth.userInfo?.account
  );

  const onOpenHandler = useCallback(
    (e: Event) => {
      // console.log("Socket Open Handler : ", e);
      dispatch(connectDispatch({ token: mcaToken, timestamp: e.timeStamp }));
    },
    [dispatch, mcaToken]
  );

  const onCloseHandler = useCallback(() => {
    // console.log("Socket Close Handler : ", e);
    dispatch(disconnectDispatch());
  }, [dispatch]);

  const onMessage = useCallback(
    (ev: MessageEvent<any>) => {
      const data: TransferResponseSocketData = JSON.parse(ev.data);
      if (!data?.header) return;

      if (data.header.rqrs_cd === RQRS_CD_CODE.RESPONSE) {
        dispatch(
          updateTodo({
            id: data.header.guid,
            output: data.body,
            completed: true,
          })
        );
      } else if (data.header.rqrs_cd === RQRS_CD_CODE.PUSH) {
        if (data.header.tr_id === RUNTIME_TR_ID.ORDER_BOOK) {
          //실시간 호가
          dispatch(saveBidAskPriceRt(data.body.output as SDRSKXH1_Output));
        } else if (data.header.tr_id === RUNTIME_TR_ID.STOCK_EXECUTION) {
          //실시간 체결
          dispatch(addConclusion(data.body.output as SDMSKXS3_Output));
        } else if (data.header.tr_id === RUNTIME_TR_ID.MY_EXECUTION) {
          //나의 체결통보
          const output: SDAN8882_Output = data.body.output as SDAN8882_Output;
          if (output.prgrs_st_ccd === PRGRS_ST_CCD_CODE.CORRECTION_3) {
            if (output.trd_dl_ccd === TRD_DL_CCD_CODE.BUY) {
              showBuyToast(
                i18n.language === "en" ? output.is_eng_nm : output.is_nm,
                output.ccls_q,
                output.ccls_prc
              );
            } else {
              showSellToast(
                i18n.language === "en" ? output.is_eng_nm : output.is_nm,
                output.ccls_q,
                output.ccls_prc
              );
            }
          } else if (output.prgrs_st_ccd === PRGRS_ST_CCD_CODE.CORRECTION_2) {
            if (output?.filler !== "정상") {
              showErrorToast(
                i18n.language === "en" ? output.is_eng_nm : output.is_nm,
                output?.filler
              );
            }
          }
        }
      }
    },
    [dispatch, showBuyToast, showSellToast, showErrorToast]
  );

  const sendMessage = <T extends TransferData>(args: T) => {
    if (!socket?.current) return;
    if (socket.current?.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(args));
    }
  };

  const socketClose = useCallback(() => {
    if (socket.current) {
      socket.current.close();
      socket.current.removeEventListener("open", onOpenHandler);
      socket.current.removeEventListener("message", onMessage);
      socket.current.removeEventListener("close", onCloseHandler);

      dispatch(disconnectDispatch());
    }
  }, [dispatch, socket, onOpenHandler, onMessage, onCloseHandler]);

  const connect = useCallback(
    (mcaToken: string | undefined) => {
      if (socket?.current?.readyState === WebSocket.OPEN) {
        socketClose();
      }
      const uri = mcaToken
        ? `${process.env.REACT_APP_MCA_SERVER_WS}?token=${mcaToken}`
        : process.env.REACT_APP_MCA_SERVER_WS || "";
      const ws = new WebSocket(uri);

      ws.addEventListener("open", onOpenHandler);
      ws.addEventListener("message", onMessage);
      ws.addEventListener("close", onCloseHandler);
      ws.addEventListener("onreadystatechange", (e: any) => {
        console.log("onreadystatechange", e);
      });
      socket.current = ws;
    },
    [onOpenHandler, onMessage, onCloseHandler, socketClose]
  );

  const onRequest = (svc_cd: string, input: any) => {
    const guid: string = getGUID();
    const header: TransferHeader = {
      rqrs_cd: RQRS_CD_CODE.REQUEST,
      svc_cd,
      guid,
      pub_ip: "127.0.0.1",
      pri_ip: "127.0.0.1",
      mac_addr: "ab:cd:ef:gh:ij",
      conn_media_cd: "cmeul",
    };
    const data: TransferData = {
      header,
      body: { input },
    };
    dispatch(
      addTodo({
        id: guid,
        input: data,
        completed: false,
      })
    );
    sendMessage(data);
  };

  const onSubscribe = useCallback(
    (input: SubscribeInputItem[]) => {
      if (!input || input.length === 0) return;

      // console.log("Subscribe : ", input[0].tr_id);
      const guid: string = getGUID();
      const header: TransferHeader = {
        rqrs_cd: RQRS_CD_CODE.SUBSCRIBE,
        svc_cd: "SUBSCRIBE",
        guid,
        pub_ip: "127.0.0.1",
        pri_ip: "127.0.0.1",
        mac_addr: "ab:cd:ef:gh:ij",
        conn_media_cd: "cmeul",
      };
      const data: TransferData = {
        header,
        body: { input },
      };
      sendMessage(data);

      dispatch(
        saveRuntimeState({
          subscribeTrId: input[0].tr_id,
          trKey: input[0].tr_key,
        })
      );
    },
    [dispatch]
  );

  const onUnSubscribe = useCallback(
    (input: SubscribeInputItem[]) => {
      if (!input || input.length === 0) return;
      // console.log("UnSubscribe : ", input[0].tr_id);
      const guid: string = getGUID();
      const header: TransferHeader = {
        rqrs_cd: RQRS_CD_CODE.UNSUBSCRIBE,
        svc_cd: "UNSUBSCRIBE",
        guid,
        pub_ip: "127.0.0.1",
        pri_ip: "127.0.0.1",
        mac_addr: "ab:cd:ef:gh:ij",
        conn_media_cd: "cmeul",
      };
      const data: TransferData = {
        header,
        body: { input },
      };
      dispatch(
        deleteRuntimeState({
          subscribeTrId: input[0].tr_id,
          trKey: input[0].tr_key,
        })
      );
      sendMessage(data);
    },
    [dispatch]
  );

  useEffect(() => {
    if (connectionStatus !== SocketStatus.CONNECT) {
      connect(mcaToken);
    }
  }, [mcaToken, connect, dispatch, connectionStatus]);

  useEffect(() => {
    return () => {
      if (socket.current) {
        socketClose();
      }
    };
  }, [dispatch, socketClose]);

  useEffect(() => {
    if (connectionStatus === SocketStatus.CONNECT) {
      if (account) {
        if (account === myExecutionAccount) return;
        if (myExecutionAccount) {
          onUnSubscribe([
            { tr_id: RUNTIME_TR_ID.MY_EXECUTION, tr_key: myExecutionAccount },
          ]);
        }
        onSubscribe([{ tr_id: RUNTIME_TR_ID.MY_EXECUTION, tr_key: account }]);
      } else {
        if (myExecutionAccount)
          onUnSubscribe([
            { tr_id: RUNTIME_TR_ID.MY_EXECUTION, tr_key: myExecutionAccount },
          ]);
      }
    }
  }, [
    connectionStatus,
    account,
    onSubscribe,
    onUnSubscribe,
    myExecutionAccount,
  ]);

  return (
    <McaContext.Provider
      value={{
        ws: socket.current,
        connect,
        close: socketClose,
        onRequest,
        onSubscribe,
        onUnSubscribe,
      }}
    >
      {children}
    </McaContext.Provider>
  );
}
