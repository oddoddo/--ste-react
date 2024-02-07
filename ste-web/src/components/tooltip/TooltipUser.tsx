import { InfoIcon } from "@chakra-ui/icons";
import React from "react";
import styled from "styled-components";

const TooltipQuick = () => {
  return (
    <TooltipUserWrap>
      <InfoIcon color="Typo_Sub_B0" ml={1} mt={"-7px"} />
      <div className="tooltip-pannel quick">
        <div className="tooltip-title">[퀵주문]</div>
        <div className="tooltip-content">
          퀵주문 매수 시 주문수량만 설정하면, 체결가능한 호가의 낮은
          매도가격부터 차례로 체결시키는 주문입니다. 빠르게 매매를 체결하고 싶을
          때 사용합니다.
        </div>
      </div>
    </TooltipUserWrap>
  );
};

const TooltipUserWrap = styled.div`
  position: relative;
  .tooltip-pannel {
    position: absolute;
    top: 50%;
    left: 32px;
    z-index: 1;
    transform: translateY(-53%);
    padding: 12px 15px;
    align-items: center;
    gap: 10px;
    border-radius: 5px;
    background: ${({ theme: { colors } }) => colors.Typo_Sub_3A};
    color: ${({ theme: { colors } }) => colors.white};
    font-family: Spoqa Han Sans Neo;
    font-size: 11px;
    font-weight: 500;
    &::after {
      content: "";
      position: absolute;
      left: -7px;
      top: 50%;
      transform: translateY(-50%);
      margin: 0 auto;
      width: 0;
      height: 0;
      border-right: 7px solid ${({ theme: { colors } }) => colors.Typo_Sub_3A};
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
    }
    &.quick {
      width: 195px;
    }
  }
`;

export default TooltipQuick;
