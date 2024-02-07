// 웹소켓 연결시 필요한 Element 생성 공장
import React from "react";
import { useMemo } from "react";
import { useContext } from "react";

type Wrapper = { children: JSX.Element | JSX.Element[] | string };
type FallbackedWrapper = Wrapper & { fallback?: JSX.Element };

export function createWrapper<T extends object>(
  context: React.Context<T>,
  consumer: (context: T) => boolean
) {
  return function ConditionalWrapper({
    children,
    fallback: Fallback,
  }: FallbackedWrapper) {
    const contextValue = useContext(context);
    const condition = useMemo(() => consumer(contextValue), [contextValue]);
    console.log("-------ConditionalWrapper", condition);
    return <>{condition ? children : Fallback}</>;
  };
}
