import { useSelector } from "react-redux";
import {
  stateSymbolList,
  stateSymbolLoading,
} from "../store/reducers/symbolReducer";
import { useCallback, useEffect, useState } from "react";
import { SDT0003M_Output_List } from "../types/SDTTypes";
import fetch_SDT0003M from "../store/apis/sdt/SDT0003M";
import { useAppDispatch } from "../store/configureStore";

export const useSymbolFilter = (query: string) => {
  const dispatch = useAppDispatch();
  const symbolList = useSelector(stateSymbolList);
  const [resultList, setResultList] =
    useState<SDT0003M_Output_List[]>(symbolList);
  const symbolListLoading = useSelector(stateSymbolLoading);

  const getSymbolList = useCallback(() => {
    dispatch(
      fetch_SDT0003M({
        in_da_hngl_is_nm: "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (symbolListLoading) return;
    if (symbolList.length === 0) {
      getSymbolList();
    }
    if (!query) return;
  }, [getSymbolList, symbolList, query, symbolListLoading]);

  useEffect(() => {
    if (!query) {
      setResultList(symbolList);
    } else {
      const f = symbolList.filter(
        (item) =>
          item.da_hngl_is_nm.includes(query) ||
          item.da_eng_is_nm.includes(query) ||
          item.da_symbl.includes(query)
      );
      setResultList(f);
    }
  }, [symbolList, query]);

  return resultList;
};
