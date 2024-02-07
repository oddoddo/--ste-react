import styled from "styled-components";
import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import DetailList from "./DetailList";
import { useCallback, useEffect, useMemo, useState } from "react";
import { calculatePastDates, formatDate, getNowDate } from "../../utils";
import { SDL11006_Output } from "../../types/SDLTypes";
import { useUserInfo } from "../../store/reducers/authReducer";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store/reducers";
import { useAppDispatch } from "../../store/configureStore";
import fetch_SDL11006 from "../../store/apis/sdl/SDL11006";
import { DA_CN_TR_CLSF_CODE, DA_TR_CCD_CODE } from "../../types/CommonCodes";
import { removeTransactionDetail } from "../../store/reducers/stockReducer";
import { DashboardBox } from "./Management";

const InvestDetails = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const [ccd, setCDd] = useState<DA_TR_CCD_CODE>(DA_TR_CCD_CODE.TOTAL);
  const [pastDate, setPastDate] = useState("1w");
  const { account, accountNumberPassword } = useUserInfo();
  const transactionDetail = useSelector(
    (state: RootState) => state.stock.transactionDetail
  );

  const getTransactionList = useCallback(
    (clsf = DA_CN_TR_CLSF_CODE.NONE, nxt_key = "") => {
      if (!account || !accountNumberPassword) return;
      if (clsf === "N") {
        dispatch(removeTransactionDetail());
      }
      dispatch(
        fetch_SDL11006({
          da_ccd: ccd,
          da_ac_no: account,
          da_ac_pwd: accountNumberPassword,
          da_ordr_st_dt: calculatePastDates(pastDate),
          da_ordr_ed_dt: getNowDate(),
          da_cn_clsf: clsf,
          da_nxt_key: nxt_key,
          da_grid_cnt: "15",
        })
      );
    },
    [account, accountNumberPassword, pastDate, dispatch, ccd]
  );

  const { da_tot_cnt, da_nxt_key } = useMemo(() => {
    if (transactionDetail) {
      return transactionDetail;
    }
    return {} as SDL11006_Output;
  }, [transactionDetail]);

  useEffect(() => {
    if (account && accountNumberPassword) {
      getTransactionList();
    }
  }, [account, accountNumberPassword, getTransactionList, ccd, pastDate]);

  return (
    <Container>
      <InvestConditionWrap
        className="condition"
        justifyContent={"space-between"}
      >
        <Box>
          <Flex className="title">{t("HistorySub.Type")} </Flex>
          <RadioGroup
            onChange={(nextValue: DA_TR_CCD_CODE) => setCDd(nextValue)}
            value={ccd}
          >
            <Stack spacing={0} direction="row">
              <Radio value={DA_TR_CCD_CODE.TOTAL}>{t("HistorySub.All")}</Radio>
              <Radio value={DA_TR_CCD_CODE.BUY}>{t("HistorySub.Buy")}</Radio>
              <Radio value={DA_TR_CCD_CODE.SELL}>{t("HistorySub.Sell")}</Radio>
              <Radio value={DA_TR_CCD_CODE.DEPOSIT}>
                {t("HistorySub.Deposit")}
              </Radio>
              <Radio value={DA_TR_CCD_CODE.WITHDRAWALS}>
                {t("HistorySub.Withdrawal")}
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box>
          <Flex className="title">
            {t("HistorySub.Date")}
            <Text variant={"txt165"} ml={"10px"} color="#969696">
              {formatDate(calculatePastDates(pastDate))} ~{" "}
              {formatDate(getNowDate())}
            </Text>
          </Flex>
          <RadioGroup onChange={setPastDate} value={pastDate}>
            <Stack spacing={0} direction="row">
              <Radio value="1w">{t("HistorySub.Week")}</Radio>
              <Radio value="1m">{t("HistorySub.Month")}</Radio>
              <Radio value="3m">{t("HistorySub.3Month")}</Radio>
              <Radio value="6m">{t("HistorySub.6Month")}</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box>
          <Flex className="title">{t("HistorySub.Search")}</Flex>
          <Flex
            w={"472px"}
            h={"47px"}
            border={"1px solid"}
            borderColor={"Line_Gray_BT_DD"}
            background={"white"}
          >
            <Input
              placeholder=""
              h={"45px"}
              p={"13px 19px"}
              border={"none"}
              _placeholder={{
                color: "#B0B0B0",
              }}
            />
            <IconButton
              aria-label="Search"
              icon={<SearchIcon />}
              w={"60px"}
              h={"45px"}
              background="none"
              fontSize={"22px"}
              color={"#413FA0"}
            />
          </Flex>
        </Box>
      </InvestConditionWrap>
      <DashboardBox>
        <Text
          className="title"
          variant={"txt145"}
          color="black"
          h={"40px !important"}
          lineHeight={"50px !important"}
        >
          {t("HistorySub.TotalCnt")}
          <Text as={"span"} color="HIGH" ml={1}>
            {da_tot_cnt
              ? t("format.number", {
                  value: parseFloat(da_tot_cnt),
                })
              : "0"}
          </Text>
          {i18n.language === "en" ? "" : "건"}
        </Text>
        <DetailList />
        {da_nxt_key && (
          <Box>
            <Button
              width="100%"
              alignContent="center"
              onClick={() =>
                getTransactionList(DA_CN_TR_CLSF_CODE.EXISTS, da_nxt_key)
              }
            >
              {t("HistorySub.More")}
            </Button>
          </Box>
        )}
      </DashboardBox>
    </Container>
  );
};
export default InvestDetails;

const InvestConditionWrap = styled(Flex)`
  .title {
    height: 25px;
    margin-bottom: 12px;
    font-size: 17px;
    font-weight: 500;
  }
  margin-bottom: 40px;
`;
