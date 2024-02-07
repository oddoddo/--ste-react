import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/configureStore";
import React, { useEffect, useState } from "react";
import fetch_SDT0003M from "../../../store/apis/sdt/SDT0003M";
import { SDT0003M_Output, SDT0003M_Output_List } from "../../../types/SDTTypes";
import {
  clearStockData,
  saveCode,
  stateStockCode,
} from "../../../store/reducers/stockReducer";
import Loading from "../../common/Loading";
import { RoutePath } from "../../common/Routers";
import { useSelector } from "react-redux";
import {
  setPrevCode,
  statePrevCode,
} from "../../../store/reducers/extraReducer";

const ExchangeWrapper = () => {
  const { pathname } = useLocation();
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { symbol } = useParams();
  const prevCode = useSelector(statePrevCode);
  const code = useSelector(stateStockCode);

  useEffect(() => {
    if (!symbol && prevCode) {
      //메뉴로 or 주소창 "/exchange" 접속시 이전에 보던 종목이 있을 경우 설정
      navigate(prevCode);
      return;
    }

    if (state?.verified && symbol) {
      //내부 검색으로 접속시
      dispatch(setPrevCode(symbol));
      dispatch(saveCode(symbol));
      return;
    }

    //최초 메뉴접속자/메뉴이동은 symbol 검증
    dispatch(
      fetch_SDT0003M({
        in_da_hngl_is_nm: "",
      })
    )
      .unwrap()
      .then((res: SDT0003M_Output) => {
        if (
          pathname === `${RoutePath.EXCHANGE}` ||
          pathname === `${RoutePath.EXCHANGE}/`
        ) {
          if (res?.Array_List?.length > 0) {
            const shortCD = res.Array_List[0].da_is_shrt_cd;
            navigate(shortCD, { state: { verified: true } });
          }
        } else {
          if (res?.Array_List?.length > 0) {
            const symbolValidate: boolean = res.Array_List.some(
              (item: SDT0003M_Output_List): boolean =>
                item.da_is_shrt_cd.trim() === symbol?.trim() &&
                item.da_dl_spsn_f !== "Y"
            );
            if (symbolValidate) {
              dispatch(clearStockData()).then(() => {
                if (symbol) {
                  dispatch(setPrevCode(symbol?.trim()));
                  dispatch(saveCode(symbol?.trim()));
                }
              });
            } else {
              //TODO : 존재하지 않는 심볼일 경우 알림창 표시함?
              navigate(RoutePath.HOME);
            }
          } else {
            navigate(RoutePath.HOME);
          }
        }
      })
      .catch(() => {
        navigate(RoutePath.HOME);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <React.Fragment>{code === "" ? <Loading /> : <Outlet />}</React.Fragment>
  );
};

export default ExchangeWrapper;
