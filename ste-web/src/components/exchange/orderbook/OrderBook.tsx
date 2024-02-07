import React, { useEffect, useMemo } from "react";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import OrderBookItem, { BarProps } from "./OrderBookItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { TradeType } from "../../../types";
import {
  stateTotalBuyPriceRemaining,
  stateTotalSellPriceRemaining,
} from "../../../store/reducers/stockReducer";
import { useAppDispatch } from "../../../store/configureStore";
import fetch_SDT0002M from "../../../store/apis/sdt/SDT0002M";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const OrderBook: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const code = useSelector((state: RootState) => state.stock.code);
  const totalBuyAmount = useSelector(stateTotalBuyPriceRemaining);
  const totalSellAmount = useSelector(stateTotalSellPriceRemaining);

  const { sellBarWidth, buyBarWidth } = useMemo(() => {
    if (totalBuyAmount && !totalSellAmount)
      return { buyBarWidth: `100%`, sellBarWidth: `0%` };
    if (!totalBuyAmount && totalSellAmount)
      return { buyBarWidth: `0%`, sellBarWidth: `100%` };
    if (!totalBuyAmount && !totalSellAmount)
      return { buyBarWidth: `0%`, sellBarWidth: `0%` };

    const max = Math.max(totalSellAmount, totalBuyAmount);
    const min = Math.min(totalSellAmount, totalBuyAmount);
    const minPercent: number = (min / max) * 100;
    return {
      sellBarWidth: `${totalSellAmount === max ? "100" : minPercent}%`,
      buyBarWidth: `${totalBuyAmount === max ? "100" : minPercent}%`,
    };
  }, [totalBuyAmount, totalSellAmount]);

  const sp1: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellPrice_1
  );
  const sp2: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellPrice_2
  );
  const sp3: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellPrice_3
  );
  const sp4: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellPrice_4
  );
  const sp5: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellPrice_5
  );
  const sp6: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellPrice_6
  );
  const sp7: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellPrice_7
  );
  const sp8: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellPrice_8
  );
  const sp9: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellPrice_9
  );
  const sp10: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellPrice_10
  );
  const bp1: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyPrice_1
  );
  const bp2: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyPrice_2
  );
  const bp3: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyPrice_3
  );
  const bp4: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyPrice_4
  );
  const bp5: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyPrice_5
  );
  const bp6: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyPrice_6
  );
  const bp7: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyPrice_7
  );
  const bp8: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyPrice_8
  );
  const bp9: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyPrice_9
  );
  const bp10: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyPrice_10
  );
  const sv1: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellVolume_1
  );
  const sv2: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellVolume_2
  );
  const sv3: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellVolume_3
  );
  const sv4: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellVolume_4
  );
  const sv5: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellVolume_5
  );
  const sv6: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellVolume_6
  );
  const sv7: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellVolume_7
  );
  const sv8: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellVolume_8
  );
  const sv9: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellVolume_9
  );
  const sv10: number = useSelector(
    (state: RootState) => state.stock.orderBookData.sellVolume_10
  );
  const bv1: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyVolume_1
  );
  const bv2: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyVolume_2
  );
  const bv3: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyVolume_3
  );
  const bv4: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyVolume_4
  );
  const bv5: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyVolume_5
  );
  const bv6: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyVolume_6
  );
  const bv7: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyVolume_7
  );
  const bv8: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyVolume_8
  );
  const bv9: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyVolume_9
  );
  const bv10: number = useSelector(
    (state: RootState) => state.stock.orderBookData.buyVolume_10
  );

  useEffect(() => {
    if (!code) return;
    dispatch(fetch_SDT0002M({ in_da_shrt_cd: code }));
  }, [dispatch, code]);

  return (
    <Stack
      spacing={"0px"}
      divider={<Divider orientation="horizontal" color="Line_Gray_BT_DD" />}
    >
      <OrderTitleContainer>
        <Box width="35%">
          <Text variant="txt124" color={"#929292"}>
            {t("OrderSub.Price")}
          </Text>
        </Box>
        <Box width="65%" pr={"14px"}>
          <Text variant="txt124" color={"#929292"}>
            {t("OrderSub.Amount")}
          </Text>
        </Box>
      </OrderTitleContainer>
      <Box>
        <VStack bg="orderSellArea" p="2px 3px 0" gap="0.5px">
          <OrderBookItem price={sp10} volume={sv10} type={TradeType.SELL} />
          <OrderBookItem price={sp9} volume={sv9} type={TradeType.SELL} />
          <OrderBookItem price={sp8} volume={sv8} type={TradeType.SELL} />
          <OrderBookItem price={sp7} volume={sv7} type={TradeType.SELL} />
          <OrderBookItem price={sp6} volume={sv6} type={TradeType.SELL} />
          <OrderBookItem price={sp5} volume={sv5} type={TradeType.SELL} />
          <OrderBookItem price={sp4} volume={sv4} type={TradeType.SELL} />
          <OrderBookItem price={sp3} volume={sv3} type={TradeType.SELL} />
          <OrderBookItem price={sp2} volume={sv2} type={TradeType.SELL} />
          <OrderBookItem price={sp1} volume={sv1} type={TradeType.SELL} />
        </VStack>
        <VStack bg="orderBuyArea" p="0 3px 2px" gap="0.5px">
          <OrderBookItem price={bp1} volume={bv1} type={TradeType.BUY} />
          <OrderBookItem price={bp2} volume={bv2} type={TradeType.BUY} />
          <OrderBookItem price={bp3} volume={bv3} type={TradeType.BUY} />
          <OrderBookItem price={bp4} volume={bv4} type={TradeType.BUY} />
          <OrderBookItem price={bp5} volume={bv5} type={TradeType.BUY} />
          <OrderBookItem price={bp6} volume={bv6} type={TradeType.BUY} />
          <OrderBookItem price={bp7} volume={bv7} type={TradeType.BUY} />
          <OrderBookItem price={bp8} volume={bv8} type={TradeType.BUY} />
          <OrderBookItem price={bp9} volume={bv9} type={TradeType.BUY} />
          <OrderBookItem price={bp10} volume={bv10} type={TradeType.BUY} />
        </VStack>
      </Box>
      <OrderBottomContainer
        divider={<Divider orientation="vertical" color="Line_Gray_BT_DD" />}
        spacing={0}
      >
        <OrderBarL width="35%">
          <BarL width={sellBarWidth} bg="orderSellBar">
            <Text>{t("format.number", { value: totalSellAmount })}</Text>
          </BarL>
        </OrderBarL>
        <Box w="30%">
          <Text
            variant="txt124"
            textAlign="center"
            lineHeight={0.8}
            color="Typo_Sub_3A"
          >
            {t("OrderSub.TotalAmount")}
          </Text>
        </Box>
        <OrderBarR width="35%">
          <BarR width={buyBarWidth} bg="orderBuyBar">
            <Text>{t("format.number", { value: totalBuyAmount })}</Text>
          </BarR>
        </OrderBarR>
      </OrderBottomContainer>
    </Stack>
  );
};

const OrderBarR = styled(Flex)`
  flex-grow: 1;
  justify-content: flex-start;
  padding-right: 5px;
`;
const OrderBarL = styled(Flex)`
  flex-grow: 1;
  justify-content: flex-end;
  padding-left: 5px;
`;

const BarL = styled(Box)`
  position: relative;
  height: 20px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
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

const BarR = styled(Box)`
  position: relative;
  height: 20px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: right;
  white-space: nowrap;
  line-height: 33px;
  font-size: 12px;
  font-weight: 400;
  p {
    position: absolute;
    top: 50%;
    left: 0.875rem;
    transform: translateY(-50%);
  }
`;

const OrderTitleContainer = styled(Flex)`
  width: 100%;
  height: 32px;
  padding: 5px 12px 0;
  > div {
    margin: auto;
  }
  p {
    text-align: right;
  }
`;
const OrderBottomContainer = styled(HStack)`
  justify-content: space-evenly;
  align-items: center;
  height: 30px;
  background-color: ${({ theme: { colors } }) => colors.bg};
`;

export default OrderBook;
