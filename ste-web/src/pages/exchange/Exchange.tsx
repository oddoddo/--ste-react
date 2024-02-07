import React, { useCallback, useEffect } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import CurrentStock from "../../components/exchange/info/CurrentStock";
import Chart from "../../components/exchange/chart/Chart";
import OrderBook from "../../components/exchange/orderbook/OrderBook";
import Trading from "../../components/exchange/trade/Trading";
import TradingHistory from "../../components/exchange/history/TradingHistory";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useMcaContext } from "../../apis/mca/McaContext";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { RUNTIME_TR_ID } from "../../types/InterfaceTypes";
import { SocketStatus } from "../../types/SocketTypes";
import CompleteTradeHelper from "../../components/alert/CompleteTradeHelper";
import { useAppDispatch } from "../../store/configureStore";
import { clearStock } from "../../store/reducers/stockReducer";
import ViewHistory from "../../components/exchange/utils/ViewHistory";
import { fetch_favorite } from "../../store/apis/users/API_Favorite";

export type GridWrapProps = {
  padding?: string;
};
const Exchange: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { onSubscribe, onUnSubscribe } = useMcaContext();
  const tr_key = useSelector((state: RootState) => state.stock.tr_key);

  const connectionStatus = useSelector(
    (state: RootState) => state.mca.connectionStatus
  );
  const { trKey: runtimeOrderBookTrKey } = useSelector(
    (state: RootState) => state.mca.runtimeOrderBook
  );
  const { trKey: runtimeExecutionTrKey } = useSelector(
    (state: RootState) => state.mca.runtimeStockExecution
  );

  useEffect(() => {
    dispatch(fetch_favorite());
    return () => {
      unSubscribe();
      dispatch(clearStock());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subscribe = useCallback(() => {
    if (!onSubscribe) return;
    onSubscribe([{ tr_id: RUNTIME_TR_ID.STOCK_EXECUTION, tr_key: tr_key }]);
    onSubscribe([{ tr_id: RUNTIME_TR_ID.ORDER_BOOK, tr_key: tr_key }]);
  }, [tr_key, onSubscribe]);

  const unSubscribe = useCallback(() => {
    if (!onUnSubscribe) return;
    onUnSubscribe([
      { tr_id: RUNTIME_TR_ID.STOCK_EXECUTION, tr_key: runtimeOrderBookTrKey },
    ]);
    onUnSubscribe([
      { tr_id: RUNTIME_TR_ID.ORDER_BOOK, tr_key: runtimeExecutionTrKey },
    ]);
  }, [onUnSubscribe, runtimeExecutionTrKey, runtimeOrderBookTrKey]);

  useEffect(() => {
    if (connectionStatus === SocketStatus.CONNECT) {
      if (!tr_key && runtimeOrderBookTrKey) {
        unSubscribe();
        return;
      }

      if (tr_key && tr_key !== "" && !runtimeOrderBookTrKey) {
        subscribe();
        return;
      }

      if (!runtimeOrderBookTrKey) return;
      if (tr_key !== runtimeOrderBookTrKey) {
        unSubscribe();
        subscribe();
      }
    }
  }, [tr_key, runtimeOrderBookTrKey, unSubscribe, subscribe, connectionStatus]);

  return (
    <CompleteTradeHelper>
      <GridOuter>
        <GridWrap
          padding={pathname === "/hts/exchange" ? "0" : "36px 0"}
          templateAreas={`"header header header"
                  "chart askingprice buysell"
                  "transaction  askingprice buysell"`}
          gridTemplateRows={"70px 432px 379px"}
          gridTemplateColumns={"844px 1fr 1fr"}
          gap="2"
        >
          <GridItem area="header" as="header">
            <CurrentStock />
          </GridItem>
          <GridItem area="chart">
            <Chart />
          </GridItem>
          <GridItem area="transaction">
            <TradingHistory />
          </GridItem>
          <GridItem area="askingprice">
            <OrderBook />
          </GridItem>
          <GridItem area="buysell" height={818}>
            <Trading />
          </GridItem>
        </GridWrap>
      </GridOuter>
      <ViewHistory />
    </CompleteTradeHelper>
  );
};
export default Exchange;

const GridOuter = styled(Box)`
  position: relative;
  z-index: 1;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: block;
    height: 270px;
    background: ${({ theme: { colors } }) => colors.primary};
  }
`;

const GridWrap = styled(Grid)<GridWrapProps>`
  position: relative;
  //min-height: 1170px;
  max-width: 1400px;
  height: auto;
  margin: 0 auto;
  padding: ${(props) => props.padding};
  > div {
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid ${({ theme: { colors } }) => colors.Line_Gray_EE};
    background: ${({ theme: { colors } }) => colors.white};
    box-shadow: 6px 6px 20px 0 rgba(0, 0, 0, 0.03);
  }
`;
