import React from "react";
import styled from "styled-components";
import Bg from "../../assets/images/bg_main.gif";
import { Link } from "react-router-dom";
import { Box, Image } from "@chakra-ui/react";
import { RoutePath } from "../../components/common/Routers";
// import Lottie from "lottie-react";
// import * as animationData from "../../assets/main.lottie.json";

const Home: React.FC = () => {
  return (
    <>
      <Box>
        {/* <Lottie animationData={animationData} loop={true} className="bg" /> */}
        <Box
          boxSizing="border-box"
          display="block"
          overflow="hidden"
          width="initial"
          height="initial"
          background="none"
          opacity="1"
          border="0px"
          margin="0px"
          padding="0px"
          position="absolute"
          inset="0px"
        >
          <Image
            src={Bg}
            position="absolute"
            inset="0px"
            box-sizing="border-box"
            padding="0px"
            border="none"
            margin="auto"
            display="block"
            width="0px"
            height="0px"
            minWidth="100%"
            maxWidth="100%"
            minHeight="100%"
            maxHeight="100%"
            objectFit="cover"
          />
        </Box>
        <MainText>
          혁신적인
          <br /> 유통플랫폼으로
          <br /> <strong>토큰증권 거래</strong>를 선도합니다.
          <div>
            <Link to={RoutePath.DASHBOARD}>투자자 보호 현황판</Link>
          </div>
        </MainText>
      </Box>
    </>
  );
};

const MainText = styled.div`
  font-size: 58px;
  font-weight: 400;
  color: ${({ theme: { colors } }) => colors.mainTxt};
  line-height: 70px;
  letter-spacing: -5px;
  position: absolute;
  top: 20%;
  left: 15%;
  strong {
    font-weight: 700;
  }
  div {
    margin-top: 30px;
    a {
      letter-spacing: initial;
      font-size: 22px;
      font-weight: 500;
      line-height: 58px;
      border: 2px solid ${({ theme: { colors } }) => colors.mainTxt};
      border-radius: 30px;
      padding: 12px 30px;
      color: ${({ theme: { colors } }) => colors.mainTxt};
      &:hover {
        background: ${({ theme: { colors } }) => colors.mainTxt};
        color: ${({ theme: { colors } }) => colors.white};
      }
    }
  }
`;

export default Home;
