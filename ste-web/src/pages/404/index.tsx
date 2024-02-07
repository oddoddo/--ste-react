import React from "react";
import { Link } from "react-router-dom";
import Bg from "../../assets/images/common/404error.png";
import { Box, Text } from "@chakra-ui/react";
import { RoutePath } from "../../components/common/Routers";
import styled from "styled-components";

const NoMatch: React.FC = () => {
  return (
    <Wrapper>
      <Box className="bg"></Box>
      <Box className="txt">
        <Text variant="txt687" color="#120E46" p="10 0">
          Page not Found
        </Text>
        <Box maxWidth={530}>
          <Text variant="txt205" lineHeight={1.5}>
            We're sorry, the page you requested could not be found. Please go
            back to the homepage.
          </Text>
        </Box>
        <Box>
          <Link to={RoutePath.HOME}>Go back to home</Link>
        </Box>
      </Box>
    </Wrapper>
  );
};
export default NoMatch;

const Wrapper = styled.div`
  background: ${({ theme: { colors } }) => colors.white};
  height: calc(100vh - 60px);
  position: relative;
  > div.bg {
    background: url(${Bg}) no-repeat;
    background-size: cover;
    width: 100%;
    height: 50vw;
    max-height: calc(100vh - 60px);
    bottom: 0;
    position: fixed;
  }
  > div.txt {
    font-size: 58px;
    font-weight: 400;
    font-family: "Noto Sans Kr", sans-serif;
    color: ${({ theme: { colors } }) => colors.mainTxt};
    line-height: 70px;
    position: absolute;
    top: 20%;
    left: 15%;
    strong {
      font-weight: 700;
    }
    div {
      margin-top: 30px;
      a {
        font-size: 22px;
        font-weight: 500;
        line-height: 58px;
        border: 2px solid ${({ theme: { colors } }) => colors.mainTxt};
        border-radius: 30px;
        padding: 10px 30px;
        color: ${({ theme: { colors } }) => colors.mainTxt};
        &:hover {
          background: ${({ theme: { colors } }) => colors.mainTxt};
          color: ${({ theme: { colors } }) => colors.white};
        }
      }
    }
  }
`;
