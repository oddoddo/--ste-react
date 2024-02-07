import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Management from "../../components/trade_history/Management";
import InvestDetails from "../../components/trade_history/InvestDetails";
import styled from "styled-components";

const TradeHistory: React.FC = () => {
  const { t } = useTranslation();
  return (
    <TabBox>
      <Tabs variant={"tnb"}>
        <TabList>
          <Tab>{t("AccountSub.Account")}</Tab>
          <Tab>{t("HistorySub.History")}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Management />
          </TabPanel>
          <TabPanel>
            <InvestDetails />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </TabBox>
  );
};

export default TradeHistory;

const TabBox = styled(Box)`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: block;
    height: 63px;
    background: ${({ theme: { colors } }) => colors.white};
  }
`;
