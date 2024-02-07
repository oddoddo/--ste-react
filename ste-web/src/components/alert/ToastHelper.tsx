import { useCallback, useMemo } from "react";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export enum TOAST_TYPE {
  BUY = "buy",
  SELL = "sell",
  TRADE_COMPLETE = "complete",
  ERROR = "error",
}

export function useToastCallback() {
  const toast = useToast();
  const { t } = useTranslation();

  const showRuntimeToast = useCallback(
    (type: TOAST_TYPE, stockName: string, volume: string, price?: string) => {
      const message =
        type === TOAST_TYPE.BUY
          ? t("BuyExecution", { volume, stockName, price })
          : t("SellExecution", { volume, stockName, price });

      toast({
        position: "bottom-left",
        isClosable: true,
        title: message,
        variant: type,
        status: "success",
        containerStyle: {
          maxWidth: "10px",
        },
      });
    },
    [toast, t]
  );

  const showToast = useCallback(
    (type: TOAST_TYPE = TOAST_TYPE.TRADE_COMPLETE, msg: string) => {
      toast({
        position: "bottom-left",
        isClosable: true,
        title: msg,
        variant: type,
        status: "success",
        containerStyle: {
          maxWidth: "10px",
        },
      });
    },
    [toast]
  );

  return useMemo(() => {
    return {
      showBuyToast: (stockName: string, volume: string, price?: string) => {
        showRuntimeToast(TOAST_TYPE.BUY, stockName, volume, price);
      },
      showSellToast: (stockName: string, volume: string, price?: string) => {
        showRuntimeToast(TOAST_TYPE.SELL, stockName, volume, price);
      },
      showErrorToast: (stockName: string, message: string) => {
        showToast(TOAST_TYPE.ERROR, `${stockName} ${message}`);
      },
      showToast: (toastType: TOAST_TYPE, message: string) => {
        showToast(toastType, message);
      },
    };
  }, [showToast, showRuntimeToast]);
}
