import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import htsBg from "../../assets/images/bg_hts.png";
import { clearStockData, saveCode } from "../../store/reducers/stockReducer";
import htsTitle from "../../assets/images/tit_hts.png";
import { useAppDispatch } from "../../store/configureStore";
import fetch_SDT0003M from "../../store/apis/sdt/SDT0003M";
import { SDT0003M_Output, SDT0003M_Output_List } from "../../types/SDTTypes";
import Loading from "../common/Loading";

const Layout: React.FC = () => {
  //초기 구동시 종목 선택과 자동 로그인
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [isSymbol, setSymbol] = useState<boolean>(false);
  const navigate = useNavigate();
  const { symbol } = useParams();

  useEffect(() => {
    dispatch(
      fetch_SDT0003M({
        in_da_hngl_is_nm: "",
      })
    )
      .unwrap()
      .then((res: SDT0003M_Output) => {
        console.log("EXCHANGE RES wrapper: ", pathname, ",", symbol, ",", res);

        if (pathname === `/hts/exchange` || pathname === `/hts/exchange/`) {
          if (res?.Array_List?.length > 0) {
            const shortCD = res.Array_List[0].da_is_shrt_cd;
            setSymbol(true);
            navigate(`/hts/exchange/${shortCD}`);
          }
        } else {
          setSymbol(true);
          if (res?.Array_List?.length > 0) {
            const symbolValidate: boolean = res.Array_List.some(
              (item: SDT0003M_Output_List): boolean =>
                item.da_is_shrt_cd.trim() === symbol?.trim()
            );
            if (symbolValidate) {
              dispatch(clearStockData()).then(() => {
                if (symbol) dispatch(saveCode(symbol?.trim()));
              });
            }
          } else {
            // navigate(RoutePath.HOME);
          }
        }
      })
      .catch(() => {
        // navigate(RoutePath.HOME);
      });

    return () => {
      console.log("ExchangeWrapper Out");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <LayoutWrapper>
      <HTSWindowDiv>
        <HTSTitleDiv>[5001] 주식주문종합</HTSTitleDiv>
        <main
          id="main"
          className="scrollbar"
          style={{ overflow: "hidden !important" }}
        >
          <React.Fragment>{isSymbol ? <Outlet /> : <Loading />}</React.Fragment>
        </main>
      </HTSWindowDiv>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url(${htsBg});
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 200px 0;
  #main {
    position: relative;
    flex-grow: 1;
    overflow-x: hidden;
    height: calc(100% - 23px) !important;
  }
`;

const HTSWindowDiv = styled.div`
  width: 1420px;
  height: 970px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: ${({ theme: { colors } }) => colors.white};
  overflow-y: hidden;
`;

const HTSTitleDiv = styled.div`
  height: 24px;

  // background: linear-gradient(rgba(0, 0, 0, 0.6), #000);
  background-image: url(${htsTitle});
  background-repeat: no-repeat;
  background-size: 1420px 24px;
  color: ${({ theme: { colors } }) => colors.white};
  font-size: 0.8rem;
  border-radius: 5px 5px 0 0;
  padding-left: 70px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
`;

export default Layout;
