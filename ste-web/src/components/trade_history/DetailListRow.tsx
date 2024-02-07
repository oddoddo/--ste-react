import React, { useMemo } from "react";
import { DetailListProps } from "../../types";
import { useTranslation } from "react-i18next";
import { Td, Text, Tr } from "@chakra-ui/react";
import {
  formatDate,
  formatDateTimeforDate,
  formatDateTimeforTime,
  formatTimeforFullTime,
} from "../../utils";
import { DA_TR_CCD_CODE } from "../../types/CommonCodes";

const DetailListRow: React.FC<DetailListProps> = ({ item, onView }) => {
  const { t, i18n } = useTranslation();
  const { date, time, name, textColor, text, txHash, orderDate, orderTime } =
    useMemo(() => {
      const { t, language } = i18n;
      const daTrdCcdMap: {
        [key in DA_TR_CCD_CODE]: {
          text: string;
          color: string;
        };
      } = {
        [DA_TR_CCD_CODE.BUY]: { text: t("Buy"), color: "BUY" },
        [DA_TR_CCD_CODE.SELL]: { text: t("Sell"), color: "SELL" },
        [DA_TR_CCD_CODE.DEPOSIT]: {
          text: t("HistorySub.Deposit"),
          color: "Green",
        },
        [DA_TR_CCD_CODE.WITHDRAWALS]: {
          text: t("HistorySub.Withdrawal"),
          color: "Green",
        },
        [DA_TR_CCD_CODE.TOTAL]: { text: "", color: "Line_Gray_EE" },
      };

      return {
        date: formatDateTimeforDate(item.da_ccls_tm),
        time: formatDateTimeforTime(item.da_ccls_tm),
        name: language === "en" ? item.da_hngl_shrt_nm : item.da_hngl_shrt_nm,
        textColor: item?.da_trd_ccd
          ? daTrdCcdMap[item.da_trd_ccd].color
          : "Line_Gray_EE",
        text: item?.da_trd_ccd ? daTrdCcdMap[item.da_trd_ccd].text : "",
        txHash:
          item.da_srvc_rqs_tr_id && item.da_srvc_rqs_tr_id !== " "
            ? item.da_srvc_rqs_tr_id.substring(0, 12) + "..."
            : "",
        orderDate: formatDate(item.da_ordr_dt),
        orderTime: formatTimeforFullTime(item.da_ordr_tm),
      };
    }, [item, i18n]);
  return (
    <Tr>
      <Td textAlign="center">
        <Text variant={"txt154"} color="Typo_Sub_B0" textAlign={"center"}>
          {date}
          <Text as="em" color="Line_Gray_EE">
            {" | "}
          </Text>
          {time}
        </Text>
      </Td>
      <Td textAlign="left">{name}</Td>
      <Td textAlign="center">
        <Text variant={"txt154"} color={textColor}>
          {text}
        </Text>
      </Td>
      <Td>
        {t("format.number", { value: item.da_q })} <span>주</span>
      </Td>
      <Td>{t("format.number", { value: item.da_uprc })}</Td>
      <Td>
        {t("format.number", {
          value: Number(item.da_q) * Number(item.da_uprc),
        })}
      </Td>
      <Td>
        {t("format.number", {
          value: item.da_dl_fee_amt,
        })}
      </Td>
      <Td>
        {t("format.number", {
          value:
            Number(item.da_q) * Number(item.da_uprc) +
            Number(item.da_dl_fee_amt),
        })}
      </Td>
      <Td textAlign="center">
        <Text variant={"txt154"} color="Typo_Sub_B0" textAlign={"center"}>
          {orderDate}
          <Text as="em" color="Line_Gray_EE">
            {" | "}
          </Text>
          {orderTime}
        </Text>
      </Td>
      <Td>
        <Text
          variant={"txt154"}
          textAlign="center"
          color="#0039CD"
          textDecor={"underline"}
          onClick={onView}
          style={{ cursor: "pointer" }}
        >
          {txHash}
        </Text>
      </Td>
    </Tr>
  );
};
export default React.memo(DetailListRow);
