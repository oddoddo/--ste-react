import React from "react";
import { Link } from "react-router-dom";
import { Flex, Heading, Spacer } from "@chakra-ui/react";
import LOGO_W from "../../assets/images/common/Logo_W.svg";
import LOGO_P from "../../assets/images/common/Logo_P.svg";
import styled from "styled-components";
import Search from "./Search";
import Auth from "./Auth";
import Language from "./Language";
import Gnb from "./Gnb";
import { RoutePath } from "../common/Routers";
import { useSelector } from "react-redux";
import { stateMenuColor } from "../../store/reducers/extraReducer";
import TestLogin from "./TestLogin";
import MobileNav from "./MobileNav";
import { BrowserView, MobileView } from "react-device-detect";

const TopMenu = () => {
  const whiteHeader = useSelector(stateMenuColor);

  return (
    <>
      <MobileView>
        <MobileNav />
      </MobileView>
      <BrowserView>
        <HeaderWrapper
          className={whiteHeader ? "white-header" : ""}
          display={"flex"}
          bg={"primary"}
          border={"1px solid"}
        >
          <Heading as="h1" size="lg">
            <Link to={RoutePath.HOME}>한국ST거래</Link>
          </Heading>
          <Gnb />
          <Spacer />
          <Flex gap={0} align="center">
            <Flex alignItems={"center"}>
              <Search />
              <Auth />
            </Flex>
            <Language />
          </Flex>
          <TestLogin />
        </HeaderWrapper>
      </BrowserView>
    </>
  );
};
export default React.memo(TopMenu);

const HeaderWrapper = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  height: 60px;
  /* background: ${({ theme: { colors } }) => colors.primary}; */
  border-color: rgba(141, 134, 213, 0.2);
  padding: 0 50px 0 60px;
  h1 a {
    display: flex;
    align-items: center;
    width: 154px;
    height: 100%;
    margin-right: 1rem;
    background: url(${LOGO_W}) no-repeat 50% 50%;
    text-indent: -9999px;
  }
  &.white-header {
    background: ${({ theme: { colors } }) => colors.white};
    border-color: ${({ theme: { colors } }) => colors.white};
    h1 a {
      background: url(${LOGO_P}) no-repeat 50% 50%;
    }
  }
`;
