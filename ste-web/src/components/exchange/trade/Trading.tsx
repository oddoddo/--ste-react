import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import OrderBuy from "./OrderBuy";
import OrderDetail from "../history/OrderDetail";
import OrderSell from "./OrderSell";

export interface OrderBookItemValue {
  value1: number;
  value2: string;
}

const Trading = () => {
  const { t } = useTranslation();
  return (
    <Box w="100%" h="100%">
      <TabsWrapper isLazy={true} lazyBehavior="unmount" pos="sticky" h={"100%"}>
        <TabList>
          <Tab className="red" w={100}>
            {t("Buy")}
          </Tab>
          <Tab className="blue" w={100}>
            {t("Sell")}
          </Tab>
          <Tab className="gray" pl={0} pr={0} w={100}>
            {t("MyTrades")}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <OrderBuy />
          </TabPanel>
          <TabPanel>
            <OrderSell />
          </TabPanel>
          <TabPanel>
            <OrderDetail />
          </TabPanel>
        </TabPanels>
      </TabsWrapper>
    </Box>
  );
};

const TabsWrapper = styled(Tabs)`
  .red[aria-selected="true"] {
    color: ${({ theme: { colors } }) => colors.HIGH};
    background: ${(props) => props.theme.colors.High_light};
    border-color: ${({ theme: { colors } }) => colors.HIGH};
  }
  .blue[aria-selected="true"] {
    color: ${({ theme: { colors } }) => colors.LOW};
    background: ${(props) => props.theme.colors.Low_light};
    border-color: ${({ theme: { colors } }) => colors.LOW};
  }
  .gray[aria-selected="true"] {
    color: ${({ theme: { colors } }) => colors.black};
    background: ${(props) => props.theme.colors.Gray_light};
    border-color: ${({ theme: { colors } }) => colors.black};
  }
`;

export default Trading;
