import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { OrderBookItemData } from "../types";
import { stateStockNowPrice } from "../store/reducers/stockReducer";

const emptyList = { quickOrderList: [], totalBalance: 0 };
/**
 * 퀵주문 매수 목록 생성
 * @param isQuick 작동여부
 * @param quantity 주문갯수
 */
export function useQuickOrderBuyList(
  isQuick: boolean,
  quantity: string
): { quickOrderList: OrderBookQuickItemData[]; totalBalance: number } {
  /**
   * 주문갯수 number
   */
  const quantityCount = useMemo(() => parseInt(quantity), [quantity]);
  // /**
  //  * 주문가능보유금액
  //  */
  // const da_ordr_psbl_amt = useSelector((state: RootState) =>
  //   parseFloat(state.stock.availableBalance.da_ordr_psbl_amt)
  // );
  /**
   * 현재 호가 목록
   */
  const orderBookData = useSelector(
    (state: RootState) => state.stock.orderBookData
  );

  /**
   * 실시간 금액
   */
  const stockNowPrice = useSelector(stateStockNowPrice);

  const converterList = useCallback((o: OrderBookItemData) => {
    const l: OrderBookQuickItemData[] = [];
    for (let i = 1; i <= 10; i++) {
      const priceSell = o[`sellPrice_${i}` as keyof OrderBookItemData];
      const volumeSell = o[`sellVolume_${i}` as keyof OrderBookItemData];
      if (priceSell > 0) {
        l.push({ price: priceSell, volume: volumeSell });
      }
    }
    return l;
  }, []);

  return useMemo(() => {
    if (!isQuick) return emptyList;
    if (!quantityCount || !(quantityCount > 0)) return emptyList;
    if (!orderBookData) return emptyList;

    let extractedQuantity = 0;
    const orderBooks = converterList(orderBookData);
    const list: OrderBookQuickItemData[] = [];

    if (orderBooks.length > 0) {
      for (const item of orderBooks) {
        const itemVolume = item.volume;
        if (extractedQuantity + itemVolume <= quantityCount) {
          list.push({ volume: item.volume, price: item.price });
          extractedQuantity += itemVolume;
          if (extractedQuantity === quantityCount) break;
        } else {
          const remainingQuantity = quantityCount - extractedQuantity;
          list.push({
            volume: remainingQuantity,
            price: item.price,
          });
          extractedQuantity = quantityCount;
          break;
        }
      }

      if (extractedQuantity < quantityCount) {
        // 호가창 물량 다 담은 후 주문수량이 남을 경우 가장 큰 가격을 가진 호가에 남은 주문량 추가
        const remainingQuantity = quantityCount - extractedQuantity;
        const last = list[list.length - 1];
        last.volume = last.volume + remainingQuantity;
      }
    } else {
      if (stockNowPrice > 0) {
        list.push({
          volume: quantityCount,
          price: stockNowPrice,
        });
      }
    }

    const totalBalance: number = list.reduce(
      (accumulator: number, i: OrderBookQuickItemData) => {
        const rowValue: number = i.volume * i.price;
        return accumulator + rowValue;
      },
      0
    );

    return { quickOrderList: list, totalBalance };
  }, [orderBookData, quantityCount, isQuick, converterList, stockNowPrice]);
}

export type OrderBookQuickItemData = {
  volume: number;
  price: number;
};

/**
 * 퀵주문 매도 목록 생성
 * @param isQuick
 * @param quantity
 */
export function useQuickOrderSellList(
  isQuick: boolean,
  quantity: string
): { quickOrderList: OrderBookQuickItemData[]; totalBalance: number } {
  /**
    주문 수량
   */
  const quantityCount = useMemo(() => parseInt(quantity), [quantity]);
  // /**
  //  * 매도 가능 보유 주식 수량
  //  */
  // const da_tl_hld_blnc = useSelector((state: RootState) =>
  //   parseFloat(state.stock.availableForSell.da_tl_hld_blnc)
  // );
  /**
   * 실시간 금액
   */
  const stockNowPrice = useSelector(stateStockNowPrice);
  /**
   * 현재 호가 목록
   */
  const orderBookData = useSelector(
    (state: RootState) => state.stock.orderBookData
  );

  const converterList = useCallback((o: OrderBookItemData) => {
    const l: OrderBookQuickItemData[] = [];
    for (let i = 1; i <= 10; i++) {
      const priceSell = o[`buyPrice_${i}` as keyof OrderBookItemData];
      const volumeSell = o[`buyVolume_${i}` as keyof OrderBookItemData];
      if (priceSell > 0) {
        l.push({ price: priceSell, volume: volumeSell });
      }
    }
    return l;
  }, []);

  return useMemo(() => {
    if (!isQuick) return emptyList;
    if (!quantityCount || !(quantityCount > 0)) return emptyList;

    const orderBooks = converterList(orderBookData);
    let extractedQuantity = 0;
    const list: OrderBookQuickItemData[] = [];

    if (orderBooks.length > 0) {
      for (const item of orderBooks) {
        const itemVolume = item.volume;
        if (extractedQuantity + itemVolume <= quantityCount) {
          list.push({ volume: item.volume, price: item.price });
          extractedQuantity += itemVolume;
          if (extractedQuantity === quantityCount) break;
        } else {
          const remainingQuantity = quantityCount - extractedQuantity;
          list.push({ volume: remainingQuantity, price: item.price });
          extractedQuantity = quantityCount;
          break;
        }
      }

      if (extractedQuantity < quantityCount) {
        // 호가창 물량 다 담은 후 주문수량이 남을 경우 가장 큰 가격을 가진 호가에 남은 주문량 추가
        const remainingQuantity = quantityCount - extractedQuantity;
        const last = list[list.length - 1];
        last.volume = last.volume + remainingQuantity;
      }
    } else {
      if (stockNowPrice > 0) {
        list.push({
          volume: quantityCount,
          price: stockNowPrice,
        });
      }
    }

    const totalBalance: number = list.reduce(
      (accumulator: number, i: OrderBookQuickItemData) => {
        const rowValue: number = i.volume * i.price;
        return accumulator + rowValue;
      },
      0
    );

    return { quickOrderList: list, totalBalance };
  }, [orderBookData, quantityCount, isQuick, converterList, stockNowPrice]);
}
