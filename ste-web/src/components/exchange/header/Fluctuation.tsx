import React, { useMemo } from "react";
import styled from "styled-components";
import { Flex, HStack } from "@chakra-ui/react";
import {
  DefaultNum,
  DirectionIcon,
  DownNum,
  NumberText,
  Numtitle,
  SubscriptNum,
  UpNum,
} from "./Num";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { useTranslation } from "react-i18next";
import { millionFormatAmt } from "../../../utils";
import FavoriteIcon from "../../button/Favorite";

const Fluctuation = () => {
  const { t } = useTranslation();
  const stock: any = useSelector((state: RootState) => state.stock.stock);
  const {
    da_now_prc,
    da_opn_prc,
    da_bdy_cmpr_smbl,
    da_bdy_cmpr,
    da_bdy_cmpr_r,
    da_bdy_cls_prc,
    da_acml_vlm,
    da_acml_dl_amt,
    da_ulmt_prc,
    da_llmt_prc,
    da_hgh_prc,
    da_lw_prc,
    da_is_shrt_cd,
  } = useMemo(() => {
    if (stock) {
      return { ...stock };
    }
    return {};
  }, [stock]);

  return (
    <>
      <FluctuationWrapper spacing="46px">
        <HStack>
          <NumberText
            pre_val={Number(da_bdy_cls_prc)}
            val={Number(da_now_prc)}
            size="28px"
            fontWeight={500}
          />
          <DirectionIcon val={da_bdy_cmpr_smbl} />
        </HStack>
        <HStack spacing="25px" ml={"45px"}>
          <NumberText
            val={Number(da_bdy_cmpr)}
            size="20px"
            alt={t("PriceSub.prevCompare")}
            fontWeight={400}
          />
          <NumberText
            val={Number(da_bdy_cmpr_r)}
            size="20px"
            percent={true}
            fontWeight={400}
          />
        </HStack>
      </FluctuationWrapper>
      <FluctuationRightWrapper spacing="0" className="detail">
        <HStack spacing={0}>
          <Numtitle title={t("PriceSub.PrevClose")} />
          <DefaultNum
            title={t("format.number", { value: da_bdy_cls_prc })}
            size="13px"
            color="#D2D2D2"
          />
        </HStack>
        <HStack spacing={0}>
          <Numtitle title={t("PriceSub.High")} />
          <UpNum
            title={t("format.number", { value: da_hgh_prc })}
            size="13px"
          />
          <SubscriptNum
            title={
              "(" +
              t("PriceSub.Upper") +
              " " +
              t("format.number", { value: da_ulmt_prc }) +
              ")"
            }
            size="13px"
          />
        </HStack>
        <HStack spacing={0} textAlign="right">
          <Numtitle title={t("PriceSub.Volume")} />
          <DefaultNum
            title={t("format.number", { value: da_acml_vlm })}
            size="13px"
            color="#F7F6FF"
          />
        </HStack>

        <HStack spacing={0}>
          <Numtitle title={t("PriceSub.Open")} />
          <DefaultNum
            title={t("format.number", { value: da_opn_prc })}
            size="13px"
            color="#D2D2D2"
          />
        </HStack>
        <HStack spacing={0}>
          <Numtitle title={t("PriceSub.Low")} />
          <DownNum
            title={t("format.number", { value: da_lw_prc })}
            size="13px"
          />
          <SubscriptNum
            title={
              "(" +
              t("PriceSub.Lower") +
              " " +
              t("format.number", { value: da_llmt_prc }) +
              ")"
            }
            size="13px"
          />
        </HStack>
        <HStack spacing={0} textAlign="right">
          <Numtitle title={t("PriceSub.TradingValue")} />
          <DefaultNum
            title={millionFormatAmt(da_acml_dl_amt)}
            size="13px"
            color="#F7F6FF"
          />
        </HStack>
      </FluctuationRightWrapper>
      <Flex alignItems="center">
        <FavoriteIcon symbol={da_is_shrt_cd} verifySign={true} />
      </Flex>
    </>
  );
};

const FluctuationWrapper = styled(HStack)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  position: relative;
  /* width: 27%; */
  /* margin-left: 40px; */
  padding-left: 31px;
  &.detail {
    width: 45%;
  }
  > div {
    &:first-of-type {
      width: 19%;
    }
    ,
    &:nth-child(1) {
      width: 100px;
    }
    ,
    &:nth-child(4) {
      width: 19%;
    }
    ,
    &:nth-child(2),
    &:nth-child(5) {
      width: 32%;
    }
    &:nth-child(3n) {
      width: 40%;
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 40px;
    background: ${(props) => props.theme.colors.primary_2};
    margin-right: 0.5rem;
    opacity: 0.3;
  }
`;

const FluctuationRightWrapper = styled(HStack)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  position: relative;
  /* width: 27%; */
  /* margin-left: 40px; */
  padding-left: 31px;
  &.detail {
    width: 45%;
  }
  > div {
    &:first-of-type,
    &:nth-child(4) {
      width: 19%;
    }
    ,
    &:nth-child(2),
    &:nth-child(5) {
      width: 32%;
    }
    &:nth-child(3n) {
      width: 40%;
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 1px;
    height: 40px;
    background: ${(props) => props.theme.colors.primary_2};
    margin-right: 0.5rem;
    opacity: 0.3;
  }
`;

export default Fluctuation;
