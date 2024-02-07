import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import CancelTradingModal from "../../modals/CancelTradingModal";
import { ConclusionProps, NonConclusionProps } from "../../../types";
import { useTranslation } from "react-i18next";
import { formatDate, formatTime, getNowDate } from "../../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { SVC_CD } from "../../../types/InterfaceTypes";
import {
  SDL00040_Input,
  SDL11008_Output,
  SDL11008_Output_List,
} from "../../../types/SDLTypes";
import {
  DA_CCD_CODE,
  DA_CN_CLSF_CODE,
  TRD_DL_CCD_CODE,
} from "../../../types/CommonCodes";
import { useMcaContext } from "../../../apis/mca/McaContext";
import { useUserInfo } from "../../../store/reducers/authReducer";
import { useAppDispatch } from "../../../store/configureStore";
import fetch_SDL11008 from "../../../store/apis/sdl/SDL11008";

const OrderDetail = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { onRequest } = useMcaContext();
  const { account, accountNumberPassword } = useUserInfo();
  const code = useSelector((state: RootState) => state.stock.code);
  const orderDetail = useSelector(
    (state: RootState) => state.stock.orderDetail
  );

  // da_ccd : 0: 전체 1: 체결 2: 미체결
  const [selectDaCcd, setSelectDaCdd] = useState(DA_CCD_CODE.NOT_TRADED);
  const [tabIndex, setTabIndex] = useState(0);

  const getOrderList = useCallback(() => {
    if (!account || !accountNumberPassword) return;
    dispatch(
      fetch_SDL11008({
        da_ccd: selectDaCcd,
        da_cn_clsf: DA_CN_CLSF_CODE.NONE,
        da_ac_no: account,
        da_ac_pwd: accountNumberPassword,
        da_ordr_no: "0000000001",
        da_ordr_dt: getNowDate(),
        da_symbl: code,
        da_grid_cnt: "18",
      })
    );
  }, [account, code, selectDaCcd, accountNumberPassword, dispatch]);

  const { array: orderList } = useMemo(() => {
    if (orderDetail) {
      return orderDetail;
    }
    return { array: [] };
  }, [orderDetail]);

  const { da_ordr_dt } = useMemo(() => {
    if (orderDetail) {
      return orderDetail;
    }
    return {} as SDL11008_Output;
  }, [orderDetail]);

  useEffect(() => {
    if (account && code) {
      getOrderList();
    }
  }, [account, code, selectDaCcd, getOrderList]);

  const cancelTradingModal = useDisclosure();
  // 선택된 미체결 취소 주문
  const [cancelItem, setCancelItem] = useState<SDL11008_Output_List | null>(
    null
  );

  const cancelHandler = (item: SDL11008_Output_List) => {
    setCancelItem(item);
    cancelTradingModal.onOpen();
  };

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  // 취소 주문 Input
  const getInput = useCallback((): SDL00040_Input | undefined => {
    if (account && accountNumberPassword && cancelItem) {
      return {
        ordr_dt: getNowDate(),
        ac_no: account,
        ac_pwd: accountNumberPassword,
        orgn_ordr_dt: getNowDate(),
        orgn_ordr_no: cancelItem.ordr_no,
        symbl: cancelItem.stnd_is_cd,
        askprc_q: cancelItem.nccls_q,
        mkt_id: "1",
        ordr_md_ccd: "H1",
        mbr_cmpny_no: "00030",
      };
    }
  }, [account, accountNumberPassword, cancelItem]);

  const confirmCancelHandler = useCallback(() => {
    cancelTradingModal.onClose();
    if (onRequest) {
      onRequest(SVC_CD.SDL00040, getInput());
      // getOrderList();
      setCancelItem(null);
    }
  }, [cancelTradingModal, onRequest, getInput]);

  useEffect(() => {
    if (tabIndex === 0) setSelectDaCdd(DA_CCD_CODE.NOT_TRADED);
    else if (tabIndex === 1) setSelectDaCdd(DA_CCD_CODE.TRADE_EXECUTED);
  }, [tabIndex]);

  return (
    <React.Fragment>
      <CancelTradingModal
        disclosure={cancelTradingModal}
        tradeType={cancelItem?.trd_dl_ccd}
        confirm={confirmCancelHandler}
      />
      <Tabs
        variant="soft-rounded"
        justifyContent={"center"}
        mt={2}
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>{t("OpenClosed.Open")}</Tab>
          <Tab>{t("OpenClosed.Closed")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel mt={2.5}>
            <TableContainer style={{ overflowX: "auto" }}>
              <Table variant="simple">
                <TableCaption>
                  Imperial to metric conversion factors
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>{t("OpenClosed.OpenTime")}</Th>
                    <Th>{t("OpenClosed.OpenType")}</Th>
                    <Th isNumeric>{t("OpenClosed.OpenPrice")}</Th>
                    <Th isNumeric>{t("OpenClosed.OpenAmount")}</Th>
                    <Th>{t("OpenClosed.OpenOrderCancel")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orderList?.length > 0 ? (
                    orderList.map((item, ordr_no) => {
                      return (
                        <NonConclusionRow
                          key={ordr_no}
                          date={da_ordr_dt}
                          time={item.ordr_tm}
                          price={Number(item.ordr_uprc)}
                          volume={Number(item.nccls_q)}
                          tradeType={item.trd_dl_ccd as TRD_DL_CCD_CODE}
                          onCancel={() => cancelHandler(item)}
                        />
                      );
                    })
                  ) : (
                    <Tr>
                      <Td colSpan={5} textAlign={"center"}>
                        {t("OpenClosed.NoOpenData")}
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel mt={2.5}>
            <TableContainer style={{ overflowX: "auto" }} className="scrollbar">
              <Table variant="simple">
                <TableCaption>
                  Imperial to metric conversion factors
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>{t("OpenClosed.ClosedTime")}</Th>
                    <Th>{t("OpenClosed.ClosedType")}</Th>
                    <Th isNumeric>{t("OpenClosed.ClosedPrice")}</Th>
                    <Th isNumeric>{t("OpenClosed.ClosedAmount")}</Th>
                    <Th isNumeric>{t("OpenClosed.ClosedTotal")}</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orderList?.length > 0 ? (
                    orderList.map((item, ordr_no) => {
                      return (
                        <ConclusionRow
                          key={ordr_no}
                          date={da_ordr_dt}
                          time={item.ccls_tm}
                          price={Number(item.mkti_ccls_uprc)}
                          volume={Number(item.tl_ccls_q)}
                          tradeType={item.trd_dl_ccd}
                        />
                      );
                    })
                  ) : (
                    <Tr>
                      <Td colSpan={5} textAlign={"center"}>
                        {t("OpenClosed.NoClosedData")}
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </React.Fragment>
  );
};

export default OrderDetail;

const ConclusionRow: React.FC<ConclusionProps> = ({
  date,
  time,
  tradeType,
  price,
  volume,
}) => {
  const { t } = useTranslation();
  return (
    <Tr>
      <Td>
        <Text variant={"txt104"} color={"Typo_Secondary_666"}>
          {formatDate(date)} <br /> {formatTime(time)}
        </Text>
      </Td>
      <Td>
        <Text
          variant={"txt124"}
          color={
            tradeType === TRD_DL_CCD_CODE.BUY
              ? "BUY"
              : tradeType === TRD_DL_CCD_CODE.SELL
              ? "SELL"
              : ""
          }
        >
          {tradeType === TRD_DL_CCD_CODE.BUY
            ? t("Buy")
            : tradeType === TRD_DL_CCD_CODE.SELL
            ? t("Sell")
            : ""}
        </Text>
      </Td>
      <Td isNumeric>{t("format.number", { value: price })}</Td>
      <Td isNumeric>
        <Text variant={"txt115"}>{t("format.number", { value: volume })}</Text>
      </Td>
      <Td isNumeric>{t("format.number", { value: volume * price })}</Td>
    </Tr>
  );
};

const NonConclusionRow: React.FC<NonConclusionProps> = ({
  date,
  time,
  tradeType,
  price,
  volume,
  onCancel,
}) => {
  const { t } = useTranslation();
  return (
    <Tr>
      <Td>
        <Text variant={"txt104"} color={"Typo_Secondary_666"}>
          {formatDate(date)} <br /> {formatTime(time)}
        </Text>
      </Td>
      <Td>
        <Text
          variant={"txt124"}
          color={
            tradeType === TRD_DL_CCD_CODE.BUY
              ? "BUY"
              : tradeType === TRD_DL_CCD_CODE.SELL
              ? "SELL"
              : ""
          }
        >
          {tradeType === TRD_DL_CCD_CODE.BUY
            ? t("Buy")
            : tradeType === TRD_DL_CCD_CODE.SELL
            ? t("Sell")
            : ""}
        </Text>
      </Td>
      <Td isNumeric>{t("format.number", { value: price })}</Td>
      <Td isNumeric>
        <Text variant={"txt115"}>{t("format.number", { value: volume })}</Text>
      </Td>
      <Td>
        <Button onClick={onCancel} variant={"outlinePlus"}>
          {t("OpenClosed.OpenCancel")}
        </Button>
      </Td>
    </Tr>
  );
};
