import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SDT0001H_Output, SDT0001T_Input } from "../../../types/SDTTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { IN_DWMY_DVD_CODE } from "../../../types/CommonCodes";
import { ConclusionItem } from "../../../types";
import { useAppDispatch } from "../../../store/configureStore";
import fetch_SDT0001T from "../../../store/apis/sdt/SDT0001T";
import fetch_SDT0001H from "../../../store/apis/sdt/SDT0001H";
import ConclusionRow from "../trade/ConclusionRow";
import DailyRow from "./DailyRow";
import { removeHistoryDay } from "../../../store/reducers/stockReducer";

const TradingHistory: React.FC = () => {
  const { t } = useTranslation();
  const header = useMemo(() => {
    return [
      {
        title: t("ConclusionSub.Time"),
        row: 2,
        col: 1,
      },
      {
        title: t("ConclusionSub.Price"),
        row: 2,
        col: 1,
      },
      {
        title: t("ConclusionSub.Change"),
        row: 2,
        col: 1,
      },
      {
        title: t("ConclusionSub.Volume"),
        row: 2,
        col: 1,
      },
      {
        title: t("ConclusionSub.Partners"),
        row: 1,
        col: 2,
      },
    ];
  }, [t]);

  const dispatch = useAppDispatch();
  const code = useSelector((state: RootState) => state.stock.code);
  const historyTableRef = useRef<HTMLDivElement>(null);

  const conclusionList = useSelector(
    (state: RootState) => state.stock.conclusionList
  );
  const history_day = useSelector(
    (state: RootState) => state.stock.history_day
  );
  const history_day_List = useSelector(
    (state: RootState) => state.stock.history_day_List
  );
  const history_day_loading = useSelector(
    (state: RootState) => state.stock.history_day_loading
  );

  // 체결 조회
  const getConclusionList = useCallback(() => {
    const input: SDT0001T_Input = {
      in_da_shrt_cd: code,
      in_array_cnt: "0200",
      in_xtick: "001",
    };
    dispatch(fetch_SDT0001T(input));
  }, [code, dispatch]);

  // 일별 조회
  const getHistory_Day_List = useCallback(
    (next_flag = "0", nxt_key = "99999999") => {
      if (nxt_key === "99999999") {
        dispatch(removeHistoryDay());
      }
      dispatch(
        fetch_SDT0001H({
          in_da_shrt_cd: code,
          in_array_cnt: "30",
          in_dwmy_dvd_cd: IN_DWMY_DVD_CODE.DAY,
          in_next_flag: next_flag,
          in_next_key: nxt_key,
        })
      );
    },
    [code, dispatch]
  );

  const { next_flag, next_key } = useMemo(() => {
    if (history_day) {
      return history_day;
    }
    return {} as SDT0001H_Output;
  }, [history_day]);

  useEffect(() => {
    if (!code) return;
    getConclusionList(); // 체결 조회
    getHistory_Day_List("0", "99999999"); // 일별 조회
  }, [code, getConclusionList, getHistory_Day_List]);

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    if (!next_key || !next_flag) return;
    if (!historyTableRef) return;

    const handleScroll = () => {
      if (
        historyTableRef.current &&
        historyTableRef.current.scrollTop >
          historyTableRef.current.scrollHeight -
            historyTableRef.current.offsetHeight -
            1
      ) {
        // 스크롤이 페이지 끝까지 도착한 경우
        if (next_flag !== "0" && !history_day_loading) {
          getHistory_Day_List(next_flag, next_key); // 일별 조회
        }
      }
    };
    const instance = historyTableRef.current;
    instance?.addEventListener("scroll", handleScroll);
    return () => {
      instance?.removeEventListener("scroll", handleScroll);
    };
  }, [getHistory_Day_List, next_flag, next_key, history_day_loading]);

  return (
    <TransactionWrap>
      <Tabs
        isFitted
        isLazy={false}
        lazyBehavior={"keepMounted"}
        pos="sticky"
        h="100%"
      >
        <TabList>
          <Tab flexGrow={1}>{t("Conclusion")}</Tab>
          <Tab flexGrow={1}>{t("Daily")}</Tab>
        </TabList>
        <TabPanels h={"calc(100% - 44px)"}>
          <TabPanel h={"100%"} p={"0 !important"}>
            <TableContainer
              overflowY={"auto"}
              overflowX={"hidden"}
              h="100%"
              className="scrollbar"
            >
              <Table variant="striped" colorScheme="teal">
                <TableCaption>
                  Imperial to metric conversion factors
                </TableCaption>
                <Thead>
                  <Tr>
                    {header.map(({ title, row, col }, key) => (
                      <ThWrapper rowSpan={row} colSpan={col} key={key}>
                        <div>{title}</div>
                      </ThWrapper>
                    ))}
                  </Tr>
                  <Tr>
                    <ThWrapper color="HIGH" bg="High_light">
                      <div>{t("ConclusionSub.Buy")}</div>
                    </ThWrapper>
                    <ThWrapper color="LOW" bg="Low_light">
                      <div>{t("ConclusionSub.Sell")}</div>
                    </ThWrapper>
                  </Tr>
                </Thead>
                <Tbody>
                  {conclusionList?.map((item: ConclusionItem) => (
                    <ConclusionRow item={item} key={item.key} />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel h={"100%"} p={"0 !important"}>
            <TableContainer
              overflowY={"auto"}
              overflowX={"hidden"}
              h="100%"
              className="scrollbar"
              ref={historyTableRef}
            >
              <Table variant="striped" colorScheme="teal">
                <TableCaption>
                  Imperial to metric conversion factors
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>{t("DailySub.Date")}</Th>
                    <Th>{t("DailySub.Price")}</Th>
                    <Th>{t("DailySub.Change")}</Th>
                    <Th>{t("DailySub.ChangePercent")}</Th>
                    <Th>{t("DailySub.Volume")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {history_day_List?.map((item) => (
                    <DailyRow item={item} key={item.da_bsnss_dt} />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </TransactionWrap>
  );
};

const TransactionWrap = styled.div`
  height: 100%;
  max-height: 400px;
  .chakra-tabs__tab-panel {
    padding: 4px 0 0 0;
  }
  tbody {
    max-height: 300px;
    overflow-y: auto;
    tr:last-child {
      border-bottom: 1px solid #e7e7eb;
    }
  }
`;
const ThWrapper = styled(Th)`
  padding: 0 !important;
  padding-inline: 0 !important;
  border-bottom: 0 !important;
  div {
    border-bottom: 1px solid #e7e7eb;
    height: 49.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 0;
  }
  &:last-child {
    div {
      height: auto;
    }
  }
  &:not([rowspan="2"]) {
    div {
      height: auto;
    }
  }
`;

export default TradingHistory;
