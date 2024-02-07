import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import TopMenu from "../header/TopMenu";
import styled from "styled-components";
import Footer from "../footer/Footer";
import { useDispatch } from "react-redux";
import { changeMenuColor } from "../../store/reducers/extraReducer";

const LandingLayout: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeMenuColor(true));
  }, [dispatch]);

  return (
    <LayoutWrapper>
      <TopMenu />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${(props) => props.theme.colors.back_bg};
  #main {
    position: relative;
    flex-grow: 1;
  }
`;

export default LandingLayout;
