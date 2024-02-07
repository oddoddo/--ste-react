import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { TradeType } from "../../types";
import { useSelector } from "react-redux";
import { deleteTodo, StateTodos, Todo } from "../../store/reducers/todoReducer";
import { RT_CD_CODE, SVC_CD } from "../../types/InterfaceTypes";
import { useUserInfo } from "../../store/reducers/authReducer";
import { RootState } from "../../store/reducers";
import fetch_SDL11007 from "../../store/apis/sdl/SDL11007";
import { useAppDispatch } from "../../store/configureStore";
import fetch_SDL11002 from "../../store/apis/sdl/SDL11002";
import { DA_CCD_CODE, DA_CN_CLSF_CODE } from "../../types/CommonCodes";
import { getNowDate } from "../../utils";
import { TOAST_TYPE, useToastCallback } from "./ToastHelper";
import { useStockName } from "../../hooks/useStockName";
import fetch_SDL11008 from "../../store/apis/sdl/SDL11008";
import LoginVerificationModal from "../modals/LoginVerificationModal";
import { useAuthState } from "../../hooks/useAuth";

const CompleteTradeHelper: React.FC<{
  children: ReactNode;
}> = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [tradeType, setTradeType] = useState<TradeType>(TradeType.BUY);
  const stockName = useStockName();
  const todos = useSelector(StateTodos);
  const dispatch = useAppDispatch();
  const [currentTodo, setCurrentTodo] = useState<Todo | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [tradeMessage, setTradeMessage] = useState<string>("");
  const { account, accountNumberPassword } = useUserInfo();
  const code = useSelector((state: RootState) => state.stock.code);
  const { showToast } = useToastCallback();

  const getTradeReceiveMsg = useCallback(
    (type: TradeType) => {
      switch (type) {
        case TradeType.BUY:
          return t("BuyOrderReceived");
        case TradeType.SELL:
          return t("SellOrderReceived");
        case TradeType.CANCEL:
          return t("CancelOrderReceived");
        case TradeType.EDIT:
          return t("EditOrderReceived");
      }
    },
    [t]
  );

  const getTradeSuccessMsg = useCallback(
    (type: TradeType, volume: string, price?: string) => {
      switch (type) {
        case TradeType.BUY:
          return t("BuyTradeSuccess", {
            stockName,
            volume: parseInt(volume),
            price,
          });
        case TradeType.SELL:
          return t("SellTradeSuccess", {
            stockName,
            volume: parseInt(volume),
            price,
          });
        case TradeType.CANCEL:
          return t("CancelTradeSuccess", {
            stockName,
            volume: parseInt(volume),
            price,
          });
        case TradeType.EDIT:
          return t("EditTradeSuccess", {
            stockName,
            volume: parseInt(volume),
            price,
          });
      }
    },
    [t, stockName]
  );

  useEffect(() => {
    if (todos && todos.length > 0 && !isOpen) {
      for (const todo of todos) {
        if (todo.completed) {
          setCurrentTodo(todo);
          break;
        }
      }
    } else {
      setCurrentTodo(undefined);
    }
  }, [todos, isOpen]);

  useEffect(() => {
    if (!currentTodo) return;

    if (currentTodo.output.message.rt_cd === RT_CD_CODE.OK) {
      const volume = currentTodo.input.body.input.askprc_q;
      const price = currentTodo.input.body.input?.askprc_prc;
      if (currentTodo.input.header.svc_cd === SVC_CD.SDL00020) {
        showToast(
          TOAST_TYPE.TRADE_COMPLETE,
          getTradeSuccessMsg(TradeType.BUY, volume, price)
        );
      } else if (currentTodo.input.header.svc_cd === SVC_CD.SDL00010) {
        showToast(
          TOAST_TYPE.TRADE_COMPLETE,
          getTradeSuccessMsg(TradeType.SELL, volume, price)
        );
      } else if (currentTodo.input.header.svc_cd === SVC_CD.SDL00040) {
        showToast(
          TOAST_TYPE.TRADE_COMPLETE,
          getTradeSuccessMsg(TradeType.CANCEL, volume, price)
        );
      } else {
        showToast(
          TOAST_TYPE.TRADE_COMPLETE,
          getTradeSuccessMsg(TradeType.EDIT, volume, price)
        );
      }
    } else if (currentTodo.output.message.rt_cd === RT_CD_CODE.AP_ERROR) {
      const key = `error.${currentTodo.output.output.msg_cd}`;
      const msg = t(key);
      if (msg === key) {
        setErrorMessage(t("9999"));
      } else {
        setErrorMessage(msg);
      }
    } else {
      setErrorMessage(t("9999"));
    }

    if (account && accountNumberPassword && code) {
      if (currentTodo.input.header.svc_cd === SVC_CD.SDL00010) {
        dispatch(
          fetch_SDL11007({
            da_ac_no: account,
            da_ac_pwd: accountNumberPassword,
            da_symbl: code,
          })
        );
      } else if (currentTodo.input.header.svc_cd === SVC_CD.SDL00020) {
        dispatch(
          fetch_SDL11002({
            da_ac_no: account,
            da_ac_pwd: accountNumberPassword,
            da_symbl: code,
          })
        );
      } else if (currentTodo.input.header.svc_cd === SVC_CD.SDL00040) {
        dispatch(
          fetch_SDL11008({
            da_ccd: DA_CCD_CODE.NOT_TRADED,
            da_cn_clsf: DA_CN_CLSF_CODE.NONE,
            da_ac_no: account,
            da_ac_pwd: accountNumberPassword,
            da_ordr_no: "0000000001",
            da_ordr_dt: getNowDate(),
            da_symbl: code,
            da_grid_cnt: "18",
          })
        );
      }
    }
    dispatch(deleteTodo(currentTodo.id));
  }, [
    currentTodo,
    dispatch,
    onOpen,
    getTradeSuccessMsg,
    t,
    account,
    accountNumberPassword,
    code,
    showToast,
  ]);

  const loginModal = useDisclosure();
  const isLogin = useAuthState();
  const checkLogin = useCallback(() => {
    if (isLogin) {
      return false;
    } else {
      loginModal.onOpen();
      return true;
    }
  }, [loginModal, isLogin]);

  return (
    <LoginContext.Provider value={{ checkLogin }}>
      {children}
      <LoginVerificationModal disclosure={loginModal} />
    </LoginContext.Provider>
  );
};
export default CompleteTradeHelper;
export type LoginContextProps = {
  checkLogin: () => boolean;
};
const LoginContext = createContext<LoginContextProps>({} as LoginContextProps);
export const useAuthCheck = () => {
  const { checkLogin } = useContext(LoginContext);
  return useMemo(() => {
    return { checkLogin };
  }, [checkLogin]);
};
