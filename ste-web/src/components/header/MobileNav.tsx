import React, { useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";
import { RoutePath } from "../common/Routers";
import { MdMultipleStop, MdOutlineAccountCircle } from "react-icons/md";
import { ReactComponent as ListAltAdd } from "../../assets/images/common/list_alt_add.svg";
import { ReactComponent as BarChart4Bars } from "../../assets/images/common/bar_chart_4_bars.svg";
import { Icon } from "@chakra-ui/icons";

const MobileNav: React.FC = () => {
  const { pathname } = useLocation();
  const selectedMenu = useMemo(() => {
    return pathname.split("/")[1];
  }, [pathname]);

  const navItems = [
    {
      id: "exchange",
      label: "거래소",
      icon: (
        <Icon fontSize={28}>
          <BarChart4Bars />
        </Icon>
      ),
      path: RoutePath.EXCHANGE,
    },
    {
      id: "accounts",
      label: "뱅킹",
      icon: <MdMultipleStop fontSize={28} />,
      path: RoutePath.ACCOUNTS,
    },
    {
      id: "tradehistory",
      label: "투자내역",
      icon: (
        <Icon fontSize={28}>
          <ListAltAdd />
        </Icon>
      ),
      path: RoutePath.TRADE_HISTORY,
    },
    {
      id: "my",
      label: "My",
      icon: <MdOutlineAccountCircle fontSize={28} />,
      path: RoutePath.MY,
    },
    {
      id: "menu",
      label: "메뉴",
      icon: <CgMenuLeft fontSize={28} />,
      path: "/",
    },
  ];

  return (
    <Box
      display={"block"}
      pos={"fixed"}
      bottom={"0"}
      left={"0"}
      w={"100%"}
      h={"70px"}
      zIndex={"100"}
      bg={"white"}
      borderTop={"1px solid"}
      borderColor={"Line_Gray_e9"}
      boxShadow={"1px 1px 12px 0px rgba(0, 0, 0, 0.10)"}
    >
      <Flex
        h={"100%"}
        maxW={"430px"}
        mx={"auto"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        {navItems.map((item) => (
          <Link to={item.path} key={item.id}>
            <Flex
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              style={{
                opacity: selectedMenu === item.id ? 1 : 0.5,
              }}
            >
              <Box color="black">{item.icon}</Box>
              <Text variant={"txt135"} color="input_BOXbg">
                {item.label}
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default MobileNav;
