import React from "react";
import { VisuallyHidden, useMediaQuery, Box } from "@chakra-ui/react";
import StockList from "../../../components/accounts/StockList";
import Deposit from "../../../components/accounts/Deposit";
import Withdrawal from "components/accounts/Withdrawal";

const StWithdrawal: React.FC = () => {
  const [isMobile] = useMediaQuery("(max-width: 1440px)"); // 모바일 미디어 쿼리

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
      <Withdrawal />
    </>
  );
};

const MobileLayout: React.FC = () => {
  return (
    <>
      {/* 모바일 단계별 화면 */}
      <Step1 />
    </>
  );
};

const Step1: React.FC = () => {
  return (
    <>
      <VisuallyHidden>메뉴 선택</VisuallyHidden>
      {/* 메뉴 선택 화면 */}
    </>
  );
};

// 다음 단계인 Step2, Step3, Step4 등도 유사한 방식으로 추가할 수 있습니다.

export default StWithdrawal;
