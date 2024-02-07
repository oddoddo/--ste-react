import React from "react";
import { VisuallyHidden, useMediaQuery, Box } from "@chakra-ui/react";
import StockList from "../../../components/accounts/StockList";
import Deposit from "../../../components/accounts/Deposit";

const StDeposit: React.FC = () => {
  const [isMobile] = useMediaQuery("(max-width: 1400px)");

  return (
    <>
      <VisuallyHidden>토큰증권 입금하기</VisuallyHidden>
      {isMobile ? (
        // 모바일 레이아웃
        <MobileLayout />
      ) : (
        // 데스크톱 레이아웃
        <DesktopLayout />
      )}
    </>
  );
};

const DesktopLayout: React.FC = () => {
  return (
    <>
      <StockList />
      <Deposit />
    </>
  );
};

const MobileLayout: React.FC = () => {
  return (
    <>
      {/* 모바일 단계별 화면 */}
      <Step1 />
      <Step2 />
    </>
  );
};

const Step1: React.FC = () => {
  return (
    <>
      <StockList />
    </>
  );
};

const Step2: React.FC = () => {
  return (
    <>
      <Deposit />
    </>
  );
};

// 다음 단계인 Step2, Step3, Step4 등도 유사한 방식으로 추가할 수 있습니다.

export default StDeposit;
