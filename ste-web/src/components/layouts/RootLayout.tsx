import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const RootLayout: React.FC = () => {
  return (
    <RootWrapper>
      <Outlet />
    </RootWrapper>
  );
};

const RootWrapper = styled.div`
  min-height: 100vh;
  min-width: 360px;
`;

export default RootLayout;
