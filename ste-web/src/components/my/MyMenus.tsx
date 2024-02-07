import React from "react";
import { VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RoutePath } from "../common/Routers";

const MyMenus: React.FC = () => {
  return (
    <VStack flexDirection="column" gap="30px" p="50px">
      <Link to={RoutePath.MY_MANAGEMENT}>기본정보 관리</Link>
      <Link to={RoutePath.MY_PRIVACY_AGREEMENT}>개인(신용)정보 동의서</Link>
      <Link to={RoutePath.MY_INVESTOR_TENDENCY}>투자자 성향</Link>
    </VStack>
  );
};
export default React.memo(MyMenus);
