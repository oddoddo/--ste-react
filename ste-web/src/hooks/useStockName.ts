import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  stateStockEngName,
  stateStockName,
} from "../store/reducers/stockReducer";
import { useMemo } from "react";

export const useStockName = () => {
  const { i18n } = useTranslation();
  const stockName = useSelector(stateStockName);
  const stockEngName = useSelector(stateStockEngName);

  return useMemo(() => {
    if (i18n.language === "ko") {
      return stockName;
    } else {
      return stockEngName;
    }
  }, [i18n?.language, stockName, stockEngName]);
};
