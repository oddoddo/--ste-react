import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { TradeType } from "../../../types";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  setClickPrice,
  stateStockNowPrice,
  stateStockPreviousDayPrice,
} from "../../../store/reducers/stockReducer";
import { RootState } from "../../../store/reducers";

export interface OrderBookItemValue {
  type: TradeType;
  price: number;
  volume: number;
}

export type BarProps = {
  width: string;
};

const OrderBookItem: React.FC<OrderBookItemValue> = ({
  type,
  price,
  volume,
}: OrderBookItemValue) => {
  const { t } = useTranslation();
  const [isActive, setActive] = useState<boolean>(false);
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const stockPreviousDayPrice = useSelector(stateStockPreviousDayPrice);
  const stockNowPrice = useSelector(stateStockNowPrice);
  const [percent, setPercent] = useState(0);
  const [priceColor, setPriceColor] = useState<string>("NORMAL");
  const dispatch = useDispatch();

  const maxVolume = useSelector(
    (state: RootState) => state.stock.orderBookData.maxVolume
  );

  useEffect(() => {
    if (!price) {
      setEmpty(true);
    } else {
      setEmpty(false);
      if (!stockPreviousDayPrice) {
        setActive(false);
        setPercent(0);
        setPriceColor("NORMAL");
      } else {
        //호가 색상 설정
        if (price === stockPreviousDayPrice) {
          setPriceColor("NORMAL");
        } else if (stockPreviousDayPrice > price) {
          setPriceColor("SELL");
        } else if (stockPreviousDayPrice < price) {
          setPriceColor("BUY");
        }
        //전일가 대비 퍼센트 계산
        setPercent(
          ((price - stockPreviousDayPrice) / stockPreviousDayPrice) * 100
        );
        //실시간 호가 네모칸 계산
        if (stockNowPrice === price) {
          setActive(true);
        } else {
          setActive(false);
        }
      }
    }
  }, [stockPreviousDayPrice, stockNowPrice, price]);

  const barWidth: string = useMemo((): string => {
    if (!volume || !maxVolume) return "0%";
    const barPercent: number = (volume / maxVolume) * 100;
    return barPercent + "%";
  }, [volume, maxVolume]);

  const onClickHandler = useCallback(() => {
    if (!price) return;
    dispatch(setClickPrice({ value: price.toString() }));
  }, [dispatch, price]);

  return (
    <React.Fragment>
      {isEmpty ? (
        <Box h={37}></Box>
      ) : (
        <OrderRow
          onClick={onClickHandler}
          spacing={3}
          className={isActive ? "active" : ""}
        >
          <OrderNum spacing={0}>
            <ItemNum color={priceColor}>
              {price && t("format.number", { value: price })}
            </ItemNum>
            <PerNum color={priceColor}>
              {percent === -100
                ? "0 %"
                : t("format.number", {
                    value: percent,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }) + " %"}
            </PerNum>
          </OrderNum>
          <OrderBar>
            <Bar
              width={barWidth}
              bg={type === TradeType.BUY ? "orderBuyBar" : "orderSellBar"}
            >
              <Text>{price && t("format.number", { value: volume })}</Text>
            </Bar>
          </OrderBar>
        </OrderRow>
      )}
    </React.Fragment>
  );
};

const OrderRow = styled(HStack)`
  position: relative;
  padding: 2px;
  cursor: pointer;
  width: 100%;
  &.active::before {
    content: "";
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -4px;
    right: -2px;
    border-radius: 6px;
    border: 2px solid ${({ theme: { colors } }) => colors.P_DARK};
  }
`;

const OrderNum = styled(Stack)`
  position: relative;
  width: 35%;
  height: 33px;
  justify-content: center;
  text-align: right;
`;

const OrderBar = styled(Flex)`
  flex-grow: 1;
  justify-content: flex-end;
`;

const Bar = styled(Box)<BarProps>`
  position: relative;
  width: ${(props) => props.width};
  height: 33px;
  border-radius: 4px;
  color: ${({ theme: { colors } }) => colors.Typo_Sub_3A};
  text-align: right;
  white-space: nowrap;
  line-height: 33px;
  font-size: 12px;
  font-weight: 400;
  p {
    position: absolute;
    top: 50%;
    right: 0.875rem;
    transform: translateY(-50%);
  }
`;

const PerNum = styled(Text)`
  position: relative;
  text-align: right;
  font-size: 10px;
  font-weight: 400;
`;

const ItemNum = styled(Text)`
  position: relative;
  text-align: right;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
`;

export default React.memo(OrderBookItem);
