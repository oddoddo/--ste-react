import React, { useMemo } from "react";
import styled from "styled-components";
import { Flex, Text, Spacer } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { TradeType } from "../../../types";

export type OrderDetailRowProps = {
  tradeType: TradeType;
  volume: string;
  price: string;
};

const OrderDetailRow: React.FC<OrderDetailRowProps> = ({
  volume,
  price,
  tradeType,
}) => {
  const { t } = useTranslation();

  const sum = useMemo(() => {
    if (!volume || !price) return 0;
    return parseFloat(volume) * parseFloat(price);
  }, [volume, price]);

  return (
    <Flex alignItems={"flex-end"} lineHeight="18px">
      <Flex>
        <Text variant={"txt124"} color="black">
          {t("format.number", { value: price })}
        </Text>
        <Text variant={"txt124"} ml={1} color="Typo_Sub_B0">
          {t("WON")}
        </Text>
      </Flex>
      <Bar />
      <Flex>
        <Text variant={"txt115"} color="black">
          {t("format.number", { value: volume })}
        </Text>
        <Text variant={"txt115"} ml={1} color="Typo_Sub_B0">
          {t("JU")}
        </Text>
      </Flex>
      <Spacer />
      <Flex>
        <Text variant={"txt125"} color={tradeType}>
          {t("format.number", { value: sum })}
        </Text>
        <Text variant={"txt124"} ml={1} color={tradeType}>
          {t("WON")}
        </Text>
      </Flex>
    </Flex>
  );
};

const Bar = styled.div`
  width: 1px;
  height: 12px;
  margin: 0 6px 0 8px;
  background: #e9e9e9;
  transform: translateY(-3px);
`;

export default OrderDetailRow;
