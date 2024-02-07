import { UseDisclosureReturn } from "@chakra-ui/hooks";
import { DA_CCLS_CODE, TRD_DL_CCD_CODE } from "./CommonCodes";
import { SDL11006_Output_List } from "./SDLTypes";

export type WrapperProps = {
  children?: JSX.Element | JSX.Element[];
};

export type ModalProps = {
  disclosure: UseDisclosureReturn;
  confirm?: () => void;
};

export enum TradeType {
  BUY = "BUY",
  SELL = "SELL",
  CANCEL = "CANCEL",
  EDIT = "EDIT",
}
export type ConclusionProps = {
  date: string;
  time: string;
  tradeType: TRD_DL_CCD_CODE;
  price: number;
  volume: number;
};

export type NonConclusionProps = ConclusionProps & {
  onCancel: () => void;
  confirm?: () => void;
};

export type DetailListProps = {
  item: SDL11006_Output_List;
  key: number;
  onView: () => void;
};

// 거래소 - 실시간 체결 목록
export type ConclusionItem = {
  key: string;
  time: string;
  price: string;
  volume: string;
  rate: string;
  da_opn_prc: string;
  da_ccls_ccd: DA_CCLS_CODE;
};

export type ClickOrderBook = {
  value: string;
};

export type OrderBookItemData = {
  maxVolume: number;
  sellPrice_10: number;
  sellPrice_9: number;
  sellPrice_8: number;
  sellPrice_7: number;
  sellPrice_6: number;
  sellPrice_5: number;
  sellPrice_4: number;
  sellPrice_3: number;
  sellPrice_2: number;
  sellPrice_1: number;
  buyPrice_1: number;
  buyPrice_2: number;
  buyPrice_3: number;
  buyPrice_4: number;
  buyPrice_5: number;
  buyPrice_6: number;
  buyPrice_7: number;
  buyPrice_8: number;
  buyPrice_9: number;
  buyPrice_10: number;
  sellVolume_10: number;
  sellVolume_9: number;
  sellVolume_8: number;
  sellVolume_7: number;
  sellVolume_6: number;
  sellVolume_5: number;
  sellVolume_4: number;
  sellVolume_3: number;
  sellVolume_2: number;
  sellVolume_1: number;
  buyVolume_1: number;
  buyVolume_2: number;
  buyVolume_3: number;
  buyVolume_4: number;
  buyVolume_5: number;
  buyVolume_6: number;
  buyVolume_7: number;
  buyVolume_8: number;
  buyVolume_9: number;
  buyVolume_10: number;
};
