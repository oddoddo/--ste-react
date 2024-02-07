import React from "react";
import { useTranslation } from "react-i18next";
import DashboardList from "../../components/dashboard/DashboardList";
import { Container } from "@chakra-ui/react";
import styled from "styled-components";
import { DashboardBox } from "../../components/trade_history/Management";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <CustomContainer>
      <DashboardBox>
        <h4 className="title">{t("common.dashboard")}</h4>
        <DashboardList />
      </DashboardBox>
    </CustomContainer>
  );
};

const CustomContainer = styled(Container)`
  max-width: 1598px !important;
`;

export default Dashboard;
