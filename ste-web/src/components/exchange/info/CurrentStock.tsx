import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import StockName from "../header/StockName";
import Fluctuation from "../header/Fluctuation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/configureStore";
import fetch_SDT0001M from "../../../store/apis/sdt/SDT0001M";
import { stateStockCode } from "../../../store/reducers/stockReducer";

const CurrentStock: React.FC = () => {
  const dispatch = useAppDispatch();
  const code = useSelector(stateStockCode);

  const getStockInfo = useCallback(() => {
    if (code) dispatch(fetch_SDT0001M(code));
  }, [code, dispatch]);

  useEffect(() => {
    if (code) getStockInfo();
  }, [code, getStockInfo]);

  return (
    <HeaderWrap>
      <StockName />
      <Fluctuation />
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0 0.5rem;
  color: ${({ theme: { colors } }) => colors.white};
  gap: 2rem;
  justify-content: space-around;
`;

export default CurrentStock;
