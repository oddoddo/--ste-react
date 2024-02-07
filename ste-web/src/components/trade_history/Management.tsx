import { Grid, GridItem, Text, Box, Flex, Container } from "@chakra-ui/react";
import AssetStatus from "./AssetStatus";
import AssetList from "./AssetList";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

function Management() {
  const { t } = useTranslation();
  return (
    <Container>
      <DashboardBox>
        <h4 className="title">{t("HistorySub.AssetStatus")}</h4>
        <AssetStatus />
      </DashboardBox>
      <DashboardBox>
        <h4 className="title">{t("HistorySub.ListHoldings")}</h4>
        <AssetList />
      </DashboardBox>
    </Container>
  );
}

export default Management;

export const DashboardBox = styled.div`
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme: { colors } }) => colors.Line_Gray_EE};
  background: ${({ theme: { colors } }) => colors.white};
  box-shadow: 6px 6px 20px 0 ${({ theme: { colors } }) => colors.blackA03};
  .title {
    display: flex;
    height: 53px;
    line-height: 53px;
    padding: 0 20px;
    background: ${({ theme: { colors } }) => colors.back_bg2};
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.Line_Gray_EE};
    font-size: 17px;
    font-weight: 500;
  }
`;
