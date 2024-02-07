import React, { useRef, useEffect } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Item } from "./DashboardTypes";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getMemberIcon } from "../../utils";

interface Props {
  value: Item;
}

function DashboardItem({ value }: Props) {
  const { t } = useTranslation();
  const blinkRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const priceRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const rateRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const volumeRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (value.noti !== "정상") {
      if (blinkRef.current) blinkRef.current.classList.add("blink");
    }
    if (value.prev_price && value.prev_price !== value.price) {
      // console.log("=>>>", value.prev_price, value.price);
      if (priceRef.current) priceRef.current.classList.add("blink_3s");
      if (rateRef.current) rateRef.current.classList.add("blink_3s");
      setTimeout(() => {
        if (priceRef.current) priceRef.current.classList.remove("blink_3s");
        if (rateRef.current) rateRef.current.classList.remove("blink_3s");
      }, 1000);
    }
    if (value.prev_volume && value.prev_volume !== value.volume) {
      if (volumeRef.current) volumeRef.current.classList.add("blink_3s");
      setTimeout(() => {
        if (volumeRef.current) volumeRef.current.classList.remove("blink_3s");
      }, 1000);
    }
  });

  return (
    <DashboardTable>
      <Text
        variant={"txt154"}
        color={"black"}
        flexGrow={"1"}
        className={"hidden"}
        title={value.name}
      >
        {value.name}
      </Text>
      <Text
        variant={"txt144"}
        color={"black"}
        w={"16%"}
        className={"hidden"}
        title={value.issuer}
      >
        {value.issuer}
      </Text>
      {/* 정상: normal / 주의 : warning / 이상 : danger */}
      <Text
        className={`noti ${
          value.noti === "주의"
            ? "warning"
            : value.noti === "이상"
            ? "danger"
            : "normal"
        }`}
        variant={"txt145"}
        w={"34px"}
        ref={blinkRef}
      >
        {value.noti}
      </Text>
      <Text
        variant={"txt145"}
        color={value.rate > 0 ? "HIGH " : value.rate < 0 ? "LOW " : ""}
        w={"14.5%"}
        textAlign={"right"}
        ref={priceRef}
      >
        {t("format.number", { value: value.price })}
      </Text>
      <Text
        variant={"txt145"}
        color={value.rate > 0 ? "HIGH " : "LOW "}
        w={"14.5%"}
        textAlign={"right"}
        className={"hidden_f"}
        ref={rateRef}
      >
        {value.rate > 0 ? "+" : ""}
        {value.rate !== 0 ? value.rate + "%" : ""}
      </Text>
      <Text
        variant={"txt145"}
        color={"Typo_Sub_3A"}
        w={"15%"}
        textAlign={"right"}
        ref={volumeRef}
      >
        {value.volume !== 0 ? t("format.number", { value: value.volume }) : ""}
      </Text>
      <Flex w={"8%"} className="company">
        <Image src={getMemberIcon(value.member)} h={15} />
      </Flex>
    </DashboardTable>
  );
}

const DashboardTable = styled(Box)`
  display: flex;
  padding: 0;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.Line_Gray_e9};
  border-right: 1px solid ${({ theme: { colors } }) => colors.Line_Gray_5d};
  &:nth-child(3n) {
    border-right: none;
  }
  p {
    flex: 0 0 auto;
    height: 22px;
    line-height: 22px;
    padding: 0 6px;
    border-right: 1px solid ${({ theme: { colors } }) => colors.Line_Gray_e9};
    &:first-child {
      flex: 1 1 0;
    }
  }
  .noti {
    padding: 0;
    height: 100%;
    color: ${({ theme: { colors } }) => colors.white};
    text-align: center;
    /* line-height: 20px; */
    &.normal {
      background-color: ${({ theme: { colors } }) => colors.noteNormal};
    }
    &.warning {
      background-color: ${({ theme: { colors } }) => colors.noteWarning};
    }
    &.danger {
      background-color: ${({ theme: { colors } }) => colors.noteDanger};
    }
  }
  .blink {
    animation: blinker 1s linear infinite;
  }
  @keyframes blinker {
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }
  .blink_3s {
    animation: blinker 1s step-start infinite;
  }
  .company {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .hidden {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .hidden_f {
    overflow: hidden;
    white-space: nowrap;
  }
`;

export default DashboardItem;
