import React from "react";
import { Heading, VStack, Text, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { RoutePath } from "../common/Routers";
import { MdMultipleStop } from "react-icons/md";

const AccountsMenus: React.FC = () => {
  const location = useLocation();
  const accountsNav = [
    {
      id: "deposit",
      label: "입금하기",
      path: RoutePath.ACCOUNTS_DEPOSIT,
    },
    {
      id: "withdrawal",
      label: "출금하기",
      path: RoutePath.ACCOUNTS_WITHDRAWAL,
    },
    {
      id: "st-deposit",
      label: "토큰증권 입금하기",
      path: RoutePath.ACCOUNTS_ST_DEPOSIT,
    },
    {
      id: "st-withdrawal",
      label: "토큰증권 출금하기",
      path: RoutePath.ACCOUNTS_ST_WITHDRAWAL,
    },
    {
      id: "history",
      label: "입출금내역",
      path: RoutePath.ACCOUNTS_HISTORY,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <VStack
      // pos={{ base: "absolute", lg: "static" }}
      // top={0}
      // left={0}
      // right={0}
      flexDirection="column"
      alignItems={"stretch"}
      textAlign={"left"}
      w={{ base: "100%", lg: "240px" }}
      pt={"35px"}
    >
      <Heading
        variant={"hd205"}
        display={"flex"}
        alignItems={"center"}
        gap={"10px"}
        mb={"20px"}
        pl={"26px"}
        color={"black"}
      >
        <MdMultipleStop size={28} /> 뱅킹
      </Heading>

      <Flex flexDir={"column"}>
        {accountsNav.map((nav) => (
          <Link to={nav.path} key={nav.id}>
            <Text
              variant={"txt155"}
              display={"flex"}
              alignItems={"center"}
              // w={"240px"}
              h={"52px"}
              pl={"30px"}
              color={isActive(nav.path) ? "primary" : "Typo_Secondary_666"}
              bg={isActive(nav.path) ? "activeBgColor" : "white"}
              borderRight={isActive(nav.path) ? "4px solid" : "none"}
              borderColor={"primary"}
            >
              {nav.label}
            </Text>
          </Link>
        ))}
      </Flex>
    </VStack>
  );
};

export default React.memo(AccountsMenus);
