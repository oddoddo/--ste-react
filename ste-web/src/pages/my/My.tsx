import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import MyMenus from "../../components/my/MyMenus";
import { RoutePath } from "../../components/common/Routers";

const My: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === RoutePath.MY ? (
        <Navigate to={RoutePath.MY_MANAGEMENT} />
      ) : (
        <LayoutWrapper>
          <MyMenus />
          <Outlet />
        </LayoutWrapper>
      )}
    </>
  );
};

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default My;
